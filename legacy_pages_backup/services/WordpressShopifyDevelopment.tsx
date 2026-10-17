import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
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
  Cpu,
  Server,
  Eye,
  Activity,
  FileText,
  ShoppingBag,
  ShoppingCart,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Plus,
  Wrench,
  Code2,
  Compass,
  RotateCcw,
} from 'lucide-react';
import { services, ServiceIcon } from '../Services';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT WORDPRESS-SHOPIFY-DEVELOPMENT FROM ../Services
============================================================================ */
const wpShopifyService =
  services.find((item) => item.slug === 'wordpress-shopify-development') || services[5];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS (Top of file — single source of truth)
============================================================================ */

/* Section 1: Hero — Two Worlds Split-Screen Data */
export type HeroWorldKey = 'wordpress' | 'shopify';

export interface HeroWorldSpec {
  key: HeroWorldKey;
  label: string;
  versionTag: string;
  statusChip: string;
  floatingStrengths: [string, string, string];
  previewUrl: string;
  headline: string;
  subline: string;
  metrics: [
    { label: string; value: string },
    { label: string; value: string },
  ];
}

const HERO_WORLDS: Record<HeroWorldKey, HeroWorldSpec> = {
  wordpress: {
    key: 'wordpress',
    label: 'WordPress',
    versionTag: 'WP 6.7 • CUSTOM BLOCK THEME',
    statusChip: 'Published · 2 min ago',
    floatingStrengths: ['Content-rich', 'SEO-friendly', 'Flexible'],
    previewUrl: 'acmeconsulting.com/insights/enterprise-growth',
    headline: 'Custom Gutenberg Block Architecture & High-Speed Corporate Publishing',
    subline:
      'Zero bloated page builders. Clean PHP/Twig & React blocks with native ACF fields, Rank Math schema, and sub-1.5s Core Web Vitals.',
    metrics: [
      { label: 'Core Web Vitals', value: '98 / 100 Pass' },
      { label: 'Editor Workflow', value: '100% Visual Blocks' },
    ],
  },
  shopify: {
    key: 'shopify',
    label: 'Shopify',
    versionTag: 'ONLINE STORE 2.0 • LIQUID + JSON',
    statusChip: 'Order received · #WX-2094',
    floatingStrengths: ['Store-ready', 'Secure checkout', 'Scales easily'],
    previewUrl: 'store.aurorabotanicals.com/products/barrier-serum',
    headline: 'High-Converting Online Store 2.0 Themes, Shopify Plus & Custom Apps',
    subline:
      'Modular JSON sections on every template, slide-out upsell drawers, Shopify Markets multi-currency, and 1-page checkout extensibility.',
    metrics: [
      { label: 'Checkout Speed', value: '1-Tap Shop / UPI' },
      { label: 'Theme Sections', value: 'Drag & Drop 2.0' },
    ],
  },
};

/* Section 2: Fork in the Road — 3 Yes/No Signpost Questions & 3 Destinations */
export interface RoadQuestionItem {
  id: number;
  signpostCode: string;
  question: string;
  helperText: string;
}

const ROAD_QUESTIONS: RoadQuestionItem[] = [
  {
    id: 1,
    signpostCode: 'SIGNPOST 01 • PRIMARY GOAL',
    question: 'Is selling products your main goal?',
    helperText:
      'Think physical or digital catalog, cart, variant swatches, inventory, and repeat orders vs. lead generation and publishing.',
  },
  {
    id: 2,
    signpostCode: 'SIGNPOST 02 • CONTENT & STRUCTURE',
    question: 'Do you need lots of content, blogs or custom pages?',
    helperText:
      'Think multi-level resource hubs, custom post types, editorial workflows, case study libraries, or complex custom fields.',
  },
  {
    id: 3,
    signpostCode: 'SIGNPOST 03 • HOSTING & OPERATIONS',
    question: 'Do you want hosting, security and updates fully managed for you?',
    helperText:
      'Shopify handles servers, PCI compliance, and core updates automatically; WordPress gives you full server & database ownership.',
  },
];

export type RoadDestinationKey = 'wordpress' | 'shopify' | 'woocommerce';

export interface RoadDestinationSpec {
  key: RoadDestinationKey;
  signTitle: string;
  subtitle: string;
  routeBadge: string;
  whyItFits: [string, string, string];
  goodToKnow: [string, string];
  recommendedTimeline: string;
}

const ROAD_DESTINATIONS: Record<RoadDestinationKey, RoadDestinationSpec> = {
  wordpress: {
    key: 'wordpress',
    signTitle: 'WordPress',
    subtitle: 'Custom Block Theme + ACF Pro + High-Speed Managed Cloud',
    routeBadge: 'LEFT FORK • CONTENT & LEAD ENGINE',
    whyItFits: [
      'Unmatched freedom for custom page layouts, resource hubs, blogs, and multi-language SEO',
      '100% ownership of your source code, MySQL database, and hosting environment with zero platform transaction fees',
      'Custom Gutenberg blocks let your marketing team build new landing pages without touching code or breaking layouts',
    ],
    goodToKnow: [
      'Requires quality managed hosting (Kinsta / WP Engine / Cloudways) and scheduled plugin security updates',
      'Best built with a custom lightweight theme rather than heavy multipurpose templates',
    ],
    recommendedTimeline: '3–5 weeks for a custom WordPress build',
  },
  woocommerce: {
    key: 'woocommerce',
    signTitle: 'WooCommerce (Both)',
    subtitle: 'WordPress Publishing Power + Full Custom Online Store',
    routeBadge: 'MIDDLE PATH • CONTENT + COMMERCE HYBRID',
    whyItFits: [
      'Combines a full e-commerce store with WordPress’s world-class editorial, blog, and SEO architecture under one domain',
      'Complete control over custom checkout fields, B2B wholesale pricing rules, GST invoicing, and Indian/global gateways',
      'Zero recurring platform revenue-share fees—you only pay your payment gateway processing rates',
    ],
    goodToKnow: [
      'Needs High-Performance Order Storage (HPOS), Redis object caching, and tuned cloud hosting for large catalogs',
      'Ideal when content marketing and custom checkout rules are equally critical to your store',
    ],
    recommendedTimeline: '4–7 weeks for a custom WooCommerce store',
  },
  shopify: {
    key: 'shopify',
    signTitle: 'Shopify',
    subtitle: 'Online Store 2.0 Custom Theme / Shopify Plus',
    routeBadge: 'RIGHT FORK • PURE E-COMMERCE ENGINE',
    whyItFits: [
      'Fully managed cloud hosting, 99.99% uptime, automatic security patches, and level-1 PCI-DSS checkout out of the box',
      'World’s highest-converting checkout with native Shop Pay, Apple Pay, Razorpay/Cashfree UPI, and multi-currency Markets',
      'Online Store 2.0 JSON templates let your merchandising team launch product drops and bundles in minutes',
    ],
    goodToKnow: [
      'Monthly subscription plan + app fees apply, and URL structure (`/products/`, `/collections/`) follows Shopify conventions',
      'Checkout layout customization beyond branding requires Shopify Plus Checkout Extensibility',
    ],
    recommendedTimeline: '3–6 weeks for a custom Shopify 2.0 store',
  },
};

/* Section 3: WordPress Services — Block Editor Stack (8 Blocks) */
export interface WpServiceBlock {
  id: string;
  blockCode: string;
  blockTypeLabel: string;
  title: string;
  oneLineDesc: string;
  tags: [string, string, string];
  deliverables: [string, string, string];
  typicalTime: string;
  fileHint: string;
}

