'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Sparkles,
  Megaphone,
  Layers,
  Presentation,
  Share2,
  LayoutGrid,
  Rocket,
  Eye,
  PenTool,
  FileText,
  Film,
  Compass,
  Award,
  CheckCircle2,
  Sliders,
  Zap,
  MessageSquare,
} from 'lucide-react';
import { services } from '@/app/services/_components/Services';

/* ============================================================================
   TYPES & INTERFACES — CREATIVE & COMMUNICATION (PART 1: SECTIONS 1–4)
============================================================================ */

export interface CreativeCommunicationProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

type CreativeBoardTabId = 'ad-campaign' | 'social-carousel' | 'pitch-deck' | 'launch-kit';

interface CreativeBoardShowcase {
  id: CreativeBoardTabId;
  tabLabel: string;
  formatTag: string;
  campaignTitle: string;
  clientArchetype: string;
  bigIdeaHook: string;
  subCopy: string;
  ctaLabel: string;
  artDirectionNote: string;
  copyStructureNote: string;
  deliverableFormats: string[];
  benchmarkLift: string;
}

interface CreativeNeedScenario {
  id: string;
  code: string;
  title: string;
  whoItFits: string;
  problemStatement: string;
  creativeSolution: string;
  typicalTimeline: string;
  coreAssets: string[];
  benchmarkOutcome: string;
}

interface CreativeDisciplineStream {
  id: string;
  streamNumber: string;
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  whatWeProduce: string[];
  specimenType:
    | 'campaign-key-art'
    | 'paid-ad-pack'
    | 'social-system'
    | 'pitch-deck-slides'
    | 'sales-collateral'
    | 'launch-rollout';
  craftStandard: string;
}

type CampaignVerticalId = 'd2c-drop' | 'b2b-saas-launch' | 'luxury-real-estate';

interface CampaignIdeaBlueprint {
  id: CampaignVerticalId;
  tabName: string;
  industryTag: string;
  theInsight: string;
  theBigIdea: string;
  keyVisualConcept: {
    artDirection: string;
    colorMood: string;
    headlineOnVisual: string;
    sublineOnVisual: string;
    badgeCallout: string;
  };
  headlineVariations: {
    angle: string;
    hook: string;
    channelFit: string;
  }[];
  channelRollout: {
    channel: string;
    formatSpec: string;
    executionNote: string;
  }[];
}

/* ============================================================================
   STATIC DATA — SECTION 1: THE MULTI-FORMAT CREATIVE DIRECTOR'S BOARD
============================================================================ */

