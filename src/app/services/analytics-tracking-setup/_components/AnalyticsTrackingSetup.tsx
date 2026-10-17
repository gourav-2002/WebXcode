'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  BarChart3,
  Activity,
  Code2,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Server,
  Globe,
  RefreshCw,
  FileCode2,
  Cpu,
  Lock,
  PieChart,
  Sliders,
  Search,
  Filter,
} from 'lucide-react';
import { services } from '@/app/services/_components/Services';

/* ============================================================================
   TYPES & INTERFACES — ANALYTICS & TRACKING SETUP (PART 1: SECTIONS 1–4)
============================================================================ */

export interface AnalyticsTrackingSetupProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

interface TelemetryEventOption {
  id: 'purchase' | 'generate_lead' | 'add_to_cart' | 'whatsapp_click';
  eventName: string;
  triggerLabel: string;
  userActionDesc: string;
  tagManagerRule: string;
  ga4Status: string;
  serverSideStatus: string;
  destinations: {
    name: string;
    protocol: string;
    matchScore: string;
    status: string;
  }[];
  dataLayerPayload: string;
}

interface TrackingDiagnosticQuestion {
  id: string;
  number: string;
  question: string;
  whyItMatters: string;
  fixSummary: string;
}

interface PipelineNodeSpec {
  id: number;
  stepCode: string;
  layerName: string;
  shortTitle: string;
  subtitle: string;
  iconName: 'Globe' | 'Sliders' | 'Code2' | 'Server' | 'Target' | 'PieChart';
  statusBadge: string;
  whatHappensHere: string;
  commonBreakage: string;
  howWebXCodeSetsItUp: string[];
  samplePayloadOrRule: string;
  technicalKPI: string;
}

interface CoreTrackingCapability {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  deliverables: string[];
  beforeState: string;
  afterState: string;
}

/* ============================================================================
   STATIC DATA — SECTION 1: LIVE EVENT STREAM & DATALAYER INSPECTOR
============================================================================ */

const TELEMETRY_EVENTS: TelemetryEventOption[] = [
  {
    id: 'purchase',
    eventName: 'purchase',
    triggerLabel: 'purchase (₹2,499)',
    userActionDesc: 'Customer completes Razorpay / Shopify order #WXC-90482 for ₹2,499',
    tagManagerRule: 'Custom Event: purchase | Deduplication Key: event_id_90482',
    ga4Status: '200 OK • Ecommerce Revenue Verified (₹2,499.00)',
    serverSideStatus: 'CAPI + Enhanced Conversions Hashed (SHA-256) • Deduplicated',
    destinations: [
      {
        name: 'Google Analytics 4 (GA4)',
        protocol: 'Measurement Protocol + Web Stream',
        matchScore: '100% Order Match',
        status: 'Verified',
      },
      {
        name: 'Google Ads Conversion',
        protocol: 'Enhanced Conversions (Hashed Email/Phone)',
        matchScore: '9.4/10 Diagnostics',
        status: 'Verified',
      },
      {
        name: 'Meta Conversions API (CAPI)',
        protocol: 'Server-Side Graph API + Pixel Dedup',
        matchScore: '8.9/10 EMQ Score',
        status: 'Verified',
      },
      {
        name: 'Looker Studio Live Warehouse',
        protocol: 'BigQuery / Direct Connector',
        matchScore: 'Real-Time Sync',
        status: 'Verified',
      },
    ],
    dataLayerPayload: `window.dataLayer.push({
  event: "purchase",
  event_id: "evt_wxc_90482_ind",
  ecommerce: {
    transaction_id: "WXC-90482",
    value: 2499.00,
    tax: 381.20,
    shipping: 0.00,
    currency: "INR",
    coupon: "FIRSTORDER10",
    items: [{
      item_id: "SKU-SERUM-30ML",
      item_name: "Vitamin C Brightening Serum",
      price: 2499.00,
      quantity: 1
    }]
  },
  user_data: {
    sha256_email_address: "e3b0c44298fc1c149afbf4c8996fb924...",
    sha256_phone_number: "9f86d081884c7d659a2feaa0c55ad015..."
  }
});`,
  },
  {
    id: 'generate_lead',
    eventName: 'generate_lead',
    triggerLabel: 'generate_lead (Form)',
    userActionDesc: 'B2B prospect submits "Book a Demo / Request Quote" form with work email & phone',
    tagManagerRule: 'Form Submission Validated (AJAX Listener) | Spam & Bot Filtered',
    ga4Status: '200 OK • Key Event Fired Once (Zero Double-Fire)',
    serverSideStatus: 'GCLID + FBCLID Captured in Hidden Fields → Synced to HubSpot/Zoho',
    destinations: [
      {
        name: 'Google Analytics 4 (GA4)',
        protocol: 'Key Event: generate_lead',
        matchScore: '1:1 CRM Match',
        status: 'Verified',
      },
      {
        name: 'Google Ads Offline Sync',
        protocol: 'GCLID + Enhanced Conversions for Leads',
        matchScore: '9.6/10 Match Rate',
        status: 'Verified',
      },
      {
        name: 'LinkedIn & Meta Lead CAPI',
        protocol: 'Server-Side Lead Event + fbp/fbc',
        matchScore: '8.7/10 EMQ Score',
        status: 'Verified',
      },
      {
        name: 'CRM Pipeline (Zoho / HubSpot)',
        protocol: 'UTM Source + Campaign + Ad Creative',
        matchScore: '100% Attributed',
        status: 'Verified',
      },
    ],
    dataLayerPayload: `window.dataLayer.push({
  event: "generate_lead",
  event_id: "lead_wxc_77419",
  lead_context: {
    form_id: "enterprise_demo_modal",
    service_interest: "Analytics & Tracking Setup",
    budget_tier: "INR_1L_TO_3L",
    lead_value: 15000.00,
    currency: "INR"
  },
  attribution: {
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "ind_search_b2b_high_intent",
    gclid: "CjwKCAjw_4S3BhAAEiwA_64Yh..."
  }
});`,
  },
  {
    id: 'add_to_cart',
    eventName: 'add_to_cart',
    triggerLabel: 'add_to_cart',
    userActionDesc: 'Shopper clicks "Add to Bag" on slide-out AJAX cart drawer without page reload',
    tagManagerRule: 'Custom Event: add_to_cart | Dynamic Variant SKU & Price Listener',
    ga4Status: '200 OK • Funnel Step #2 Logged with Item Array',
    serverSideStatus: 'Meta AddToCart CAPI + Google Dynamic Remarketing Feed Matched',
    destinations: [
      {
        name: 'Google Analytics 4 (GA4)',
        protocol: 'Monetization Funnel: Add to Cart',
        matchScore: '100% SKU Match',
        status: 'Verified',
      },
      {
        name: 'Meta Dynamic Product Ads',
        protocol: 'content_ids Matched to Catalog ID',
        matchScore: '9.1/10 Catalog Sync',
        status: 'Verified',
      },
      {
        name: 'Google Merchant Center Feed',
        protocol: 'ecomm_prodid Dynamic Remarketing',
        matchScore: 'Verified Item ID',
        status: 'Verified',
      },
      {
        name: 'Klaviyo / Retention Flows',
        protocol: 'Added to Cart Trigger Webhook',
        matchScore: 'Real-Time Fire',
        status: 'Verified',
      },
    ],
    dataLayerPayload: `window.dataLayer.push({
  event: "add_to_cart",
  event_id: "cart_wxc_55104",
  ecommerce: {
    currency: "INR",
    value: 1899.00,
    items: [{
      item_id: "SKU-LINEN-SHIRT-L",
      item_name: "Artisan Coastal Linen Shirt",
      item_Category: "Men Apparel",
      item_variant: "Navy Blue / Large",
      price: 1899.00,
      quantity: 1
    }]
  }
});`,
  },
  {
    id: 'whatsapp_click',
    eventName: 'whatsapp_click',
    triggerLabel: 'whatsapp_click',
    userActionDesc: 'High-intent visitor taps floating WhatsApp button or "Chat on WhatsApp" CTA',
    tagManagerRule: 'Outbound Click Listener (wa.me / api.whatsapp.com) + Page Path Context',
    ga4Status: '200 OK • Micro-Conversion Logged with Landing Page URL',
    serverSideStatus: 'Custom Conversion Sent to Google Ads & Meta with Click ID Passthrough',
    destinations: [
      {
        name: 'Google Analytics 4 (GA4)',
        protocol: 'Custom Event: whatsapp_click',
        matchScore: 'Page + CTA Tracked',
        status: 'Verified',
      },
      {
        name: 'Google Ads Secondary Action',
        protocol: 'High-Intent Chat Initiation Signal',
        matchScore: 'Verified Tag',
        status: 'Verified',
      },
      {
        name: 'Meta Custom Event CAPI',
        protocol: 'WhatsApp_Lead_Click Server Event',
        matchScore: '8.5/10 EMQ Score',
        status: 'Verified',
      },
      {
        name: 'Looker Studio Lead Breakdown',
        protocol: 'Form vs Call vs WhatsApp Split',
        matchScore: 'Live Attribution',
        status: 'Verified',
      },
    ],
    dataLayerPayload: `window.dataLayer.push({
  event: "whatsapp_click",
  event_id: "wa_wxc_33912",
  interaction: {
    cta_location: "sticky_bottom_right_widget",
    page_path: "/services/analytics-tracking-setup",
    prefilled_message: "Hi WebXCode, I want a tracking audit",
    device_category: "mobile"
  },
  attribution: {
    source_medium: "google / organic",
    session_landing_page: "/services/seo-services"
  }
});`,
  },
];

