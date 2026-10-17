'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  ShoppingCart,
  ShoppingBag,
  Layers,
  ShieldCheck,
  Search,
  Sparkles,
  Bot,
  TrendingUp,
  Zap,
  Clock,
  Sliders,
  CheckCircle2,
  Building2,
  Smartphone,
  Terminal,
  Rocket,
  Lock,
  Database,
  LayoutDashboard,
  Briefcase,
  Settings,
  Gauge,
  Package,
  CreditCard,
  Truck,
  Repeat,
  RefreshCw,
  Globe,
  BarChart3,
  Tag,
  Cpu,
  Server,
  Eye,
  Filter,
  Activity,
} from 'lucide-react';
import { services, ServiceIcon } from '@/app/services/_components/Services';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT ECOMMERCE-DEVELOPMENT ITEM FROM ../Services
============================================================================ */
const ecommerceDevService =
  services.find((item) => item.slug === 'ecommerce-development') || services[2];

/* ============================================================================
   IMAGE ASSETS (From existing repository assets)
============================================================================ */
const IMG_LUXURY_ECOM = '/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_HERO_SHOWCASE = '/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_FINTECH_SAAS = '/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_AI_ENTERPRISE = '/images/project_ai_enterprise_ui_1791104952051.jpg';

/* ============================================================================
   PAGE CONTENT DATA ARRAYS (Top of file — single source of truth)
============================================================================ */

/* Section 1: Hero Split Storefront + Admin Dashboard Data */
interface HeroShopperProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  priceInr: number;
  compareAtInr: number;
  variants: string[];
  badge: string;
  stockCount: number;
  image: string;
}

const HERO_SHOPPER_PRODUCTS: HeroShopperProduct[] = [
  {
    id: 'prod-01',
    sku: 'SKU-WX-8841',
    name: 'AeroWeave Performance Running Shoe',
    category: 'D2C Footwear · Flagship Storefront',
    priceInr: 4299,
    compareAtInr: 5499,
    variants: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    badge: 'BESTSELLER · 1.2s PDP',
    stockCount: 48,
    image: IMG_LUXURY_ECOM,
  },
  {
    id: 'prod-02',
    sku: 'SKU-WX-9024',
    name: 'Botanical Barrier Repair Serum 30ml',
    category: 'Clean Skincare · Subscription Ready',
    priceInr: 1899,
    compareAtInr: 2299,
    variants: ['30ml Bottle', '60ml Refill', '2-Pack Bundle'],
    badge: 'AUTO-REFILL +18% AOV',
    stockCount: 112,
    image: IMG_HERO_SHOWCASE,
  },
  {
    id: 'prod-03',
    sku: 'SKU-WX-7710',
    name: 'Nordic Solid Oak Modular Desk',
    category: 'Home & Living · Multi-Variant',
    priceInr: 24500,
    compareAtInr: 29900,
    variants: ['120cm Natural', '150cm Walnut', '180cm Studio'],
    badge: 'NO-COST EMI · PINCODE CHECK',
    stockCount: 19,
    image: IMG_FINTECH_SAAS,
  },
];

interface AdminOrderRow {
  orderId: string;
  customer: string;
  channel: string;
  payment: string;
  amountInr: number;
  fulfillment: string;
  isNew?: boolean;
}

const INITIAL_ADMIN_ORDERS: AdminOrderRow[] = [
  {
    orderId: '#WX-4918',
    customer: 'Aarav M. · Mumbai (400050)',
    channel: 'One-Tap UPI (Razorpay)',
    payment: 'PAID',
    amountInr: 4299,
    fulfillment: 'AWB Assigned · Delhivery',
  },
  {
    orderId: '#WX-4917',
    customer: 'Priya K. · Bengaluru (560034)',
    channel: 'Prepaid Card (-₹150 Off)',
    payment: 'PAID',
    amountInr: 3798,
    fulfillment: 'Packed · Shiprocket Sync',
  },
  {
    orderId: '#WX-4916',
    customer: 'Vikram S. · Delhi NCR (201301)',
    channel: 'WhatsApp OTP Verified COD',
    payment: 'VERIFIED COD',
    amountInr: 6198,
    fulfillment: 'Inventory Reserved · Zoho',
  },
];

/* Section 2: Store Blueprints We Build (6 Blueprint Cards) */
export interface StoreBlueprintCard {
  id: string;
  numberCode: string;
  name: string;
  subtitle: string;
  recommendedPlatform: string;
  typicalTimeline: string;
  bestFor: string;
  description: string;
  keyFeatures: [string, string, string, string];
  architectureSpecs: [string, string, string];
  layers: {
    storefront: string;
    cartCheckout: string;
    opsSync: string;
  };
}

