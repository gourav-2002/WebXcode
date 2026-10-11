import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Edit3,
  Feather,
  Type,
  Quote,
  Sparkles,
  FileText,
  Layers,
  Target,
  Zap,
  MessageSquare,
  Sliders,
  CheckCircle2,
  Eye,
  Compass,
  BookOpen,
} from 'lucide-react';
import { services } from '../Services';

/* ============================================================================
   TYPES & INTERFACES — COPYWRITING SERVICE PAGE (PART 1: SECTIONS 1–4)
============================================================================ */

export interface CopywritingProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

type CopyRewriteSpecId = 'saas-hero' | 'd2c-product' | 'paid-ad-hook' | 'email-pitch';

interface LiveCopyRewriteSpecimen {
  id: CopyRewriteSpecId;
  tabLabel: string;
  formatTag: string;
  contextSubtitle: string;
  weakBefore: {
    headline: string;
    body: string;
    cta: string;
    redlineProblems: string[];
    clarityScore: string;
  };
  sharpAfter: {
    eyebrow: string;
    headline: string;
    body: string;
    cta: string;
    microcopyUnderCta: string;
    whyItWorks: string[];
    conversionLiftNote: string;
  };
}

interface CopyDiagnosticSign {
  id: string;
  signNumber: string;
  symptomTitle: string;
  whatYouHearFromBuyers: string;
  beforeWeakLine: string;
  afterSharpLine: string;
  whyWordsFixIt: string;
  deliverableFix: string;
}

interface CopyFormatStream {
  id: string;
  formatCode: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  whatWeWrite: string[];
  specimenPreview: {
    label: string;
    eyebrow: string;
    headline: string;
    bodyCopy: string;
    ctaText: string;
    microcopyNote: string;
    psychologyFramework: string;
  };
  wordCountOrScope: string;
}

type VoiceDimensionId = 'formal-conversational' | 'technical-simple' | 'bold-reassuring';

interface BrandVoicePreset {
  id: string;
  archetypeName: string;
  industryFit: string;
  sliderPositions: {
    formalToConversational: number; // 0 = Formal, 100 = Conversational
    technicalToPlain: number; // 0 = Deep Technical, 100 = Plain English
    reservedToBold: number; // 0 = Quiet/Reserved, 100 = Bold/Punchy
  };
  sampleHeadline: string;
  sampleSubcopy: string;
  sampleCta: string;
  weSoundLike: string[];
  weNeverSoundLike: string[];
  bannedWordsList: string[];
}

/* ============================================================================
   STATIC DATA — SECTION 1: INTERACTIVE RED-PEN COPY REWRITE DESK (HERO)
============================================================================ */

const HERO_REWRITE_SPECIMENS: LiveCopyRewriteSpecimen[] = [
  {
    id: 'saas-hero',
    tabLabel: '01. Website Hero',
    formatTag: 'HOMEPAGE ABOVE-THE-FOLD VALUE PROPOSITION',
    contextSubtitle: 'B2B Cloud Billing & GST Automation Platform',
    weakBefore: {
      headline: 'Next-Gen Synergistic Financial & Enterprise Workflow Solutions',
      body: 'We leverage cutting-edge digital transformation paradigms to empower organizations with scalable, end-to-end invoice orchestration.',
      cta: 'Submit Form',
      redlineProblems: [
        'Zero clarity on what the software actually does',
        '3 buzzwords ("Next-Gen", "Synergistic", "Paradigms") in 18 words',
        'High-friction, robotic "Submit Form" button copy',
      ],
      clarityScore: '28 / 100 (Jargon Overload)',
    },
    sharpAfter: {
      eyebrow: 'AUTOMATED GST & VENDOR RECONCILIATION',
      headline: 'Close Your Monthly Finance Books in 4 Hours — Not 9 Days.',
      body: 'Auto-match 10,000+ vendor invoices against Tally, SAP, and the GST portal with 99.9% accuracy. Stop losing 6% of your Input Tax Credit to manual spreadsheet typos.',
      cta: 'See a 2-Minute Live Demo →',
      microcopyUnderCta: 'No credit card required • Works with Tally, Zoho & SAP',
      whyItWorks: [
        'Specific time contrast ("4 Hours — Not 9 Days") hooks CFOs immediately',
        'Quantifies the exact financial pain (6% lost Input Tax Credit)',
        'Risk-reversing microcopy under the CTA removes click hesitation',
      ],
      conversionLiftNote: '+54% Landing Page Demo Conversion Lift (placeholder)',
    },
  },
  {
    id: 'd2c-product',
    tabLabel: '02. D2C Product Copy',
    formatTag: 'E-COMMERCE PRODUCT PAGE & SENSORY BULLETS',
    contextSubtitle: 'Clinical Skincare — SPF 50 Water-Gel Sunscreen',
    weakBefore: {
      headline: 'Premium Sunscreen Lotion SPF 50 PA++++ (50g Tube)',
      body: 'Our sunscreen is made with high quality ingredients that protect your skin from UV rays. Suitable for all skin types and good for daily use.',
      cta: 'Buy Now',
      redlineProblems: [
        'Reads like a factory spec sheet, not a sensory skincare experience',
        'Ignores the #1 buyer objection (sticky feel & chalky white cast)',
        'Generic "Buy Now" misses bundle value and dermatologist proof',
      ],
      clarityScore: '34 / 100 (Commodity Copy)',
    },
    sharpAfter: {
      eyebrow: 'DERMATOLOGIST TESTED • 0% WHITE CAST',
      headline: 'The Weightless SPF 50 Built for 40°C Indian Humidity.',
      body: 'Melts in like cold water in 4 seconds flat. Zero chalky cast on brown skin, zero greasy shine by noon, and zero pilling under daily makeup.',
      cta: 'Add UV Shield to Routine — ₹649 →',
      microcopyUnderCta: 'Free 15ml Travel Mini on 2-Packs • Ships in 24 Hours',
      whyItWorks: [
        'Sensory verbs ("Melts in like cold water") let shoppers feel the texture',
        'Rule-of-three "Zero cast, zero grease, zero pilling" kills objections',
        'Microcopy boosts Average Order Value (AOV) with a clear 2-pack incentive',
      ],
      conversionLiftNote: '+41% Add-to-Cart Rate on Product Pages (placeholder)',
    },
  },
  {
    id: 'paid-ad-hook',
    tabLabel: '03. Paid Ad Hook',
    formatTag: 'META / LINKEDIN THUMB-STOPPING AD COPY',
    contextSubtitle: 'Custom Modular Kitchens & Interior Design Studio',
    weakBefore: {
      headline: 'Welcome to Elite Interiors — Best Interior Designers in Town',
      body: 'Contact us today for residential and commercial interior design services at affordable prices. 15 years of excellence.',
      cta: 'Contact Us',
      redlineProblems: [
        'Starts with "Welcome to..." — wasted first 3 words in a fast mobile feed',
        'Talks about the company instead of the homeowner’s fear of delays',
        'Vague "Contact Us" gives zero incentive to tap',
      ],
      clarityScore: '22 / 100 (Scrolled Past in 0.3s)',
    },
    sharpAfter: {
      eyebrow: '45-DAY MOVE-IN GUARANTEE • TRANSPARENT BOQ',
      headline: 'Terrified Your Interior Contractor Will Double the Budget Midway?',
      body: 'Get a locked, item-by-item 3D modular kitchen & home quote before you pay a rupee. If we miss your 45-day handover date, we pay your rent.',
      cta: 'Calculate Your 3BHK Cost in 60 Secs →',
      microcopyUnderCta: 'Instant PDF Estimate • 320+ Homes Delivered on Time',
      whyItWorks: [
        'Calls out the homeowner’s unspoken nightmare in the very first line',
        'Backs the promise with a concrete skin-in-the-game guarantee',
        'Interactive value CTA ("Calculate Your 3BHK Cost") beats "Contact Us" 4-to-1',
      ],
      conversionLiftNote: '-38% Lower Cost Per Qualified Lead (placeholder)',
    },
  },
  {
    id: 'email-pitch',
    tabLabel: '04. B2B & Lifecycle Email',
    formatTag: 'HIGH-OPEN-RATE OUTBOUND & NURTURE SEQUENCE',
    contextSubtitle: 'Enterprise Logistics & Fleet SaaS Follow-Up',
    weakBefore: {
      headline: 'Subject: Checking In / Company Introduction from WebX Fleet',
      body: 'Dear Sir/Madam, I hope this email finds you well. I wanted to touch base and introduce our comprehensive fleet management software solutions.',
      cta: 'Schedule a Call at Your Convenience',
      redlineProblems: [
        '"Checking In" subject line screams spam folder on mobile preview',
        '"I hope this email finds you well" wastes the inbox snippet line',
        'Asks for a 30-minute call before earning 10 seconds of curiosity',
      ],
      clarityScore: '19 / 100 (Instant Archive)',
    },
    sharpAfter: {
      eyebrow: 'SUBJECT: Quick question on your 42-truck Jaipur–Mumbai lane',
      headline: 'Saw 14% of cold-chain fleet margin is leaking to idle diesel.',
      body: 'We helped 3 fleet operators your size cut empty-return kilometres by 22% in 30 days using live GPS route slotting. Worth sending a 90-second video of how it works?',
      cta: 'Reply "VIDEO" for the 90-Sec Walkthrough',
      microcopyUnderCta: 'Plain-text human note • Zero attachment bloat',
      whyItWorks: [
        'Hyper-specific subject line proves it was written by a human, not a bot',
        'Opens with a peer benchmark (22% fewer empty-return kilometres)',
        'Low-friction micro-ask ("Reply VIDEO") triples reply rates vs calendar links',
      ],
      conversionLiftNote: '3.2× Higher Positive Reply Rate (placeholder)',
    },
  },
];