const WP_EDITOR_BLOCKS: WpServiceBlock[] = [
  {
    id: 'wp-block-1',
    blockCode: 'core/custom-theme',
    blockTypeLabel: 'THEME ARCHITECTURE',
    title: 'Custom Theme Development',
    oneLineDesc:
      'Bespoke, ultra-lightweight WordPress themes coded from scratch in clean PHP, theme.json, and modern CSS—zero bloat.',
    tags: ['theme.json', 'Zero Bloat', '95+ PageSpeed'],
    deliverables: [
      'Custom responsive WordPress theme built from Figma with strict design tokens in `theme.json`',
      'Semantic HTML5 structure, native lazy-loading, and <50KB frontend CSS/JS footprint',
      'Full staging QA, cross-browser verification, and clean Git version-controlled deployment',
    ],
    typicalTime: '3–5 weeks',
    fileHint: 'wp-content/themes/webxcode-custom/theme.json',
  },
  {
    id: 'wp-block-2',
    blockCode: 'acf/gutenberg-blocks',
    blockTypeLabel: 'MODULAR EDITOR',
    title: 'Custom Gutenberg Blocks & Page Builder Setups',
    oneLineDesc:
      'Tailor-made Gutenberg blocks and clean ACF field groups so your team can assemble pages without breaking the design.',
    tags: ['Gutenberg Native', 'ACF Pro', 'Locked Guardrails'],
    deliverables: [
      '15–25 custom reusable Gutenberg blocks with live visual preview inside the WordPress editor',
      'Structured Advanced Custom Fields (ACF Pro) with locked typography and spacing guardrails',
      'Cleanup or conversion of slow legacy Elementor/WPBakery pages into fast native blocks',
    ],
    typicalTime: '2–4 weeks',
    fileHint: 'blocks/hero-showcase/block.json • ACF v6.3',
  },
  {
    id: 'wp-block-3',
    blockCode: 'wx/custom-plugin',
    blockTypeLabel: 'EXTENSIBILITY & APIS',
    title: 'Plugin Development & Customization',
    oneLineDesc:
      'Custom-engineered WordPress plugins, REST API endpoints, and third-party CRM/ERP webhooks built following WordPress VIP standards.',
    tags: ['REST API', 'Custom Post Types', 'CRM Sync'],
    deliverables: [
      'Custom plugin architecture using nonces, prepared SQL queries, and strict capability checks',
      'Two-way webhook sync with HubSpot, Zoho, Salesforce, Razorpay, or internal ERPs',
      'Safe customization of existing plugins using hooks and filters so future updates never overwrite your code',
    ],
    typicalTime: '2–5 weeks',
    fileHint: 'wp-content/plugins/wx-crm-bridge/wx-crm-bridge.php',
  },
  {
    id: 'wp-block-4',
    blockCode: 'woo/hpos-storefront',
    blockTypeLabel: 'WORDPRESS COMMERCE',
    title: 'WooCommerce Stores',
    oneLineDesc:
      'High-converting WooCommerce stores with High-Performance Order Storage (HPOS), fast AJAX filters, and custom checkout flows.',
    tags: ['WooCommerce HPOS', 'UPI & Stripe', 'GST Invoicing'],
    deliverables: [
      'Custom WooCommerce product, collection, slide-out cart drawer, and 1-page checkout templates',
      'HPOS database table enablement + Redis object caching for instant catalog filtering',
      'Payment gateway (Razorpay, Stripe, PayPal), Shiprocket/Delhivery, and automated PDF tax invoices',
    ],
    typicalTime: '4–6 weeks',
    fileHint: 'woocommerce/single-product.php • HPOS Enabled',
  },
  {
    id: 'wp-block-5',
    blockCode: 'perf/cwv-tuning',
    blockTypeLabel: 'CORE WEB VITALS',
    title: 'Speed Optimization',
    oneLineDesc:
      'Turn sluggish 6-second WordPress sites into sub-1.8s performers that pass Google Core Web Vitals on mobile and desktop.',
    tags: ['LCP < 1.8s', 'Redis Cache', 'Asset Dequeue'],
    deliverables: [
      'Per-template script/style dequeuing to stop unused plugin CSS & JS from loading on every page',
      'WebP/AVIF next-gen image conversion, critical CSS inlining, and font preloading',
      'Cloudflare CDN edge caching, Redis object cache, and database autoload query optimization',
    ],
    typicalTime: '5–10 business days',
    fileHint: 'functions.php • wp_dequeue_script() • LCP 1.4s',
  },
  {
    id: 'wp-block-6',
    blockCode: 'sec/hardening-shield',
    blockTypeLabel: 'SECURITY & CLEANUP',
    title: 'Security Hardening & Malware Cleanup',
    oneLineDesc:
      'Emergency malware removal, backdoor scrubbing, WAF firewall rules, and deep WordPress core hardening.',
    tags: ['Malware Scrub', 'WAF Firewall', '2FA & XML-RPC Off'],
    deliverables: [
      'Complete file-system & database malware cleanup with Google Search Console blacklist removal',
      'Disabling XML-RPC, locking file permissions, custom login URLs, and hardware/app 2FA enforcement',
      'Cloudflare WAF + Wordfence firewall rules and automated vulnerability scan alerts',
    ],
    typicalTime: '24–72 hours (Emergency) / 1 week',
    fileHint: 'wp-config.php • DISALLOW_FILE_EDIT = true',
  },
  {
    id: 'wp-block-7',
    blockCode: 'mig/zero-downtime',
    blockTypeLabel: 'PLATFORM MIGRATION',
    title: 'Migration & Redesign',
    oneLineDesc:
      'Seamless redesigns and migrations from Wix, Squarespace, Webflow, Drupal, or old WordPress themes with zero SEO traffic loss.',
    tags: ['301 Redirect Map', 'Zero Downtime', 'SEO Preserved'],
    deliverables: [
      'Automated migration of all posts, pages, custom fields, media library, and user accounts',
      '1:1 URL redirect mapping (`301` rules), canonical tag verification, and Yoast/Rank Math meta transfer',
      'Parallel staging cutover with zero downtime and post-launch Search Console crawl monitoring',
    ],
    typicalTime: '3–5 weeks',
    fileHint: 'redirects-301.conf • 100% URL Equity Retained',
  },
  {
    id: 'wp-block-8',
    blockCode: 'ops/care-plan',
    blockTypeLabel: 'MANAGED CARE SLA',
    title: 'WordPress Maintenance',
    oneLineDesc:
      'Proactive monthly care: staging-tested plugin updates, daily off-site cloud backups, 24/7 uptime checks, and priority dev hours.',
    tags: ['Daily Backups', 'Visual Regression', 'Priority SLA'],
    deliverables: [
      'Weekly WordPress core, PHP, and plugin updates tested on staging before live push',
      'Daily encrypted off-site backups (AWS S3) with 1-click rollback guarantee',
      'Monthly Core Web Vitals check, security report, and dedicated hours for content/layout updates',
    ],
    typicalTime: 'Ongoing monthly plan',
    fileHint: 'cron/daily-backup-s3.sh • 99.98% Uptime',
  },
];

/* Section 4: Shopify Services — Theme Customizer (8 Sections) */
export interface ShopifyCustomizerItem {
  id: string;
  sectionCode: string;
  sidebarTitle: string;
  badge: string;
  previewHighlightArea: 'theme-hero' | 'custom-sections' | 'app-drawer' | 'plus-checkout' | 'migration-map' | 'speed-meter' | 'multi-market' | 'care-monitor';
  previewCaption: string;
  previewUrl: string;
  description: string;
  deliverables: [string, string, string];
  typicalTimeline: string;
}