const STORE_BLUEPRINTS: StoreBlueprintCard[] = [
  {
    id: 'bp-d2c',
    numberCode: 'BLUEPRINT 01',
    name: 'D2C Brand Flagship Store',
    subtitle: 'Story-driven, mobile-first storefront built for high AOV and repeat orders',
    recommendedPlatform: 'Shopify / Custom Next.js',
    typicalTimeline: '4–6 weeks',
    bestFor: 'Consumer brands in fashion, skincare, wellness, food & electronics',
    description:
      'Engineered to turn cold paid and organic traffic into profitable first orders—with instant variant switching, bundle builders, slide-out cart upsells, and 1-page UPI/card checkout.',
    keyFeatures: [
      'Bespoke mobile-first PDP with sticky Add-to-Cart & video loops',
      'Slide-out cart drawer with free-shipping & free-gift progress bar',
      'Build-Your-Own-Bundle & Frequently Bought Together upsells',
      '1-page express checkout with pincode autofill & COD OTP verification',
    ],
    architectureSpecs: [
      'Sub-1.8s LCP on 4G mobile networks',
      'Server-side GA4 + Meta/Google Conversion API',
      'Automated WhatsApp & Klaviyo cart recovery hooks',
    ],
    layers: {
      storefront: 'Custom Liquid / Hydrogen or Next.js App Router UI',
      cartCheckout: 'Slide-Out Upsell Drawer + 1-Page UPI/Prepaid Checkout',
      opsSync: 'Shiprocket / Delhivery + Zoho / Unicommerce 2-Way Sync',
    },
  },
  {
    id: 'bp-catalog',
    numberCode: 'BLUEPRINT 02',
    name: 'Multi-Category & Large Catalog Store',
    subtitle: 'Lightning-fast search, faceted filtering, and parent-child SKU architecture',
    recommendedPlatform: 'Shopify Plus / WooCommerce / Custom',
    typicalTimeline: '6–8 weeks',
    bestFor: 'Retailers with 500 to 50,000+ SKUs, attributes, and seasonal collections',
    description:
      'Large catalogs die when filters reload slowly or create duplicate SEO URLs. We build instant faceted filtering, predictive typo-tolerant search, and clean canonical collection trees.',
    keyFeatures: [
      'Sub-100ms faceted filtering by size, color, price, brand & specs',
      'Predictive search bar with instant SKU thumbnails & popular queries',
      'Parent-child variant matrices with real-time warehouse stock badges',
      'Bulk CSV / ERP catalog importer with automated WebP image optimization',
    ],
    architectureSpecs: [
      'Indexable SEO collection hubs without crawl-budget bloat',
      'Automated Google Merchant Center multi-feed sync',
      'Edge-cached category pagination & infinite scroll',
    ],
    layers: {
      storefront: 'Faceted Collection Engine + Instant Search Overlay',
      cartCheckout: 'Multi-Item Quick-Add + Pincode Delivery Estimator',
      opsSync: 'Real-Time Multi-Warehouse ERP & Tally/Odoo Connector',
    },
  },
  {
    id: 'bp-b2b',
    numberCode: 'BLUEPRINT 03',
    name: 'B2B & Wholesale Ordering Portal',
    subtitle: 'Tiered dealer pricing, MOQ rules, GST invoicing, and bulk reorder tables',
    recommendedPlatform: 'Shopify B2B / WooCommerce / Custom Node.js',
    typicalTimeline: '6–10 weeks',
    bestFor: 'Manufacturers, distributors, exporters, and hybrid B2C + B2B brands',
    description:
      'Give your distributors, retailers, and corporate buyers a self-serve wholesale portal—complete with approved dealer logins, customer-specific price lists, credit limits, and 1-click PO reorders.',
    keyFeatures: [
      'Gated dealer registration with GSTIN / tax-ID verification workflow',
      'Customer-specific price tiers, volume slabs & Minimum Order Quantities (MOQ)',
      'Spreadsheet-style Quick Order matrix for adding 50+ SKUs in seconds',
      'Request-for-Quote (RFQ) cart, Net-30 credit terms & proforma PDF invoices',
    ],
    architectureSpecs: [
      'Unified inventory pool across B2C retail and B2B wholesale',
      'Automated GST / HSN tax calculation & Tally/Zoho Books sync',
      'Sales-rep portal to place orders on behalf of field accounts',
    ],
    layers: {
      storefront: 'Role-Based B2B Catalog + Matrix Quick-Order Grid',
      cartCheckout: 'RFQ / PO Approval Flow + Net-Terms / NEFT / Gateway',
      opsSync: 'ERP Price-List Sync + Automated GST Tax Invoicing',
    },
  },
  {
    id: 'bp-marketplace',
    numberCode: 'BLUEPRINT 04',
    name: 'Multi-Vendor Marketplace',
    subtitle: 'Vendor onboarding, split commissions, seller dashboards, and unified checkout',
    recommendedPlatform: 'Custom Stack / Headless Commerce',
    typicalTimeline: '8–14 weeks',
    bestFor: 'Niche marketplaces, curated multi-brand platforms, and aggregator startups',
    description:
      'Launch a scalable multi-seller platform where independent vendors manage their own catalog, inventory, and dispatch while shoppers enjoy a single unified cart and trusted checkout.',
    keyFeatures: [
      'Self-serve seller onboarding portal with KYC, bank & catalog approval',
      'Automated split payments, category-wise commission rules & payout ledger',
      'Single shopper checkout with multi-vendor split shipment tracking',
      'Admin control tower for moderation, returns, disputes & seller SLAs',
    ],
    architectureSpecs: [
      'Razorpay Route / Stripe Connect automated split settlements',
      'Vendor-level courier label & manifest generation',
      'Granular role-based access control (Super Admin, Seller, Support)',
    ],
    layers: {
      storefront: 'Multi-Brand Storefront + Verified Seller Store Pages',
      cartCheckout: 'Unified Cart + Split-Order Routing & Escrow Payouts',
      opsSync: 'Vendor Portal + Automated Commission & Tax Ledger',
    },
  },
  {
    id: 'bp-subscription',
    numberCode: 'BLUEPRINT 05',
    name: 'Subscription & Repeat-Order Store',
    subtitle: 'Subscribe-and-Save, custom box builders, and self-serve subscriber portals',
    recommendedPlatform: 'Shopify + Subscription Engine / Custom',
    typicalTimeline: '5–7 weeks',
    bestFor: 'Coffee, supplements, skincare, pet care, FMCG, and recurring D2C boxes',
    description:
      'Turn one-time buyers into predictable monthly recurring revenue (MRR). Shoppers can subscribe in one tap, swap flavors, skip a delivery, or pause anytime without emailing support.',
    keyFeatures: [
      'Default "Subscribe & Save 15%" toggle right on product & cart pages',
      'Interactive "Build Your Monthly Box" step-by-step bundle configurator',
      'Passwordless customer portal to skip, swap SKU, or change delivery date',
      'Automated UPI AutoPay / card recurring billing & dunning retry flows',
    ],
    architectureSpecs: [
      'Predictive 28-day WhatsApp reorder & refill reminder links',
      'Cohort retention analytics & churn-prevention winback offers',
      'Seamless sync between recurring orders and warehouse pick-lists',
    ],
    layers: {
      storefront: 'Subscribe-and-Save PDP + Custom Box Builder UI',
      cartCheckout: 'Recurring Mandate Checkout (UPI AutoPay / Cards)',
      opsSync: 'Automated Billing Cycles + Refill Inventory Forecasting',
    },
  },
  {
    id: 'bp-headless',
    numberCode: 'BLUEPRINT 06',
    name: 'Headless & Composable Storefront',
    subtitle: 'Next.js frontend decoupled from your commerce engine for sub-second speed',
    recommendedPlatform: 'Next.js + Shopify Storefront API / Medusa / Custom',
    typicalTimeline: '7–12 weeks',
    bestFor: 'High-growth brands needing 100% custom UX, global multi-store, and instant loads',
    description:
      'Break free from rigid theme templates. We pair a blazing-fast Next.js React frontend with Shopify Plus, Medusa, or a custom commerce backend—delivering app-like page transitions and total creative freedom.',
    keyFeatures: [
      'Instant page-to-page transitions with edge-cached static & ISR rendering',
      '100% custom interactive storytelling, 3D configurators & editorial layouts',
      'Multi-region, multi-currency & multi-language routing from one codebase',
      'Battle-tested Shopify or headless backend for rock-solid checkout & inventory',
    ],
    architectureSpecs: [
      '95+ Google Lighthouse Performance & green Core Web Vitals',
      'GraphQL Storefront API layer with sub-50ms edge caching',
      'Independent frontend deploys without touching backend checkout stability',
    ],
    layers: {
      storefront: 'Next.js 14 Edge Frontend + Headless CMS Storytelling',
      cartCheckout: 'GraphQL Cart API + Native High-Trust Checkout',
      opsSync: 'Composable Webhooks → ERP, WMS, CRM & Search Engine',
    },
  },
];

/* Section 3: Platform Architecture Workbench (4 Platforms) */
export type EcommercePlatformKey = 'shopify' | 'woocommerce' | 'headless' | 'custom';

export interface PlatformWorkbenchSpec {
  key: EcommercePlatformKey;
  name: string;
  shortTab: string;
  badge: string;
  tagline: string;
  idealStage: string;
  skuCapacity: string;
  launchTimeline: string;
  ownershipModel: string;
  architectureStack: [string, string, string, string];
  strengths: [string, string, string, string];
  tradeoffs: [string, string];
  whenToChoose: string;
  metrics: {
    timeToMarket: number; // out of 100
    customizationFreedom: number;
    scalabilityCeiling: number;
    maintenanceEase: number;
  };
}