const CREATIVE_BOARD_TABS: CreativeBoardShowcase[] = [
  {
    id: 'ad-campaign',
    tabLabel: '01. Paid Ad Campaign',
    formatTag: 'META / LINKEDIN / YOUTUBE THUMB-STOPPER',
    campaignTitle: 'Zero-Bloat Cloud ERP Switch Campaign',
    clientArchetype: 'B2B SaaS & High-Growth D2C Acquisition',
    bigIdeaHook: 'Still Running a ₹50 Cr Factory on 19 Spreadsheet Tabs?',
    subCopy:
      'Switch to real-time GST, inventory & dispatch automation in 14 days—without pausing floor operations.',
    ctaLabel: 'Watch 90-Sec Live Floor Demo →',
    artDirectionNote:
      'High-contrast split visual: chaotic red-alert spreadsheet stack vs calm dark-mode telemetry UI with bold numeric callouts.',
    copyStructureNote:
      'Pain-agitation headline + quantified 14-day speed promise + low-friction video preview CTA.',
    deliverableFormats: ['1:1 Feed (1080×1080)', '9:16 Reels/Story (1080×1920)', '1.91:1 LinkedIn'],
    benchmarkLift: '+62% Higher Ad CTR vs Generic Stock Templates (placeholder)',
  },
  {
    id: 'social-carousel',
    tabLabel: '02. Social Carousel',
    formatTag: 'INSTAGRAM & LINKEDIN SWIPE SYSTEM',
    campaignTitle: '5 Signs Your Skincare Actives Are Canceling Each Other Out',
    clientArchetype: 'Clinical D2C Skincare & Consumer Education',
    bigIdeaHook: 'Slide 01/05: Mixing Retinol + Vitamin C at 10 PM? Read This First.',
    subCopy:
      'Editorial swipe architecture engineered for Saves, Shares, and DMs—turning complex product science into 5 effortless slides.',
    ctaLabel: 'Save Routine Cheat-Sheet • Link in Bio',
    artDirectionNote:
      'Continuous horizontal seam graphic across slides 1→5, tactile macro serum swatches, and strict typographic hierarchy.',
    copyStructureNote:
      'Curiosity hook on Slide 1 → 3 scannable myth-vs-fact slides → routine builder CTA on Slide 5.',
    deliverableFormats: ['5–10 Slide Seamless Carousels', 'Editable Figma & Canva Master Grids'],
    benchmarkLift: '3.4× More Saves & Organic Shares per Post (placeholder)',
  },
  {
    id: 'pitch-deck',
    tabLabel: '03. Investor & Sales Deck',
    formatTag: 'SERIES A PITCH & ENTERPRISE B2B DECK',
    campaignTitle: 'Series A Narrative & Enterprise Sales Master Deck',
    clientArchetype: 'Founders Raising Capital & Enterprise Sales Teams',
    bigIdeaHook: 'Slide 04: Capturing India’s $18B Cold-Chain Logistics Gap',
    subCopy:
      'We transform text-heavy 45-slide PowerPoint dumps into crisp, executive-ready visual narratives with custom diagrams and unit-economics charts.',
    ctaLabel: '28 Custom Slides • 16:9 Widescreen',
    artDirectionNote:
      'One core takeaway per slide, bespoke isometric architecture diagrams, and clean tabular financial callouts.',
    copyStructureNote:
      'Headline states the conclusion ("3.8× LTV:CAC in Tier-1 Hubs") so busy VCs and CXOs grasp the story in 5 seconds.',
    deliverableFormats: ['Figma Deck', 'Google Slides Master', 'Editable PowerPoint (.PPTX) + PDF'],
    benchmarkLift: 'Used in ₹120 Cr+ Client Fundraising & Enterprise Deals (placeholder)',
  },
  {
    id: 'launch-kit',
    tabLabel: '04. Product Launch Kit',
    formatTag: '360° OMNI-CHANNEL DROP SYSTEM',
    campaignTitle: 'Festive Capsule Collection & Flagship Store Launch',
    clientArchetype: 'D2C Launches, New Product Lines & Event Rollouts',
    bigIdeaHook: 'THE MIDNIGHT ARTISAN DROP • LIVE IN 48 HOURS',
    subCopy:
      'One cohesive campaign key visual adapted across website hero banners, WhatsApp VIP broadcasts, email teasers, PR lookbooks, and retail standees.',
    ctaLabel: 'Unlock Early VIP Access →',
    artDirectionNote:
      'Unified hero key art, countdown badge system, digital lookbook spreads, and print-ready exhibition/packaging sleeves.',
    copyStructureNote:
      '3-phase launch arc: 7-day Teaser mystery → Launch Day urgency hook → 72-hour social proof & scarcity follow-up.',
    deliverableFormats: ['Web Hero Banners', 'Email + WhatsApp Graphics', 'Lookbook PDF & Print OOH'],
    benchmarkLift: '100% Visual Cohesion Across 8+ Launch Touchpoints',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 2: WHEN YOU NEED CREATIVE & COMMUNICATION
============================================================================ */

const CREATIVE_SCENARIOS: CreativeNeedScenario[] = [
  {
    id: 'ad-fatigue',
    code: 'SCENARIO 01',
    title: 'Your Paid Ads Have Hit Creative Fatigue',
    whoItFits:
      'D2C brands and lead-gen teams spending ₹2L–₹50L/month on Meta, LinkedIn, or YouTube whose CTR has dropped and CPA keeps creeping up.',
    problemStatement:
      'Media buyers can tweak bidding all day, but today creative IS targeting. Recycled Canva graphics and generic stock photos get scrolled past in 0.4 seconds.',
    creativeSolution:
      'High-Velocity Performance Creative Packs (3 Distinct Hook Angles × 4 Ad Formats)',
    typicalTimeline: '7–10 Days or Monthly Retainer',
    coreAssets: [
      'Competitor Ad Library teardown & customer pain-point hook matrix',
      '12 to 24 static, carousel & motion-storyboard ad creatives per sprint',
      'Problem-first, social-proof, founder-note & comparison visual concepts',
      'Safe-zone calibrated exports for 1:1 Feed, 4:5 Portrait & 9:16 Reels/Stories',
    ],
    benchmarkOutcome:
      'Fresh winning ad concepts every month that lower CPA and unlock higher ad spend scale.',
  },
  {
    id: 'deck-upgrade',
    code: 'SCENARIO 02',
    title: 'Your Sales or Investor Deck Undersells Your Company',
    whoItFits:
      'Founders pitching VCs/institutional partners or B2B sales teams closing ₹10L–₹2Cr enterprise contracts with an outdated slide deck.',
    problemStatement:
      'Your product or service is world-class, but your presentation is a wall of bullet points, mismatched screenshots, and broken charts that lose the room.',
    creativeSolution:
      'Story-Driven Pitch Deck & B2B Sales Collateral Redesign',
    typicalTimeline: '2 Weeks',
    coreAssets: [
      'Slide-by-slide narrative restructuring & executive headline copywriting',
      'Custom product architecture diagrams, process flows & comparison tables',
      '20–35 bespoke widescreen slides delivered in Figma, Google Slides & PPTX',
      'Matching 2-page PDF Leave-Behind / Company Profile brochure for procurement',
    ],
    benchmarkOutcome:
      'Walk into boardrooms and investor calls with a deck that commands instant authority.',
  },
  {
    id: 'launch-campaign',
    code: 'SCENARIO 03',
    title: 'You Are Launching a New Product, Collection or Event',
    whoItFits:
      'Brands gearing up for a flagship product release, seasonal collection drop, trade-show booth, or new market expansion.',
    problemStatement:
      'Launches fall flat when the website banner, Instagram grid, email blast, and sales brochure are designed last-minute by different people with no central idea.',
    creativeSolution:
      '360° Campaign Concept, Key Visual & Multi-Channel Launch Kit',
    typicalTimeline: '2–3 Weeks',
    coreAssets: [
      'Central campaign "Big Idea", launch theme, tagline & messaging hierarchy',
      'Hero Campaign Key Art adapted for desktop/mobile web banners & marketplaces',
      'Teaser, Launch Day & Last-Chance social grid + WhatsApp/Email visual kits',
      'Digital product lookbook, press kit & exhibition booth/standee graphics',
    ],
    benchmarkOutcome:
      'Create an unmistakable, synchronized launch moment across every digital and offline channel.',
  },
  {
    id: 'social-system',
    code: 'SCENARIO 04',
    title: 'Your Social Feed & Brand Communication Feel Random',
    whoItFits:
      'Growing companies whose Instagram, LinkedIn, and marketing emails lack a consistent visual voice—or whose internal team wastes hours starting from blank canvases.',
    problemStatement:
      'Every post looks like a different template. Without a modular communication system, your brand looks fragmented and your marketing team bottlenecks on design.',
    creativeSolution:
      'Modular Social Design System & Editable Figma/Canva Template Library',
    typicalTimeline: '2 Weeks Setup (or Ongoing Studio Partner)',
    coreAssets: [
      '4–5 defined content-pillar visual formats (educational, proof, product, culture)',
      '25+ bespoke, drag-and-drop master templates in Figma and Canva Pro',
      'Custom carousel swipe frameworks, quote cards, stat callouts & reel covers',
      ' Brand voice microcopy rules & caption hook bank for your in-house team',
    ],
    benchmarkOutcome:
      'Publish studio-grade social and marketing content 3× faster without ever breaking brand consistency.',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 3: 6 CREATIVE & COMMUNICATION STREAMS (WHAT WE CREATE)
============================================================================ */

const CREATIVE_STREAMS: CreativeDisciplineStream[] = [
  {
    id: 'stream-campaign-concepts',
    streamNumber: '01',
    name: 'Campaign Concepts & Visual Key Art',
    subtitle: 'The central "Big Idea", campaign theme, hero visuals & art direction',
    badge: 'CREATIVE DIRECTION',
    description:
      'Great campaigns start with a sharp human truth—not a random stock photo. We develop the central creative concept, campaign headline, and master Key Visual (KV) that anchors your entire seasonal, product, or brand campaign.',
    whatWeProduce: [
      '2–3 distinct campaign territories with strategic rationale & moodboards',
      'Master Campaign Key Visual (KV) & composited product/lifestyle art direction',
      'Campaign headline lockups, thematic badges & visual storytelling rules',
      'Adaptation master guide for web, paid media, retail, and out-of-home (OOH)',
    ],
    specimenType: 'campaign-key-art',
    craftStandard:
      'Every concept is stress-tested in a 3-second mobile scroll test and a 30-foot billboard legibility check.',
  },
  {
    id: 'stream-paid-ads',
    streamNumber: '02',
    name: 'Performance Ad Creatives (Meta, LinkedIn, Display & YouTube)',
    subtitle: 'Thumb-stopping static, carousel & video-storyboard ad packs built for ROAS',
    badge: 'HIGH-CTR AD ENGINE',
    description:
      'We bridge creative studio craft with performance marketing psychology. Every ad pack is engineered around proven conversion hooks—us-vs-them comparisons, founder notes, before/after proof, and quantified benefit callouts.',
    whatWeProduce: [
      'Multi-angle static ad sets (Problem/Solution, Social Proof, Feature Callout, Offer)',
      'High-retention multi-card Meta & LinkedIn carousel ad sequences',
      'Short-form UGC & motion video ad scripts, hook boards & visual storyboards',
      'Multi-ratio delivery: 1:1 Square, 4:5 Feed, 9:16 Reels/Stories & 1.91:1 Landscape',
    ],
    specimenType: 'paid-ad-pack',
    craftStandard:
      'Designed with strict platform safe-zones so UI buttons and captions never cover your headline or CTA.',
  },
  {
    id: 'stream-decks',
    streamNumber: '03',
    name: 'Investor Pitch Decks & Enterprise Sales Presentations',
    subtitle: 'Narrative-driven slide decks that win funding, partnerships & B2B contracts',
    badge: 'EXECUTIVE STORYTELLING',
    description:
      'Decision-makers don’t read dense slides—they scan headlines and diagrams. We restructure your story arc, sharpen every slide title, and design custom visual diagrams that make complex businesses feel inevitable.',
    whatWeProduce: [
      'Investor Pitch Decks (Seed, Series A/B, PE & Strategic M&A presentations)',
      'Enterprise B2B Sales Decks, credential presentations & demo walkthroughs',
      'Bespoke data visualizations, TAM/SAM charts, unit economics & architecture diagrams',
      'Delivered in 100% editable Figma, Google Slides, PowerPoint (.PPTX) & interactive PDF',
    ],
    specimenType: 'pitch-deck-slides',
    craftStandard:
      'Built on master slide layouts with embedded fonts so your team can edit numbers 5 minutes before a meeting.',
  },
  {
    id: 'stream-social-systems',
    streamNumber: '04',
    name: 'Social Media Design Systems & Carousel Architecture',
    subtitle: 'Scroll-stopping Instagram/LinkedIn grids, seamless carousels & Canva/Figma kits',
    badge: 'ORGANIC AUTHORITY',
    description:
      'Turn your social channels into a cohesive editorial magazine. We design custom carousel systems, infographic templates, and reel cover frameworks that earn bookmarks, shares, and inbound DMs.',
    whatWeProduce: [
      'Cohesive 9-grid / 12-grid visual planning & content-pillar color coding',
      'Seamless multi-slide educational & storytelling carousels for Instagram & LinkedIn',
      'Reel/Shorts cover systems, story highlight icons & interactive poll frames',
      'Editable Figma & Canva Pro master template libraries for your in-house team',
    ],
    specimenType: 'social-system',
    craftStandard:
      'Engineered for high "Save-to-Impression" ratios using clear typographic pacing and visual cliffhangers.',
  },
  {
    id: 'stream-collateral',
    streamNumber: '05',
    name: 'Company Profiles, Digital Lookbooks & Event Collateral',
    subtitle: 'Brochures, product catalogs, case study PDFs & exhibition booth graphics',
    badge: 'DIGITAL & PRINT CRAFT',
    description:
      'When high-value buyers ask "Can you send over your brochure or catalog?", what you send defines your price point. We craft editorial-grade digital lookbooks, B2B capability brochures, and trade-show graphics.',
    whatWeProduce: [
      'Corporate capability brochures, B2B one-pagers & downloadable whitepapers',
      'D2C & fashion seasonal digital lookbooks, line sheets & product catalogs',
      'Print-ready exhibition booth backdrops, podium wraps, standees & lanyards',
      'Interactive hyperlinked PDFs optimized for instant WhatsApp & email sharing',
    ],
    specimenType: 'sales-collateral',
    craftStandard:
      'Dual-calibrated deliverables: lightweight <5MB interactive PDFs for WhatsApp + 300 DPI CMYK bleed files for print.',
  },
  {
    id: 'stream-launch-kits',
    streamNumber: '06',
    name: 'Product Launch Kits, Email Visuals & Lifecycle Communication',
    subtitle: 'Website hero banners, email campaign headers, WhatsApp cards & countdown kits',
    badge: 'OMNI-CHANNEL ROLLOUT',
    description:
      'Keep your message razor-sharp from the first teaser to post-launch follow-up. We produce the complete visual asset pack for product launches, festive sales, and lifecycle email/WhatsApp campaigns.',
    whatWeProduce: [
      'Website desktop/mobile hero banners, promotional strips & popup graphics',
      'Custom visual headers & product story blocks for Klaviyo/HubSpot emails',
      'High-conversion WhatsApp broadcast cards & festive campaign creative packs',
      'Launch countdown assets, PR media kits & influencer unboxing inserts',
    ],
    specimenType: 'launch-rollout',
    craftStandard:
      'Every asset shares one unified visual language so customers recognize your campaign across 6+ touchpoints.',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 4: ANATOMY OF A CAMPAIGN IDEA (INSIGHT -> BIG IDEA -> ROLLOUT)
============================================================================ */

const CAMPAIGN_BLUEPRINTS: CampaignIdeaBlueprint[] = [
  {
    id: 'd2c-drop',
    tabName: '01. D2C Skincare & Consumer Launch',
    industryTag: 'D2C BEAUTY • CLINICAL SUNSCREEN LAUNCH',
    theInsight:
      'Indian shoppers love SPF 50 protection, but 68% stop wearing sunscreen daily because heavy creams feel sticky, leave a chalky white cast in humid weather, and pill under makeup.',
    theBigIdea:
      '"SPF That Feels Like Second Skin — Zero Cast. Zero Grease. 100% Clinical Shield."',
    keyVisualConcept: {
      artDirection:
        'Split macro UV-camera portrait + crystal-clear gel texture swatch smeared directly over dark & medium Indian skin tones under harsh midday sunlight.',
      colorMood: 'Clinical Cobalt (#0571C2) + UV Amber Accent + Crisp Lab White',
      headlineOnVisual: 'The Invisible SPF 50 Built for 40°C Indian Summers.',
      sublineOnVisual: 'Tested on 4 Indian Skin Tones • 0% White Cast • Water-Light Gel',
      badgeCallout: 'CLINICALLY PROVEN • PA++++',
    },
    headlineVariations: [
      {
        angle: 'Problem / Agitation Hook (Meta Feed & Reels)',
        hook: 'Tired of Sunscreens That Make You Look Like a Chalkboard by Noon?',
        channelFit: 'Cold Acquisition • 4:5 Portrait & 9:16 Video Hook',
      },
      {
        angle: 'Scientific Proof & Comparison Hook (Carousel)',
        hook: 'Heavy Cream SPF vs Weightless Water-Gel: See the 4-Hour Sweat Test.',
        channelFit: 'Mid-Funnel Education • 5-Slide Instagram Carousel',
      },
      {
        angle: 'Offer & Bundle Hook (Retargeting & WhatsApp)',
        hook: 'Summer UV Shield Kit: Get the Travel Mini Free on Every 2-Pack Today.',
        channelFit: 'Bottom-Funnel Conversion • Story Ad & WhatsApp Broadcast',
      },
    ],
    channelRollout: [
      {
        channel: 'Meta & YouTube Paid Ads',
        formatSpec: '12 Ad Variants (4:5, 1:1, 9:16)',
        executionNote: '3-second texture smear visual hook + dermatologist quote overlay',
      },
      {
        channel: 'Website & Marketplace Hero',
        formatSpec: 'Desktop 1920px + Mobile 750px + Amazon A+ Cards',
        executionNote: 'Interactive shade-test comparison banner & ingredient breakdown modules',
      },
      {
        channel: 'Email & WhatsApp VIP Drop',
        formatSpec: '3-Part Launch Sequence + Broadcast Cards',
        executionNote: '48-hour early access countdown gif + 1-tap checkout product cards',
      },
    ],
  },
  {
    id: 'b2b-saas-launch',
    tabName: '02. B2B SaaS & Enterprise Campaign',
    industryTag: 'B2B FINTECH / SAAS • AUTOMATED AP & GST RECONCILIATION',
    theInsight:
      'CFOs and finance controllers don’t buy software for "AI buzzwords"—they buy it because their team loses 9 days every month manually matching 4,000 vendor invoices against GST portal entries.',
    theBigIdea:
      '"Close Your Monthly Books in 4 Hours, Not 9 Days — 100% Automated GST & Invoice Match."',
    keyVisualConcept: {
      artDirection:
        'Clean architectural blueprint split: 14 messy PDF/Excel vendor bills entering a precision cobalt verification engine and outputting a single green "100% ITC Reconciled" ledger.',
      colorMood: 'Executive Navy (#1E242E) + Signal Blue (#0571C2) + Verified Emerald',
      headlineOnVisual: 'Stop Losing 6% of Your Input Tax Credit to Manual Excel Errors.',
      sublineOnVisual: 'Auto-reconcile SAP, Tally & Zoho Books in real time.',
      badgeCallout: 'SOC2 TYPE II • ENTERPRISE READY',
    },
    headlineVariations: [
      {
        angle: 'Quantified CFO Pain Hook (LinkedIn Sponsored)',
        hook: 'How Much Input Tax Credit Did Unmatched Vendor Invoices Cost You Last Quarter?',
        channelFit: 'CFO & Finance Head Targeting • LinkedIn Single Image',
      },
      {
        angle: 'Workflow Transformation Hook (LinkedIn Document Ad)',
        hook: 'The 5-Step Playbook Top Indian CFOs Use to Cut Month-End Close by 80%.',
        channelFit: 'Lead-Magnet Carousel • 7-Page Swipeable PDF Ad',
      },
      {
        angle: 'Social Proof & ROI Hook (Sales Deck & Retargeting)',
        hook: 'See How 140+ Enterprise Finance Teams Recovered ₹1.8 Cr in Missed Tax Credits.',
        channelFit: 'Enterprise Sales Deck + Case Study One-Pager',
      },
    ],
    channelRollout: [
      {
        channel: 'LinkedIn & Google Display Ads',
        formatSpec: '1.91:1 Landscape + 4:5 Native Document Carousels',
        executionNote: 'High-contrast ROI calculator visuals & swipeable CFO checklist',
      },
      {
        channel: 'Enterprise Sales & Demo Deck',
        formatSpec: '26-Slide Widescreen Deck (Figma + PPTX)',
        executionNote: 'Custom ERP integration architecture diagram & live ROI calculator slide',
      },
      {
        channel: 'Executive Whitepaper & Booth',
        formatSpec: '12-Page Interactive PDF + CFO Summit Backdrop',
        executionNote: 'QR-enabled benchmark report & clean tabular comparison matrices',
      },
    ],
  },
  {
    id: 'luxury-real-estate',
    tabName: '03. Luxury, Architecture & High-Ticket',
    industryTag: 'LUXURY INTERIORS & BOUTIQUE REAL ESTATE • FLAGSHIP LAUNCH',
    theInsight:
      'HNI buyers and luxury homeowners are immune to loud "Book Now / Limited Units!" real-estate clichés. They respond to quiet architectural provenance, material craft, and private invitation.',
    theBigIdea:
      '"Crafted for Generations, Reserved for Twenty-Four Families — Private Sky Villas."',
    keyVisualConcept: {
      artDirection:
        'Editorial magazine spread aesthetic: warm golden-hour architectural photography framed with generous alabaster margins, serif typography, and architectural floor-plan linework.',
      colorMood: 'Deep Charcoal Navy + Warm Travertine Cream + Architectural Blueprint Blue',
      headlineOnVisual: 'Where Double-Height Light Meets Private Botanical Courtyards.',
      sublineOnVisual: 'By Private Appointment Only • Lutyens & South Mumbai',
      badgeCallout: 'ARCHITECTURAL EDITION • 2026',
    },
    headlineVariations: [
      {
        angle: 'Editorial Provenance Hook (Instagram & Print)',
        hook: '4,800 Sq. Ft. of Hand-Cut Italian Travertine and Uninterrupted Forest Views.',
        channelFit: 'HNI Brand Awareness • Editorial Carousel & Print Spread',
      },
      {
        angle: 'Craft & Detail Hook (Digital Lookbook)',
        hook: 'Inside the Acoustic Engineering and Private Elevator Lobby of Residence 09.',
        channelFit: 'In-Depth Consideration • 24-Page Digital Coffee-Table Book',
      },
      {
        angle: 'Private Concierge Hook (Direct Invite & WhatsApp)',
        hook: 'Request the Private Floor Plan Dossier & Sunset Viewing Slot.',
        channelFit: 'High-Intent HNI Lead Capture • Personal Concierge Deck',
      },
    ],
    channelRollout: [
      {
        channel: 'Digital Coffee-Table Lookbook',
        formatSpec: '28-Page Editorial Brochure (Print + WhatsApp PDF)',
        executionNote: 'Architectural elevation drawings, material swatches & neighbourhood map',
      },
      {
        channel: 'Meta & Luxury Portal Creatives',
        formatSpec: '4:5 Editorial Frames & 9:16 Walkthrough Storyboards',
        executionNote: 'Minimalist typography overlays that let architectural photography breathe',
      },
      {
        channel: 'Private Viewing & Lounge Kit',
        formatSpec: 'Presentation Deck + Hardbound Print Dossier',
        executionNote: 'Foil-stamped presentation folder, floor-plan plates & private invite cards',
      },
    ],
  },
];

/* ============================================================================
   MAIN PAGE COMPONENT — CREATIVE & COMMUNICATION
============================================================================ */

const CreativeCommunication: React.FC<CreativeCommunicationProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Single source of truth from Services.tsx
  const serviceEntry = useMemo(
    () =>
      services.find((s) => s.slug === 'creative-communication') || {
        slug: 'creative-communication',
        name: 'Creative & Communication',
        category: 'Brand & Content',
        badge: null,
        icon: 'Sparkles',
        tagline: 'Ad creatives, social design systems, pitch decks and brand campaigns.',
        description:
          'Turn your brand strategy into thumb-stopping campaign visuals, investor/sales pitch decks, product launch kits, and social design systems that keep your brand consistent across every channel.',
        bestFor: ['Collection & Product Drops', 'B2B Sales & Investor Decks', 'Social-First Brands'],
        deliverables: [
          'Campaign creative concept & visual key art',
          'Paid ad static & carousel creative packs (Meta/LinkedIn)',
          'Sales presentations, investor pitch decks & company profiles',
          'Social media grid templates & launch countdown assets',
          'Exhibition, brochure & digital lookbook design',
          'Editable Figma/Canva master templates for your team',
        ],
        typicalTimeline: '2–3 weeks or monthly creative retainer',
        keyMetric: '+62% higher ad click-through rate with custom creatives (placeholder)',
        relatedIndustries: ['fashion-lifestyle', 'home-decor-furniture', 'b2b-saas'],
        futurePagePath: '/services/creative-communication',
      },
    []
  );

  // Section 1 State: Interactive Multi-Format Creative Director's Board
  const [selectedBoardTabId, setSelectedBoardTabId] =
    useState<CreativeBoardTabId>('ad-campaign');
  const [showCopyAnnotations, setShowCopyAnnotations] = useState<boolean>(true);

  const activeBoardShowcase = useMemo(
    () =>
      CREATIVE_BOARD_TABS.find((t) => t.id === selectedBoardTabId) ||
      CREATIVE_BOARD_TABS[0],
    [selectedBoardTabId]
  );

  // Section 2 State: Highlighted Creative Need Scenario
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('ad-fatigue');

  // Section 3 State: Active Creative Stream Specimen
  const [activeStreamId, setActiveStreamId] = useState<string>('stream-paid-ads');

  const activeStreamItem = useMemo(
    () =>
      CREATIVE_STREAMS.find((st) => st.id === activeStreamId) ||
      CREATIVE_STREAMS[1],
    [activeStreamId]
  );

  // Section 4 State: Active Campaign Idea Blueprint
  const [selectedCampaignVertical, setSelectedCampaignVertical] =
    useState<CampaignVerticalId>('d2c-drop');

  const activeCampaignBlueprint = useMemo(
    () =>
      CAMPAIGN_BLUEPRINTS.find((cb) => cb.id === selectedCampaignVertical) ||
      CAMPAIGN_BLUEPRINTS[0],
    [selectedCampaignVertical]
  );

  // SEO Meta Title & Description
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Creative & Communication Services — Ad Creatives, Pitch Decks, Social Systems & Campaigns | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Ideas that look great and say the right thing. WebXCode crafts thumb-stopping ad creatives, investor & B2B sales pitch decks, social media design systems, brochures, and 360° launch campaigns.'
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
      name: 'Creative & Communication Services (Ad Creatives, Pitch Decks, Social Design Systems & Campaigns)',
      serviceType: 'Creative Direction, Ad Design, Presentation Design & Brand Communication',
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      description: serviceEntry.description,
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Creative & Communication Deliverables',
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
          SECTION 1 — HERO: THE LIVE CREATIVE CAMPAIGN & DECK STUDIO BOARD
          (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial Studio Blue Glow + Subtle Editorial Baseline Grid */}
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
            {/* Left 55% (7 cols on lg): Positioning, Copy, CTAs & 4 Creative Stat Pills */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>
                  {serviceEntry.category.toUpperCase()} • CAMPAIGNS, AD CREATIVES, DECKS &amp; SOCIAL
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.07] tracking-tight">
                Ideas That Look Great —{' '}
                <span className="text-primary">and Say the Exact Right Thing</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-2xl">
                A great logo is only the starting line. Every day, your brand has to win attention
                in crowded feeds, boardroom presentations, and product launches. We combine{' '}
                <strong className="text-white font-semibold">
                  senior art direction with sharp conversion copywriting to produce thumb-stopping
                  paid ad creatives, social design systems, investor/sales pitch decks, brochures,
                  and 360° launch kits
                </strong>
                .
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
                  onClick={() => triggerQuoteModal('Start a Creative Campaign / Deck Project')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Brief Our Creative Studio</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#creative-streams"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>Explore What We Create</span>
                </a>
              </div>

              {/* 4 Studio Benchmark Stat Pills */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  {
                    value: '+62%',
                    label: 'Higher Ad CTR',
                    note: 'Custom hooks vs stock (placeholder)',
                  },
                  {
                    value: '2–3 Wks',
                    label: 'Sprint or Retainer',
                    note: 'Fast studio turnarounds',
                  },
                  {
                    value: '6 Formats',
                    label: 'Ads, Decks & Social',
                    note: 'Digital + print ready',
                  },
                  {
                    value: '100% Editable',
                    label: 'Figma, Canva & PPTX',
                    note: 'Master files included',
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

            {/* Right 45% (5 cols on lg): Interactive Creative Director's Multi-Format Board */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Board Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/90">
                      CREATIVE DIRECTOR&apos;S CAMPAIGN BOARD
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowCopyAnnotations((prev) => !prev)}
                    className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold transition-all cursor-pointer border ${
                      showCopyAnnotations
                        ? 'bg-primary/30 border-primary text-primary-100'
                        : 'bg-white/5 border-white/15 text-white/65 hover:text-white'
                    }`}
                  >
                    {showCopyAnnotations ? '✓ DIRECTOR NOTES ON' : 'DIRECTOR NOTES OFF'}
                  </button>
                </div>

                {/* 4 Creative Format Switcher Tabs */}
                <div className="mb-4">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-white/60 mb-2">
                    Inspect Live Creative Format:
                  </div>
                  <div
                    className="grid grid-cols-2 gap-1.5"
                    role="tablist"
                    aria-label="Creative Studio Formats"
                  >
                    {CREATIVE_BOARD_TABS.map((tab) => {
                      const isSelected = tab.id === activeBoardShowcase.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setSelectedBoardTabId(tab.id)}
                          className={`px-3 py-2 rounded-xl font-mono text-[11px] font-bold text-left transition-all cursor-pointer flex items-center justify-between border ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-white/[0.04] text-white/75 border-white/10 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{tab.tabLabel}</span>
                          <ArrowRight
                            className={`w-3 h-3 shrink-0 ml-1 ${
                              isSelected ? 'text-white' : 'text-white/40'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Creative Mockup Canvas */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBoardShowcase.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3.5"
                  >
                    {/* Visual Specimen Stage */}
                    <div className="rounded-2xl bg-[#11161F] border border-white/15 p-4 sm:p-5 relative overflow-hidden">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded bg-primary/25 border border-primary/40 font-mono text-[10px] font-bold text-primary-100">
                          {activeBoardShowcase.formatTag}
                        </span>
                        <span className="font-mono text-[10px] text-white/60">
                          {activeBoardShowcase.clientArchetype}
                        </span>
                      </div>

                      {/* Format-Specific Visual Composition */}
                      <div className="rounded-xl bg-gradient-to-br from-[#1E242E] via-[#152235] to-[#0571C2]/35 border border-white/15 p-4">
                        <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary-100 mb-1.5">
                          HOOK / HEADLINE ARCHITECTURE:
                        </div>
                        <div className="text-[17px] sm:text-[19px] font-extrabold text-white leading-snug">
                          &ldquo;{activeBoardShowcase.bigIdeaHook}&rdquo;
                        </div>
                        <p className="mt-2 text-[12.5px] text-white/80 leading-relaxed">
                          {activeBoardShowcase.subCopy}
                        </p>

                        <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-bold">
                            <span>{activeBoardShowcase.ctaLabel}</span>
                          </span>
                          <span className="font-mono text-[10.5px] font-bold text-primary-100">
                            {activeBoardShowcase.benchmarkLift}
                          </span>
                        </div>
                      </div>

                      {/* Creative Director + Copywriter Annotations */}
                      {showCopyAnnotations && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                            <div className="font-mono text-[9.5px] font-bold uppercase text-primary-100">
                              ART DIRECTION NOTE
                            </div>
                            <p className="text-[11.5px] text-white/80 mt-0.5 leading-snug">
                              {activeBoardShowcase.artDirectionNote}
                            </p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                            <div className="font-mono text-[9.5px] font-bold uppercase text-primary-100">
                              COPYWRITING STRUCTURE
                            </div>
                            <p className="text-[11.5px] text-white/80 mt-0.5 leading-snug">
                              {activeBoardShowcase.copyStructureNote}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Delivered Ratios & File Formats Strip */}
                    <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase text-white/60">
                        DELIVERED SPECS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeBoardShowcase.deliverableFormats.map((fmt) => (
                          <span
                            key={fmt}
                            className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] font-semibold text-white/90"
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — WHEN YOU NEED CREATIVE & COMMUNICATION (4 SCENARIO CARDS)
          (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Compass className="w-3.5 h-3.5 text-primary" />
              <span>DIAGNOSTIC • WHEN TO CALL OUR CREATIVE STUDIO</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Great Strategy Stalls When{' '}
              <span className="text-primary">Execution Looks Ordinary</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Whether you already have brand guidelines or we just built them for you, here are the
              four moments when founders and marketing heads plug in our Creative &amp;
              Communication team.
            </p>
          </div>

          {/* 4 Scenario Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CREATIVE_SCENARIOS.map((item) => {
              const isSelected = item.id === selectedScenarioId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedScenarioId(item.id)}
                  className={`rounded-[24px] p-6 sm:p-8 transition-all cursor-pointer border-2 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-navy text-white border-primary shadow-xl'
                      : 'bg-white text-navy border-navy-08 hover:border-primary/40 shadow-soft'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-current/10">
                      <span
                        className={`px-3 py-1 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {item.code}
                      </span>
                      <span
                        className={`font-mono text-[12px] font-bold ${
                          isSelected ? 'text-primary-100' : 'text-navy-60'
                        }`}
                      >
                        Timeline: {item.typicalTimeline}
                      </span>
                    </div>

                    <h3
                      className={`mt-5 text-[21px] sm:text-[24px] font-extrabold leading-snug ${
                        isSelected ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-2 text-[14px] leading-relaxed ${
                        isSelected ? 'text-white/80' : 'text-navy-70'
                      }`}
                    >
                      {item.whoItFits}
                    </p>

                    {/* Problem Callout */}
                    <div
                      className={`mt-4 p-3.5 rounded-xl text-[13px] leading-relaxed border ${
                        isSelected
                          ? 'bg-white/[0.06] border-white/15 text-white/90'
                          : 'bg-primary-50/50 border-primary-100 text-navy'
                      }`}
                    >
                      <strong className="font-bold">The Bottleneck: </strong>
                      {item.problemStatement}
                    </div>

                    {/* 4 Core Assets Checklist */}
                    <div className="mt-5">
                      <div
                        className={`font-mono text-[11px] font-bold uppercase tracking-wider mb-2.5 ${
                          isSelected ? 'text-primary-100' : 'text-primary'
                        }`}
                      >
                        Recommended Scope: {item.creativeSolution}
                      </div>
                      <ul className="space-y-2">
                        {item.coreAssets.map((asset) => (
                          <li
                            key={asset}
                            className={`flex items-start gap-2.5 text-[13px] leading-snug ${
                              isSelected ? 'text-white/90' : 'text-navy'
                            }`}
                          >
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span>{asset}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Outcome + Action */}
                  <div className="mt-6 pt-4 border-t border-current/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span
                      className={`text-[12.5px] font-semibold ${
                        isSelected ? 'text-primary-100' : 'text-navy-70'
                      }`}
                    >
                      {item.benchmarkOutcome}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerQuoteModal(`Creative & Communication — ${item.creativeSolution}`);
                      }}
                      className={`px-4 py-2 rounded-full text-[12px] font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-primary text-white hover:bg-primary-700'
                          : 'bg-primary-50 text-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      <span>Scope This Sprint</span>
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
          SECTION 3 — THE 6 CREATIVE & COMMUNICATION STREAMS (WHAT WE CREATE)
          (bg: #f0f7fd)
      ====================================================================== */}
      <section
        id="creative-streams"
        className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>COMPLETE CREATIVE STUDIO CAPABILITIES</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Six Creative Streams —{' '}
              <span className="text-primary">Visual Design + Persuasive Copy</span> Under One Roof
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Most agencies either hand you pretty graphics with weak placeholder text, or copy
              documents with no visual craft. Our art directors and copywriters build all six
              communication streams together.
            </p>
          </div>

          {/* Interactive 2-Column Studio Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 5 Cols: 6 Stream Selector Tabs */}
            <div
              className="lg:col-span-5 flex flex-col justify-between gap-2.5"
              role="tablist"
              aria-label="Creative & Communication Streams"
            >
              {CREATIVE_STREAMS.map((stream) => {
                const isActive = stream.id === activeStreamItem.id;
                return (
                  <button
                    key={stream.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveStreamId(stream.id)}
                    className={`w-full text-left p-4 rounded-[18px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isActive
                        ? 'bg-navy text-white border-navy shadow-md'
                        : 'bg-white text-navy border-navy-08 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {stream.streamNumber}
                      </span>
                      <div>
                        <div
                          className={`text-[15px] font-extrabold leading-snug ${
                            isActive ? 'text-white' : 'text-navy'
                          }`}
                        >
                          {stream.name}
                        </div>
                        <div
                          className={`text-[12px] mt-0.5 line-clamp-1 ${
                            isActive ? 'text-white/70' : 'text-navy-60'
                          }`}
                        >
                          {stream.subtitle}
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-primary translate-x-0.5' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right 7 Cols: Live Specimen Inspector Card */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-[24px] bg-white border border-navy-08 p-6 sm:p-8 lg:p-10 shadow-soft flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStreamItem.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-navy-08">
                        <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-wider">
                          STREAM {activeStreamItem.streamNumber} • {activeStreamItem.badge}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-navy-60">
                          FIGMA + CANVA + PRINT/WEB READY
                        </span>
                      </div>

                      <h3 className="mt-5 text-[22px] sm:text-[26px] font-extrabold text-navy leading-snug">
                        {activeStreamItem.name}
                      </h3>

                      <p className="mt-2.5 text-[15px] text-navy-70 leading-[1.65]">
                        {activeStreamItem.description}
                      </p>

                      {/* Visual Specimen Box Based on Stream */}
                      <div className="mt-6 rounded-2xl bg-navy text-white p-5 border border-navy">
                        {activeStreamItem.specimenType === 'campaign-key-art' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                ROUTE 01 • RATIONAL PROOF
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Data &amp; Benchmark Led
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Quantified speed, ROI &amp; side-by-side visual proof
                              </div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-primary/25 border border-primary">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                ROUTE 02 • CHALLENGER HOOK
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Category Pattern Interrupt
                              </div>
                              <div className="text-[11px] text-white/80 mt-0.5">
                                Bold editorial contrast that breaks industry sameness
                              </div>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                ROUTE 03 • HUMAN STORY
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Customer Outcome Focus
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Lifestyle art direction + emotional benefit headline
                              </div>
                            </div>
                          </div>
                        )}

                        {activeStreamItem.specimenType === 'paid-ad-pack' && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {[
                              { ratio: '1:1 Square', dim: '1080×1080px', use: 'Meta & LinkedIn Feed' },
                              { ratio: '4:5 Portrait', dim: '1080×1350px', use: 'Max Mobile Real Estate' },
                              { ratio: '9:16 Vertical', dim: '1080×1920px', use: 'Reels, Stories & Shorts' },
                              { ratio: '1.91:1 Wide', dim: '1200×628px', use: 'LinkedIn & YouTube' },
                            ].map((spec) => (
                              <div
                                key={spec.ratio}
                                className="p-3 rounded-xl bg-white/[0.06] border border-white/15 text-center"
                              >
                                <div className="font-mono text-[11px] font-extrabold text-primary-100">
                                  {spec.ratio}
                                </div>
                                <div className="font-mono text-[10px] text-white/80 mt-0.5">
                                  {spec.dim}
                                </div>
                                <div className="text-[10.5px] text-white/60 mt-1">{spec.use}</div>
                              </div>
                            ))}
                          </div>
                        )}

                        {activeStreamItem.specimenType === 'pitch-deck-slides' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                SLIDES 01–05 • THE HOOK
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Market Shift &amp; Problem
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Why the old way is broken &amp; why now
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                SLIDES 06–14 • THE ENGINE
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Product, Moat &amp; Architecture
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Custom system diagrams &amp; demo visuals
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                SLIDES 15–24 • THE PROOF
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Traction, Cohort &amp; Ask
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Clean unit economics, logos &amp; roadmap
                              </div>
                            </div>
                          </div>
                        )}

                        {activeStreamItem.specimenType === 'social-system' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                PILLAR A • EDUCATE
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Seamless Swipe Carousels
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Engineered for high bookmark &amp; save rates
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                PILLAR B • PROVE
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Case Study &amp; Review Cards
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Before/after metrics &amp; client quote frames
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                PILLAR C • CONVERT
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Product Spotlight &amp; Drops
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Feature anatomy callouts &amp; story sequences
                              </div>
                            </div>
                          </div>
                        )}

                        {activeStreamItem.specimenType === 'sales-collateral' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                DIGITAL FORMAT
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Interactive WhatsApp PDF
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Under 5MB with clickable tabs &amp; CTA links
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                PRINT FORMAT
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                300 DPI CMYK + 3mm Bleed
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Press-ready files with spot UV / foil dielines
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                EVENT &amp; EXPO
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Booth &amp; Standee Vectors
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Large-format vector art that stays razor-sharp
                              </div>
                            </div>
                          </div>
                        )}

                        {activeStreamItem.specimenType === 'launch-rollout' && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                PHASE 1 • T-MINUS 7 DAYS
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Teaser &amp; Waitlist Build
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Countdown stories, VIP signup &amp; email teasers
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                PHASE 2 • LAUNCH DAY
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Synchronized Hero Takeover
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Web banners, paid ads, reels &amp; WhatsApp blast
                              </div>
                            </div>
                            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10">
                              <div className="font-mono text-[10px] text-primary-100 uppercase">
                                PHASE 3 • POST-LAUNCH
                              </div>
                              <div className="text-[13px] font-bold text-white mt-1">
                                Proof &amp; First-Batch Urgency
                              </div>
                              <div className="text-[11px] text-white/65 mt-0.5">
                                Unboxing highlights, reviews &amp; restock alerts
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 4 Concrete Deliverables List */}
                      <div className="mt-6">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary mb-3">
                          Included in Stream {activeStreamItem.streamNumber}:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {activeStreamItem.whatWeProduce.map((item) => (
                            <li
                              key={item}
                              className="p-3 rounded-xl bg-primary-50/50 border border-navy-08 flex items-start gap-2.5 text-[13px] font-semibold text-navy"
                            >
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Craft Standard + CTA */}
                    <div className="mt-6 pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-[13px] text-navy-70">
                        <strong className="text-navy font-bold">Creative Director Rule: </strong>
                        {activeStreamItem.craftStandard}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(`Creative Stream — ${activeStreamItem.name}`)
                        }
                        className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                      >
                        <span>Request {activeStreamItem.badge} Quote</span>
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
          SECTION 4 — ANATOMY OF A CAMPAIGN IDEA: INSIGHT → BIG IDEA → ROLLOUT
          (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header + 3 Industry Campaign Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span>CAMPAIGN ARCHITECTURE WORKBENCH</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                How We Turn a Customer Insight Into a{' '}
                <span className="text-primary">Multi-Channel Campaign</span>
              </h2>
            </div>

            {/* 3 Campaign Vertical Switcher Pills */}
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Campaign Blueprint Examples"
            >
              {CAMPAIGN_BLUEPRINTS.map((bp) => {
                const isSelected = bp.id === activeCampaignBlueprint.id;
                return (
                  <button
                    key={bp.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCampaignVertical(bp.id)}
                    className={`px-4 py-2.5 rounded-full text-[13px] font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-sm'
                        : 'bg-primary-50/60 text-navy border-primary-100 hover:border-primary'
                    }`}
                  >
                    {bp.tabName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Campaign Blueprint Board */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCampaignBlueprint.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="rounded-[24px] border-2 border-navy-15 bg-white shadow-soft overflow-hidden"
            >
              {/* Top Strip: Step 1 (Human Insight) + Step 2 (The Big Idea) */}
              <div className="bg-navy text-white p-6 sm:p-8 border-b border-white/10">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary-100 mb-4">
                  {activeCampaignBlueprint.industryTag}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Step 01: The Customer Insight */}
                  <div className="lg:col-span-6 p-5 rounded-2xl bg-white/[0.05] border border-white/15">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100 mb-2">
                      STEP 01 • THE CUSTOMER INSIGHT (WHY PEOPLE HESITATE)
                    </div>
                    <p className="text-[15px] text-white/90 leading-relaxed">
                      {activeCampaignBlueprint.theInsight}
                    </p>
                  </div>

                  {/* Step 02: The Central Big Idea */}
                  <div className="lg:col-span-6 p-5 rounded-2xl bg-primary/25 border border-primary flex flex-col justify-center">
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100 mb-2">
                      STEP 02 • THE CAMPAIGN &ldquo;BIG IDEA&rdquo; &amp; CORE PROMISE
                    </div>
                    <div className="text-[20px] sm:text-[23px] font-extrabold text-white leading-snug">
                      {activeCampaignBlueprint.theBigIdea}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Grid: Key Visual Concept + 3 Headline Hooks + 3 Channel Rollouts */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Col 1 (4 Cols): Master Key Visual Concept Spec */}
                <div className="lg:col-span-4 rounded-2xl bg-primary-50/60 border border-primary-100 p-5">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-[11px] font-extrabold uppercase text-primary">
                      STEP 03 • MASTER KEY VISUAL
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-navy text-white font-mono text-[10px] font-bold">
                      {activeCampaignBlueprint.keyVisualConcept.badgeCallout}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-navy text-white mb-4">
                    <div className="text-[17px] font-extrabold leading-snug">
                      {activeCampaignBlueprint.keyVisualConcept.headlineOnVisual}
                    </div>
                    <div className="text-[12px] text-primary-100 mt-1.5">
                      {activeCampaignBlueprint.keyVisualConcept.sublineOnVisual}
                    </div>
                  </div>

                  <div className="space-y-2.5 text-[13px]">
                    <div>
                      <strong className="text-navy font-bold block">Art Direction:</strong>
                      <span className="text-navy-70">
                        {activeCampaignBlueprint.keyVisualConcept.artDirection}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-primary-100">
                      <strong className="text-navy font-bold block">Palette &amp; Mood:</strong>
                      <span className="font-mono text-[11.5px] text-primary font-semibold">
                        {activeCampaignBlueprint.keyVisualConcept.colorMood}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Col 2 (4 Cols): 3 Copywriting Hook Angles */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    STEP 04 • 3 COPYWRITING HOOK ANGLES
                  </div>
                  {activeCampaignBlueprint.headlineVariations.map((hv, idx) => (
                    <div
                      key={hv.angle}
                      className="p-4 rounded-2xl bg-white border border-navy-08 shadow-xs"
                    >
                      <div className="font-mono text-[10.5px] font-bold text-navy-60">
                        0{idx + 1} • {hv.angle}
                      </div>
                      <div className="text-[14.5px] font-extrabold text-navy mt-1 leading-snug">
                        &ldquo;{hv.hook}&rdquo;
                      </div>
                      <div className="mt-1.5 font-mono text-[11px] text-primary font-semibold">
                        Best Fit: {hv.channelFit}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Col 3 (4 Cols): Multi-Channel Asset Rollout + Cross-Links */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    STEP 05 • OMNI-CHANNEL ASSET ROLLOUT
                  </div>
                  {activeCampaignBlueprint.channelRollout.map((cr) => (
                    <div
                      key={cr.channel}
                      className="p-4 rounded-2xl bg-primary-50/40 border border-navy-08"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[14px] font-extrabold text-navy">{cr.channel}</span>
                        <span className="font-mono text-[10.5px] font-bold text-primary">
                          {cr.formatSpec}
                        </span>
                      </div>
                      <p className="text-[12.5px] text-navy-70 mt-1 leading-snug">
                        {cr.executionNote}
                      </p>
                    </div>
                  ))}

                  {/* Cross-Links to Related Services */}
                  <div className="pt-2">
                    <div className="text-[12px] font-extrabold text-navy mb-2">
                      Pair Your Campaign Creatives With:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href="/services/copywriting"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>Copywriting</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                      <Link
                        href="/services/branding-logo-design"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>Branding &amp; Logo Design</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                      <Link
                        href="/services/performance-marketing"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>Performance Marketing</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                      <Link
                        href="/services/website-development"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>Website Development</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default CreativeCommunication;