const SHOPIFY_CUSTOMIZER_SECTIONS: ShopifyCustomizerItem[] = [
  {
    id: 'shp-1',
    sectionCode: 'OS 2.0 • LIQUID + JSON',
    sidebarTitle: 'Custom Shopify Theme (Online Store 2.0)',
    badge: 'MOST POPULAR',
    previewHighlightArea: 'theme-hero',
    previewCaption:
      'Highlighting bespoke Online Store 2.0 JSON template with modular drag-and-drop sections, metaobject dynamic bindings, and sub-1.6s LCP.',
    previewUrl: 'sections/featured-product-os20.liquid',
    description:
      'We design and code bespoke Shopify Online Store 2.0 themes from scratch—giving your brand a distinctive storefront with drag-and-drop sections on every page.',
    deliverables: [
      'Custom Liquid + JSON schema templates for Home, Collection, PDP, Bundle, and Story pages',
      'Dynamic Shopify Metaobjects & Metafields for ingredient tabs, size guides, and lookbooks',
      'Mobile-first slide-out AJAX cart drawer with free-shipping progress bar and in-cart upsells',
    ],
    typicalTimeline: '4–6 weeks',
  },
  {
    id: 'shp-2',
    sectionCode: 'SECTIONS & CRO UX',
    sidebarTitle: 'Theme Customization',
    badge: 'FAST TURNAROUND',
    previewHighlightArea: 'custom-sections',
    previewCaption:
      'Highlighting custom variant swatches, sticky mobile Buy bar, and bundle builder injected cleanly into your existing Dawn or prestige theme.',
    previewUrl: 'snippets/custom-bundle-builder.liquid',
    description:
      'Already have a Shopify store? We upgrade your current theme with high-converting custom sections, Mega Menus, bundle builders, and PDP enhancements.',
    deliverables: [
      'Custom Shopify 2.0 sections (Shop the Look, Mix-and-Match Bundles, Before/After Sliders)',
      'Instant color/image variant swatches, size predictor modals, and sticky mobile Add-to-Bag bar',
      'Clean Git-branched Liquid & Vanilla JS code without installing 5 slow third-party apps',
    ],
    typicalTimeline: '1–3 weeks',
  },
  {
    id: 'shp-3',
    sectionCode: 'GRAPHQL + WEBHOOKS',
    sidebarTitle: 'Shopify App Setup & Custom Apps',
    badge: 'CUSTOM APPS',
    previewHighlightArea: 'app-drawer',
    previewCaption:
      'Highlighting custom Remix/Node.js Shopify App extension syncing live ERP inventory, custom pincode delivery ETAs, and loyalty rules.',
    previewUrl: 'extensions/theme-app-extension/blocks/eta-checker.liquid',
    description:
      'We configure best-in-class public apps cleanly via Theme App Extensions and engineer private custom Shopify apps using GraphQL Admin & Storefront APIs.',
    deliverables: [
      'Private custom Shopify apps (Remix / Node.js) for ERP, WMS, Zoho, SAP, or custom pricing logic',
      'App audit & replacement of heavy script-tag apps with native App Embed blocks',
      ' Setup of Klaviyo, Recharge subscriptions, Judge.me reviews, and WhatsApp order flows',
    ],
    typicalTimeline: '2–5 weeks',
  },
  {
    id: 'shp-4',
    sectionCode: 'ENTERPRISE COMMERCE',
    sidebarTitle: 'Shopify Plus (Checkout, B2B, Automation)',
    badge: 'SHOPIFY PLUS',
    previewHighlightArea: 'plus-checkout',
    previewCaption:
      'Highlighting Shopify Plus Checkout UI Extension with custom gift message, GST tax ID field, tiered discount Functions, and B2B company login.',
    previewUrl: 'extensions/checkout-ui/src/Checkout.tsx',
    description:
      'Unlock the full power of Shopify Plus with custom Checkout UI Extensions, Shopify Functions (custom discounts/shipping rules), B2B wholesale portals, and Shopify Flow.',
    deliverables: [
      'Checkout Extensibility UI components (upsells, delivery date pickers, GST/tax fields, trust badges)',
      'Custom Shopify Functions (Rust/Wasm) for tiered volume discounts, VIP pricing, and payment hiding',
      'Shopify Plus B2B company profiles, net payment terms, wholesale price lists, and Shopify Flow automation',
    ],
    typicalTimeline: '4–8 weeks',
  },
  {
    id: 'shp-5',
    sectionCode: 'ZERO-LOSS CUTOVER',
    sidebarTitle: 'Store Setup & Migration',
    badge: 'SEO SAFE',
    previewHighlightArea: 'migration-map',
    previewCaption:
      'Highlighting automated SKU, customer, order history, and 301 SEO redirect pipeline migrating from WooCommerce / Magento to Shopify.',
    previewUrl: 'migrations/url-redirects-301.csv • 100% Verified',
    description:
      'Move from WooCommerce, Magento, Wix, or custom platforms to Shopify without losing a single product, customer record, or Google search ranking.',
    deliverables: [
      'Full migration of products, variants, images, customer history, orders, and gift cards/coupons',
      'Complete 301 URL redirect mapping for legacy product and category URLs to protect organic traffic',
      'Payment gateway, shipping zones, tax/GST rules, and analytics pixel (GA4 + Meta CAPI) setup',
    ],
    typicalTimeline: '3–6 weeks',
  },
  {
    id: 'shp-6',
    sectionCode: 'CORE WEB VITALS',
    sidebarTitle: 'Speed Optimization',
    badge: 'SUB-2S LOAD',
    previewHighlightArea: 'speed-meter',
    previewCaption:
      'Highlighting live Core Web Vitals overlay: 94 Mobile Score, 1.4s LCP, dead app script removal, and native responsive image srcset.',
    previewUrl: 'theme.liquid • Script Defer & Dead App Purge',
    description:
      'Leftover app scripts and unoptimized Liquid loops silently kill mobile conversion rates. We strip ghost code and tune your Shopify theme for instant loads.',
    deliverables: [
      'Purging leftover third-party app scripts and render-blocking CSS/JS from `theme.liquid`',
      'Refactoring slow nested Liquid loops, responsive WebP `image_tag` sizing, and critical resource hints',
      'Before-and-after Google Lighthouse, CrUX field data, and mobile PDP speed verification',
    ],
    typicalTimeline: '5–10 business days',
  },
  {
    id: 'shp-7',
    sectionCode: 'SHOPIFY MARKETS',
    sidebarTitle: 'Multi-Market & Multi-Currency',
    badge: 'GLOBAL D2C',
    previewHighlightArea: 'multi-market',
    previewCaption:
      'Highlighting automatic geolocation selector switching storefront between ₹ INR (UPI), $ USD (Shop Pay), £ GBP, and € EUR with local duties.',
    previewUrl: 'config/markets.json • hreflang + Local Currencies',
    description:
      'Sell across India, the US, UK, UAE, Europe, and Australia from a single Shopify store with localized currencies, domains/subfolders, and international SEO.',
    deliverables: [
      'Shopify Markets setup with localized pricing rules, rounding, and duty/import tax calculation',
      'Country & currency switcher header bar with automatic `hreflang` international SEO tags',
      'Region-specific payment methods (UPI/Razorpay for India; Stripe/Shop Pay/Klarna for Global)',
    ],
    typicalTimeline: '2–3 weeks',
  },
  {
    id: 'shp-8',
    sectionCode: 'MONTHLY SLA',
    sidebarTitle: 'Shopify Maintenance',
    badge: 'ONGOING CARE',
    previewHighlightArea: 'care-monitor',
    previewCaption:
      'Highlighting monthly CRO & maintenance status: theme backup active, seasonal campaign landing page live, and 0 checkout errors.',
    previewUrl: 'github.com/webxcode/shopify-theme-main • CI/CD Synced',
    description:
      'Treat WebXCode as your on-demand Shopify engineering and CRO team—handling campaign launches, new sections, speed monitoring, and theme upgrades.',
    deliverables: [
      'GitHub-connected theme version control, automated theme backups, and safe staging previews',
      'Monthly hours for new promotional sections, sale landing pages, and bundle setups',
      'Continuous Core Web Vitals monitoring, app health checks, and priority bug resolution',
    ],
    typicalTimeline: 'Ongoing monthly retainer',
  },
];