const PLATFORM_WORKBENCH_SPECS: PlatformWorkbenchSpec[] = [
  {
    key: 'shopify',
    name: 'Shopify & Shopify Plus',
    shortTab: 'Shopify / Plus',
    badge: 'MOST POPULAR FOR D2C',
    tagline:
      'Rock-solid hosted commerce with 99.99% uptime, high-converting checkout, and rapid time-to-market.',
    idealStage: 'Launching D2C brands to ₹100Cr+ / $20M+ scale',
    skuCapacity: '10 to 50,000+ SKUs',
    launchTimeline: '3–6 weeks',
    ownershipModel: 'Managed SaaS platform + 100% custom theme & app code ownership',
    architectureStack: [
      'Shopify OS 2.0 Custom Liquid / JSON Architecture',
      'Shopify Functions & Checkout Extensibility',
      'Native Razorpay, Cashfree, Stripe & Shop Pay',
      'Global CDN with built-in PCI-DSS Level 1 security',
    ],
    strengths: [
      'Zero server maintenance—handles flash sales and 10,000+ concurrent shoppers effortlessly',
      'Fastest merchandising workflow for your marketing team to launch collections & offers',
      'Deep ecosystem for Indian (UPI, Shiprocket, WhatsApp) and Global (Markets, multi-currency) ops',
      'Clean custom theme engineering by WebXCode without bloated third-party apps slowing pages down',
    ],
    tradeoffs: [
      'Monthly platform subscription + transaction fees (unless using native gateways)',
      'Checkout URL structure and core database schema follow Shopify conventions',
    ],
    whenToChoose:
      'Choose Shopify if you want your team focused 100% on merchandising, marketing, and fulfilment—without ever worrying about server patches or gateway downtime.',
    metrics: {
      timeToMarket: 96,
      customizationFreedom: 82,
      scalabilityCeiling: 94,
      maintenanceEase: 98,
    },
  },
  {
    key: 'woocommerce',
    name: 'WooCommerce (Custom Engineered)',
    shortTab: 'WooCommerce',
    badge: 'FULL CODE & DATA OWNERSHIP',
    tagline:
      'Open-source flexibility on WordPress with zero platform transaction fees and deep content + SEO control.',
    idealStage: 'Content-heavy stores, niche catalogs & cost-conscious scalers',
    skuCapacity: '10 to 15,000+ SKUs (with HPOS)',
    launchTimeline: '4–6 weeks',
    ownershipModel: '100% self-hosted open-source code & database ownership',
    architectureStack: [
      'Custom Lightweight PHP 8.3 / Block Theme (Zero Page-Builder Bloat)',
      'WooCommerce High-Performance Order Storage (HPOS)',
      'Redis Object Cache + Cloudflare Enterprise Edge CDN',
      'Direct REST API Webhooks to GST Billing, ERP & Couriers',
    ],
    strengths: [
      '100% ownership of source code, customer database, and checkout flow with $0 platform commission',
      'Unmatched blog, editorial content, and programmatic SEO integration on the same domain',
      'Complete freedom to customize checkout fields, GST invoice PDFs, and regional shipping rules',
      'Engineered by WebXCode with High-Performance Order Storage (HPOS) so it stays snappy at scale',
    ],
    tradeoffs: [
      'Requires managed cloud hosting, Redis caching, and scheduled security/plugin maintenance',
      'Needs disciplined engineering so third-party plugins do not degrade mobile speed',
    ],
    whenToChoose:
      'Choose WooCommerce when you want zero recurring SaaS platform percentages, custom checkout logic, and powerhouse content + SEO publishing under one roof.',
    metrics: {
      timeToMarket: 88,
      customizationFreedom: 92,
      scalabilityCeiling: 84,
      maintenanceEase: 80,
    },
  },
  {
    key: 'headless',
    name: 'Headless Commerce (Next.js + API)',
    shortTab: 'Headless (Next.js)',
    badge: 'SUB-SECOND PERFORMANCE',
    tagline:
      'Decoupled Next.js React storefront powered by Shopify Storefront API, Medusa, or Saleor.',
    idealStage: 'High-volume D2C flagships, multi-country brands & 3D/interactive stores',
    skuCapacity: '100 to 100,000+ SKUs',
    launchTimeline: '6–10 weeks',
    ownershipModel: 'Custom React/Next.js frontend repo + API commerce engine',
    architectureStack: [
      'Next.js 14 (App Router, React Server Components & ISR)',
      'Shopify Storefront GraphQL API / Medusa.js Backend',
      'Sanity / Strapi Headless CMS for Campaign & Lookbook Pages',
      'Vercel / AWS CloudFront Global Edge Network',
    ],
    strengths: [
      'App-like instant navigation with sub-second page loads and green Core Web Vitals',
      'Total UI/UX freedom—build interactive 3D configurators, quizzes, and rich lookbooks',
      'Keep your trusted commerce backend (like Shopify) for inventory, orders, and payments',
      'Serve multiple countries, currencies, and brand storefronts from a single unified backend',
    ],
    tradeoffs: [
      'Higher initial engineering investment and longer build timeline than a standard theme',
      'Visual page edits require a structured Headless CMS rather than drag-and-drop theme apps',
    ],
    whenToChoose:
      'Choose Headless when mobile speed, bespoke interactive product experiences, and multi-region scale are your primary competitive advantages.',
    metrics: {
      timeToMarket: 76,
      customizationFreedom: 98,
      scalabilityCeiling: 98,
      maintenanceEase: 86,
    },
  },
  {
    key: 'custom',
    name: 'Custom E-commerce Stack (Node.js / Python)',
    shortTab: 'Custom Full-Stack',
    badge: 'BESPOKE BUSINESS LOGIC',
    tagline:
      'Purpose-built commerce architecture for marketplaces, complex B2B portals, and non-standard workflows.',
    idealStage: 'Multi-vendor marketplaces, custom configurators & enterprise B2B',
    skuCapacity: 'Unlimited (PostgreSQL + Elasticsearch)',
    launchTimeline: '8–14 weeks',
    ownershipModel: '100% proprietary IP, custom database schema & microservices',
    architectureStack: [
      'Next.js + TypeScript Frontend & Admin Control Tower',
      'Node.js (NestJS) or Python (FastAPI) Commerce Core',
      'PostgreSQL + Redis + Meilisearch / Elasticsearch',
      'Dockerized AWS / GCP Infrastructure with CI/CD Pipelines',
    ],
    strengths: [
      'Built around your exact business rules—multi-vendor splits, dynamic pricing, or rental/booking engines',
      'No platform ceilings, API rate limits, or per-seat / per-order SaaS licensing fees',
      'Sub-50ms search and filtering across hundreds of thousands of complex industrial or retail SKUs',
      'Direct native integration with proprietary ERPs, warehouse robotics, or legacy databases',
    ],
    tradeoffs: [
      'Longest initial development cycle and requires dedicated architecture planning',
      'Best paired with an ongoing WebXCode maintenance SLA or in-house tech team',
    ],
    whenToChoose:
      'Choose Custom Full-Stack when off-the-shelf platforms force you into clumsy workarounds—such as multi-vendor marketplaces, custom manufacturing configurators, or complex B2B workflows.',
    metrics: {
      timeToMarket: 68,
      customizationFreedom: 100,
      scalabilityCeiling: 100,
      maintenanceEase: 78,
    },
  },
];

/* Section 4: Anatomy of a High-Converting Store (4 Interactive Funnel Layers) */
export type StoreAnatomyLayerKey = 'collection' | 'pdp' | 'drawer' | 'checkout';

export interface AnatomyHotspot {
  id: string;
  number: string;
  title: string;
  impactTag: string;
  whyItMatters: string;
  technicalSpec: string;
}

export interface StoreAnatomyLayer {
  key: StoreAnatomyLayerKey;
  stepNumber: string;
  tabLabel: string;
  screenTitle: string;
  screenUrl: string;
  conversionGoal: string;
  benchmarkLift: string;
  summary: string;
  hotspots: [AnatomyHotspot, AnatomyHotspot, AnatomyHotspot, AnatomyHotspot];
}

const STORE_ANATOMY_LAYERS: StoreAnatomyLayer[] = [
  {
    key: 'collection',
    stepNumber: '01',
    tabLabel: 'Collection & Discovery',
    screenTitle: 'High-Speed Category & Filter Grid',
    screenUrl: 'store.yourbrand.com/collections/bestsellers',
    conversionGoal: 'Get shoppers from landing to the right product in under 8 seconds',
    benchmarkLift: '+38% Category-to-PDP Clickthrough (placeholder)',
    summary:
      'Most stores lose shoppers on slow, cluttered category pages. We engineer instant AJAX filters, live color-swatch previews, and SEO-indexable filter combinations.',
    hotspots: [
      {
        id: 'col-1',
        number: '01',
        title: 'Instant Faceted Filter Bar (Zero Reload)',
        impactTag: '<80ms Filter Response',
        whyItMatters:
          'Shoppers can filter by Size, Price, Material, or In-Stock status simultaneously without full-page reloads.',
        technicalSpec: 'URL-synced state with canonical tags to prevent duplicate SEO indexing.',
      },
      {
        id: 'col-2',
        number: '02',
        title: 'Interactive Color & Variant Swatches on Card',
        impactTag: '+22% Product Engagement',
        whyItMatters:
          'Hovering or tapping a color dot swaps the product card photo immediately so users explore options right on the grid.',
        technicalSpec: 'Preloaded WebP responsive srcset with zero layout shift (CLS 0.00).',
      },
      {
        id: 'col-3',
        number: '03',
        title: 'One-Tap Quick-Add Size Drawer',
        impactTag: 'Fewer Clicks to Cart',
        whyItMatters:
          'Returning customers can pick their size (S / M / L / XL) and add to bag directly from the collection grid.',
        technicalSpec: 'Live inventory check disables sold-out sizes and offers back-in-stock alerts.',
      },
      {
        id: 'col-4',
        number: '04',
        title: 'Merchandising Trust & Social Proof Badges',
        impactTag: 'Higher Click Confidence',
        whyItMatters:
          'Displays verified star ratings, review counts, and dynamic tags ("Bestseller", "Only 3 Left") on each card.',
        technicalSpec: 'Automated metafield rules driven by real-time sales velocity and stock.',
      },
    ],
  },
  {
    key: 'pdp',
    stepNumber: '02',
    tabLabel: 'Product Page (PDP)',
    screenTitle: 'Conversion-Engineered Product Detail Page',
    screenUrl: 'store.yourbrand.com/products/aeroweave-pro',
    conversionGoal: 'Answer every buyer hesitation above the fold and lift AOV',
    benchmarkLift: '+52% Add-to-Cart Rate (placeholder)',
    summary:
      'Your product page is your hardest-working salesperson. Every pixel above and below the fold is structured to build trust, clarify sizing, and encourage multi-item bundles.',
    hotspots: [
      {
        id: 'pdp-1',
        number: '01',
        title: 'Thumb-Friendly Media Gallery + Video Loop',
        impactTag: '2.4× Time on Page',
        whyItMatters:
          'Combines crisp zoomable photography, 360° or vertical video loops, and model/dimension spec captions.',
        technicalSpec: 'Lazy-loaded HLS/MP4 video with adaptive bitrate and instant poster frame.',
      },
      {
        id: 'pdp-2',
        number: '02',
        title: 'Pincode Delivery Date & COD Checker',
        impactTag: 'Removes #1 Buyer Doubt',
        whyItMatters:
          'Tells the shopper "Order within 2 hrs for delivery by Thursday to 400001 — COD & Free Returns Available".',
        technicalSpec: 'Connected to Shiprocket / Delhivery serviceability API with edge caching.',
      },
      {
        id: 'pdp-3',
        number: '03',
        title: 'Buy-More-Save-More & Bundle Selector',
        impactTag: '+31% Average Order Value',
        whyItMatters:
          'Lets buyers switch from "Buy 1" to "Pack of 2 (Save 15%)" or add complementary routine items in a single tap.',
        technicalSpec: 'Dynamic tier pricing with automatic cart discount application.',
      },
      {
        id: 'pdp-4',
        number: '04',
        title: 'Sticky Mobile Add-to-Cart & Express Buy Bar',
        impactTag: 'Always Within Thumb Reach',
        whyItMatters:
          'As shoppers scroll through reviews and specs on mobile, a compact bar keeps Variant + Price + Add to Cart locked at the bottom.',
        technicalSpec: 'IntersectionObserver trigger with smooth variant selector sync.',
      },
    ],
  },
  {
    key: 'drawer',
    stepNumber: '03',
    tabLabel: 'Slide-Out Cart Drawer',
    screenTitle: 'AOV-Boosting Slide-Out Cart Drawer',
    screenUrl: 'store.yourbrand.com/#cart-drawer-active',
    conversionGoal: 'Increase basket size before checkout without interrupting browsing',
    benchmarkLift: '+28% Units Per Order (placeholder)',
    summary:
      'We replace old-fashioned "/cart" page reloads with an instant slide-out drawer that gamifies free shipping, suggests 1-click add-ons, and launches express checkout.',
    hotspots: [
      {
        id: 'drw-1',
        number: '01',
        title: 'Dynamic Free-Shipping & Free-Gift Progress Bar',
        impactTag: '+24% Basket Top-Ups',
        whyItMatters:
          'Shows "Add ₹301 more to unlock FREE Express Shipping + Mystery Mini Gift!" and fills smoothly as items are added.',
        technicalSpec: 'Multi-tier threshold engine supporting both free shipping and auto-injected gift SKUs.',
      },
      {
        id: 'drw-2',
        number: '02',
        title: 'In-Cart 1-Tap Complementary Cross-Sells',
        impactTag: 'Impulse AOV Booster',
        whyItMatters:
          'Recommends relevant low-friction add-ons (e.g., shoe care kit, gift wrap, travel size) that add to cart in one click.',
        technicalSpec: 'Rule-based or AI-paired product recommendations excluding items already in cart.',
      },
      {
        id: 'drw-3',
        number: '03',
        title: 'Auto-Applied Best Coupon & Prepaid Incentive',
        impactTag: 'Stops Coupon-Hunting Bounce',
        whyItMatters:
          'Displays available offers right inside the drawer and highlights "Extra ₹100 OFF on UPI / Prepaid at Checkout".',
        technicalSpec: 'Prevents shoppers from leaving the tab to search coupon sites.',
      },
      {
        id: 'drw-4',
        number: '04',
        title: 'Direct Express Checkout Launch Button',
        impactTag: 'Zero Cart-Page Drop-Off',
        whyItMatters:
          'Skips the intermediate cart page entirely and opens the 1-page checkout with payment trust icons visible.',
        technicalSpec: 'Pre-initializes checkout session token on drawer open for sub-second load.',
      },
    ],
  },
  {
    key: 'checkout',
    stepNumber: '04',
    tabLabel: '1-Page Express Checkout',
    screenTitle: 'Frictionless 1-Page Checkout & Order Routing',
    screenUrl: 'store.yourbrand.com/checkout/express',
    conversionGoal: 'Maximize payment completion and minimize COD Return-to-Origin (RTO)',
    benchmarkLift: '+44% Checkout Completion (placeholder)',
    summary:
      'Checkout is where revenue is won or lost. We streamline address entry, prioritize 1-tap UPI and wallets, nudge COD buyers toward prepaid, and fire server-side tracking.',
    hotspots: [
      {
        id: 'chk-1',
        number: '01',
        title: 'Guest Checkout + Pincode City/State Autofill',
        impactTag: '-60% Form Typing Time',
        whyItMatters:
          'Never forces account creation. Typing a 6-digit pincode or ZIP automatically populates City, State, and delivery ETA.',
        technicalSpec: 'Phone-first lookup with OTP autofill for returning shoppers.',
      },
      {
        id: 'chk-2',
        number: '02',
        title: 'Prepaid Nudge & COD Risk Protection',
        impactTag: '-35% COD RTO Returns',
        whyItMatters:
          'Shows an instant ₹100 discount for UPI/Card payments while flagging high-risk pincodes for WhatsApp OTP confirmation on COD.',
        technicalSpec: 'Dynamic payment method sorting + automated WhatsApp COD verification webhook.',
      },
      {
        id: 'chk-3',
        number: '03',
        title: 'Native One-Tap UPI, EMI & Global Wallets',
        impactTag: '99.4% Gateway Success Rate',
        whyItMatters:
          'Deep-links directly into Google Pay, PhonePe, Paytm, Cred, Apple Pay, or No-Cost EMI without clunky bank redirects.',
        technicalSpec: 'Multi-gateway routing (Razorpay / Cashfree / Stripe) with automatic failover.',
      },
      {
        id: 'chk-4',
        number: '04',
        title: 'Server-Side Conversion API + Instant AWB Trigger',
        impactTag: '100% Attribution Accuracy',
        whyItMatters:
          'Fires deduplicated purchase events to GA4, Google Ads, and Meta CAPI while pushing the order to your WMS/Shiprocket in real time.',
        technicalSpec: 'Idempotent order webhook pipeline with automatic retry queue.',
      },
    ],
  },
];

/* ============================================================================
   MAIN E-COMMERCE DEVELOPMENT SERVICE PAGE COMPONENT
============================================================================ */
export interface EcommerceDevelopmentProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const EcommerceDevelopment: React.FC<EcommerceDevelopmentProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Helper to open Quote Modal */
  const triggerQuoteModal = (serviceName?: string) => {
    const targetService = serviceName || ecommerceDevService.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(targetService);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: targetService }));
    }
  };

  /* SEO Meta Title, Description & JSON-LD Structured Data */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'E-commerce Website Development Services — Shopify, WooCommerce & Custom Stores | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Custom e-commerce development for D2C brands, retailers, and B2B wholesalers. We build high-converting Shopify, WooCommerce, Headless Next.js, and custom online stores with UPI/global payments, ERP sync, and technical SEO.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  const jsonLdSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: ecommerceDevService.name,
      description: ecommerceDevService.description,
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      serviceType: 'E-commerce Website Development',
      areaServed: ['IN', 'US', 'GB', 'AE', 'CA', 'AU', 'SG'],
      url: 'https://webxcode.com/services/ecommerce-development',
    }),
    []
  );

  /* Section 1 State: Hero Dual-View (Shopper Storefront + Live Admin Console) */
  const [heroActiveView, setHeroActiveView] = useState<'split' | 'storefront' | 'admin'>('split');
  const [selectedHeroProductIdx, setSelectedHeroProductIdx] = useState<number>(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState<number>(1);
  const [adminOrders, setAdminOrders] = useState<AdminOrderRow[]>(INITIAL_ADMIN_ORDERS);
  const [simulatedRevenueInr, setSimulatedRevenueInr] = useState<number>(284690);
  const [simulatedOrderCount, setSimulatedOrderCount] = useState<number>(68);
  const [orderSimFlash, setOrderSimFlash] = useState<boolean>(false);

  const activeHeroProduct = HERO_SHOPPER_PRODUCTS[selectedHeroProductIdx];

  const handleSimulateOrder = () => {
    const newOrderNum = 4919 + (simulatedOrderCount - 68);
    const newRow: AdminOrderRow = {
      orderId: `#WX-${newOrderNum}`,
      customer: `Live Test Buyer · ${activeHeroProduct.variants[selectedVariantIdx] || 'Standard'}`,
      channel: 'Instant UPI / Express Checkout',
      payment: 'PAID',
      amountInr: activeHeroProduct.priceInr,
      fulfillment: 'Webhook Fired → Shiprocket AWB',
      isNew: true,
    };
    setAdminOrders((prev) => [newRow, ...prev.slice(0, 2)]);
    setSimulatedRevenueInr((prev) => prev + activeHeroProduct.priceInr);
    setSimulatedOrderCount((prev) => prev + 1);
    setOrderSimFlash(true);
    setTimeout(() => setOrderSimFlash(false), 900);
  };

  /* Section 2 State: Selected Store Blueprint */
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(STORE_BLUEPRINTS[0].id);
  const activeBlueprint = useMemo(
    () => STORE_BLUEPRINTS.find((b) => b.id === selectedBlueprintId) || STORE_BLUEPRINTS[0],
    [selectedBlueprintId]
  );

  /* Section 3 State: Selected Platform Architecture Tab */
  const [activePlatformKey, setActivePlatformKey] = useState<EcommercePlatformKey>('shopify');
  const activePlatform = useMemo(
    () =>
      PLATFORM_WORKBENCH_SPECS.find((p) => p.key === activePlatformKey) ||
      PLATFORM_WORKBENCH_SPECS[0],
    [activePlatformKey]
  );

  /* Section 4 State: Store Anatomy Layer + Active Hotspot */
  const [activeAnatomyKey, setActiveAnatomyKey] = useState<StoreAnatomyLayerKey>('pdp');
  const activeAnatomyLayer = useMemo(
    () =>
      STORE_ANATOMY_LAYERS.find((l) => l.key === activeAnatomyKey) || STORE_ANATOMY_LAYERS[1],
    [activeAnatomyKey]
  );
  const [activeHotspotId, setActiveHotspotId] = useState<string>(
    STORE_ANATOMY_LAYERS[1].hotspots[0].id
  );

  const handleSelectAnatomyLayer = (key: StoreAnatomyLayerKey) => {
    setActiveAnatomyKey(key);
    const found = STORE_ANATOMY_LAYERS.find((l) => l.key === key);
    if (found && found.hotspots[0]) {
      setActiveHotspotId(found.hotspots[0].id);
    }
  };

  const activeHotspotObj = useMemo(
    () =>
      activeAnatomyLayer.hotspots.find((h) => h.id === activeHotspotId) ||
      activeAnatomyLayer.hotspots[0],
    [activeAnatomyLayer, activeHotspotId]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: SPLIT STOREFRONT + ADMIN COMMAND CONSOLE (bg: #1e242e navy)
         Distinct from E-commerce industry page (live toast feed) and Website Dev (code editor)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-white/10">
        {/* Subtle Architectural Grid + Blue Radial Glow */}
        <div className="absolute -top-24 right-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none opacity-75" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb: Home / Services / E-commerce Development */}
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
                {ecommerceDevService.name}
              </li>
            </ol>
          </nav>

          {/* Main 12-Col Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Cols: Headline, Value Prop, CTAs, Engineering Metrics */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <ServiceIcon name={ecommerceDevService.icon} className="w-3.5 h-3.5 text-primary" />
                <span>E-COMMERCE ENGINEERING • SHOPIFY • WOOCOMMERCE • CUSTOM</span>
              </div>

              <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight">
                {ecommerceDevService.name} Built for{' '}
                <span className="text-primary">Speed, Checkout &amp; Scale</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                {ecommerceDevService.description} Whether you are launching a new D2C flagship,
                migrating from a slow legacy setup, or building a custom B2B wholesale portal, we
                engineer both sides of your business: a sub-2-second customer storefront and an
                automated operations backend.
              </p>

              {/* Best For Pills pulled from Services single source of truth */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-bold uppercase tracking-wider text-white/55 mr-1">
                  Engineered For:
                </span>
                {ecommerceDevService.bestFor.map((segment) => (
                  <span
                    key={segment}
                    className="px-3 py-1 rounded-full bg-white/[0.07] border border-white/15 text-[12px] font-semibold text-white/90"
                  >
                    {segment}
                  </span>
                ))}
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Free Store Architecture & Conversion Quote')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free Store Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#platform-architecture"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] transition-all"
                >
                  <span>Compare Platforms</span>
                </a>
              </div>

              {/* 4 Engineering Benchmark Stat Pills */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { val: '<1.8s', label: 'Mobile PDP Load (Target)' },
                  { val: ecommerceDevService.typicalTimeline, label: 'Typical Launch Sprint' },
                  { val: '99.9%', label: 'Checkout Uptime Arch.' },
                  { val: '100%', label: 'SEO-Safe Migration' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10"
                  >
                    <div className="text-[20px] sm:text-[23px] font-extrabold text-white tabular-nums leading-none">
                      {stat.val}
                    </div>
                    <div className="text-[11px] sm:text-[12px] font-medium text-white/70 mt-1.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 Cols: Interactive Dual-Plane Storefront + Admin Command Console */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-4 sm:p-5 shadow-2xl">
                {/* Console Top Bar with View Mode Switcher + SKU Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/85">
                      FULL-STACK COMMERCE SIMULATOR
                    </span>
                  </div>

                  {/* View Toggle: Split / Storefront / Admin */}
                  <div
                    className="inline-flex items-center rounded-full bg-navy p-1 border border-white/15"
                    role="tablist"
                    aria-label="Commerce simulator view mode"
                  >
                    {[
                      { id: 'split', label: 'Dual Split' },
                      { id: 'storefront', label: 'Front: Shopper PDP' },
                      { id: 'admin', label: 'Back: Ops & ERP' },
                    ].map((mode) => {
                      const active = heroActiveView === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() =>
                            setHeroActiveView(mode.id as 'split' | 'storefront' | 'admin')
                          }
                          className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            active
                              ? 'bg-primary text-white'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SKU Selector Strip */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/55 shrink-0">
                    TEST SKU:
                  </span>
                  {HERO_SHOPPER_PRODUCTS.map((prod, idx) => {
                    const isSelected = selectedHeroProductIdx === idx;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          setSelectedHeroProductIdx(idx);
                          setSelectedVariantIdx(0);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold whitespace-nowrap border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary/25 border-primary text-white'
                            : 'bg-white/[0.04] border-white/10 text-white/70 hover:text-white'
                        }`}
                      >
                        {prod.sku} · ₹{prod.priceInr.toLocaleString('en-IN')}
                      </button>
                    );
                  })}
                </div>

                {/* Plane 1: Customer-Facing High-Speed Storefront Card */}
                {(heroActiveView === 'split' || heroActiveView === 'storefront') && (
                  <div className="rounded-2xl bg-white text-navy p-4 sm:p-5 border border-navy-08 shadow-md">
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-navy-08">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-primary-50 text-primary font-mono text-[10px] font-extrabold uppercase">
                          LAYER 01 // CUSTOMER STOREFRONT
                        </span>
                        <span className="hidden sm:inline font-mono text-[10px] font-bold text-navy-50">
                          {activeHeroProduct.badge}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-extrabold text-primary">
                        LCP: 1.3s
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Product Thumbnail */}
                      <div className="sm:col-span-4 relative rounded-xl overflow-hidden bg-navy aspect-[4/3] sm:aspect-square border border-navy-08">
                        <img
                          src={activeHeroProduct.image}
                          alt={activeHeroProduct.name}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-navy/85 text-white font-mono text-[10px] font-bold">
                          {activeHeroProduct.stockCount} in stock
                        </span>
                      </div>

                      {/* Product Specs + Variant Picker + Simulate Checkout Trigger */}
                      <div className="sm:col-span-8">
                        <div className="text-[11px] font-bold text-primary uppercase tracking-wider">
                          {activeHeroProduct.category}
                        </div>
                        <h2 className="text-[16px] sm:text-[18px] font-extrabold text-navy leading-snug mt-0.5">
                          {activeHeroProduct.name}
                        </h2>

                        <div className="flex items-baseline gap-2.5 mt-1.5">
                          <span className="text-[20px] font-extrabold text-navy tabular-nums">
                            ₹{activeHeroProduct.priceInr.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[13px] font-semibold text-navy-50 line-through tabular-nums">
                            ₹{activeHeroProduct.compareAtInr.toLocaleString('en-IN')}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary text-[10px] font-extrabold">
                            incl. GST
                          </span>
                        </div>

                        {/* Variant Pills */}
                        <div className="mt-3">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-navy-60 mb-1.5">
                            Select Variant (Instant State Sync):
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {activeHeroProduct.variants.map((v, vIdx) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => setSelectedVariantIdx(vIdx)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                                  selectedVariantIdx === vIdx
                                    ? 'bg-navy text-white border-navy'
                                    : 'bg-primary-50/50 text-navy border-navy-15 hover:border-primary'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Test Checkout Button */}
                        <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                          <button
                            type="button"
                            onClick={handleSimulateOrder}
                            className="flex-1 py-2.5 px-4 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[12px] sm:text-[13px] inline-flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Simulate 1-Tap Checkout → Sync Backend</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Connector Arrow Between Storefront & Backend in Split Mode */}
                {heroActiveView === 'split' && (
                  <div className="my-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-primary/15 border border-primary/35 text-[11px] font-mono text-primary-100">
                    <span>WEBHOOK: order.created → Payment + Courier AWB + ERP Stock</span>
                    <span className="font-extrabold text-white">
                      {orderSimFlash ? '● SYNCING NOW…' : '● 42ms LATENCY'}
                    </span>
                  </div>
                )}

                {/* Plane 2: Merchant Admin & Operations Telemetry Panel */}
                {(heroActiveView === 'split' || heroActiveView === 'admin') && (
                  <div
                    className={`rounded-2xl bg-navy border p-4 transition-all ${
                      orderSimFlash
                        ? 'border-primary ring-2 ring-primary/40'
                        : 'border-white/15'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10">
                      <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary-100 font-mono text-[10px] font-extrabold uppercase">
                        LAYER 02 // MERCHANT OPS &amp; ERP PIPELINE
                      </span>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-white/70">
                          Orders Today:{' '}
                          <strong className="text-white tabular-nums">{simulatedOrderCount}</strong>
                        </span>
                        <span className="text-primary-100 font-bold tabular-nums">
                          GMV: ₹{simulatedRevenueInr.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Live Order & Fulfilment Rows */}
                    <div className="space-y-2" aria-live="polite">
                      {adminOrders.map((ord) => (
                        <div
                          key={ord.orderId}
                          className={`p-2.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] ${
                            ord.isNew
                              ? 'bg-primary/20 border-primary text-white'
                              : 'bg-white/[0.04] border-white/10 text-white/85'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="font-mono font-extrabold text-primary-100 shrink-0">
                              {ord.orderId}
                            </span>
                            <span className="font-semibold truncate">{ord.customer}</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="px-2 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-bold">
                              ₹{ord.amountInr.toLocaleString('en-IN')} · {ord.payment}
                            </span>
                            <span className="font-mono text-[10px] text-white/70 hidden md:inline">
                              {ord.fulfillment}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — STORE BLUEPRINTS WE BUILD (6 ARCHITECTURAL BLUEPRINT CARDS)
         (bg: #ffffff) — Distinct from E-commerce industry retail shelf
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                6 E-COMMERCE ARCHITECTURES
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                What Kind of Online Store Are You{' '}
                <span className="text-primary">Building or Scaling?</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              A 25-SKU D2C skincare brand, a 15,000-SKU distributor catalog, and a multi-vendor
              marketplace need completely different database and checkout architectures. Select a
              blueprint below to inspect how we engineer each one.
            </p>
          </div>

          {/* 6 Blueprint Selector Cards (3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STORE_BLUEPRINTS.map((bp) => {
              const isSelected = bp.id === selectedBlueprintId;
              return (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => setSelectedBlueprintId(bp.id)}
                  className={`text-left rounded-[22px] p-6 border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-navy text-white border-primary shadow-xl -translate-y-1'
                      : 'bg-white text-navy border-navy-08 hover:border-primary/50 hover:bg-primary-50/35 shadow-soft'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-extrabold uppercase tracking-wider ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {bp.numberCode}
                      </span>
                      <span
                        className={`font-mono text-[11px] font-bold ${
                          isSelected ? 'text-primary-100' : 'text-navy-60'
                        }`}
                      >
                        {bp.typicalTimeline}
                      </span>
                    </div>

                    <h3
                      className={`text-[20px] font-extrabold leading-snug ${
                        isSelected ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {bp.name}
                    </h3>

                    <p
                      className={`mt-2 text-[13px] sm:text-[14px] leading-relaxed ${
                        isSelected ? 'text-white/75' : 'text-navy-70'
                      }`}
                    >
                      {bp.subtitle}
                    </p>
                  </div>

                  <div
                    className={`mt-5 pt-4 border-t flex items-center justify-between text-[12px] font-bold ${
                      isSelected
                        ? 'border-white/15 text-primary-100'
                        : 'border-navy-08 text-primary'
                    }`}
                  >
                    <span>Stack: {bp.recommendedPlatform}</span>
                    <span className="inline-flex items-center gap-1">
                      <span>{isSelected ? 'Viewing Spec' : 'Inspect'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Selected Blueprint Specification Console */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBlueprint.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="mt-8 rounded-[24px] bg-primary-50/65 border-2 border-primary-100 p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 Cols: Overview + 4 Included Capabilities */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                      {activeBlueprint.numberCode} SPECIFICATION
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white border border-primary-100 text-navy text-[12px] font-bold">
                      Recommended: {activeBlueprint.recommendedPlatform}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-bold">
                      {activeBlueprint.typicalTimeline}
                    </span>
                  </div>

                  <h3 className="text-[24px] sm:text-[30px] font-extrabold text-navy leading-tight">
                    {activeBlueprint.name}
                  </h3>
                  <p className="mt-2.5 text-[15px] sm:text-[16px] text-navy-70 leading-[1.7]">
                    {activeBlueprint.description}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-navy-08 text-[13px] font-semibold text-navy">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>Best Suited For:</strong> {activeBlueprint.bestFor}
                    </span>
                  </div>

                  <div className="mt-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-3">
                      Core Storefront &amp; Checkout Capabilities
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeBlueprint.keyFeatures.map((feat) => (
                        <div
                          key={feat}
                          className="p-3.5 rounded-xl bg-white border border-navy-08 flex items-start gap-2.5 shadow-2xs"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </div>
                          <span className="text-[13px] sm:text-[14px] font-semibold text-navy leading-snug">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: 3-Layer Stack Diagram + Quote Trigger */}
                <div className="lg:col-span-5 rounded-2xl bg-navy text-white p-6 border border-navy shadow-xl">
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                      3-TIER ARCHITECTURE DIAGRAM
                    </span>
                    <Layers className="w-4 h-4 text-primary" />
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10">
                      <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                        01. FRONTEND STOREFRONT LAYER
                      </div>
                      <div className="text-[14px] font-bold text-white mt-0.5">
                        {activeBlueprint.layers.storefront}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-primary/20 border border-primary/40">
                      <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                        02. CART, PRICING &amp; CHECKOUT ENGINE
                      </div>
                      <div className="text-[14px] font-bold text-white mt-0.5">
                        {activeBlueprint.layers.cartCheckout}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10">
                      <div className="font-mono text-[10px] font-bold uppercase text-primary-100">
                        03. FULFILMENT, ERP &amp; TAX SYNC
                      </div>
                      <div className="text-[14px] font-bold text-white mt-0.5">
                        {activeBlueprint.layers.opsSync}
                      </div>
                    </div>
                  </div>

                  {/* Engineering Highlights */}
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                    {activeBlueprint.architectureSpecs.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-2 text-[12px] font-medium text-white/85"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(`E-commerce Blueprint: ${activeBlueprint.name}`)
                    }
                    className="mt-6 w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                  >
                    <span>Scope a {activeBlueprint.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — PLATFORM ARCHITECTURE WORKBENCH (SHOPIFY vs WOOCOMMERCE vs HEADLESS vs CUSTOM)
         (bg: #f0f7fd) — Technical Deep-Dive Workbench (distinct from 3-question quiz)
      ====================================================================== */}
      <section
        id="platform-architecture"
        className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              PLATFORM ARCHITECTURE MATRIX
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Shopify, WooCommerce, Headless or Custom:{' '}
              <span className="text-primary">An Honest Engineering Breakdown</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              We are platform-agnostic engineers, not resellers locked to one tool. Switch between
              the four architectures below to compare stack layers, ownership models, and real
              trade-offs.
            </p>
          </div>

          {/* 4 Platform Switcher Tabs */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
            role="tablist"
            aria-label="E-commerce Platform Architectures"
          >
            {PLATFORM_WORKBENCH_SPECS.map((plat) => {
              const isSelected = plat.key === activePlatformKey;
              return (
                <button
                  key={plat.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePlatformKey(plat.key)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-lg'
                      : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span
                      className={`font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-primary-50 text-primary'
                      }`}
                    >
                      {plat.badge}
                    </span>
                  </div>
                  <div className="text-[16px] sm:text-[18px] font-extrabold mt-1">
                    {plat.shortTab}
                  </div>
                  <div
                    className={`text-[12px] mt-0.5 ${
                      isSelected ? 'text-white/70' : 'text-navy-60'
                    }`}
                  >
                    Launch: {plat.launchTimeline}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Platform Deep-Dive Workbench Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform.key}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-[24px] bg-white border border-navy-15 shadow-soft overflow-hidden"
            >
              {/* Top Spec Strip */}
              <div className="bg-navy text-white px-6 sm:px-8 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                      {activePlatform.badge}
                    </span>
                    <span className="font-mono text-[12px] text-white/70">
                      SKU Ceiling: {activePlatform.skuCapacity}
                    </span>
                  </div>
                  <h3 className="text-[22px] sm:text-[26px] font-extrabold text-white mt-1">
                    {activePlatform.name}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-[12px]">
                    <span className="text-white/60 block font-mono text-[10px] uppercase">
                      Typical Build Time
                    </span>
                    <strong className="text-white font-extrabold">
                      {activePlatform.launchTimeline}
                    </strong>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/[0.06] border border-white/10 text-[12px]">
                    <span className="text-white/60 block font-mono text-[10px] uppercase">
                      Ideal Growth Stage
                    </span>
                    <strong className="text-primary-100 font-extrabold">
                      {activePlatform.idealStage}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Workbench Body: 12-Col Grid */}
              <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left 7 Cols: Strengths, Honest Trade-Offs & When to Choose */}
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-[15px] sm:text-[16px] text-navy-70 leading-[1.7]">
                    {activePlatform.tagline}
                  </p>

                  {/* 4 Engineering Strengths */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-3">
                      Why Brands Choose {activePlatform.shortTab}
                    </div>
                    <div className="space-y-2.5">
                      {activePlatform.strengths.map((str) => (
                        <div
                          key={str}
                          className="p-3.5 rounded-xl bg-primary-50/50 border border-primary-100 flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </div>
                          <span className="text-[13px] sm:text-[14px] font-semibold text-navy leading-snug">
                            {str}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Honest Trade-offs to Consider */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-navy/[0.03] border border-navy-15">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                      Architectural Trade-Offs to Keep in Mind
                    </div>
                    <ul className="space-y-2">
                      {activePlatform.tradeoffs.map((tr) => (
                        <li
                          key={tr}
                          className="flex items-start gap-2.5 text-[13px] font-medium text-navy-70"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-navy-60 shrink-0 mt-2" />
                          <span>{tr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Recommendation Callout */}
                  <div className="p-4 rounded-2xl bg-primary-50 border border-primary-100 text-[13px] sm:text-[14px] text-navy leading-relaxed">
                    <strong className="font-extrabold text-primary">Architect’s Verdict: </strong>
                    {activePlatform.whenToChoose}
                  </div>
                </div>

                {/* Right 5 Cols: Reference Tech Stack + 4 Benchmark Bars */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                  <div className="rounded-2xl border border-navy-15 p-5 sm:p-6 bg-white">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3">
                      PRODUCTION STACK SPECIFICATION
                    </div>
                    <div className="space-y-2.5 mb-6">
                      {activePlatform.architectureStack.map((layer, idx) => (
                        <div
                          key={layer}
                          className="p-3 rounded-xl bg-primary-50/40 border border-navy-08 flex items-center gap-3"
                        >
                          <span className="w-6 h-6 rounded-lg bg-navy text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                            0{idx + 1}
                          </span>
                          <span className="text-[13px] font-bold text-navy">{layer}</span>
                        </div>
                      ))}
                    </div>

                    {/* 4 Scorecard Bars */}
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-3 pt-4 border-t border-navy-08">
                      ENGINEERING SCORECARD
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          label: 'Speed to Market',
                          val: activePlatform.metrics.timeToMarket,
                        },
                        {
                          label: 'UI & Checkout Customization',
                          val: activePlatform.metrics.customizationFreedom,
                        },
                        {
                          label: 'High-Traffic Scalability',
                          val: activePlatform.metrics.scalabilityCeiling,
                        },
                        {
                          label: 'Day-to-Day Ops Simplicity',
                          val: activePlatform.metrics.maintenanceEase,
                        },
                      ].map((bar) => (
                        <div key={bar.label}>
                          <div className="flex items-center justify-between text-[12px] font-bold text-navy mb-1">
                            <span>{bar.label}</span>
                            <span className="font-mono text-primary">{bar.val}/100</span>
                          </div>
                          <div className="h-2 rounded-full bg-primary-50 overflow-hidden">
                            <div
                              style={{ width: `${bar.val}%` }}
                              className="h-full rounded-full bg-primary transition-all duration-300"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Box */}
                  <div className="p-5 rounded-2xl bg-navy text-white flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[14px] font-extrabold text-white">
                        Want a {activePlatform.shortTab} build or migration?
                      </div>
                      <div className="text-[12px] text-white/70">
                        Get a fixed-scope architecture &amp; cost breakdown.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        triggerQuoteModal(`Platform Consultation: ${activePlatform.name}`)
                      }
                      className="px-5 py-3 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                    >
                      <span>Request Quote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — ANATOMY OF A HIGH-CONVERTING STORE (INTERACTIVE 4-STAGE FUNNEL INSPECTOR)
         (bg: #ffffff) — Inspect Collection, PDP, Slide-Out Cart Drawer & 1-Page Checkout
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                CONVERSION ARCHITECTURE INSPECTOR
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Inside the 4 Screens That Decide{' '}
                <span className="text-primary">Your Store’s Conversion Rate</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              Traffic is wasted if shoppers get stuck on slow filters, unclear delivery dates, or
              clunky multi-step checkouts. Click through all 4 buying stages below and inspect the
              numbered conversion hotspots we build into every store.
            </p>
          </div>

          {/* 4-Stage Funnel Stepper Tabs */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
            role="tablist"
            aria-label="Store Conversion Funnel Stages"
          >
            {STORE_ANATOMY_LAYERS.map((stage) => {
              const isSelected = stage.key === activeAnatomyKey;
              return (
                <button
                  key={stage.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectAnatomyLayer(stage.key)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-primary-50/45 text-navy border-navy-08 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-navy text-white'
                          : 'bg-white text-primary border border-primary-100'
                      }`}
                    >
                      {stage.stepNumber}
                    </span>
                    <div>
                      <div className="text-[14px] sm:text-[15px] font-extrabold leading-tight">
                        {stage.tabLabel}
                      </div>
                      <div
                        className={`text-[11px] font-semibold mt-0.5 ${
                          isSelected ? 'text-white/85' : 'text-navy-60'
                        }`}
                      >
                        4 Annotated Specs
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-white' : 'text-navy-40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Wireframe Blueprint + Hotspot Inspector */}
          <div className="rounded-[24px] border-2 border-navy-15 bg-white shadow-soft overflow-hidden">
            {/* Browser Bar */}
            <div className="bg-navy text-white px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="ml-2 px-3 py-1 rounded-lg bg-white/[0.07] font-mono text-[11px] text-white/85">
                  https://{activeAnatomyLayer.screenUrl}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/25 border border-primary/40 font-mono text-[11px] font-bold text-primary-100">
                {activeAnatomyLayer.benchmarkLift}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left 7 Cols: Interactive Annotated Screen Blueprint */}
              <div className="lg:col-span-7 p-6 sm:p-8 bg-primary-50/40 border-b lg:border-b-0 lg:border-r border-navy-08">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      STAGE {activeAnatomyLayer.stepNumber} // {activeAnatomyLayer.tabLabel}
                    </span>
                    <h3 className="text-[20px] sm:text-[24px] font-extrabold text-navy">
                      {activeAnatomyLayer.screenTitle}
                    </h3>
                  </div>
                  <span className="text-[12px] font-bold text-navy-60">
                    Click any numbered node (01–04)
                  </span>
                </div>

                <p className="text-[14px] text-navy-70 leading-relaxed mb-6">
                  {activeAnatomyLayer.summary}
                </p>

                {/* 4 Clickable Architectural Hotspot Nodes inside the Wireframe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeAnatomyLayer.hotspots.map((spot) => {
                    const isSpotActive = spot.id === activeHotspotObj.id;
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        onClick={() => setActiveHotspotId(spot.id)}
                        className={`text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSpotActive
                            ? 'bg-navy text-white border-primary shadow-lg -translate-y-0.5'
                            : 'bg-white text-navy border-navy-15 hover:border-primary'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span
                              className={`w-7 h-7 rounded-full font-mono text-[12px] font-extrabold flex items-center justify-center ${
                                isSpotActive
                                  ? 'bg-primary text-white'
                                  : 'bg-primary-50 text-primary'
                              }`}
                            >
                              {spot.number}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold ${
                                isSpotActive
                                  ? 'bg-white/15 text-primary-100'
                                  : 'bg-primary-50 text-primary'
                              }`}
                            >
                              {spot.impactTag}
                            </span>
                          </div>

                          <h4
                            className={`text-[15px] font-extrabold leading-snug ${
                              isSpotActive ? 'text-white' : 'text-navy'
                            }`}
                          >
                            {spot.title}
                          </h4>
                        </div>

                        <div
                          className={`mt-3 pt-2.5 border-t text-[11px] font-bold inline-flex items-center justify-between ${
                            isSpotActive
                              ? 'border-white/15 text-primary-100'
                              : 'border-navy-08 text-primary'
                          }`}
                        >
                          <span>{isSpotActive ? 'Active in Inspector' : 'Inspect Spec'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right 5 Cols: Deep-Dive Engineering & CRO Spec Panel for Selected Hotspot */}
              <div className="lg:col-span-5 p-6 sm:p-8 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                      HOTSPOT #{activeHotspotObj.number} SPECIFICATION
                    </span>
                    <span className="font-mono text-[12px] font-bold text-primary">
                      {activeHotspotObj.impactTag}
                    </span>
                  </div>

                  <h4 className="mt-5 text-[20px] sm:text-[22px] font-extrabold text-navy leading-snug">
                    {activeHotspotObj.title}
                  </h4>

                  <div className="mt-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-primary-50/60 border border-primary-100">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                        Why It Lifts Conversion &amp; Revenue
                      </div>
                      <p className="text-[14px] text-navy leading-relaxed">
                        {activeHotspotObj.whyItMatters}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-navy text-white">
                      <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100 mb-1">
                        How WebXCode Engineers It
                      </div>
                      <p className="text-[13px] sm:text-[14px] text-white/85 leading-relaxed">
                        {activeHotspotObj.technicalSpec}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-navy-08 bg-white text-[13px] text-navy-70">
                      <strong className="text-navy">Stage Objective: </strong>
                      {activeAnatomyLayer.conversionGoal}
                    </div>
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      triggerQuoteModal(
                        `Free Store UX & Checkout Scan (${activeAnatomyLayer.tabLabel})`
                      )
                    }
                    className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                  >
                    <span>Get a Free Store UX &amp; Speed Scan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Platform & Store Services Strip */}
          <div className="mt-10 pt-8 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[13px] font-extrabold text-navy">
              Related Web &amp; Commerce Services:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/services/wordpress-shopify-development"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/70 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
              >
                <Layers className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>WordPress &amp; Shopify Development</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href="/services/seo-services"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/70 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
              >
                <Search className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>SEO Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href="/services/performance-marketing"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/70 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
              >
                <TrendingUp className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>Performance Marketing</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href="/services/conversion-rate-optimization"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/70 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
              >
                <Activity className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>Conversion Rate Optimization</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href="/services/website-development"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/70 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
              >
                <Globe className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>Website Development</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href="/services/mobile-app-development"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/70 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
              >
                <Smartphone className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>Mobile App Development</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href="/services/email-marketing"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/70 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
              >
                <Sparkles className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>Email Marketing &amp; Retention</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              </Link>
              <Link
                href="/services/branding-logo-design"
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50/70 hover:bg-navy border border-primary-100 hover:border-navy text-navy hover:text-white text-[13px] font-bold transition-all"
              >
                <Sparkles className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>Branding &amp; Logo Design</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EcommerceDevelopment;