/* ============================================================================
   STATIC DATA — SECTION 2: 4 SIGNS YOUR COPY IS COSTING YOU SALES
============================================================================ */

const COPY_DIAGNOSTIC_SIGNS: CopyDiagnosticSign[] = [
  {
    id: 'sign-jargon',
    signNumber: 'DIAGNOSIS 01',
    symptomTitle: 'Visitors Land on Your Homepage and Still Ask "So What Do You Actually Do?"',
    whatYouHearFromBuyers:
      '"I browsed your website for two minutes, but I still had to get on a sales call just to understand how your service works and who it’s for."',
    beforeWeakLine:
      '"We deliver end-to-end, AI-enabled omnichannel transformation for modern enterprises."',
    afterSharpLine:
      '"We build custom Shopify Plus stores that load in 1.2 seconds and lift checkout conversion by 35%."',
    whyWordsFixIt:
      'When copy tries to sound "corporate", it becomes invisible. Clear, concrete nouns and quantified outcomes pass the 5-Second Grunt Test.',
    deliverableFix: 'Above-the-Fold Value Proposition & Core Messaging Architecture',
  },
  {
    id: 'sign-ad-bounce',
    signNumber: 'DIAGNOSIS 02',
    symptomTitle: 'You Pay for Google & Meta Clicks, But 85%+ Leave Without Filling the Form',
    whatYouHearFromBuyers:
      '"Our ad CTR is decent, yet our landing page conversion rate is stuck at 1.4%. Marketing blames sales; sales blames the traffic."',
    beforeWeakLine:
      '"Fill out the form below and one of our representatives will get back to you shortly."',
    afterSharpLine:
      '"Get Your Custom 20-Point SEO & Speed Audit in 24 Hours — Zero Sales Pressure."',
    whyWordsFixIt:
      'Paid traffic is impatient. Your landing page must mirror the exact ad hook, agitate the buyer’s problem, stack proof, and make the CTA feel effortless.',
    deliverableFix: 'Conversion-Engineered Paid Ad Landing Page & Hook Variations',
  },
  {
    id: 'sign-feature-dump',
    signNumber: 'DIAGNOSIS 03',
    symptomTitle: 'Your Product Descriptions List Specs Instead of Selling the Outcome',
    whatYouHearFromBuyers:
      '"Shoppers compare us purely on price against cheaper Amazon knockoffs because our pages read like dry manufacturer datasheets."',
    beforeWeakLine:
      '"Constructed with 304-grade stainless steel, double-wall vacuum insulation, and a 750ml BPA-free cap."',
    afterSharpLine:
      '"Keeps your chai piping hot through a 12-hour highway drive—and never sweats inside your laptop bag."',
    whyWordsFixIt:
      'Features tell; benefits and sensory micro-stories sell. We translate technical specs into real-life moments customers gladly pay a premium for.',
    deliverableFix: 'Benefit-First E-Commerce Product Copy & Comparison Modules',
  },
  {
    id: 'sign-generic-ai',
    signNumber: 'DIAGNOSIS 04',
    symptomTitle: 'Your Brand Sounds Like Every Other Competitor (or Raw ChatGPT Slop)',
    whatYouHearFromBuyers:
      '"Our website, emails, and brochures are full of words like delve, tapestry, elevate, and unleash. Every page sounds robotic and interchangeable."',
    beforeWeakLine:
      '"In today’s fast-paced digital landscape, we unleash seamless solutions to elevate your business."',
    afterSharpLine:
      '"No Junior Account Managers. You work directly with the senior engineers writing your production code."',
    whyWordsFixIt:
      'Buyers have developed an instant radar for lazy AI-generated fluff. Sharp rhythm, contrarian honesty, and human specificity build instant trust.',
    deliverableFix: 'Brand Voice Bible, Tone Matrix & Human-Edited Website Rewrite',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 3: THE 6 COPYWRITING FORMATS WE MASTER (SPECIMEN FOLIO)
============================================================================ */

const COPY_FORMAT_STREAMS: CopyFormatStream[] = [
  {
    id: 'format-website-copy',
    formatCode: 'FOLIO 01',
    title: 'Website Copywriting (Home, Services, About & Pricing)',
    subtitle: 'Full-site conversion copy mapped section-by-section to Figma wireframes',
    badge: 'CORE WEBSITE',
    description:
      'A beautiful website with weak placeholder text is an expensive digital brochure. We interview your founders and sales team, research buyer objections, and write every headline, subhead, proof block, and FAQ across your entire site.',
    whatWeWrite: [
      'Homepage 5-second value proposition, trust bar & narrative scroll flow',
      'Individual Service & Solution pages structured for both buyers and SEO',
      'Founder-story About pages that build human authority without bragging',
      'Pricing page tier positioning, feature tooltips & risk-reversal FAQs',
    ],
    specimenPreview: {
      label: 'LIVE SPECIMEN — B2B SERVICE PAGE HERO & PROOF STRIP',
      eyebrow: 'MANAGED CLOUD & DEVOPS FOR HIGH-TRAFFIC APPS',
      headline: 'Sleep Through Flash Sales Without Watching Server CPU Graphs at 2 AM.',
      bodyCopy:
        'We architect auto-scaling AWS & GCP infrastructure with 99.99% uptime SLAs and 4-minute human incident response—so your checkout never crashes when your campaign goes viral.',
      ctaText: 'Book a Free Cloud Architecture Review →',
      microcopyNote: 'Includes a 15-point AWS cost-leak audit • NDA signed upfront',
      psychologyFramework: 'PAS (Problem → Agitation → Quantified Solution + Risk Reversal)',
    },
    wordCountOrScope: '5 to 25+ Pages • Delivered in Wireframe-Mapped Copy Decks',
  },
  {
    id: 'format-landing-pages',
    formatCode: 'FOLIO 02',
    title: 'Paid-Ad & Sales Landing Page Copy',
    subtitle: 'Single-goal persuasion pages engineered for Google Ads, Meta & LinkedIn traffic',
    badge: 'HIGH CONVERSION',
    description:
      'Sending paid ad clicks to a generic homepage leaks budget. We write dedicated conversion landing pages with tight message-match, objection-crushing comparison tables, social proof blocks, and high-intent CTAs.',
    whatWeWrite: [
      'Message-matched hero headlines aligned with your exact Google/Meta ad groups',
      'Pain-agitation blocks, "Old Way vs New Way" comparison matrices & ROI callouts',
      'Case study snapshots, verified review callouts & trust-badge microcopy',
      '3 A/B test headline and CTA button variations ready for CRO experiments',
    ],
    specimenPreview: {
      label: 'LIVE SPECIMEN — PAID SEARCH LANDING PAGE COMPARISON HOOK',
      eyebrow: 'SWITCH FROM LEGACY PAYROLL IN 72 HOURS',
      headline: 'Why 420+ HR Teams Ditched Manual Attendance Sheets This Quarter.',
      bodyCopy:
        'Biometric sync, automated PF/ESIC compliance, and 1-click salary disbursal on the 1st of every month. Zero implementation fees when you switch before Friday.',
      ctaText: 'See Your Custom Payroll Savings →',
      microcopyNote: 'Takes 45 seconds • Free data migration from Excel/Keka',
      psychologyFramework: 'AIDA + Social Proof Anchoring + Switching Friction Removal',
    },
    wordCountOrScope: 'Long-Form or Short-Form Sales Pages + 3 A/B Headline Variants',
  },
  {
    id: 'format-ad-hooks',
    formatCode: 'FOLIO 03',
    title: 'Ad Copy, Social Hooks & Video Scripts',
    subtitle: 'Thumb-stopping Meta/LinkedIn ad copy, Google RSA headlines & UGC/Reel scripts',
    badge: 'THUMB-STOPPING',
    description:
      'In paid social and search, the first 8 words decide your Return on Ad Spend. We write multi-angle ad hook banks, pinned character-counted Google Ads headlines, and 30-to-60-second video scripts.',
    whatWeWrite: [
      'Meta & LinkedIn primary text, headline & image-overlay copy (4 psychological angles)',
      'Google Search Responsive Search Ad (RSA) 30-char headlines & 90-char descriptions',
      '30s / 60s UGC, founder-to-camera & motion explainer video scripts with visual cues',
      '3-second scroll-stopper opening hooks for Instagram Reels & YouTube Shorts',
    ],
    specimenPreview: {
      label: 'LIVE SPECIMEN — 30-SECOND FOUNDER VIDEO AD SCRIPT (0:00–0:08)',
      eyebrow: 'META REELS / YOUTUBE SHORTS HOOK BOARD',
      headline: '[0:00–0:03] "Stop buying ergonomic chairs designed for 20-minute showroom tests."',
      bodyCopy:
        '[0:04–0:15] "Most mesh chairs feel fine for 10 minutes—then flatten out by 3 PM and wreck your lower lumbar. Here is the 3-zone dynamic spine lock we engineered for 10-hour coding days..."',
      ctaText: '[0:25–0:30] "Try It at Your Desk for 30 Days Risk-Free →"',
      microcopyNote: 'Includes on-screen caption timing & B-roll visual callouts',
      psychologyFramework: 'Pattern Interrupt Hook → Enemy Framing → Mechanism Reveal → Trial CTA',
    },
    wordCountOrScope: '12–30 Ad Variations or 4–10 Video Scripts per Sprint',
  },
  {
    id: 'format-ecommerce-pdp',
    formatCode: 'FOLIO 04',
    title: 'E-Commerce Product Descriptions & Catalog Copy',
    subtitle: 'Sensory, SEO-friendly product stories, bullet hierarchies & Amazon A+ modules',
    badge: 'D2C & CATALOGS',
    description:
      'Turn browsers into buyers across Shopify, WooCommerce, Amazon, and Nykaa. We blend sensory storytelling with scannable benefit bullets, ingredient/material breakdowns, and natural search keywords.',
    whatWeWrite: [
      'Scannable product titles, 1-line value hooks & sensory story paragraphs',
      '5-bullet benefit hierarchy (Outcome first → Material/Ingredient proof second)',
      'How-to-use rituals, sizing/fit reassurance & care instruction microcopy',
      'Amazon A+ / Brand Store comparison charts & cross-sell bundle copy',
    ],
    specimenPreview: {
      label: 'LIVE SPECIMEN — D2C COFFEE / SPECIALTY PRODUCT PAGE',
      eyebrow: 'SINGLE-ESTATE CHIKMAGALUR ARABICA • MEDIUM DARK ROAST',
      headline: 'Notes of Roasted Hazelnut, Dark Jaggery & Zero Bitter Aftertaste.',
      bodyCopy:
        'Small-batch roasted 24 hours before dispatch and nitrogen-flushed so the bag hisses with fresh crema aroma the moment you tear it open—whether you brew in a South Indian filter, Moka pot, or French press.',
      ctaText: 'Choose Your Grind Size — ₹490 →',
      microcopyNote: 'Roasted Yesterday • Free Brass Davara Spoon on 2+ Bags',
      psychologyFramework: 'Sensory Immersion + Freshness Proof + Custom Grind Personalization',
    },
    wordCountOrScope: '10 to 500+ SKUs • Consistent Brand Voice & SEO Schema Ready',
  },
  {
    id: 'format-emails-decks',
    formatCode: 'FOLIO 05',
    title: 'Email Sequences, Sales Decks & Brochure Copy',
    subtitle: 'Lifecycle email flows, cold outbound sequences, investor decks & print brochures',
    badge: 'LIFECYCLE & B2B',
    description:
      'From the first cold email or welcome series to the 28-slide boardroom presentation, we write persuasive long-tail communication that nurtures leads and closes high-ticket deals.',
    whatWeWrite: [
      'Klaviyo / HubSpot welcome, abandoned-cart, post-purchase & win-back email flows',
      'B2B outbound & post-demo follow-up email sequences with A/B subject lines',
      'Slide-by-slide narrative copywriting for investor pitch decks & sales presentations',
      'Corporate capability brochures, company profiles & one-pager sales battlecards',
    ],
    specimenPreview: {
      label: 'LIVE SPECIMEN — ABANDONED CART EMAIL #2 (OBJECTION HANDLER)',
      eyebrow: 'SUBJECT: Still deciding? Here’s what 1,400+ buyers asked first',
      headline: 'We saved your cart—and answered the 3 questions people usually ask before ordering.',
      bodyCopy:
        'Not sure if the shade matches your living room light? Every order ships with a free peel-and-stick swatch card. Test theswatch on your wall first—if it’s not love at first sight, return the unopened roll for a 100% refund.',
      ctaText: 'Resume Your Order with Free Swatch Kit →',
      microcopyNote: 'No-questions-asked 14-day return pickup across 19,000+ pincodes',
      psychologyFramework: 'Empathy + Pre-Emptive Objection Handling + Zero-Risk Trial',
    },
    wordCountOrScope: '3–7 Email Sequences or 20–35 Slide Deck / Brochure Narratives',
  },
  {
    id: 'format-ux-microcopy',
    formatCode: 'FOLIO 06',
    title: 'Brand Voice Guidelines & UX Microcopy',
    subtitle: 'Voice & tone manuals, onboarding flows, checkout microcopy, buttons & tooltips',
    badge: 'VOICE & UX',
    description:
      'The smallest words on your screen often carry the biggest conversion weight. We codify your complete Brand Voice Bible and polish every button, form label, empty state, pricing toggle, and error message.',
    whatWeWrite: [
      'Brand Voice & Tone Guidelines (personality sliders, do/don’t examples, banned words)',
      'Checkout, signup & onboarding UX microcopy that reduces form abandonment',
      'CTA button banks, trust tooltips, guarantee badges & pricing table micro-notes',
      'Human-friendly 404 pages, empty states, confirmation emails & WhatsApp alerts',
    ],
    specimenPreview: {
      label: 'LIVE SPECIMEN — CHECKOUT & SIGNUP UX MICROCOPY UPGRADE',
      eyebrow: 'MICRO-FRICTION REMOVAL AT STEP 03 OF SIGNUP',
      headline: 'Instead of "Invalid Input (Error 422)" → "Looks like that GSTIN is missing 1 digit—check characters 13–15."',
      bodyCopy:
        'Instead of a lonely "Start Trial" button → "Start Your 14-Day Free Workspace (Takes 40 seconds • Cancel in 1 click • Export your data anytime)."',
      ctaText: 'Create Free Workspace →',
      microcopyNote: 'Helpful, human guidance right where users hesitate',
      psychologyFramework: 'Cognitive Load Reduction + Anxiety Neutralization at Point of Action',
    },
    wordCountOrScope: 'Complete Brand Voice Bible + Full App/Checkout Microcopy Audit',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 4: INTERACTIVE BRAND VOICE & TONE EQUALIZER
============================================================================ */

const BRAND_VOICE_PRESETS: BrandVoicePreset[] = [
  {
    id: 'enterprise-authority',
    archetypeName: '01. Executive & Reassuring Authority',
    industryFit: 'B2B Enterprise SaaS, Fintech, Cybersecurity & Healthcare',
    sliderPositions: {
      formalToConversational: 32,
      technicalToPlain: 68,
      reservedToBold: 64,
    },
    sampleHeadline:
      'Audit-Ready Financial Controls for Multi-Entity CFOs — Zero Spreadsheet Drift.',
    sampleSubcopy:
      'Automate inter-company reconciliations, role-based approvals, and SOC2-compliant audit trails across 40+ global subsidiaries without disrupting your existing ERP.',
    sampleCta: 'Request an Executive Architecture Walkthrough →',
    weSoundLike: [
      'Calm, precise, and backed by hard numbers',
      'Plain English that respects a busy CXO’s time',
      'Direct about security, compliance, and ROI timelines',
    ],
    weNeverSoundLike: [
      'Hyperbolic startup hype ("Revolutionizing the universe!")',
      'Stiff legalistic bureaucracy or academic walls of text',
      'Slangy, flippant, or overly casual with enterprise risk',
    ],
    bannedWordsList: ['Synergy', 'Game-changer', 'Delve', 'Unleash', 'Cutting-edge', 'Guru'],
  },
  {
    id: 'challenger-witty',
    archetypeName: '02. Sharp, Witty & Challenger',
    industryFit: 'Modern D2C Brands, Consumer Apps, Design-Led Startups & Agencies',
    sliderPositions: {
      formalToConversational: 84,
      technicalToPlain: 92,
      reservedToBold: 90,
    },
    sampleHeadline:
      'Your Protein Bar Shouldn’t Taste Like Flavored Cardboard (or Hide 18g of Sugar Syrup).',
    sampleSubcopy:
      'We used 6 real kitchen ingredients you can actually pronounce: roasted almonds, dates, cocoa, sea salt, and 20g of clean whey isolate. Nothing weird.',
    sampleCta: 'Grab the 6-Flavor Taster Box — ₹599 →',
    weSoundLike: [
      'A smart, honest friend who reads the back of the ingredient label',
      'Punchy, rhythmic sentences with unexpected contrast',
      'Confident enough to poke fun at industry clichés',
    ],
    weNeverSoundLike: [
      'Preachy, scolding, or try-hard "fellow kids" internet slang',
      'Bland corporate press releases',
      'Vague claims like "premium quality wellness"',
    ],
    bannedWordsList: ['Holistic', 'Paradigm', 'Solutions', 'Seamless', 'World-class', 'Bespoke'],
  },
  {
    id: 'warm-editorial',
    archetypeName: '03. Warm, Refined & Editorial',
    industryFit: 'Luxury Interiors, Architecture, Boutique Hospitality, Fashion & Jewellery',
    sliderPositions: {
      formalToConversational: 46,
      technicalToPlain: 78,
      reservedToBold: 48,
    },
    sampleHeadline:
      'Hand-Loomed in Chanderi. Tailored to Breathe Through Long Summer Evenings.',
    sampleSubcopy:
      'Each garment takes two master weavers six days to finish on timber pit looms—creating a featherlight mulberry silk weave that softens with every wear.',
    sampleCta: 'Explore the Summer Linen & Silk Edit →',
    weSoundLike: [
      'An editorial design magazine—tactile, unhurried, and observant',
      'Grounded in provenance, material craft, and quiet confidence',
      'Inviting and personal rather than pushy or discount-driven',
    ],
    weNeverSoundLike: [
      'Loud supermarket clearance banners ("HURRY! BUY NOW!!!")',
      'Cold technical specification tables without story',
      'Overwrought purple prose that obscures the product',
    ],
    bannedWordsList: ['Cheap', 'Deal', 'Hurry', 'Act Now', 'Blast', 'Skyrocket'],
  },
];

/* ============================================================================
   MAIN PAGE COMPONENT — COPYWRITING
============================================================================ */

const Copywriting: React.FC<CopywritingProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  // Single source of truth from Services.tsx
  const serviceEntry = useMemo(
    () =>
      services.find((s) => s.slug === 'copywriting') || {
        slug: 'copywriting',
        name: 'Copywriting',
        category: 'Brand & Content',
        badge: null,
        icon: 'Edit3',
        tagline: 'Clear, persuasive website copy, landing pages, product descriptions and ads.',
        description:
          'Great design needs sharp words to convert. We write crisp, jargon-free website copy, sales landing pages, D2C product descriptions, and ad hooks grounded in customer psychology and clear value propositions.',
        bestFor: ['Website Launches', 'Ad Landing Pages', 'E-commerce Catalogs'],
        deliverables: [
          'Brand voice, tone & core messaging framework',
          'Homepage, service/product & about page conversion copy',
          'Dedicated paid-ad landing page copy with strong CTAs',
          'SEO-friendly e-commerce product descriptions & microcopy',
          'Ad headline & hook variations for A/B testing',
          'Wireframe-mapped copy deck ready for design & dev',
        ],
        typicalTimeline: '1–3 weeks',
        keyMetric: '+54% landing page conversion lift from message clarity (placeholder)',
        relatedIndustries: ['b2b-saas', 'skincare-beauty', 'finance-fintech'],
        futurePagePath: '/services/copywriting',
      },
    []
  );

  // Section 1 State: Interactive Red-Pen Copy Rewrite Desk
  const [selectedRewriteTabId, setSelectedRewriteTabId] =
    useState<CopyRewriteSpecId>('saas-hero');
  const [showRedlineView, setShowRedlineView] = useState<'split' | 'before' | 'after'>('split');

  const activeRewriteSpecimen = useMemo(
    () =>
      HERO_REWRITE_SPECIMENS.find((item) => item.id === selectedRewriteTabId) ||
      HERO_REWRITE_SPECIMENS[0],
    [selectedRewriteTabId]
  );

  // Section 2 State: Active Diagnostic Sign
  const [activeSignId, setActiveSignId] = useState<string>('sign-jargon');

  // Section 3 State: Active Copy Format Stream Folio
  const [activeFormatId, setActiveFormatId] = useState<string>('format-website-copy');

  const activeFormatItem = useMemo(
    () =>
      COPY_FORMAT_STREAMS.find((f) => f.id === activeFormatId) ||
      COPY_FORMAT_STREAMS[0],
    [activeFormatId]
  );

  // Section 4 State: Active Brand Voice Archetype Preset
  const [selectedVoicePresetId, setSelectedVoicePresetId] =
    useState<string>('enterprise-authority');

  const activeVoicePreset = useMemo(
    () =>
      BRAND_VOICE_PRESETS.find((v) => v.id === selectedVoicePresetId) ||
      BRAND_VOICE_PRESETS[0],
    [selectedVoicePresetId]
  );

  // SEO Meta Title & Description
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Copywriting Services — Website Copy, Landing Pages, Product Descriptions & Ad Hooks | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Words that make people act. WebXCode writes clear, persuasive website copy, high-converting ad landing pages, D2C product descriptions, email sequences, and UX microcopy.'
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
      name: 'Conversion Copywriting Services (Websites, Landing Pages, Product Copy & Ads)',
      serviceType: 'Website Copywriting, Landing Page Copywriting, Brand Messaging & Ad Copy',
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      description: serviceEntry.description,
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Copywriting Deliverables',
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
          SECTION 1 — HERO: THE LIVE RED-PEN COPYWRITING & REWRITE DESK
          (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial Blue Glow + Subtle Editorial Ruled Manuscript Grid */}
        <div
          className="absolute -top-28 right-1/4 w-[660px] h-[660px] blue-glow-strong pointer-events-none opacity-75"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, #ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 36px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/65 font-medium">
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
                {serviceEntry.name}
              </li>
            </ol>
          </nav>

          {/* 55% Left / 45% Right Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-11 items-center">
            {/* Left 55% (7 cols on lg): Typographic Positioning, Copy, CTAs & 4 Stat Pills */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Edit3 className="w-3.5 h-3.5 text-primary" />
                <span>
                  {serviceEntry.category.toUpperCase()} • WEBSITE, LANDING PAGE, PRODUCT &amp; AD COPY
                </span>
              </div>

              <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.07] tracking-tight">
                Words That Make People{' '}
                <span className="text-primary">Stop, Nod — and Act</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-2xl">
                Great design earns you three seconds of attention. Sharp words are what close the
                sale. We replace vague corporate jargon and robotic AI filler with{' '}
                <strong className="text-white font-semibold">
                  crisp, human-written website copy, high-converting ad landing pages, sensory D2C
                  product descriptions, email sequences, and UX microcopy
                </strong>{' '}
                grounded in real buyer psychology.
              </p>

              {/* Best For Audience Chips */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100 mr-1">
                  Written For:
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
                  onClick={() => triggerQuoteModal('Free Copy & Messaging Critique')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free Copy Critique</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#copy-formats"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>Inspect Our Copy Specimens</span>
                </a>
              </div>

              {/* 4 Copywriting Benchmark Stat Pills */}
              <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  {
                    value: '+54%',
                    label: 'Conversion Lift',
                    note: 'From message clarity (placeholder)',
                  },
                  {
                    value: '1–3 Wks',
                    label: 'Typical Turnaround',
                    note: 'Fast copy deck sprints',
                  },
                  {
                    value: '100% Human',
                    label: 'Senior Copywriters',
                    note: 'Zero unedited AI slop',
                  },
                  {
                    value: 'Wireframe',
                    label: 'Mapped Delivery',
                    note: 'Ready for Figma & Dev',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10"
                  >
                    <div className="font-mono text-[20px] sm:text-[22px] font-extrabold text-white tabular-nums leading-none">
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

            {/* Right 45% (5 cols on lg): Interactive Red-Pen Copy Rewrite Desk */}
            <div className="lg:col-span-5">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Desk Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-primary" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/90">
                      LIVE RED-PEN COPY REWRITE DESK
                    </span>
                  </div>
                  <div className="inline-flex rounded-full bg-white/10 p-0.5 border border-white/15">
                    {(
                      [
                        { id: 'split', label: 'Redline Split' },
                        { id: 'before', label: 'Weak Draft' },
                        { id: 'after', label: 'WebXCode Copy' },
                      ] as const
                    ).map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setShowRedlineView(mode.id)}
                        className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                          showRedlineView === mode.id
                            ? 'bg-primary text-white'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4 Copy Format Tabs */}
                <div className="mb-4">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-white/60 mb-2">
                    Select Copy Format to Rewrite:
                  </div>
                  <div
                    className="grid grid-cols-2 gap-1.5"
                    role="tablist"
                    aria-label="Copy Rewrite Specimens"
                  >
                    {HERO_REWRITE_SPECIMENS.map((spec) => {
                      const isSelected = spec.id === activeRewriteSpecimen.id;
                      return (
                        <button
                          key={spec.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setSelectedRewriteTabId(spec.id)}
                          className={`px-3 py-2 rounded-xl font-mono text-[11px] font-bold text-left transition-all cursor-pointer flex items-center justify-between border ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-white/[0.04] text-white/75 border-white/10 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{spec.tabLabel}</span>
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

                {/* Animated Before/After Redline Manuscript Stage */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeRewriteSpecimen.id}-${showRedlineView}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="space-y-3"
                  >
                    {/* Context Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                      <span className="font-mono text-[10px] font-bold text-primary-100 uppercase tracking-wider">
                        {activeRewriteSpecimen.formatTag}
                      </span>
                      <span className="font-mono text-[10px] text-white/60">
                        {activeRewriteSpecimen.contextSubtitle}
                      </span>
                    </div>

                    {/* BEFORE: Weak Jargon Draft (Red-Pen Strikethrough) */}
                    {(showRedlineView === 'split' || showRedlineView === 'before') && (
                      <div className="rounded-2xl bg-[#141922] border border-white/10 p-4 relative">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] font-bold text-white/70">
                            ✕ BEFORE: GENERIC / JARGON DRAFT
                          </span>
                          <span className="font-mono text-[10px] text-white/55">
                            Clarity: {activeRewriteSpecimen.weakBefore.clarityScore}
                          </span>
                        </div>

                        <div className="text-[14px] font-bold text-white/55 line-through decoration-primary/80 decoration-2 leading-snug">
                          &ldquo;{activeRewriteSpecimen.weakBefore.headline}&rdquo;
                        </div>
                        <p className="mt-1.5 text-[12px] text-white/45 line-through decoration-white/30 leading-relaxed">
                          {activeRewriteSpecimen.weakBefore.body}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                          {activeRewriteSpecimen.weakBefore.redlineProblems.map((prob) => (
                            <span
                              key={prob}
                              className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 font-mono text-[10px] text-white/70"
                            >
                              • {prob}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AFTER: Sharp WebXCode Conversion Copy */}
                    {(showRedlineView === 'split' || showRedlineView === 'after') && (
                      <div className="rounded-2xl bg-gradient-to-br from-[#1B2638] via-[#15243A] to-[#0571C2]/35 border-2 border-primary p-4 sm:p-5 shadow-lg">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                            ✓ AFTER: WEBXCODE CONVERSION COPY
                          </span>
                          <span className="font-mono text-[10px] font-bold text-primary-100">
                            {activeRewriteSpecimen.sharpAfter.eyebrow}
                          </span>
                        </div>

                        <div className="text-[17px] sm:text-[18.5px] font-extrabold text-white leading-snug">
                          &ldquo;{activeRewriteSpecimen.sharpAfter.headline}&rdquo;
                        </div>

                        <p className="mt-2 text-[12.5px] text-white/85 leading-relaxed">
                          {activeRewriteSpecimen.sharpAfter.body}
                        </p>

                        {/* CTA + Risk-Reversing Microcopy */}
                        <div className="mt-3.5 pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-[11px] font-bold shadow-xs">
                              <span>{activeRewriteSpecimen.sharpAfter.cta}</span>
                            </span>
                            <div className="font-mono text-[10px] text-primary-100 mt-1">
                              {activeRewriteSpecimen.sharpAfter.microcopyUnderCta}
                            </div>
                          </div>
                          <div className="font-mono text-[10.5px] font-extrabold text-white bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/15">
                            {activeRewriteSpecimen.sharpAfter.conversionLiftNote}
                          </div>
                        </div>

                        {/* Why It Converts Footnotes */}
                        <div className="mt-3 pt-2.5 border-t border-white/10 space-y-1">
                          {activeRewriteSpecimen.sharpAfter.whyItWorks.map((reason) => (
                            <div
                              key={reason}
                              className="flex items-start gap-1.5 text-[11px] text-white/80"
                            >
                              <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — 4 SIGNS YOUR CURRENT COPY IS COSTING YOU CUSTOMERS
          (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-12 lg:mb-14">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Quote className="w-3.5 h-3.5 text-primary" />
              <span>THE MESSAGE CLARITY DIAGNOSTIC</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              You Don&apos;t Have a Traffic Problem —{' '}
              <span className="text-primary">You Have a Clarity Problem</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Most businesses pour lakhs into redesigns and paid ads while leaving the actual words
              as a last-minute afterthought. Here are the 4 copy leaks that quietly kill conversions.
            </p>
          </div>

          {/* 2x2 Editorial Redline Diagnostic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
            {COPY_DIAGNOSTIC_SIGNS.map((sign) => {
              const isSelected = activeSignId === sign.id;
              return (
                <div
                  key={sign.id}
                  onClick={() => setActiveSignId(sign.id)}
                  className={`rounded-[24px] p-6 sm:p-8 transition-all cursor-pointer border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-xl ring-2 ring-primary/30'
                      : 'bg-white text-navy border-navy-08 hover:border-primary shadow-soft'
                  }`}
                >
                  <div>
                    {/* Top Code + Deliverable Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-current/10">
                      <span
                        className={`px-3 py-1 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        {sign.signNumber}
                      </span>
                      <span
                        className={`font-mono text-[11px] font-bold ${
                          isSelected ? 'text-primary-100' : 'text-navy-60'
                        }`}
                      >
                        Fix: {sign.deliverableFix}
                      </span>
                    </div>

                    <h3
                      className={`text-[20px] sm:text-[22px] font-extrabold leading-snug ${
                        isSelected ? 'text-white' : 'text-navy'
                      }`}
                    >
                      {sign.symptomTitle}
                    </h3>

                    <p
                      className={`mt-2.5 text-[13.5px] italic leading-relaxed ${
                        isSelected ? 'text-white/75' : 'text-navy-70'
                      }`}
                    >
                      {sign.whatYouHearFromBuyers}
                    </p>

                    {/* Side-by-Side Weak Line vs Sharp Line Specimen */}
                    <div className="mt-5 space-y-2.5">
                      <div
                        className={`p-3.5 rounded-xl border ${
                          isSelected
                            ? 'bg-white/[0.04] border-white/10'
                            : 'bg-primary-50/40 border-navy-08'
                        }`}
                      >
                        <div
                          className={`font-mono text-[10px] font-extrabold uppercase tracking-wider mb-1 ${
                            isSelected ? 'text-white/55' : 'text-navy-60'
                          }`}
                        >
                          ✕ WEAK / FORGETTABLE LINE:
                        </div>
                        <div
                          className={`text-[13px] line-through decoration-primary/70 ${
                            isSelected ? 'text-white/60' : 'text-navy-60'
                          }`}
                        >
                          {sign.beforeWeakLine}
                        </div>
                      </div>

                      <div
                        className={`p-3.5 rounded-xl border ${
                          isSelected
                            ? 'bg-primary/20 border-primary/50 text-white'
                            : 'bg-primary-50 border-primary-100 text-navy'
                        }`}
                      >
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary mb-1">
                          ✓ SHARP WEBXCODE REWRITE:
                        </div>
                        <div className="text-[13.5px] font-extrabold leading-snug">
                          {sign.afterSharpLine}
                        </div>
                      </div>
                    </div>

                    <p
                      className={`mt-4 text-[13.5px] leading-relaxed ${
                        isSelected ? 'text-white/80' : 'text-navy-70'
                      }`}
                    >
                      <strong className={isSelected ? 'text-white' : 'text-navy'}>
                        Why Words Fix It:{' '}
                      </strong>
                      {sign.whyWordsFixIt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between gap-2">
                    <span
                      className={`font-mono text-[11px] font-bold ${
                        isSelected ? 'text-primary-100' : 'text-primary'
                      }`}
                    >
                      Included in our 1–3 week copy sprints
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerQuoteModal(`Copywriting — ${sign.deliverableFix}`);
                      }}
                      className={`inline-flex items-center gap-1.5 text-[13px] font-extrabold cursor-pointer ${
                        isSelected
                          ? 'text-white hover:text-primary-100'
                          : 'text-navy hover:text-primary'
                      }`}
                    >
                      <span>Fix This on My Site</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — WHAT WE WRITE: THE 6 COPYWRITING FORMATS (SPECIMEN FOLIO)
          (bg: #f0f7fd)
      ====================================================================== */}
      <section id="copy-formats" className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span>THE COPYWRITING SPECIMEN FOLIO</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Six Copywriting Disciplines —{' '}
                <span className="text-primary">From 3-Word Hooks to 20-Page Websites</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-md leading-[1.65]">
              Select any copywriting stream on the left to inspect a live annotated writing specimen,
              persuasion framework, and exact deliverables.
            </p>
          </div>

          {/* Interactive 2-Column Editorial Folio Switchboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
            {/* Left 5 Cols: 6 Copy Format Selector Cards */}
            <div
              className="lg:col-span-5 flex flex-col justify-between gap-2.5"
              role="tablist"
              aria-label="Copywriting Formats"
            >
              {COPY_FORMAT_STREAMS.map((stream) => {
                const isSelected = stream.id === activeFormatItem.id;
                return (
                  <button
                    key={stream.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveFormatId(stream.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-[20px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-lg'
                        : 'bg-white text-navy border-navy-08 hover:border-primary'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-primary text-white'
                              : 'bg-primary-50 text-primary'
                          }`}
                        >
                          {stream.formatCode}
                        </span>
                        <span
                          className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                            isSelected ? 'text-primary-100' : 'text-navy-60'
                          }`}
                        >
                          {stream.badge}
                        </span>
                      </div>
                      <h3
                        className={`text-[15.5px] sm:text-[16.5px] font-extrabold mt-1.5 leading-snug ${
                          isSelected ? 'text-white' : 'text-navy'
                        }`}
                      >
                        {stream.title}
                      </h3>
                      <p
                        className={`text-[12.5px] mt-0.5 line-clamp-1 ${
                          isSelected ? 'text-white/70' : 'text-navy-60'
                        }`}
                      >
                        {stream.subtitle}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-primary translate-x-1' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right 7 Cols: Active Copy Format Specimen + Deliverables */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-[24px] bg-white border border-navy-08 p-6 sm:p-8 lg:p-9 shadow-soft flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFormatItem.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-navy-08">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                            {activeFormatItem.formatCode} • {activeFormatItem.badge}
                          </span>
                        </div>
                        <span className="font-mono text-[11.5px] font-bold text-navy-60">
                          {activeFormatItem.wordCountOrScope}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[23px] sm:text-[27px] font-extrabold text-navy leading-snug">
                        {activeFormatItem.title}
                      </h3>
                      <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-navy-70 leading-relaxed">
                        {activeFormatItem.description}
                      </p>

                      {/* Annotated Manuscript Specimen Box */}
                      <div className="mt-6 rounded-2xl bg-navy text-white p-5 sm:p-6 border border-navy shadow-md">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3.5 border-b border-white/10">
                          <span className="font-mono text-[10.5px] font-extrabold text-primary-100 uppercase tracking-wider">
                            {activeFormatItem.specimenPreview.label}
                          </span>
                          <span className="px-2.5 py-0.5 rounded bg-primary/25 border border-primary/40 font-mono text-[10px] font-bold text-white">
                            {activeFormatItem.specimenPreview.psychologyFramework}
                          </span>
                        </div>

                        <div className="font-mono text-[10.5px] font-bold uppercase tracking-widest text-primary-100">
                          {activeFormatItem.specimenPreview.eyebrow}
                        </div>

                        <div className="mt-1.5 text-[18px] sm:text-[20px] font-extrabold text-white leading-snug">
                          {activeFormatItem.specimenPreview.headline}
                        </div>

                        <p className="mt-2.5 text-[13.5px] text-white/85 leading-relaxed">
                          {activeFormatItem.specimenPreview.bodyCopy}
                        </p>

                        <div className="mt-4 pt-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white font-mono text-[11.5px] font-bold">
                            <span>{activeFormatItem.specimenPreview.ctaText}</span>
                          </span>
                          <span className="font-mono text-[11px] text-primary-100">
                            {activeFormatItem.specimenPreview.microcopyNote}
                          </span>
                        </div>
                      </div>

                      {/* 4 Concrete Deliverables */}
                      <div className="mt-6">
                        <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3">
                          What We Deliver in {activeFormatItem.formatCode}:
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {activeFormatItem.whatWeWrite.map((item) => (
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

                    {/* Bottom Action Strip */}
                    <div className="mt-6 pt-5 border-t border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <span className="text-[13px] font-semibold text-navy-70">
                        Delivered in Google Docs + Figma wireframe comments
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(`Copywriting — ${activeFormatItem.title}`)
                        }
                        className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold inline-flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                      >
                        <span>Request This Copy Scope</span>
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
          SECTION 4 — INTERACTIVE BRAND VOICE & TONE EQUALIZER
          (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Sliders className="w-3.5 h-3.5 text-primary" />
                <span>BRAND VOICE &amp; TONECALIBRATION</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                We Don&apos;t Write in &ldquo;Agency Voice&rdquo; —{' '}
                <span className="text-primary">We Calibrate to Yours</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-md leading-[1.65]">
              A Series B cybersecurity platform should never sound like a D2C protein bar. Test our
              interactive Voice Equalizer to see how we codify tone, rhythm, and banned-word rules.
            </p>
          </div>

          {/* Voice Equalizer Console */}
          <div className="rounded-[24px] border-2 border-navy-15 bg-white shadow-soft overflow-hidden">
            {/* Top Voice Archetype Bar */}
            <div className="bg-navy text-white px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                  SELECT BRAND VOICE ARCHETYPE:
                </span>
              </div>
              <div
                className="flex flex-wrap gap-2"
                role="tablist"
                aria-label="Brand Voice Archetypes"
              >
                {BRAND_VOICE_PRESETS.map((preset) => {
                  const isActive = preset.id === activeVoicePreset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedVoicePresetId(preset.id)}
                      className={`px-4 py-2 rounded-full font-mono text-[11.5px] font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-white/[0.08] text-white/75 hover:text-white'
                      }`}
                    >
                      {preset.archetypeName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Equalizer Body */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVoicePreset.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left 5 Cols: 3 Tone Spectrum Sliders + Banned Words Vault */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1">
                      VOICE CALIBRATION METERS
                    </div>
                    <div className="text-[13.5px] font-bold text-navy-70 mb-5">
                      Best Fit: {activeVoicePreset.industryFit}
                    </div>

                    {/* 3 Visual Tone Spectrum Bars */}
                    <div className="space-y-4">
                      {[
                        {
                          leftPole: 'Formal & Institutional',
                          rightPole: 'Conversational & Warm',
                          val: activeVoicePreset.sliderPositions.formalToConversational,
                        },
                        {
                          leftPole: 'Deep Technical',
                          rightPole: 'Plain Everyday English',
                          val: activeVoicePreset.sliderPositions.technicalToPlain,
                        },
                        {
                          leftPole: 'Quiet & Understated',
                          rightPole: 'Bold & Challenger',
                          val: activeVoicePreset.sliderPositions.reservedToBold,
                        },
                      ].map((meter) => (
                        <div
                          key={meter.leftPole}
                          className="p-3.5 rounded-2xl bg-primary-50/50 border border-navy-08"
                        >
                          <div className="flex items-center justify-between font-mono text-[11px] font-bold text-navy mb-2">
                            <span>{meter.leftPole}</span>
                            <span className="text-primary">{meter.rightPole}</span>
                          </div>
                          <div className="relative h-2.5 rounded-full bg-navy-08 overflow-hidden">
                            <div
                              style={{ width: `${meter.val}%` }}
                              className="h-full bg-primary rounded-full transition-all duration-300"
                            />
                          </div>
                          <div className="mt-1.5 text-right font-mono text-[10px] font-bold text-navy-60">
                            Calibration: {meter.val}% toward {meter.rightPole}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Banned Cliché & AI-Slop Blacklist */}
                  <div className="p-4 rounded-2xl bg-navy text-white">
                    <div className="font-mono text-[10.5px] font-extrabold uppercase tracking-wider text-primary-100 mb-2">
                      🚫 BANNED CLICHÉ &amp; AI-FLUFF BLACKLIST (NEVER USED):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeVoicePreset.bannedWordsList.map((word) => (
                        <span
                          key={word}
                          className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 font-mono text-[11px] text-white/85 line-through decoration-primary"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 7 Cols: Live Calibrated Copy Output + Do/Don't Voice Matrix */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  {/* Live Sample Output Card */}
                  <div className="rounded-2xl bg-primary-50/60 border border-primary-100 p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-primary-100">
                      <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[10.5px] font-extrabold uppercase">
                        LIVE VOICE SPECIMEN OUTPUT
                      </span>
                      <span className="font-mono text-[11px] font-bold text-navy-70">
                        {activeVoicePreset.archetypeName}
                      </span>
                    </div>

                    <h3 className="text-[21px] sm:text-[24px] font-extrabold text-navy leading-snug">
                      &ldquo;{activeVoicePreset.sampleHeadline}&rdquo;
                    </h3>
                    <p className="mt-3 text-[14.5px] sm:text-[15.5px] text-navy-70 leading-relaxed">
                      {activeVoicePreset.sampleSubcopy}
                    </p>

                    <div className="mt-5 pt-4 border-t border-primary-100 flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white font-mono text-[12px] font-bold">
                        <span>{activeVoicePreset.sampleCta}</span>
                      </span>
                      <span className="font-mono text-[11px] font-bold text-primary">
                        100% Human-Written • Brand Voice Locked
                      </span>
                    </div>
                  </div>

                  {/* 2-Column "We Sound Like" vs "We Never Sound Like" */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-navy-08 shadow-xs">
                      <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-2.5">
                        ✓ WE SOUND LIKE:
                      </div>
                      <ul className="space-y-2">
                        {activeVoicePreset.weSoundLike.map((item) => (
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

                    <div className="p-4 sm:p-5 rounded-2xl bg-primary-50/40 border border-navy-08">
                      <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60 mb-2.5">
                        ✕ WE NEVER SOUND LIKE:
                      </div>
                      <ul className="space-y-2">
                        {activeVoicePreset.weNeverSoundLike.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[13px] font-semibold text-navy-70"
                          >
                            <span className="font-mono text-primary font-extrabold shrink-0">
                              ✕
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Related Cross-Links Strip */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[12.5px] font-extrabold text-navy">
                      Pair Conversion Copywriting With:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to="/services/website-development"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>Website Development</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                      <Link
                        to="/services/conversion-rate-optimization"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>CRO &amp; Landing Pages</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                      <Link
                        to="/services/creative-communication"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>Creative &amp; Communication</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                      <Link
                        to="/services/email-marketing"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>Email Marketing &amp; Flows</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                      <Link
                        to="/services/branding-logo-design"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[11.5px] font-bold transition-colors"
                      >
                        <span>Branding &amp; Logo Design</span>
                        <ArrowRight className="w-3 h-3 text-primary" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Copywriting;