/* ============================================================================
   MAIN COMPONENT: WordpressShopifyDevelopment (Part 1: Sections 1–4)
============================================================================ */
interface WordpressShopifyDevelopmentProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const WordpressShopifyDevelopment: React.FC<WordpressShopifyDevelopmentProps> = ({
  onOpenQuoteModal,
}) => {
  const shouldReduceMotion = useReducedMotion();

  /* Helper to open Quote Modal */
  const triggerQuoteModal = (serviceLabel?: string) => {
    const label = serviceLabel || wpShopifyService.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* SEO Meta Title Sync */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'WordPress & Shopify Development Company | Themes, Plugins, Apps & Speed | WebXCode';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  /* Section 1 State: Hero Two Worlds Toggle ('wordpress' | 'shopify') */
  const [activeHeroWorld, setActiveHeroWorld] = useState<HeroWorldKey>('wordpress');

  /* Section 2 State: Fork in the Road Interactive 3-Question Finder */
  const [roadAnswers, setRoadAnswers] = useState<Record<number, boolean>>({});
  const answeredCount = Object.keys(roadAnswers).length;
  const currentQuestionIndex = Math.min(answeredCount, 2); // 0, 1, or 2

  const handleAnswerRoadQuestion = (qId: number, answer: boolean) => {
    setRoadAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const resetRoadQuiz = () => {
    setRoadAnswers({});
  };

  /* Determine active road destination based on answers */
  const activeRoadDestinationKey = useMemo((): RoadDestinationKey => {
    const q1SellProducts = roadAnswers[1];
    const q2HeavyContent = roadAnswers[2];
    const q3ManagedHosting = roadAnswers[3];

    if (q1SellProducts === true && q2HeavyContent === true && q3ManagedHosting === false) {
      return 'woocommerce';
    }
    if (q1SellProducts === true && q3ManagedHosting === true) {
      return 'shopify';
    }
    if (q1SellProducts === false && q2HeavyContent === true) {
      return 'wordpress';
    }
    if (q1SellProducts === true && q2HeavyContent === true) {
      return 'woocommerce';
    }
    if (q1SellProducts === true) {
      return 'shopify';
    }
    if (q3ManagedHosting === true && q2HeavyContent === false) {
      return 'shopify';
    }
    return 'wordpress';
  }, [roadAnswers]);

  const activeRoadDestSpec = ROAD_DESTINATIONS[activeRoadDestinationKey];

  /* Section 3 State: WordPress Block Editor Stack Selected Block */
  const [selectedWpBlockId, setSelectedWpBlockId] = useState<string>('wp-block-1');
  const activeWpBlock = useMemo(
    () => WP_EDITOR_BLOCKS.find((b) => b.id === selectedWpBlockId) || WP_EDITOR_BLOCKS[0],
    [selectedWpBlockId]
  );

  /* Section 4 State: Shopify Theme Customizer Selected Section */
  const [selectedShopifySectionId, setSelectedShopifySectionId] = useState<string>('shp-1');
  const activeShopifySection = useMemo(
    () =>
      SHOPIFY_CUSTOMIZER_SECTIONS.find((s) => s.id === selectedShopifySectionId) ||
      SHOPIFY_CUSTOMIZER_SECTIONS[0],
    [selectedShopifySectionId]
  );

  /* Structured Data (Service + BreadcrumbList) */
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Service',
          name: wpShopifyService.name,
          description: wpShopifyService.description,
          provider: {
            '@type': 'Organization',
            name: 'WebXCode',
            url: 'https://webxcode.com',
          },
          serviceType: 'WordPress & Shopify Development',
          areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
        },
        {
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
              name: 'Services',
              item: 'https://webxcode.com/services',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: wpShopifyService.name,
              item: 'https://webxcode.com/services/wordpress-shopify-development',
            },
          ],
        },
      ],
    }),
    []
  );

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: TWO WORLDS SPLIT-SCREEN BROWSER WINDOW (navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-white/10">
        {/* Radial Blue Glow + Subtle Architectural Grid */}
        <div
          aria-hidden="true"
          className="absolute -top-28 left-1/2 -translate-x-1/2 w-[700px] h-[700px] blue-glow-strong pointer-events-none opacity-75"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex justify-center">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-[13px] text-white/65 font-medium">
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
                {wpShopifyService.name}
              </li>
            </ol>
          </nav>

          {/* Centered Hero Copy */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>WORDPRESS &amp; SHOPIFY</span>
            </div>

            <h1 className="text-[34px] sm:text-[46px] lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight">
              <span className="text-primary">WordPress &amp; Shopify</span> Experts Who Build It
              Right
            </h1>

            <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-2xl mx-auto">
              Custom themes, plugins, apps, speed fixes and migrations — we build WordPress websites
              and Shopify stores that look premium, load fast and are easy for your team to manage.
            </p>

            {/* Two CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#site-check"
                onClick={() => {
                  const el = document.getElementById('site-check');
                  if (!el) triggerQuoteModal('Free WordPress / Shopify Site Check');
                }}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all"
              >
                <span>Get a Free Site Check</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#platform-path"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
              >
                <span>Which Platform Do I Need?</span>
              </a>
            </div>
          </div>

          {/* Pill Toggle Above the Split Browser Window: WordPress | Shopify */}
          <div className="mt-10 flex flex-col items-center">
            <div className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-primary-100 mb-2.5">
              TWO PLATFORMS • ONE EXPERT TEAM — SWITCH TO EXPAND VIEW
            </div>
            <div
              role="radiogroup"
              aria-label="Select Platform Preview to Expand"
              className="inline-flex items-center p-1.5 rounded-full bg-white/[0.07] border border-white/20 backdrop-blur-md"
            >
              {(['wordpress', 'shopify'] as HeroWorldKey[]).map((worldKey) => {
                const isSelected = activeHeroWorld === worldKey;
                const spec = HERO_WORLDS[worldKey];
                return (
                  <button
                    key={worldKey}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setActiveHeroWorld(worldKey)}
                    className={`px-6 py-2.5 rounded-full text-[14px] font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-primary text-white shadow-soft'
                        : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {worldKey === 'wordpress' ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                    <span>{spec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wide Split-Screen Browser Window (WordPress Left ~70%/30% | Glowing Seam + WebXCode Badge | Shopify Right ~30%/70%) */}
          <div className="mt-6 rounded-[26px] bg-white/[0.05] border border-white/20 backdrop-blur-md shadow-2xl overflow-hidden">
            {/* Shared Browser Top Chrome */}
            <div className="px-4 sm:px-6 py-3 bg-navy/90 border-b border-white/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-2 font-mono text-[11px] font-bold text-white/80 truncate max-w-[260px] sm:max-w-md">
                  https://{HERO_WORLDS[activeHeroWorld].previewUrl}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-primary-100">
                  {HERO_WORLDS[activeHeroWorld].versionTag}
                </span>
              </div>
            </div>

            {/* Split-Screen Interactive Stage (70% / 30% on Desktop) */}
            <div className="relative flex flex-col lg:flex-row min-h-[390px]">
              {/* ==================== LEFT HALF: WORDPRESS WORLD ==================== */}
              <div
                onClick={() => setActiveHeroWorld('wordpress')}
                style={{
                  flexBasis: activeHeroWorld === 'wordpress' ? '68%' : '32%',
                }}
                className={`p-5 sm:p-7 transition-all duration-500 cursor-pointer flex flex-col justify-between relative ${
                  activeHeroWorld === 'wordpress'
                    ? 'bg-white text-navy'
                    : 'bg-navy/70 text-white hover:bg-navy/50'
                }`}
              >
                <div>
                  {/* Top Bar: Platform Label + "Published · 2 min ago" Chip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-current/10">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-[13px] ${
                          activeHeroWorld === 'wordpress'
                            ? 'bg-primary text-white'
                            : 'bg-white/10 text-primary-100'
                        }`}
                      >
                        WP
                      </span>
                      <div>
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                          WORDPRESS • BLOCK EDITOR &amp; CMS
                        </div>
                        <div className="text-[15px] font-extrabold leading-tight">
                          Enterprise Content &amp; Lead Site
                        </div>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                        activeHeroWorld === 'wordpress'
                          ? 'bg-primary-50 text-primary border border-primary-100'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span>{HERO_WORLDS.wordpress.statusChip}</span>
                    </span>
                  </div>

                  {/* Floating Glass Strength Chips when WordPress is Expanded */}
                  {activeHeroWorld === 'wordpress' && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {HERO_WORLDS.wordpress.floatingStrengths.map((str) => (
                        <span
                          key={str}
                          className="px-3.5 py-1.5 rounded-full bg-navy text-white text-[12px] font-extrabold shadow-sm inline-flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                          <span>{str}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Simulated WordPress Block Website Wireframe */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    <div
                      className={`sm:col-span-7 p-4 rounded-2xl border ${
                        activeHeroWorld === 'wordpress'
                          ? 'bg-primary-50/55 border-primary-100 text-navy'
                          : 'bg-white/[0.04] border-white/10 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] font-bold text-primary mb-1.5">
                        <span>BLOCK: acf/editorial-hero</span>
                        <span>H1 + SCHEMA</span>
                      </div>
                      <div className="text-[15px] sm:text-[16px] font-extrabold leading-snug">
                        {HERO_WORLDS.wordpress.headline}
                      </div>
                      {activeHeroWorld === 'wordpress' && (
                        <p className="mt-2 text-[12px] text-navy-70 leading-relaxed">
                          {HERO_WORLDS.wordpress.subline}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-5 flex flex-col justify-between gap-2.5">
                      {HERO_WORLDS.wordpress.metrics.map((m) => (
                        <div
                          key={m.label}
                          className={`p-3 rounded-xl border ${
                            activeHeroWorld === 'wordpress'
                              ? 'bg-white border-navy-15 text-navy'
                              : 'bg-white/[0.05] border-white/10 text-white'
                          }`}
                        >
                          <div className="font-mono text-[10px] uppercase opacity-70">
                            {m.label}
                          </div>
                          <div className="font-mono text-[14px] font-extrabold text-primary mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Bar inside WordPress Half */}
                <div className="mt-5 pt-3 border-t border-current/10 flex items-center justify-between text-[12px] font-bold">
                  <span className="font-mono text-[11px] opacity-75">
                    theme.json • ACF Pro • Rank Math SEO
                  </span>
                  <span className="text-primary inline-flex items-center gap-1">
                    <span>
                      {activeHeroWorld === 'wordpress' ? 'Active View (70%)' : 'Click to Expand →'}
                    </span>
                  </span>
                </div>
              </div>

              {/* ==================== GLOWING VERTICAL SEAM + WEBXCODE BADGE ==================== */}
              <div
                aria-hidden="true"
                className="relative z-20 flex lg:flex-col items-center justify-center bg-primary/30 lg:w-1.5 h-1.5 lg:h-auto shrink-0"
              >
                <div className="w-11 h-11 rounded-2xl bg-navy border-2 border-primary text-white font-mono text-[11px] font-extrabold flex items-center justify-center shadow-[0_0_25px_rgba(5,113,194,0.9)]">
                  <span>W</span>
                  <span className="text-primary">X</span>
                  <span>C</span>
                </div>
              </div>

              {/* ==================== RIGHT HALF: SHOPIFY WORLD ==================== */}
              <div
                onClick={() => setActiveHeroWorld('shopify')}
                style={{
                  flexBasis: activeHeroWorld === 'shopify' ? '68%' : '32%',
                }}
                className={`p-5 sm:p-7 transition-all duration-500 cursor-pointer flex flex-col justify-between relative ${
                  activeHeroWorld === 'shopify'
                    ? 'bg-white text-navy'
                    : 'bg-navy/70 text-white hover:bg-navy/50'
                }`}
              >
                <div>
                  {/* Top Bar: Platform Label + "Order received" Chip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-current/10">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-[13px] ${
                          activeHeroWorld === 'shopify'
                            ? 'bg-primary text-white'
                            : 'bg-white/10 text-primary-100'
                        }`}
                      >
                        SH
                      </span>
                      <div>
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                          SHOPIFY • ONLINE STORE 2.0 &amp; PLUS
                        </div>
                        <div className="text-[15px] font-extrabold leading-tight">
                          High-Converting D2C Storefront
                        </div>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                        activeHeroWorld === 'shopify'
                          ? 'bg-primary-50 text-primary border border-primary-100'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span>{HERO_WORLDS.shopify.statusChip}</span>
                    </span>
                  </div>

                  {/* Floating Glass Strength Chips when Shopify is Expanded */}
                  {activeHeroWorld === 'shopify' && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {HERO_WORLDS.shopify.floatingStrengths.map((str) => (
                        <span
                          key={str}
                          className="px-3.5 py-1.5 rounded-full bg-navy text-white text-[12px] font-extrabold shadow-sm inline-flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
                          <span>{str}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Simulated Shopify Product Page Wireframe */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    <div
                      className={`sm:col-span-7 p-4 rounded-2xl border ${
                        activeHeroWorld === 'shopify'
                          ? 'bg-primary-50/55 border-primary-100 text-navy'
                          : 'bg-white/[0.04] border-white/10 text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] font-bold text-primary mb-1.5">
                        <span>SECTION: main-product.liquid</span>
                        <span>₹1,899 • IN STOCK</span>
                      </div>
                      <div className="text-[15px] sm:text-[16px] font-extrabold leading-snug">
                        {HERO_WORLDS.shopify.headline}
                      </div>
                      {activeHeroWorld === 'shopify' && (
                        <p className="mt-2 text-[12px] text-navy-70 leading-relaxed">
                          {HERO_WORLDS.shopify.subline}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-5 flex flex-col justify-between gap-2.5">
                      {HERO_WORLDS.shopify.metrics.map((m) => (
                        <div
                          key={m.label}
                          className={`p-3 rounded-xl border ${
                            activeHeroWorld === 'shopify'
                              ? 'bg-white border-navy-15 text-navy'
                              : 'bg-white/[0.05] border-white/10 text-white'
                          }`}
                        >
                          <div className="font-mono text-[10px] uppercase opacity-70">
                            {m.label}
                          </div>
                          <div className="font-mono text-[14px] font-extrabold text-primary mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Bar inside Shopify Half */}
                <div className="mt-5 pt-3 border-t border-current/10 flex items-center justify-between text-[12px] font-bold">
                  <span className="font-mono text-[11px] opacity-75">
                    Liquid 2.0 • Checkout UI • Markets
                  </span>
                  <span className="text-primary inline-flex items-center gap-1">
                    <span>
                      {activeHeroWorld === 'shopify' ? 'Active View (70%)' : 'Click to Expand →'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[13px] sm:text-[14px] font-bold text-white/80">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
              <Check className="w-4 h-4 text-primary" />
              <span>100+ sites &amp; stores built (placeholder)</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
              <Check className="w-4 h-4 text-primary" />
              <span>Custom themes</span>
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
              <Check className="w-4 h-4 text-primary" />
              <span>No bloated page builders</span>
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — WHICH PLATFORM DO YOU NEED? — FORK IN THE ROAD (white, #platform-path)
      ====================================================================== */}
      <section
        id="platform-path"
        className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              INTERACTIVE PLATFORM FINDER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              One Road, <span className="text-primary">Two Great Destinations</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Answer 3 quick yes/no signpost questions along the road below to watch the blue
              marker travel to your ideal destination: <strong>WordPress</strong>,{' '}
              <strong>WooCommerce (Both)</strong>, or <strong>Shopify</strong>.
            </p>
          </div>

          {/* Illustrated Fork-in-the-Road Container */}
          <div className="rounded-[28px] bg-primary-50/45 border-2 border-navy-15 p-5 sm:p-8 lg:p-10 shadow-soft">
            {/* Top Progress Strip + Start Over Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b border-navy-15">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold uppercase">
                  MARKER POSITION: SIGNPOST 0{Math.min(answeredCount + 1, 3)} / 03
                </span>
                <span className="text-[13px] font-bold text-navy-70">
                  {answeredCount < 3
                    ? `${3 - answeredCount} question${3 - answeredCount === 1 ? '' : 's'} remaining`
                    : 'Destination unlocked! See your recommendation below.'}
                </span>
              </div>

              <button
                type="button"
                onClick={resetRoadQuiz}
                className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:text-navy transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start Over</span>
              </button>
            </div>

            {/* The Illustrated Road + 3 Signpost Questions */}
            <div className="relative">
              {/* Horizontal Road Line on Desktop / Vertical Road Line on Mobile */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-1/2 left-6 right-6 -translate-y-1/2 h-4 rounded-full bg-navy border-2 border-navy z-0"
              >
                <div
                  className="w-full h-0.5 my-auto border-t-2 border-dashed border-primary translate-y-[5px]"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                {ROAD_QUESTIONS.map((q, idx) => {
                  const hasAnswered = roadAnswers[q.id] !== undefined;
                  const userAnswer = roadAnswers[q.id];
                  const isCurrentSignpost = idx === currentQuestionIndex && answeredCount < 3;

                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
                        isCurrentSignpost
                          ? 'bg-white border-primary shadow-xl ring-4 ring-primary/15'
                          : hasAnswered
                          ? 'bg-white border-navy-15'
                          : 'bg-white/80 border-navy-08 opacity-85'
                      }`}
                    >
                      <div>
                        {/* Signpost Header + Moving Blue Marker */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                            {q.signpostCode}
                          </span>

                          {/* Moving Blue Road Marker Indicator */}
                          {(isCurrentSignpost || (answeredCount === 3 && idx === 2)) && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold shadow-xs">
                              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                              <span>MARKER HERE</span>
                            </span>
                          )}
                        </div>

                        <h3 className="text-[18px] sm:text-[19px] font-extrabold text-navy leading-snug">
                          {q.question}
                        </h3>
                        <p className="mt-2 text-[13px] text-navy-70 leading-relaxed">
                          {q.helperText}
                        </p>
                      </div>

                      {/* Yes / No Signpost Buttons */}
                      <div className="mt-5 pt-3.5 border-t border-navy-08 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          aria-pressed={userAnswer === true}
                          onClick={() => handleAnswerRoadQuestion(q.id, true)}
                          className={`py-2.5 px-4 rounded-xl font-extrabold text-[13px] transition-all cursor-pointer border ${
                            userAnswer === true
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-primary-50/60 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          Yes {userAnswer === true && '✓'}
                        </button>
                        <button
                          type="button"
                          aria-pressed={userAnswer === false}
                          onClick={() => handleAnswerRoadQuestion(q.id, false)}
                          className={`py-2.5 px-4 rounded-xl font-extrabold text-[13px] transition-all cursor-pointer border ${
                            userAnswer === false
                              ? 'bg-navy text-white border-navy shadow-sm'
                              : 'bg-primary-50/60 text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          No {userAnswer === false && '✓'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Fork in the Road SVG Visual + 3 Destination Signs (WordPress | WooCommerce (Both) | Shopify) */}
            <div className="mt-8 pt-6 border-t border-navy-15">
              {/* SVG Road Fork Illustration */}
              <div aria-hidden="true" className="hidden md:block max-w-3xl mx-auto mb-4">
                <svg viewBox="0 0 600 70" className="w-full h-16 overflow-visible">
                  {/* Left Fork to WordPress */}
                  <path
                    d="M 300 5 C 300 35, 100 35, 100 65"
                    fill="none"
                    stroke={activeRoadDestinationKey === 'wordpress' ? '#0571c2' : '#1e242e'}
                    strokeWidth={activeRoadDestinationKey === 'wordpress' ? '5' : '2.5'}
                    strokeDasharray={activeRoadDestinationKey === 'wordpress' ? 'none' : '6 6'}
                  />
                  {/* Middle Path to WooCommerce */}
                  <path
                    d="M 300 5 L 300 65"
                    fill="none"
                    stroke={activeRoadDestinationKey === 'woocommerce' ? '#0571c2' : '#1e242e'}
                    strokeWidth={activeRoadDestinationKey === 'woocommerce' ? '5' : '2.5'}
                    strokeDasharray={activeRoadDestinationKey === 'woocommerce' ? 'none' : '6 6'}
                  />
                  {/* Right Fork to Shopify */}
                  <path
                    d="M 300 5 C 300 35, 500 35, 500 65"
                    fill="none"
                    stroke={activeRoadDestinationKey === 'shopify' ? '#0571c2' : '#1e242e'}
                    strokeWidth={activeRoadDestinationKey === 'shopify' ? '5' : '2.5'}
                    strokeDasharray={activeRoadDestinationKey === 'shopify' ? 'none' : '6 6'}
                  />
                  <circle cx="300" cy="8" r="6" fill="#0571c2" />
                </svg>
              </div>

              {/* 3 Destination Signs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {(['wordpress', 'woocommerce', 'shopify'] as RoadDestinationKey[]).map((destKey) => {
                  const dest = ROAD_DESTINATIONS[destKey];
                  const isMatched = activeRoadDestinationKey === destKey;
                  return (
                    <button
                      key={destKey}
                      type="button"
                      onClick={() => {
                        if (destKey === 'wordpress') {
                          setRoadAnswers({ 1: false, 2: true, 3: false });
                        } else if (destKey === 'woocommerce') {
                          setRoadAnswers({ 1: true, 2: true, 3: false });
                        } else {
                          setRoadAnswers({ 1: true, 2: false, 3: true });
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isMatched
                          ? 'bg-navy text-white border-primary shadow-lg scale-[1.01]'
                          : 'bg-white text-navy border-navy-15 hover:border-primary'
                      }`}
                    >
                      <div>
                        <span
                          className={`font-mono text-[10px] font-extrabold uppercase tracking-wider block ${
                            isMatched ? 'text-primary-100' : 'text-primary'
                          }`}
                        >
                          {dest.routeBadge}
                        </span>
                        <div className="text-[18px] font-extrabold mt-0.5">{dest.signTitle}</div>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-extrabold ${
                          isMatched
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {isMatched ? 'ACTIVE SIGN ★' : 'Inspect'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Matching Destination Result Card */}
              <div
                aria-live="polite"
                className="rounded-[24px] bg-navy text-white p-6 sm:p-8 lg:p-10 border-2 border-primary shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                        RECOMMENDED DESTINATION
                      </span>
                      <span className="font-mono text-[12px] font-bold text-primary-100">
                        {activeRoadDestSpec.recommendedTimeline}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-[26px] sm:text-[32px] font-extrabold text-white leading-tight">
                        {activeRoadDestSpec.signTitle}
                      </h3>
                      <p className="text-[15px] font-semibold text-primary-100 mt-1">
                        {activeRoadDestSpec.subtitle}
                      </p>
                    </div>

                    {/* Why It Fits (3 ✓) */}
                    <div>
                      <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-white/65 mb-2.5">
                        Why It Fits Your Answers
                      </div>
                      <ul className="space-y-2">
                        {activeRoadDestSpec.whyItFits.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-white/90 font-medium"
                          >
                            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3" strokeWidth={2.5} />
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Good to Know (2 points) */}
                    <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/15">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100 mb-1.5">
                        Good to Know Before You Build
                      </div>
                      <ul className="space-y-1.5">
                        {activeRoadDestSpec.goodToKnow.map((gtk) => (
                          <li
                            key={gtk}
                            className="text-[13px] text-white/80 flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                            <span>{gtk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right CTA Box */}
                  <div className="lg:col-span-4 rounded-2xl bg-white text-navy p-6 flex flex-col justify-between gap-5">
                    <div>
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        READY FOR YOUR ROADMAP?
                      </span>
                      <h4 className="text-[20px] font-extrabold text-navy mt-1">
                        Build on {activeRoadDestSpec.signTitle} with WebXCode
                      </h4>
                      <p className="text-[13px] text-navy-70 mt-2 leading-relaxed">
                        Get a fixed-price proposal, architecture recommendation, and timeline within
                        24 hours.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(
                            `${activeRoadDestSpec.signTitle} Development Consultation`
                          )
                        }
                        className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                      >
                        <span>Talk to an Expert</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={resetRoadQuiz}
                        className="w-full py-2 text-[12px] font-extrabold text-navy-60 hover:text-primary transition-colors cursor-pointer"
                      >
                        Start Over ↺
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — WORDPRESS SERVICES: BLOCK EDITOR STACK (light blue tint)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                WORDPRESS
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                WordPress, <span className="text-primary">Done Properly</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              Click any of the 8 WordPress service blocks on the editor canvas below to inspect its
              deliverables, typical delivery timeline, and technical setup in the right-hand
              inspector panel.
            </p>
          </div>

          {/* 12-Col Block Editor Layout: Left 7 Cols Stacked Blocks Canvas | Right 5 Cols Sticky Block Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: White Block Editor Canvas */}
            <div className="lg:col-span-7 rounded-[26px] bg-white border-2 border-navy-15 shadow-soft overflow-hidden">
              {/* Top Editor Bar */}
              <div className="px-5 py-3.5 bg-navy text-white flex items-center justify-between gap-2 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-extrabold">
                    BLOCK EDITOR
                  </span>
                  <span className="font-mono text-[11px] font-bold text-white/80">
                    8 WordPress Capabilities • Click a Block to Inspect
                  </span>
                </div>
                <span className="font-mono text-[11px] text-primary-100 hidden sm:inline">
                  WP 6.7 • PHP 8.3
                </span>
              </div>

              {/* 8 Stacked Content Blocks with Drag Handles & Hover Block Toolbars */}
              <div className="p-4 sm:p-6 space-y-2">
                {WP_EDITOR_BLOCKS.map((blk, idx) => {
                  const isSelected = blk.id === selectedWpBlockId;
                  return (
                    <React.Fragment key={blk.id}>
                      <div className="group relative">
                        {/* Slim Decorative Block Toolbar Appearing on Hover / Selection */}
                        <div
                          aria-hidden="true"
                          className={`flex items-center justify-between px-3 py-1 rounded-t-xl border-x border-t text-[10px] font-mono font-bold transition-all ${
                            isSelected
                              ? 'bg-primary text-white border-primary'
                              : 'bg-navy text-white border-navy opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>⋮⋮</span>
                            <span>{blk.blockCode}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowUp className="w-3 h-3" />
                            <ArrowDown className="w-3 h-3" />
                            <span className="px-1.5 py-0.2 rounded bg-white/20">+</span>
                          </div>
                        </div>

                        {/* Clickable Block Body */}
                        <button
                          type="button"
                          onClick={() => setSelectedWpBlockId(blk.id)}
                          className={`w-full text-left p-4 sm:p-5 rounded-b-2xl rounded-tr-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-primary-50/60 border-primary shadow-md'
                              : 'bg-white border-navy-15 hover:border-primary/60'
                          }`}
                        >
                          {/* Left Drag Handle (⋮⋮) + Number */}
                          <div className="flex flex-col items-center gap-1 pt-0.5 shrink-0 text-navy-40">
                            <GripVertical className="w-4 h-4 text-primary" />
                            <span className="font-mono text-[10px] font-extrabold text-navy-60">
                              0{idx + 1}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                                {blk.blockTypeLabel}
                              </span>
                              <span className="font-mono text-[11px] font-bold text-navy-60">
                                {blk.typicalTime}
                              </span>
                            </div>

                            <h3 className="text-[17px] sm:text-[19px] font-extrabold text-navy leading-snug">
                              {blk.title}
                            </h3>
                            <p className="mt-1 text-[13px] sm:text-[14px] text-navy-70 leading-relaxed">
                              {blk.oneLineDesc}
                            </p>

                            {/* 3 Tags */}
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {blk.tags.map((t) => (
                                <span
                                  key={t}
                                  className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                                    isSelected
                                      ? 'bg-primary text-white'
                                      : 'bg-primary-50 text-primary'
                                  }`}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Faint "+" Add-Block Line Between Blocks */}
                      {idx < WP_EDITOR_BLOCKS.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="flex items-center gap-2 py-0.5 opacity-45"
                        >
                          <div className="flex-1 h-px bg-primary/30" />
                          <span className="w-4 h-4 rounded-full bg-primary-50 border border-primary/40 text-primary font-mono text-[10px] font-bold flex items-center justify-center">
                            +
                          </span>
                          <div className="flex-1 h-px bg-primary/30" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Cols: Sticky Block Settings Inspector Panel */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div
                aria-live="polite"
                className="rounded-[26px] bg-navy text-white border-2 border-primary shadow-2xl overflow-hidden"
              >
                {/* Inspector Header */}
                <div className="px-6 py-4 bg-white/[0.06] border-b border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-white">
                      BLOCK SETTINGS INSPECTOR
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-bold">
                    SELECTED
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <div className="font-mono text-[11px] font-bold text-primary-100">
                      {activeWpBlock.blockCode}
                    </div>
                    <h3 className="mt-1 text-[22px] sm:text-[26px] font-extrabold text-white leading-tight">
                      {activeWpBlock.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] text-white/80 leading-relaxed">
                      {activeWpBlock.oneLineDesc}
                    </p>
                  </div>

                  {/* 3 Bullet Deliverables */}
                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100 mb-3">
                      Included Deliverables (3 ✓)
                    </div>
                    <ul className="space-y-2.5">
                      {activeWpBlock.deliverables.map((deliv) => (
                        <li
                          key={deliv}
                          className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10 flex items-start gap-3 text-[13px] sm:text-[14px] text-white/90 font-medium"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" strokeWidth={2.5} />
                          </span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Typical Time + File Path Readout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                      <div className="font-mono text-[10px] uppercase text-white/60">
                        Typical Time
                      </div>
                      <div className="text-[15px] font-extrabold text-primary-100 mt-0.5">
                        {activeWpBlock.typicalTime}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10">
                      <div className="font-mono text-[10px] uppercase text-white/60">
                        Target Output
                      </div>
                      <div className="font-mono text-[11px] font-bold text-white truncate mt-1">
                        {activeWpBlock.fileHint}
                      </div>
                    </div>
                  </div>

                  {activeWpBlock.id === 'wp-maintenance' && (
                    <Link
                      to="/services/website-maintenance-support"
                      className="w-full py-3.5 px-5 rounded-full bg-white/10 hover:bg-white/20 border border-primary/50 text-white font-bold text-[14px] inline-flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Explore Full Website Maintenance &amp; Support Page</span>
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => triggerQuoteModal(`WordPress: ${activeWpBlock.title}`)}
                    className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[15px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — SHOPIFY SERVICES: THEME CUSTOMIZER (white)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                SHOPIFY
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Shopify Stores That <span className="text-primary">Stand Out and Sell</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              Select any of our 8 Shopify capabilities in the theme customizer sidebar to watch the
              live store preview highlight that exact layer—from Online Store 2.0 themes to Shopify
              Plus checkout extensions.
            </p>
          </div>

          {/* Mobile Horizontal Pill Row Above Preview */}
          <div
            role="tablist"
            aria-label="Shopify Services Customizer Tabs"
            className="flex lg:hidden items-center gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar"
          >
            {SHOPIFY_CUSTOMIZER_SECTIONS.map((sec) => {
              const isSelected = sec.id === selectedShopifySectionId;
              return (
                <button
                  key={sec.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedShopifySectionId(sec.id)}
                  className={`px-4 py-2.5 rounded-full text-[12px] font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-xs'
                      : 'bg-primary-50/50 text-navy border-navy-15'
                  }`}
                >
                  {sec.sidebarTitle}
                </button>
              );
            })}
          </div>

          {/* Theme Customizer Window */}
          <div className="rounded-[28px] border-2 border-navy-15 bg-white shadow-xl overflow-hidden">
            {/* Top Customizer Chrome */}
            <div className="px-5 sm:px-7 py-3.5 bg-navy text-white flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                  THEME CUSTOMIZER • OS 2.0
                </span>
                <span className="font-mono text-[12px] text-white/85">
                  {activeShopifySection.previewUrl}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 font-mono text-[10px] text-primary-100">
                  Live Store Preview
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Sidebar (4 Cols on Desktop): 8 Sections */}
              <div
                role="tablist"
                aria-label="Shopify Customizer Sections"
                className="hidden lg:block lg:col-span-4 bg-primary-50/40 border-r border-navy-15 p-4 space-y-2"
              >
                <div className="px-2 pb-2 font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-60">
                  TEMPLATE SECTIONS (8 SERVICES)
                </div>
                {SHOPIFY_CUSTOMIZER_SECTIONS.map((sec, idx) => {
                  const isSelected = sec.id === selectedShopifySectionId;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedShopifySectionId(sec.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                        isSelected
                          ? 'bg-navy text-white border-navy shadow-md'
                          : 'bg-white text-navy border-navy-08 hover:border-primary'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-[10px] font-extrabold ${
                              isSelected ? 'text-primary-100' : 'text-primary'
                            }`}
                          >
                            0{idx + 1} • {sec.sectionCode}
                          </span>
                        </div>
                        <div className="text-[14px] font-extrabold leading-snug mt-0.5 truncate">
                          {sec.sidebarTitle}
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-primary' : 'text-navy-40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Live Store Preview + Deliverables (8 Cols on Desktop) */}
              <div className="lg:col-span-8 p-5 sm:p-8 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeShopifySection.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Live Storefront Preview Canvas with Dynamic Highlight Overlay */}
                    <div className="rounded-[22px] bg-navy text-white p-5 sm:p-7 border-2 border-primary/40 shadow-lg relative overflow-hidden">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/15">
                        <div>
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                            ACTIVE CUSTOMIZER LAYER • {activeShopifySection.sectionCode}
                          </span>
                          <h3 className="text-[20px] sm:text-[24px] font-extrabold text-white mt-0.5">
                            {activeShopifySection.sidebarTitle}
                          </h3>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold">
                          {activeShopifySection.badge}
                        </span>
                      </div>

                      {/* Dynamic Interactive Overlay Preview Based on Selected Service */}
                      <div className="rounded-2xl bg-white text-navy p-4 sm:p-5 border-2 border-primary shadow-md">
                        {activeShopifySection.previewHighlightArea === 'speed-meter' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                            <div className="p-3.5 rounded-xl bg-primary-50 border border-primary-100 text-center">
                              <div className="font-mono text-[26px] font-extrabold text-primary">
                                94 / 100
                              </div>
                              <div className="text-[11px] font-bold text-navy">
                                Mobile Lighthouse
                              </div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-primary-50 border border-primary-100 text-center">
                              <div className="font-mono text-[26px] font-extrabold text-navy">
                                1.4s
                              </div>
                              <div className="text-[11px] font-bold text-navy">
                                Largest Contentful Paint
                              </div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-navy text-white text-center">
                              <div className="font-mono text-[18px] font-extrabold text-primary-100">
                                -14 Scripts
                              </div>
                              <div className="text-[11px] text-white/80">
                                Ghost App Code Purged
                              </div>
                            </div>
                          </div>
                        )}

                        {activeShopifySection.previewHighlightArea === 'multi-market' && (
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="font-mono text-[10px] font-extrabold uppercase text-primary">
                                SHOPIFY MARKETS CURRENCY &amp; DUTY SWITCHER
                              </div>
                              <div className="text-[16px] font-extrabold text-navy mt-1">
                                Localized Storefront Pricing &amp; `hreflang` Domains
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 font-mono text-[12px] font-extrabold">
                              <span className="px-3 py-1.5 rounded-xl bg-primary text-white">
                                🇮🇳 ₹ INR (UPI)
                              </span>
                              <span className="px-3 py-1.5 rounded-xl bg-primary-50 text-navy border border-primary-100">
                                🇺🇸 $ USD (Shop Pay)
                              </span>
                              <span className="px-3 py-1.5 rounded-xl bg-primary-50 text-navy border border-primary-100">
                                🇬🇧 £ GBP (VAT Incl.)
                              </span>
                            </div>
                          </div>
                        )}

                        {activeShopifySection.previewHighlightArea === 'plus-checkout' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-xl bg-primary-50 border border-primary-100">
                              <div className="font-mono text-[10px] font-extrabold text-primary">
                                CHECKOUT UI EXTENSION
                              </div>
                              <div className="text-[14px] font-extrabold text-navy mt-0.5">
                                + In-Checkout Free Sample &amp; GST Number Field
                              </div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-navy text-white">
                              <div className="font-mono text-[10px] font-extrabold text-primary-100">
                                SHOPIFY FUNCTIONS (WASM)
                              </div>
                              <div className="text-[14px] font-extrabold mt-0.5">
                                Tiered B2B Wholesale &amp; Bundle Discount Active
                              </div>
                            </div>
                          </div>
                        )}

                        {activeShopifySection.previewHighlightArea !== 'speed-meter' &&
                          activeShopifySection.previewHighlightArea !== 'multi-market' &&
                          activeShopifySection.previewHighlightArea !== 'plus-checkout' && (
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                              <div className="sm:col-span-7">
                                <span className="inline-block px-2.5 py-0.5 rounded bg-primary-50 text-primary font-mono text-[10px] font-extrabold mb-1.5">
                                  HIGHLIGHTED ZONE: {activeShopifySection.previewUrl}
                                </span>
                                <div className="text-[15px] font-extrabold text-navy">
                                  {activeShopifySection.description}
                                </div>
                              </div>
                              <div className="sm:col-span-5 p-3.5 rounded-xl bg-primary-50/70 border border-primary-100 font-mono text-[11px] font-bold text-navy space-y-1">
                                <div className="text-primary">✓ JSON Schema Section Ready</div>
                                <div>✓ Mobile Slide-Out Cart Synced</div>
                                <div>✓ Core Web Vitals Verified</div>
                              </div>
                            </div>
                          )}

                        {/* Highlight Caption Bar */}
                        <div className="mt-4 pt-3 border-t border-navy-08 flex items-center justify-between gap-2 text-[12px] font-semibold text-navy-70">
                          <span>{activeShopifySection.previewCaption}</span>
                        </div>
                      </div>
                    </div>

                    {/* Under the Preview: 3 Deliverables + Typical Timeline + Get a Quote Button */}
                    <div className="rounded-[22px] bg-primary-50/50 border border-primary-100 p-5 sm:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                          3 INCLUDED DELIVERABLES FOR THIS SECTION
                        </span>
                        <span className="font-mono text-[12px] font-bold text-navy">
                          Timeline: {activeShopifySection.typicalTimeline}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-6">
                        {activeShopifySection.deliverables.map((deliv, i) => (
                          <div
                            key={deliv}
                            className="p-4 rounded-xl bg-white border border-navy-08 flex flex-col justify-between"
                          >
                            <div className="w-6 h-6 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold flex items-center justify-center mb-2.5">
                              0{i + 1}
                            </div>
                            <p className="text-[13px] font-semibold text-navy leading-snug">
                              {deliv}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-primary-100">
                        <span className="text-[13px] font-bold text-navy-70">
                          Need {activeShopifySection.sidebarTitle} for your store?
                        </span>
                        <div className="flex flex-wrap items-center gap-3">
                          <Link
                            to="/services/email-marketing"
                            className="px-5 py-3 rounded-full bg-white hover:bg-navy text-navy hover:text-white border border-primary/40 font-bold text-[13px] inline-flex items-center gap-1.5 transition-all"
                          >
                            <span>Klaviyo &amp; Email Flows</span>
                            <ArrowRight className="w-3.5 h-3.5 text-primary" />
                          </Link>
                          <Link
                            to="/services/branding-logo-design"
                            className="px-5 py-3 rounded-full bg-white hover:bg-navy text-navy hover:text-white border border-primary/40 font-bold text-[13px] inline-flex items-center gap-1.5 transition-all"
                          >
                            <span>Need Brand Identity &amp; Logo?</span>
                            <ArrowRight className="w-3.5 h-3.5 text-primary" />
                          </Link>
                          {activeShopifySection.id === 'sh-maintenance' && (
                            <Link
                              to="/services/website-maintenance-support"
                              className="px-5 py-3 rounded-full bg-white hover:bg-navy text-navy hover:text-white border border-primary/40 font-bold text-[13px] inline-flex items-center gap-1.5 transition-all"
                            >
                              <span>View Full Maintenance &amp; Support Page</span>
                              <ArrowRight className="w-3.5 h-3.5 text-primary" />
                            </Link>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              triggerQuoteModal(`Shopify: ${activeShopifySection.sidebarTitle}`)
                            }
                            className="px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                          >
                            <span>Get a Quote</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WordpressShopifyDevelopment;