/* ============================================================================
   STATIC DATA — SECTION 2: THE 8-POINT BROKEN TRACKING DIAGNOSTIC
============================================================================ */

const TRACKING_DIAGNOSTIC_QUESTIONS: TrackingDiagnosticQuestion[] = [
  {
    id: 'diag-1',
    number: '01',
    question:
      'Do Meta Ads, Google Ads and GA4 all show completely different conversion numbers for the same week?',
    whyItMatters:
      'Without unified event_id deduplication and attribution window alignment, ad platforms over-claim credit while GA4 under-reports.',
    fixSummary:
      'We implement shared event_id deduplication across Browser Pixel + Server CAPI and build a reconciled Looker Studio truth view.',
  },
  {
    id: 'diag-2',
    number: '02',
    question:
      'Did your tracking break after the GA4 migration, a theme redesign, or a checkout/payment gateway update?',
    whyItMatters:
      'Hardcoded scripts and fragile CSS-selector triggers silently stop firing whenever developers push UI updates or Razorpay/Shopify checkout changes.',
    fixSummary:
      'We replace brittle DOM-scrape triggers with a resilient, developer-spec dataLayer.push() architecture that survives UI updates.',
  },
  {
    id: 'diag-3',
    number: '03',
    question:
      'Are "Thank You" page refreshes or back-button clicks counting as 2 or 3 duplicate leads or purchases?',
    whyItMatters:
      'Pageview-based conversions inflate your reported ROAS and train Google/Meta smart bidding algorithms to optimize for fake duplicate events.',
    fixSummary:
      'We bind conversion tags to unique transaction_id / lead_id keys and fire strictly on verified server/AJAX callbacks—never raw page reloads.',
  },
  {
    id: 'diag-4',
    number: '04',
    question:
      'Is 30–60% of your best traffic showing up as "(direct) / (none)" or "Unassigned" inside GA4?',
    whyItMatters:
      'Missing cross-domain linker rules, payment gateway redirects (Razorpay/PayU/Cashfree), and messy UTM tags strip away the original ad or SEO source.',
    fixSummary:
      'We configure payment-gateway referral exclusions, cross-domain session stitching, and a strict team-wide UTM governance sheet.',
  },
  {
    id: 'diag-5',
    number: '05',
    question:
      'Are WhatsApp clicks, phone calls, PDF brochure downloads, or popup forms completely invisible in your reports?',
    whyItMatters:
      'In India and high-touch B2B markets, 40%+ of buyers initiate contact via WhatsApp or phone rather than filling out a standard HTML form.',
    fixSummary:
      'We track every WhatsApp tap, tel: click, Calendly booking, and multi-step modal with full landing-page and campaign context.',
  },
  {
    id: 'diag-6',
    number: '06',
    question:
      'Are iOS Safari users, Brave browsers, and ad-blockers hiding 25–35% of your real paid conversions?',
    whyItMatters:
      'Client-side browser cookies expire in 1–7 days under Apple ITP, and ad-blockers block standard gtm.js and fbevents.js scripts outright.',
    fixSummary:
      'We deploy first-party Server-Side GTM along with Meta CAPI and Google Enhanced Conversions to recover lost attribution legally.',
  },
  {
    id: 'diag-7',
    number: '07',
    question:
      'Does your CRM (Zoho, HubSpot, LeadSquared, Salesforce) have no idea which keyword or ad brought each lead?',
    whyItMatters:
      'Optimizing for "cheap leads" instead of "closed revenue" wastes budget on junk inquiries that sales teams immediately disqualify.',
    fixSummary:
      'We pass UTMs, GCLID, and FBCLID into hidden CRM fields and send Offline Conversion API (OCT) signals back when deals close.',
  },
  {
    id: 'diag-8',
    number: '08',
    question:
      'Are you still manually copying numbers from 4 tabs into Excel every Monday morning just to see weekly ROI?',
    whyItMatters:
      'Manual spreadsheet reporting wastes 4–6 hours every week and is always out of date by the time founders or marketing heads read it.',
    fixSummary:
      'We build an automated, live Looker Studio executive dashboard blending spend, leads, revenue, MER, and ROAS in one link.',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 3: 6-NODE CLEAN TRACKING PIPELINE ARCHITECTURE
============================================================================ */

const PIPELINE_NODES: PipelineNodeSpec[] = [
  {
    id: 1,
    stepCode: 'NODE 01',
    layerName: 'Website / App / Store',
    shortTitle: 'User Actions & First-Party Capture',
    subtitle: 'Product Views, Carts, Checkouts, Forms & WhatsApp Taps',
    iconName: 'Globe',
    statusBadge: 'SOURCE LAYER',
    whatHappensHere:
      'A visitor lands on your website, Shopify/WooCommerce store, or SaaS app with URL parameters (UTMs, GCLID, FBCLID) and interacts with products, pricing calculators, lead forms, or WhatsApp buttons.',
    commonBreakage:
      'Single-Page App (React/Next.js) route changes or payment gateway redirects wipe out the original landing page UTM and Click ID parameters before the user converts.',
    howWebXCodeSetsItUp: [
      'First-party cookie & session persistence script that stores initial UTMs, GCLID, FBCLID, and referrer across all pages',
      'Payment gateway referral exclusion list (Razorpay, Cashfree, PayU, Stripe, PayPal) so checkouts never show as "self-referrals"',
      'Zero-bloat asynchronous script loading that protects Core Web Vitals (LCP & INP)',
    ],
    samplePayloadOrRule: `// First-Party Attribution Persistence
sessionStorage.setItem("wxc_initial_utm", JSON.stringify({
  utm_source: "google",
  utm_campaign: "search_brand_2026",
  gclid: "CjwKCAjw_4S3BhAA...",
  landing_page: "/services/analytics-tracking-setup"
}));`,
    technicalKPI: '100% Session & Click-ID Retention Across Redirects',
  },
  {
    id: 2,
    stepCode: 'NODE 02',
    layerName: 'Consent & Privacy Layer',
    shortTitle: 'Consent Mode v2 & First-Party Governance',
    subtitle: 'GDPR, DPDP India & Google Consent Mode v2 Compliance',
    iconName: 'Sliders',
    statusBadge: 'COMPLIANCE GATE',
    whatHappensHere:
      'Before firing marketing tags, the consent layer checks user preferences and communicates regional consent states (ad_storage, analytics_storage, ad_user_data, ad_personalization) to Google and Meta.',
    commonBreakage:
      'Either firing all pixels illegally without consent (risking Google Ads account suspension in EEA/UK) or blocking GA4 completely so you lose 100% of behavioral modeling data.',
    howWebXCodeSetsItUp: [
      'Google Consent Mode v2 (Advanced & Basic) implementation with cookieless ping modeling',
      'PII scrubbing filters that strip plain-text names/emails from URLs before GA4 ingestion',
      'SHA-256 cryptographic hashing of email & phone numbers prior to Enhanced Conversions / CAPI transmission',
    ],
    samplePayloadOrRule: `gtag("consent", "update", {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted"
});`,
    technicalKPI: '100% Consent Mode v2 Verified • Zero PII Leak Alerts',
  },
  {
    id: 3,
    stepCode: 'NODE 03',
    layerName: 'Clean dataLayer & GTM Web',
    shortTitle: 'Standardized Event Schema & Tag Manager',
    subtitle: 'Structured dataLayer.push() + Clean GTM Container',
    iconName: 'Code2',
    statusBadge: 'SCHEMA ENGINE',
    whatHappensHere:
      'Your site pushes structured, documented events into window.dataLayer with exact item SKUs, order values, currencies, and unique event_id keys—consumed by a tidy, version-controlled GTM container.',
    commonBreakage:
      'Legacy GTM containers cluttered with 60+ paused tags, duplicate inline gtag.js scripts in header.php, and fragile "Click Text equals Submit" triggers.',
    howWebXCodeSetsItUp: [
      'Complete audit & cleanup of legacy duplicate tags, inline scripts, and orphaned pixels',
      'Developer-grade GA4 E-commerce & B2B Lead dataLayer specification document',
      'Strict naming conventions, folder organization, and workspace version notes inside GTM',
    ],
    samplePayloadOrRule: `dataLayer.push({
  event: "begin_checkout",
  event_id: "chk_99201_wxc",
  ecommerce: { currency: "INR", value: 4990.00, items: [...] }
});`,
    technicalKPI: 'Zero Duplicate Tag Fires • <35ms GTM Execution Overhead',
  },
  {
    id: 4,
    stepCode: 'NODE 04',
    layerName: 'Server-Side Tracking & CAPI',
    shortTitle: 'First-Party Cloud Endpoint & Event Deduplication',
    subtitle: 'sGTM Cloud Run / Stape + Meta CAPI + Enhanced Conversions',
    iconName: 'Server',
    statusBadge: 'SIGNAL RECOVERY',
    whatHappensHere:
      'Events are routed through your own first-party subdomain (e.g., metrics.yourdomain.com) to a Server-Side GTM container, bypassing browser ad-blockers and Apple ITP cookie caps.',
    commonBreakage:
      'Turning on Meta CAPI without matching event_id keys between Browser Pixel and Server—causing Meta to count every single purchase twice.',
    howWebXCodeSetsItUp: [
      'Custom first-party subdomain DNS & SSL setup (Stape.io or Google Cloud Run)',
      'Exact event_id deduplication between Web Pixel and Server CAPI (100% match parity)',
      'Enriched user_data payload (fbc, fbp, client_ip_address, client_user_agent, hashed email/phone)',
    ],
    samplePayloadOrRule: `// Server-Side Deduplication Header
{
  "event_name": "Purchase",
  "event_id": "evt_wxc_90482_ind", // Matches Web Pixel ID
  "action_source": "website",
  "event_time": 1759994102
}`,
    technicalKPI: '+22% to +31% Recovered Conversions • 8.8+/10 Meta EMQ',
  },
  {
    id: 5,
    stepCode: 'NODE 05',
    layerName: 'GA4, Ad Platforms & CRM Sync',
    shortTitle: 'Verified Destinations & Offline Conversion Loops',
    subtitle: 'GA4 Key Events, Google Ads, Meta Ads & CRM Pipeline',
    iconName: 'Target',
    statusBadge: 'ATTRIBUTION DESTINATIONS',
    whatHappensHere:
      'Clean, deduplicated conversion signals land in GA4, Google Ads, Meta Ads, LinkedIn Insight Tag, and your CRM—training ad algorithms on real buyers and qualified pipeline.',
    commonBreakage:
      'Ad platforms optimizing for top-of-funnel junk leads because offline CRM qualification ("Lead Marked SQL / Deal Won") is never sent back to Google or Meta.',
    howWebXCodeSetsItUp: [
      'GA4 custom dimensions, funnel explorations, internal traffic filters, and 14-month data retention',
      'Google Ads Primary vs Secondary conversion action hierarchy so Smart Bidding bids only on real revenue',
      'Hidden CRM field mapping + Offline Conversion Tracking (OCT) webhook from HubSpot/Zoho/Shopify',
    ],
    samplePayloadOrRule: `// Offline CRM SQL Sync -> Google Ads API
{
  "conversionAction": "customers/849201/conversionActions/sql_qualified",
  "gclid": "CjwKCAjw_4S3BhAA...",
  "conversionValue": 85000.00,
  "currencyCode": "INR"
}`,
    technicalKPI: '100% Verified Conversion Actions • Closed-Loop CRM ROI',
  },
  {
    id: 6,
    stepCode: 'NODE 06',
    layerName: 'Live Looker Studio Dashboards',
    shortTitle: 'Automated Executive & Channel Command Center',
    subtitle: 'Blended Spend, Revenue, CAC, MER & Funnel Drop-Off',
    iconName: 'PieChart',
    statusBadge: 'DECISION LAYER',
    whatHappensHere:
      'All ad spend (Google, Meta, LinkedIn), GA4 behavioral funnels, and actual Shopify/CRM revenue converge into a live, auto-refreshing Looker Studio dashboard.',
    commonBreakage:
      'Founders looking at GA4 native tables that nobody understands, or agencies sending cherry-picked PDF screenshots once a month.',
    howWebXCodeSetsItUp: [
      'Custom Looker Studio multi-page dashboard tailored to your business model (D2C E-commerce or B2B Lead Gen)',
      'Blended MER (Marketing Efficiency Ratio), true CPA/CPL, and creative/keyword-level breakdown',
      'Automated Monday 8:00 AM scheduled email/PDF delivery to leadership + 24/7 live shareable link',
    ],
    samplePayloadOrRule: `// Calculated Blended MER Field in Looker Studio
Blended_MER = SUM(Shopify_Net_Revenue_INR) / (SUM(Google_Ads_Spend) + SUM(Meta_Ads_Spend))
// Output: 4.62x Blended Return`,
    technicalKPI: 'Zero Manual Excel Work • 24/7 Real-Time Executive Clarity',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 4: THE 6 CORE CAPABILITIES (WHAT WE SET UP & FIX)
============================================================================ */

const CORE_CAPABILITIES: CoreTrackingCapability[] = [
  {
    id: 'cap-ga4',
    code: 'CAPABILITY 01',
    title: 'Google Analytics 4 (GA4) Setup, Cleanup & Custom Events',
    subtitle: 'Clean properties, real Key Events, and custom funnel explorations',
    badge: 'FOUNDATION',
    description:
      'Most GA4 properties are still running on broken auto-migrated settings that miss crucial actions and pollute reports with internal/referral spam. We configure GA4 from the ground up around your exact business KPIs.',
    deliverables: [
      'Property audit, data stream cleanup & 14-month retention activation',
      'Custom Key Events (lead forms, WhatsApp taps, calls, brochure downloads)',
      'Cross-domain tracking & Indian/Global payment gateway referral exclusions',
      'Custom Funnel & Path Explorations built inside your GA4 workspace',
    ],
    beforeState: 'Default pageviews only, 45% "Unassigned" traffic, zero funnel visibility',
    afterState: '100% custom events mapped, clean channel attribution & live funnel steps',
  },
  {
    id: 'cap-gtm',
    code: 'CAPABILITY 02',
    title: 'Google Tag Manager (GTM) & Clean DataLayer Engineering',
    subtitle: 'Structured dataLayer.push() code & organized, conflict-free containers',
    badge: 'ARCHITECTURE',
    description:
      'Stop pasting raw tracking scripts into your theme header. We consolidate every analytics and ad tag into a clean, version-controlled GTM container powered by a resilient developer dataLayer.',
    deliverables: [
      'Removal of legacy hardcoded gtag.js, duplicate pixels & dead 3rd-party scripts',
      'Custom dataLayer specification written & implemented for your dev stack',
      'AJAX form listeners, scroll-depth, video engagement & outbound click triggers',
      'Staging preview QA verification + clean GTM folder & version documentation',
    ],
    beforeState: '3 conflicting GTM/gtag snippets firing double events & slowing down LCP',
    afterState: 'Single lightweight GTM container with 100% QA-tested triggers',
  },
  {
    id: 'cap-ad-conversions',
    code: 'CAPABILITY 03',
    title: 'Ad Platform Conversion Tracking (Google, Meta, LinkedIn)',
    subtitle: 'Enhanced Conversions, Meta Pixel + CAPI & Primary/Secondary hierarchy',
    badge: 'ROAS ENGINE',
    description:
      'Smart Bidding on Google and Advantage+ on Meta are only as smart as the conversion signals you feed them. We wire high-accuracy conversion tags with dynamic values and user-match hashing.',
    deliverables: [
      'Google Ads Conversion Linker + Enhanced Conversions (hashed email/phone)',
      'Strict Primary vs Secondary action hierarchy (no bidding on pageviews)',
      'Meta Pixel + Conversions API (CAPI) with shared event_id deduplication',
      'LinkedIn Insight Tag, Microsoft UET & dynamic remarketing audience lists',
    ],
    beforeState: 'Meta & Google over-reporting by 40% or missing iOS conversions entirely',
    afterState: '8.8+/10 Event Match Quality & bidding algorithms trained on real buyers',
  },
  {
    id: 'cap-server-side',
    code: 'CAPABILITY 04',
    title: 'Server-Side Tracking & Cookie-Loss Recovery',
    subtitle: 'First-party cloud endpoints that survive ad-blockers and iOS Safari ITP',
    badge: 'HIGH PRECISION',
    description:
      'Browser-only tracking loses 25–35% of conversions due to ad-blockers, Brave browser, and Safari 7-day cookie expiration. We deploy first-party server-side tracking so your data stays durable.',
    deliverables: [
      'Server-Side GTM container provisioned on Stape.io or Google Cloud Run',
      'Custom first-party subdomain DNS mapping (e.g., sgtm.yourdomain.com)',
      'First-party cookie extension for Safari ITP & ad-blocker resilience',
      'Server-to-server payload routing for GA4, Meta CAPI & Google Ads',
    ],
    beforeState: '28% of paid orders invisible due to iOS Safari ITP & browser ad-blockers',
    afterState: 'First-party server stream recovering lost attribution with full deduplication',
  },
  {
    id: 'cap-ecommerce-crm',
    code: 'CAPABILITY 05',
    title: 'E-commerce Funnel & B2B CRM Attribution Sync',
    subtitle: 'Full SKU-level store funnels or GCLID-to-CRM offline revenue loops',
    badge: 'REVENUE LOOP',
    description:
      'Whether you sell products online or close B2B deals via a sales team, we connect top-of-funnel ad clicks all the way to net store revenue or closed CRM pipeline.',
    deliverables: [
      'Complete GA4 E-commerce schema (view_item, add_to_cart, begin_checkout, purchase)',
      'Coupon, tax, shipping, refund & SKU-level revenue reconciliation',
      'Hidden form field capture for UTMs, GCLID, FBCLID & landing page URL',
      'CRM integration (HubSpot, Zoho, LeadSquared) + Offline Conversion imports',
    ],
    beforeState: 'Sales team sees leads in CRM with "Unknown Source"; ads optimize for junk',
    afterState: 'Every CRM deal & store order tied back to exact campaign, ad & keyword',
  },
  {
    id: 'cap-dashboards',
    code: 'CAPABILITY 06',
    title: 'Live Looker Studio Dashboards & Consent Mode v2',
    subtitle: 'Executive KPI command centers + privacy-compliant tracking governance',
    badge: 'DECISION CLARITY',
    description:
      'Clean data is useless if it stays buried in complex GA4 menus. We build a clear, live Looker Studio dashboard for your leadership team alongside compliant Consent Mode v2.',
    deliverables: [
      'Custom live Looker Studio dashboard blending Google Ads, Meta, GA4 & CRM/Store',
      'Executive scorecard: Spend, Revenue, Blended MER, CPA, ROAS & Funnel Conversion %',
      'Google Consent Mode v2 banner integration (CookieYes / OneTrust / Custom)',
      'Automated weekly PDF/email report delivery + team walkthrough video',
    ],
    beforeState: 'Hours wasted every Monday morning stitching CSV exports into Excel',
    afterState: 'One live bookmark showing real-time spend, leads, revenue & ROI 24/7',
  },
];

/* ============================================================================
   HELPER ICON COMPONENT
============================================================================ */

const PipelineNodeIcon: React.FC<{
  name: PipelineNodeSpec['iconName'];
  className?: string;
}> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Globe':
      return <Globe className={className} />;
    case 'Sliders':
      return <Sliders className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Target':
      return <Target className={className} />;
    case 'PieChart':
      return <PieChart className={className} />;
    default:
      return <BarChart3 className={className} />;
  }
};

/* ============================================================================
   MAIN PAGE COMPONENT — ANALYTICS & TRACKING SETUP
============================================================================ */

const AnalyticsTrackingSetup: React.FC<AnalyticsTrackingSetupProps> = ({
  onOpenQuoteModal,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Single source of truth from Services.tsx
  const serviceEntry = useMemo(
    () =>
      services.find((s) => s.slug === 'analytics-tracking-setup') || {
        slug: 'analytics-tracking-setup',
        name: 'Analytics & Tracking Setup',
        category: 'SEO & Performance',
        badge: null,
        icon: 'BarChart3',
        tagline: 'GA4, Tag Manager, conversion pixels and clean attribution dashboards.',
        description:
          'Make marketing decisions on clean, trustworthy data. We configure GA4, Google Tag Manager, Meta CAPI, server-side tracking, CRM offline conversion sync, and executive Looker Studio dashboards.',
        bestFor: ['Performance Marketers', 'E-commerce & D2C Stores', 'B2B Pipeline Teams'],
        deliverables: [
          'GA4 & Google Tag Manager clean event architecture',
          'Meta Conversions API (CAPI) & Google Enhanced Conversions',
          'E-commerce dataLayer (view_item, add_to_cart, purchase)',
          'UTM governance & CRM lead-source attribution sync',
          'Cookie consent banner & privacy-compliant tracking',
          'Custom live Looker Studio executive KPI dashboard',
        ],
        typicalTimeline: '1–2 weeks',
        keyMetric: '100% event accuracy & +28% recovered ad attribution (placeholder)',
        relatedIndustries: ['ecommerce', 'finance-fintech', 'b2b-saas'],
        futurePagePath: '/services/analytics-tracking-setup',
      },
    []
  );

  // Section 1 State: Selected Live Event Stream Inspector
  const [selectedEventId, setSelectedEventId] =
    useState<TelemetryEventOption['id']>('purchase');

  const activeTelemetryEvent = useMemo(
    () =>
      TELEMETRY_EVENTS.find((evt) => evt.id === selectedEventId) ||
      TELEMETRY_EVENTS[0],
    [selectedEventId]
  );

  // Section 2 State: Interactive 8-Point Broken Tracking Diagnostic Checklist
  const [checkedDiagnosticIds, setCheckedDiagnosticIds] = useState<string[]>([
    'diag-1',
    'diag-4',
    'diag-6',
  ]);

  const toggleDiagnosticItem = (id: string) => {
    setCheckedDiagnosticIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const diagnosticVerdict = useMemo(() => {
    const count = checkedDiagnosticIds.length;
    if (count === 0) {
      return {
        tierLabel: '0 SELECTED • PREVENTIVE QA & DASHBOARD READY',
        headline: 'Your baseline looks healthy — ready for Server-Side CAPI or a live Looker Studio board',
        summary:
          'Even if your basic tags are firing, upgrading to Server-Side GTM and a unified Looker Studio executive dashboard typically recovers 15–25% of hidden iOS/ad-blocker conversions.',
        recommendedAction: 'Book a Preventive Tracking & Dashboard Review',
      };
    }
    if (count <= 2) {
      return {
        tierLabel: `${count} WARNING SIGN${count > 1 ? 'S' : ''} • TARGETED TRACKING CLEANUP NEEDED`,
        headline: 'Minor attribution blind spots are distorting your weekly channel ROI',
        summary:
          'You have isolated tracking gaps that cause GA4 and ad platforms to disagree. A 1-week GTM & dataLayer cleanup will align your conversion numbers and eliminate blind spots.',
        recommendedAction: 'Request a 1-Week Tracking Cleanup Quote',
      };
    }
    if (count <= 4) {
      return {
        tierLabel: `${count} CRITICAL LEAKS • AD ALGORITHMS FLYING PARTIALLY BLIND`,
        headline: 'Your ad campaigns and reports are making decisions on incomplete or duplicate data',
        summary:
          'With 3–4 tracking leaks active, Google and Meta bidding algorithms are either optimizing on duplicate signals or missing up to 30% of real conversions. We recommend a full GA4 + GTM + CAPI overhaul.',
        recommendedAction: 'Fix My Tracking & Attribution Pipeline',
      };
    }
    return {
      tierLabel: `${count} SEVERE DATA BLIND SPOTS • URGENT MEASUREMENT OVERHAUL`,
      headline: 'High risk of wasted ad spend — your tracking pipeline needs a clean rebuild',
      summary:
        'When 5+ symptoms are active, your reported CPA and ROAS cannot be trusted for scaling budget. Our tracking engineers can audit, rebuild, and QA your entire stack in 7–14 days.',
      recommendedAction: 'Get an Urgent 50-Point Tracking Audit',
    };
  }, [checkedDiagnosticIds]);

  // Section 3 State: Selected Pipeline Architecture Node (1..6)
  const [activePipelineNodeId, setActivePipelineNodeId] = useState<number>(4);

  const currentPipelineNode = useMemo(
    () =>
      PIPELINE_NODES.find((node) => node.id === activePipelineNodeId) ||
      PIPELINE_NODES[3],
    [activePipelineNodeId]
  );

  // SEO Meta Title & Description
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Analytics & Tracking Setup Services — GA4, GTM, Meta CAPI & Dashboards | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Make marketing decisions on data you can actually trust. WebXCode sets up and fixes GA4, Google Tag Manager, clean dataLayers, Server-Side Tracking, Meta CAPI, Enhanced Conversions, CRM attribution, and live Looker Studio dashboards.'
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
      window.dispatchEvent(
        new CustomEvent('open-quote-modal', { detail: label })
      );
    }
  };

  // JSON-LD Service Schema
  const serviceJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Analytics & Tracking Setup Services (GA4, GTM, Server-Side CAPI & Looker Studio)',
      serviceType: 'Web Analytics, Tag Management & Marketing Attribution Engineering',
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      description: serviceEntry.description,
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Analytics & Tracking Setup Deliverables',
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
          SECTION 1 — HERO: THE LIVE EVENT STREAM & DATALAYER CONSOLE
          (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial Primary Blue Glow + Subtle Telemetry Grid */}
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
            backgroundSize: '44px 44px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
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
                {serviceEntry.name}
              </li>
            </ol>
          </nav>

          {/* 55% Left / 45% Right Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-11 items-center">
            {/* Left 55% (7 cols on lg): Positioning, Copy, CTAs & 4 Stat Pills */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <BarChart3 className="w-3.5 h-3.5 text-primary" />
                <span>
                  {serviceEntry.category.toUpperCase()} • GA4, GTM, SERVER-SIDE &amp; ATTRIBUTION
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[46px] lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight">
                Stop Guessing Which Ads and Pages Work —{' '}
                <span className="text-primary">Track Every Lead, Sale and Rupee</span> with Data You
                Can Trust
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-2xl">
                Most businesses make ₹10L+ marketing decisions on broken GA4 properties, double-firing
                pixels, and missing iOS/WhatsApp conversions. We architect clean{' '}
                <strong className="text-white font-semibold">
                  Google Analytics 4, Google Tag Manager, Server-Side CAPI, Enhanced Conversions, CRM
                  attribution, and live Looker Studio dashboards
                </strong>{' '}
                so every click to revenue is accounted for.
              </p>

              {/* Best For Audience Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100 mr-1">
                  Built For:
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
                  onClick={() => triggerQuoteModal('Free Analytics & Tracking Audit')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free Tracking Audit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#tracking-pipeline"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See What We Set Up</span>
                </a>
              </div>

              {/* 4 Telemetry Benchmark Stat Pills */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  {
                    value: '100%',
                    label: 'Verified Event Accuracy',
                    note: 'Zero duplicate fires',
                  },
                  {
                    value: '+28%',
                    label: 'Recovered Attribution',
                    note: 'Server-Side + CAPI (placeholder)',
                  },
                  {
                    value: '1–2 Wks',
                    label: 'Typical Setup & QA',
                    note: 'Audit to live dashboard',
                  },
                  {
                    value: '24/7',
                    label: 'Live Looker Studio',
                    note: 'Real-time spend & ROI',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10"
                  >
                    <div className="font-mono text-[22px] sm:text-[25px] font-extrabold text-white tabular-nums leading-none">
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

            {/* Right 45% (5 cols on lg): Interactive Live Event Stream & DataLayer Inspector */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Console Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/90">
                      LIVE EVENT STREAM &amp; DATALAYER INSPECTOR
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/30 border border-primary/50 font-mono text-[10px] font-bold text-primary-100">
                    Deduplicated • 200 OK
                  </span>
                </div>

                {/* 4 Sample Event Trigger Pills */}
                <div className="mb-4">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-white/60 mb-2">
                    Click an Event to Inspect Live Payload &amp; Destinations:
                  </div>
                  <div
                    className="grid grid-cols-2 gap-2"
                    role="tablist"
                    aria-label="Sample Tracking Events"
                  >
                    {TELEMETRY_EVENTS.map((evt) => {
                      const active = evt.id === selectedEventId;
                      return (
                        <button
                          key={evt.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setSelectedEventId(evt.id)}
                          className={`px-3 py-2 rounded-xl font-mono text-[11.5px] font-bold text-left transition-all cursor-pointer flex items-center justify-between gap-1.5 border ${
                            active
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-navy/70 text-white/80 border-white/10 hover:border-primary/50 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{evt.triggerLabel}</span>
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              active ? 'bg-white' : 'bg-primary'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Event Pipeline + DataLayer Payload View */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTelemetryEvent.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3.5"
                  >
                    {/* 3-Step Mini Flow Strip */}
                    <div className="p-3.5 rounded-2xl bg-navy/90 border border-white/10 space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <span className="px-2 py-0.5 rounded bg-primary/25 text-primary-100 font-mono text-[10px] font-extrabold shrink-0 mt-0.5">
                          1. ACTION
                        </span>
                        <p className="text-[12.5px] text-white/90 font-medium leading-snug">
                          {activeTelemetryEvent.userActionDesc}
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                        <span className="px-2 py-0.5 rounded bg-primary/25 text-primary-100 font-mono text-[10px] font-extrabold shrink-0 mt-0.5">
                          2. GTM + sGTM
                        </span>
                        <p className="font-mono text-[11.5px] text-primary-100 leading-snug">
                          {activeTelemetryEvent.tagManagerRule}
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-extrabold shrink-0 mt-0.5">
                          3. CAPI SYNC
                        </span>
                        <p className="font-mono text-[11.5px] text-emerald-300 leading-snug">
                          {activeTelemetryEvent.serverSideStatus}
                        </p>
                      </div>
                    </div>

                    {/* Clean JSON dataLayer Preview */}
                    <div className="rounded-2xl bg-[#131820] border border-white/15 overflow-hidden">
                      <div className="px-3.5 py-2 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
                        <span className="font-mono text-[10.5px] font-bold text-primary-100 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-primary" />
                          <span>window.dataLayer • {activeTelemetryEvent.eventName}</span>
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 font-semibold">
                          Schema Validated ✓
                        </span>
                      </div>
                      <pre className="p-3.5 font-mono text-[11px] leading-[1.5] text-white/90 overflow-x-auto max-h-[195px]">
                        <code>{activeTelemetryEvent.dataLayerPayload}</code>
                      </pre>
                    </div>

                    {/* 4 Verified Destination Status Pills */}
                    <div className="grid grid-cols-2 gap-2">
                      {activeTelemetryEvent.destinations.map((dest) => (
                        <div
                          key={dest.name}
                          className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[11.5px] font-bold text-white truncate">
                              {dest.name}
                            </span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          </div>
                          <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-primary-100">
                            <span className="truncate">{dest.matchScore}</span>
                            <span className="text-emerald-300 font-bold">{dest.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — THE "IS YOUR TRACKING BROKEN?" 8-POINT DIAGNOSTIC
          (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span>SELF-DIAGNOSIS • 60-SECOND DATA HEALTH CHECK</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              8 Signs Your Current Analytics Is{' '}
              <span className="text-primary">Quietly Lying to You</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Broken tracking rarely shows an error message—it just silently reports wrong numbers
              while you scale budget on the wrong campaigns. Check any symptoms below that sound
              familiar in your business right now:
            </p>
          </div>

          {/* 8-Point Interactive Checklist Grid (2x4) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {TRACKING_DIAGNOSTIC_QUESTIONS.map((item) => {
              const isChecked = checkedDiagnosticIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleDiagnosticItem(item.id)}
                  role="checkbox"
                  aria-checked={isChecked}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleDiagnosticItem(item.id);
                    }
                  }}
                  className={`p-5 sm:p-6 rounded-[22px] border transition-all cursor-pointer flex flex-col justify-between select-none ${
                    isChecked
                      ? 'bg-primary-50/70 border-primary shadow-soft'
                      : 'bg-white border-navy-08 hover:border-primary/40'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-mono text-[11px] font-extrabold px-2.5 py-1 rounded-lg ${
                            isChecked
                              ? 'bg-primary text-white'
                              : 'bg-primary-50 text-primary'
                          }`}
                        >
                          SYMPTOM #{item.number}
                        </span>
                        {isChecked && (
                          <span className="font-mono text-[10.5px] font-bold text-primary uppercase">
                            Flagged in Audit
                          </span>
                        )}
                      </div>

                      <div
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                          isChecked
                            ? 'bg-primary border-primary text-white'
                            : 'border-navy-30 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 stroke-[2.5]" />}
                      </div>
                    </div>

                    <h3 className="mt-3.5 text-[16px] sm:text-[17.5px] font-extrabold text-navy leading-snug">
                      {item.question}
                    </h3>

                    <p className="mt-2 text-[13.5px] text-navy-70 leading-relaxed">
                      <strong className="text-navy font-semibold">Why it hurts ROI: </strong>
                      {item.whyItMatters}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy-08 flex items-start gap-2 text-[12.5px] font-semibold text-primary">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{item.fixSummary}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Diagnostic Verdict Banner */}
          <div className="mt-8 rounded-[24px] bg-navy text-white p-6 sm:p-8 lg:p-9 shadow-xl border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                  <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider">
                    {diagnosticVerdict.tierLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCheckedDiagnosticIds([])}
                    className="font-mono text-[11px] text-primary-100 hover:text-white underline cursor-pointer"
                  >
                    Reset Checklist
                  </button>
                </div>

                <h3 className="text-[21px] sm:text-[25px] font-extrabold text-white leading-snug">
                  {diagnosticVerdict.headline}
                </h3>

                <p className="mt-2 text-[14.5px] text-white/80 leading-relaxed">
                  {diagnosticVerdict.summary}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal(
                      `Analytics Audit (${checkedDiagnosticIds.length} Tracking Symptoms Flagged)`
                    )
                  }
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] shadow-soft transition-all cursor-pointer"
                >
                  <span>{diagnosticVerdict.recommendedAction}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <span className="font-mono text-[11.5px] text-primary-100 text-center lg:text-right">
                  We audit GA4, GTM, CAPI &amp; CRM attribution in 48 hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — INTERACTIVE TRACKING PIPELINE ARCHITECTURE (CLICK-TO-INSPECT)
          (bg: #f0f7fd)
      ====================================================================== */}
      <section
        id="tracking-pipeline"
        className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Server className="w-3.5 h-3.5 text-primary" />
              <span>END-TO-END MEASUREMENT ARCHITECTURE</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              How Clean Data Flows —{' '}
              <span className="text-primary">From First Click to Live Revenue Dashboard</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Great tracking is an engineered pipeline, not a pile of random plugins. Click any of
              the 6 architecture nodes below to inspect how we capture, validate, deduplicate, and
              visualize your customer journey.
            </p>
          </div>

          {/* 6-Node Horizontal Interactive Pipeline Diagram */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8"
            role="tablist"
            aria-label="Tracking Architecture Pipeline Nodes"
          >
            {PIPELINE_NODES.map((node) => {
              const isSelected = node.id === activePipelineNodeId;
              return (
                <button
                  key={node.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActivePipelineNodeId(node.id)}
                  className={`p-4 rounded-[20px] border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-lg -translate-y-0.5'
                      : 'bg-white text-navy border-navy-08 hover:border-primary'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2.5">
                      <span
                        className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {node.stepCode}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isSelected
                            ? 'bg-white/10 text-primary-100'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        <PipelineNodeIcon name={node.iconName} className="w-4 h-4" />
                      </div>
                    </div>

                    <div
                      className={`text-[14px] font-extrabold leading-snug ${
                        isSelected ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {node.layerName}
                    </div>
                  </div>

                  <div
                    className={`mt-3 pt-2 border-t font-mono text-[10px] font-bold flex items-center justify-between ${
                      isSelected
                        ? 'border-white/15 text-primary-100'
                        : 'border-navy-08 text-navy-60'
                    }`}
                  >
                    <span>{node.statusBadge}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Pipeline Node Deep-Dive Inspector Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPipelineNode.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-[24px] bg-white border border-navy-08 p-6 sm:p-8 lg:p-10 shadow-soft"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left 7 Cols: What happens, What usually breaks & How WebXCode engineers it */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 pb-4 border-b border-navy-08">
                      <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold uppercase">
                        {currentPipelineNode.stepCode} • {currentPipelineNode.statusBadge}
                      </span>
                      <span className="font-mono text-[12px] font-bold text-primary">
                        {currentPipelineNode.layerName}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[22px] sm:text-[27px] font-extrabold text-navy leading-snug">
                      {currentPipelineNode.shortTitle}
                    </h3>
                    <p className="text-[14px] font-bold text-primary mt-1">
                      {currentPipelineNode.subtitle}
                    </p>

                    {/* What Happens + What Usually Breaks */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100">
                        <div className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-primary mb-1.5">
                          1. ROLE IN YOUR DATA PIPELINE
                        </div>
                        <p className="text-[13.5px] text-navy leading-relaxed">
                          {currentPipelineNode.whatHappensHere}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80">
                        <div className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-rose-700 mb-1.5">
                          2. WHERE MOST SETUPS BREAK
                        </div>
                        <p className="text-[13.5px] text-navy leading-relaxed">
                          {currentPipelineNode.commonBreakage}
                        </p>
                      </div>
                    </div>

                    {/* How WebXCode Engineers This Layer */}
                    <div className="mt-5">
                      <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-2.5">
                        3. HOW WEBXCODE ARCHITECTS &amp; VERIFIES THIS NODE:
                      </div>
                      <ul className="space-y-2">
                        {currentPipelineNode.howWebXCodeSetsItUp.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-[14px] font-semibold text-navy"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stepper Navigation + CTA */}
                  <div className="pt-4 border-t border-navy-08 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActivePipelineNodeId((prev) => (prev === 1 ? 6 : prev - 1))
                        }
                        className="px-3.5 py-2 rounded-full border border-navy-15 hover:border-primary text-[12.5px] font-bold text-navy cursor-pointer transition-colors"
                      >
                        ← Prev Node
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActivePipelineNodeId((prev) => (prev === 6 ? 1 : prev + 1))
                        }
                        className="px-3.5 py-2 rounded-full bg-primary-50 hover:bg-primary text-primary hover:text-white text-[12.5px] font-bold cursor-pointer transition-colors"
                      >
                        Next Node (#{currentPipelineNode.id === 6 ? 1 : currentPipelineNode.id + 1}) →
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        triggerQuoteModal(
                          `Tracking Pipeline Setup (${currentPipelineNode.layerName})`
                        )
                      }
                      className="inline-flex items-center gap-1.5 text-[13.5px] font-extrabold text-primary hover:text-navy cursor-pointer"
                    >
                      <span>Audit This Layer on My Site</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right 5 Cols: Live Code/Config Spec + Technical KPI Card */}
                <div className="lg:col-span-5 rounded-[22px] bg-navy text-white p-5 sm:p-6 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                      <span className="font-mono text-[11px] font-bold text-primary-100 uppercase">
                        PRODUCTION IMPLEMENTATION SPEC
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-primary/30 font-mono text-[10px] font-bold text-white">
                        {currentPipelineNode.stepCode}
                      </span>
                    </div>

                    <div className="rounded-xl bg-[#131820] border border-white/15 p-4 overflow-x-auto">
                      <pre className="font-mono text-[11.5px] leading-[1.55] text-primary-100">
                        <code>{currentPipelineNode.samplePayloadOrRule}</code>
                      </pre>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-white/[0.05] border border-white/10">
                      <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/60">
                        VERIFIED SLA / BENCHMARK OUTCOME
                      </div>
                      <div className="mt-1 font-mono text-[14px] font-extrabold text-emerald-300">
                        {currentPipelineNode.technicalKPI}
                      </div>
                    </div>
                  </div>

                  {/* Pipeline Progress Bar */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between font-mono text-[11px] text-white/75 mb-1.5">
                      <span>Pipeline Stage {currentPipelineNode.id} of 6</span>
                      <span className="text-primary-100 font-bold">
                        {Math.round((currentPipelineNode.id / 6) * 100)}% Complete
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${(currentPipelineNode.id / 6) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — THE 6 CORE CAPABILITIES (WHAT WE SET UP & FIX)
          (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 lg:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>COMPLETE ANALYTICS &amp; ATTRIBUTION SCOPE</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Everything We Configure, Fix &amp; Automate{' '}
              <span className="text-primary">Across Your Measurement Stack</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Whether you need a clean GA4 + GTM foundation for a new website or a full Server-Side
              CAPI + CRM offline attribution warehouse for high-spend paid media, our tracking
              engineers handle the entire stack end to end.
            </p>
          </div>

          {/* 3x2 Grid of 6 Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {CORE_CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="rounded-[24px] bg-white border border-navy-08 hover:border-primary p-6 sm:p-7 shadow-soft hover:shadow-soft-hover transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Top Bar */}
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold uppercase">
                      {cap.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[10.5px] font-extrabold uppercase">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="text-[20px] sm:text-[21px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug">
                    {cap.title}
                  </h3>

                  <p className="mt-1.5 text-[13px] font-bold text-primary">
                    {cap.subtitle}
                  </p>

                  <p className="mt-3 text-[14px] text-navy-70 leading-relaxed">
                    {cap.description}
                  </p>

                  {/* 4 Concrete Deliverables */}
                  <ul className="mt-4 pt-4 border-t border-navy-08 space-y-2">
                    {cap.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[13px] font-semibold text-navy"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Before / After State Strip */}
                <div className="mt-6 pt-4 border-t border-navy-08 space-y-2">
                  <div className="p-2.5 rounded-xl bg-navy-08/40 border border-navy-08 text-[11.5px] text-navy-60 font-mono">
                    <strong className="text-navy uppercase mr-1">Before:</strong>
                    {cap.beforeState}
                  </div>
                  <div className="p-2.5 rounded-xl bg-primary-50 border border-primary-100 text-[11.5px] text-navy font-mono font-bold">
                    <strong className="text-primary uppercase mr-1">After:</strong>
                    {cap.afterState}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Related Services Cross-Link Bar */}
          <div className="mt-12 pt-8 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[14px] font-extrabold text-navy">
              Put Your Clean Tracking to Work Across Paid Media &amp; CRO:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/services/performance-marketing"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-colors"
              >
                <span>Performance Marketing</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/services/google-ads-sem"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-colors"
              >
                <span>Google Ads (SEM)</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/services/conversion-rate-optimization"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-colors"
              >
                <span>Conversion Rate Optimization (CRO)</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/services/ecommerce-development"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-colors"
              >
                <span>E-commerce Development</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/ai-solutions/ai-analytics-reporting"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary hover:bg-navy text-white border border-primary text-[13px] font-bold transition-colors"
              >
                <span>AI Analytics &amp; Reporting</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AnalyticsTrackingSetup;
