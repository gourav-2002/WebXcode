'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Mail,
  Inbox,
  Send,
  Star,
  Clock,
  ShieldCheck,
  Sparkles,
  ShoppingCart,
  UserPlus,
  Heart,
  RefreshCw,
  Crown,
  BookOpen,
  Briefcase,
  Layers,
  Sliders,
  BarChart3,
  Zap,
  GitBranch,
  AlertCircle,
  CheckCircle2,
  Eye,
  MousePointerClick,
  TrendingUp,
} from 'lucide-react';
import { services, ServiceIcon } from '@/app/services/_components/Services';
import { industries } from '@/app/industries/_components/Industries';

/* ============================================================================
   TYPES & INTERFACES — EMAIL MARKETING SERVICE PAGE (PART 1: SECTIONS 1–4)
============================================================================ */

interface InboxEmailPreview {
  id: string;
  senderName: string;
  senderHandle: string;
  flowBadge: string;
  subjectLine: string;
  preheaderText: string;
  timestamp: string;
  starred?: boolean;
  unread?: boolean;
  openRate: string;
  clickRate: string;
  revenueOrConvMetric: string;
  emailHeaderTag: string;
  emailHeadline: string;
  emailBodyText: string;
  emailOfferCallout: string;
  emailCtaText: string;
  whyItWorksNote: string;
}

interface RentVsOwnRow {
  criterion: string;
  rentedText: string;
  ownedText: string;
}

interface FlowEmailNode {
  stepNum: string;
  timingBadge: string;
  nodeTitle: string;
  subjectLine: string;
  preheader: string;
  delayRule: string;
  conditionalSplitNote: string;
  goalOfEmail: string;
  previewHeadline: string;
  previewCopy: string;
  previewCta: string;
  openRateBench: string;
  clickRateBench: string;
}

interface LifecycleFlowBlueprint {
  id: string;
  tabCode: string;
  tabLabel: string;
  categoryTag: 'D2C E-Commerce' | 'B2B & SaaS' | 'Retention & Editorial';
  triggerEvent: string;
  exitCondition: string;
  totalEmailsCount: string;
  revenueImpactStat: string;
  summary: string;
  emails: [FlowEmailNode, FlowEmailNode, FlowEmailNode, FlowEmailNode];
}

/* ============================================================================
   STATIC DATA — SECTION 1: INTERACTIVE INBOX SIMULATOR (4 LIVE EMAILS)
============================================================================ */

const HERO_INBOX_EMAILS: InboxEmailPreview[] = [
  {
    id: 'welcome-01',
    senderName: 'Lumière Botanicals',
    senderHandle: 'hello@lumierebotanicals.in',
    flowBadge: 'FLOW 01 • WELCOME SERIES',
    subjectLine: 'Welcome in — your 15% founder’s code (and 2-min skin quiz) is inside',
    preheaderText: 'No daily spam. Just dermatologist-backed routines + your first-order gift.',
    timestamp: 'Just now',
    starred: true,
    unread: true,
    openRate: '61.4% Open Rate (placeholder)',
    clickRate: '9.8% Click Rate (placeholder)',
    revenueOrConvMetric: '₹1,420 Rev / Recipient (placeholder)',
    emailHeaderTag: 'WELCOME TO LUMIÈRE • STEP 1 OF 4',
    emailHeadline: 'Let’s fix your barrier before we sell you a 7-step routine.',
    emailBodyText:
      'Most skincare brands push five serums on day one. We’d rather you start with the single ceramide formula matched to your skin’s pH. Use code FIRST15 at checkout within 48 hours—or take our 45-second skin diagnostic first.',
    emailOfferCallout: 'CODE: FIRST15 • 15% OFF + FREE MINI CLEANSER ON ₹1,499+',
    emailCtaText: 'Claim My 15% Welcome Gift →',
    whyItWorksNote:
      'Sent within 30 seconds of signup while intent is at peak; combines an immediate reward with zero-party quiz data collection.',
  },
  {
    id: 'cart-recovery-02',
    senderName: 'Veloce Roasters',
    senderHandle: 'orders@veloceroasters.com',
    flowBadge: 'FLOW 02 • ABANDONED CART (STEP 2)',
    subjectLine: 'Still thinking over the Single-Origin Pour-Over Kit?',
    preheaderText: 'Your freshly roasted batch is reserved for 4 more hours — free shipping unlocked.',
    timestamp: '2h ago',
    starred: true,
    unread: false,
    openRate: '52.8% Open Rate (placeholder)',
    clickRate: '11.4% Click Rate (placeholder)',
    revenueOrConvMetric: '18.6% Carts Recovered (placeholder)',
    emailHeaderTag: 'SAVED IN YOUR CART • ROASTED TO ORDER',
    emailHeadline: 'Questions before you brew? Here’s what 1,400+ home baristas asked first.',
    emailBodyText:
      'Instead of shouting a fake countdown timer, Email #2 answers the top 3 hesitation points—grind size compatibility, roast date freshness, and our 14-day taste guarantee—before offering a gentle free-shipping nudge.',
    emailOfferCallout: 'DYNAMIC CART BLOCK: Chikmagalur Estate Kit (250g) • Free Express Shipping',
    emailCtaText: 'Resume My Saved Cart in 1 Click →',
    whyItWorksNote:
      'Dynamic product blocks inject the exact SKU left behind; objection-handling beats margin-killing discount codes.',
  },
  {
    id: 'post-purchase-03',
    senderName: 'Kinetix Ergonomics',
    senderHandle: 'care@kinetixdesk.io',
    flowBadge: 'FLOW 03 • POST-PURCHASE & CROSS-SELL',
    subjectLine: 'Your Kinetix Pro Chair arrives Thursday — 3 posture tweaks for Day 1',
    preheaderText: 'Watch the 90-second lumbar setup video before your courier rings the bell.',
    timestamp: 'Yesterday',
    starred: false,
    unread: false,
    openRate: '68.2% Open Rate (placeholder)',
    clickRate: '14.2% Click Rate (placeholder)',
    revenueOrConvMetric: '+31% 60-Day Repeat Orders (placeholder)',
    emailHeaderTag: 'ORDER #KX-8841 • PRE-DELIVERY ONBOARDING',
    emailHeadline: 'How to dial in your lumbar tension in under 90 seconds.',
    emailBodyText:
      'Buyer’s remorse happens in the gap between checkout and unboxing. This automated pre-arrival guide turns anxious tracking checks into excitement—and introduces the matching dual-monitor arm 14 days later.',
    emailOfferCallout: 'VIP OWNER PERK: Add the Aluminum Monitor Arm with ₹1,200 Owner Credit',
    emailCtaText: 'Watch 90-Sec Setup Guide →',
    whyItWorksNote:
      'Slashes WISMO ("Where is my order?") support tickets while priming the customer for a natural 14-day cross-sell.',
  },
  {
    id: 'b2b-nurture-04',
    senderName: 'Arjun @ Cloud Ledger',
    senderHandle: 'arjun@cloudledger.ai',
    flowBadge: 'FLOW 04 • B2B DEMO FOLLOW-UP',
    subjectLine: 'How Series B CFOs cut month-end close from 11 days to 3 (Case Study)',
    preheaderText: 'Plain-text breakdown of the exact ERP reconciliation workflow we discussed.',
    timestamp: 'Oct 06',
    starred: false,
    unread: false,
    openRate: '49.5% Open Rate (placeholder)',
    clickRate: '7.9% Reply / Click Rate (placeholder)',
    revenueOrConvMetric: '+38% SQL-to-Demo Show Rate (placeholder)',
    emailHeaderTag: 'PLAIN-TEXT FOUNDER / AE NURTURE SEQUENCE',
    emailHeadline: 'Quick follow-up on your multi-entity GST & Netsuite sync',
    emailBodyText:
      'B2B decision-makers ignore flashy HTML banners. We engineer plain-text and light-editorial sequences synced with HubSpot lead scores—sending relevant ROI calculators and security whitepapers based on pricing page visits.',
    emailOfferCallout: 'ATTACHED RESOURCE: 2026 Multi-Entity Reconciliation Benchmark PDF',
    emailCtaText: 'Book 15-Min Sandbox Walkthrough →',
    whyItWorksNote:
      'Triggered automatically when a prospect views the /pricing or /security URL twice within 7 days.',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 2: RENTED ATTENTION VS OWNED AUDIENCE COMPARISON
============================================================================ */

const RENT_VS_OWN_ROWS: RentVsOwnRow[] = [
  {
    criterion: 'Cost to Reach Existing Buyers Again',
    rentedText: 'Pay Meta or Google ₹15–₹120+ every single click—even for people who already bought from you.',
    ownedText: 'Virtually ₹0 marginal cost per send. Message 50,000 subscribers whenever you launch or restock.',
  },
  {
    criterion: 'Algorithm & Platform Risk',
    rentedText: 'One ad account freeze, iOS privacy update, or feed algorithm tweak can drop reach by 60% overnight.',
    ownedText: 'Direct-to-inbox delivery. Your segmented first-party subscriber list belongs 100% to your company.',
  },
  {
    criterion: 'Personalization & Timing Precision',
    rentedText: 'Broad audience buckets; ads show up at random moments when buyers are scrolling memes.',
    ownedText: 'Triggered to the exact minute of behavior—signup, browse, cart drop, 30-day refill, or pricing page visit.',
  },
  {
    criterion: 'Profit Margin & Compounding LTV',
    rentedText: 'Linear: stop funding the daily ad budget today and lead/order volume hits zero tomorrow morning.',
    ownedText: 'Compounding: every paid click you capture into email increases 90-day Customer Lifetime Value (LTV).',
  },
];

/* ============================================================================
   STATIC DATA — SECTION 3: 6 LIFECYCLE FLOW BLUEPRINTS (INTERACTIVE NODE MAP)
============================================================================ */

const LIFECYCLE_FLOW_BLUEPRINTS: LifecycleFlowBlueprint[] = [
  {
    id: 'welcome-flow',
    tabCode: '01',
    tabLabel: 'Welcome Series',
    categoryTag: 'D2C E-Commerce',
    triggerEvent: 'Trigger: Submits Pop-Up / Footer Form / Quiz (Excludes Existing Buyers)',
    exitCondition: 'Smart Exit: Completes First Purchase → Moves to Post-Purchase Flow',
    totalEmailsCount: '4 Automated Emails over 7 Days',
    revenueImpactStat: 'Generates 35–45% of all automated flow revenue (placeholder)',
    summary:
      'New subscribers are most curious in the first 48 hours. Our 4-part Welcome Series delivers the promised incentive immediately, tells your founder story, proves social trust, and closes non-buyers before curiosity fades.',
    emails: [
      {
        stepNum: 'EMAIL 01',
        timingBadge: 'Immediate (< 30 sec)',
        nodeTitle: 'Instant Welcome + Incentive Delivery',
        subjectLine: 'Welcome to the club — your 15% code is inside',
        preheader: 'Plus: the 3 bestsellers 90% of first-time customers start with.',
        delayRule: 'Sent immediately upon form submission',
        conditionalSplitNote: 'All new opt-ins receive Email 01',
        goalOfEmail: 'Deliver the signup offer immediately while brand recall is 100% and drive same-session checkout.',
        previewHeadline: 'You’re in. Here is your 15% founder’s welcome code.',
        previewCopy:
          'Clean hero block with a one-click copyable discount code, 3 curated starter products with star ratings, and a clear 48-hour validity note.',
        previewCta: 'Shop With 15% Off Now →',
        openRateBench: '58–65% Open (placeholder)',
        clickRateBench: '8–12% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 02',
        timingBadge: 'Wait 24 Hours',
        nodeTitle: 'Brand Story, Standards & Differentiator',
        subjectLine: 'Why we spent 18 months formulating our flagship...',
        preheader: 'What we leave out matters just as much as what we put in.',
        delayRule: '24 hours after Email 01 (if 0 orders placed)',
        conditionalSplitNote: 'Split: Has placed order = False',
        goalOfEmail: 'Build emotional resonance and explain why your product outperforms cheaper marketplace alternatives.',
        previewHeadline: 'Not another white-label product. Here’s how we build.',
        previewCopy:
          'Side-by-side comparison grid ("Us vs Standard Market"), lab/sourcing transparency credentials, and a soft reminder that their welcome code is active.',
        previewCta: 'See How It’s Made →',
        openRateBench: '46–52% Open (placeholder)',
        clickRateBench: '5–7% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 03',
        timingBadge: 'Wait 48 Hours',
        nodeTitle: 'Social Proof, Reviews & Best-Fit Finder',
        subjectLine: '“I was skeptical too—until week two.” (4,200+ reviews)',
        preheader: 'Not sure where to start? Match your goal in 30 seconds.',
        delayRule: '72 hours after signup',
        conditionalSplitNote: 'Split: Clicked Email 02 vs Did Not Click',
        goalOfEmail: 'Overcome skepticism using verified UGC photos, before/after results, and a "Pick Your Goal" product matrix.',
        previewHeadline: 'Don’t take our word for it. Read 4,200+ verified buyers.',
        previewCopy:
          'Three customer review cards grouped by use case, an FAQ accordion block addressing shipping/returns, and dynamic bestseller recommendations.',
        previewCta: 'Find My Match →',
        openRateBench: '42–48% Open (placeholder)',
        clickRateBench: '6–9% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 04',
        timingBadge: 'Day 6 (Final Nudge)',
        nodeTitle: 'Plain-Text Founder Check-In & Code Expiry',
        subjectLine: 'Quick question before your 15% welcome code expires tonight',
        preheader: 'Hit reply if you need a recommendation—reads go straight to our team.',
        delayRule: 'Day 6 after signup (if still 0 orders)',
        conditionalSplitNote: 'Final branch before moving to weekly newsletter segment',
        goalOfEmail: 'Capture fence-sitters with a personal plain-text note from the founder and genuine urgency.',
        previewHeadline: 'Hey {{ first_name }}, noticed you haven’t used FIRST15 yet.',
        previewCopy:
          'Styled as a personal 1-to-1 email from the founder: invites replies for product advice and reminds them the 15% code expires at midnight.',
        previewCta: 'Activate FIRST15 Before Midnight →',
        openRateBench: '44–50% Open (placeholder)',
        clickRateBench: '7–10% Click (placeholder)',
      },
    ],
  },
  {
    id: 'cart-browse-flow',
    tabCode: '02',
    tabLabel: 'Abandoned Cart & Browse',
    categoryTag: 'D2C E-Commerce',
    triggerEvent: 'Trigger: Checkout Started OR Added to Cart (No Purchase in 45 Mins)',
    exitCondition: 'Smart Exit: Order Placed → Immediately Cancels Remaining Cart Emails',
    totalEmailsCount: '4 Multi-Branch Emails over 72 Hours',
    revenueImpactStat: 'Recovers 14–22% of otherwise lost checkouts (placeholder)',
    summary:
      'We separate casual window shoppers from high-intent cart abandoners, and further split High-Cart-Value vs Standard-Cart-Value—protecting your profit margins instead of training customers to wait for coupons.',
    emails: [
      {
        stepNum: 'EMAIL 01',
        timingBadge: '45 Mins After Drop',
        nodeTitle: 'Helpful Cart Reminder (Zero Discount)',
        subjectLine: 'Did your Wi-Fi blink? Your cart is saved & ready',
        preheader: 'Complete your order in two taps—no need to re-enter your address.',
        delayRule: '45 minutes after Checkout Started',
        conditionalSplitNote: 'All cart abandoners (No discount offered in Step 1)',
        goalOfEmail: 'Recover distracted mobile shoppers who got interrupted by a phone call or payment OTP delay without giving away margin.',
        previewHeadline: 'We saved your items so you don’t have to start over.',
        previewCopy:
          'Dynamic product image, variant size/color, price, and a prominent button that rebuilds their exact checkout session on any device.',
        previewCta: 'Return to My Saved Checkout →',
        openRateBench: '54–62% Open (placeholder)',
        clickRateBench: '11–15% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 02',
        timingBadge: 'Wait 18 Hours',
        nodeTitle: 'Objection Crusher, Guarantees & Support',
        subjectLine: '3 things to know before you order your {{ item_name }}',
        preheader: 'Free 14-day exchanges, COD/UPI options & express dispatch details.',
        delayRule: '18 hours after abandonment',
        conditionalSplitNote: 'Split: Cart Value ≥ ₹3,000 vs Cart Value < ₹3,000',
        goalOfEmail: 'Eliminate anxiety around sizing, delivery timelines, authenticity, and return policies.',
        previewHeadline: 'Still deciding? Here is our zero-risk promise.',
        previewCopy:
          'Highlights 48-hour dispatch, hassle-free return policy, verified reviews specific to the category in their cart, and a direct WhatsApp support link.',
        previewCta: 'Complete My Order Risk-Free →',
        openRateBench: '48–54% Open (placeholder)',
        clickRateBench: '9–12% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 03',
        timingBadge: 'Wait 42 Hours',
        nodeTitle: 'Conditional Perk (High-Value vs Standard Cart)',
        subjectLine: 'We unlocked a complimentary gift / ₹300 credit on your cart',
        preheader: 'Reserved for the next 24 hours on your saved items.',
        delayRule: '42 hours after abandonment',
        conditionalSplitNote: 'Branch A (High AOV): Free Gift / Branch B: Tiered Credit',
        goalOfEmail: 'Convert price-sensitive abandoners using a dynamic single-use code or free gift threshold.',
        previewHeadline: 'A little extra reason to finish checking out today.',
        previewCopy:
          'Auto-applies a unique Klaviyo dynamic coupon code at checkout so the shopper sees the lower total immediately upon clicking.',
        previewCta: 'Apply My Cart Perk & Checkout →',
        openRateBench: '45–51% Open (placeholder)',
        clickRateBench: '10–13% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 04',
        timingBadge: 'Hour 70 (Cart Expiry)',
        nodeTitle: 'Final Inventory & Cart Release Notice',
        subjectLine: 'Last call: releasing your reserved cart items tonight',
        preheader: 'Plus 3 alternative customer favorites if that wasn’t the one.',
        delayRule: '70 hours after abandonment',
        conditionalSplitNote: 'Final cart touchpoint',
        goalOfEmail: 'Create clean closure and show alternative bestsellers in case the original item wasn’t the right fit.',
        previewHeadline: 'Your reserved cart expires at midnight.',
        previewCopy:
          'Shows the saved item one final time alongside 3 lower-friction starter products in the same category.',
        previewCta: 'Claim My Cart Before Release →',
        openRateBench: '41–47% Open (placeholder)',
        clickRateBench: '7–9% Click (placeholder)',
      },
    ],
  },
  {
    id: 'post-purchase-flow',
    tabCode: '03',
    tabLabel: 'Post-Purchase & Cross-Sell',
    categoryTag: 'D2C E-Commerce',
    triggerEvent: 'Trigger: Order Fulfilled / Delivered Event (First-Time vs Repeat Split)',
    exitCondition: 'Smart Exit: Enters Replenishment or VIP Tier upon 2nd/3rd Order',
    totalEmailsCount: '4 Lifecycle Emails across 45 Days',
    revenueImpactStat: 'Lifts 60-day second-purchase rate by +28–36% (placeholder)',
    summary:
      'Acquiring a customer once with paid ads is expensive; profit is made on orders #2, #3, and #4. We turn post-purchase into a structured onboarding, review-generation, and smart cross-sell engine.',
    emails: [
      {
        stepNum: 'EMAIL 01',
        timingBadge: '1 Hour After Order',
        nodeTitle: 'Warm Thank-You & How-To-Use Onboarding',
        subjectLine: 'Thank you for order #{{ order_number }} — how to get the best results',
        preheader: 'Save this guide for unboxing day (no sales pitch inside).',
        delayRule: '1 hour after order confirmation',
        conditionalSplitNote: 'Split: 1st-Time Buyer vs 2nd+ Repeat Buyer',
        goalOfEmail: 'Eliminate buyer’s remorse and educate the customer on proper usage before the box even arrives.',
        previewHeadline: 'While we pack your order, here’s your Day-1 playbook.',
        previewCopy:
          '3-step usage instructions, care tips, what to expect in Week 1, and proactive delivery expectations.',
        previewCta: 'Read Your Quick-Start Guide →',
        openRateBench: '65–72% Open (placeholder)',
        clickRateBench: '12–16% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 02',
        timingBadge: '7 Days Post-Delivery',
        nodeTitle: 'Experience Check-In & UGC Review Request',
        subjectLine: 'How is your {{ item_name }} treating you so far?',
        preheader: 'Leave a 30-second photo review and earn 150 loyalty points.',
        delayRule: '7 days after courier status = Delivered',
        conditionalSplitNote: 'Synced with Judge.me / Loox / Yotpo delivery webhook',
        goalOfEmail: 'Collect high-converting photo/video reviews only after delivery is confirmed—never while a package is stuck in transit.',
        previewHeadline: 'Rate your experience in 1 click right inside this email.',
        previewCopy:
          'Interactive 1-to-5 star block embedded in the email body + bonus reward for uploading a customer photo.',
        previewCta: 'Submit Review & Claim Reward →',
        openRateBench: '52–58% Open (placeholder)',
        clickRateBench: '9–13% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 03',
        timingBadge: '18 Days Post-Delivery',
        nodeTitle: 'Predictive Next-Best Product Cross-Sell',
        subjectLine: 'Bought the Cleanser? 78% of customers pair it with this next',
        preheader: 'Unlock your returning-customer bundle pricing inside.',
        delayRule: '18 days after delivery',
        conditionalSplitNote: 'Dynamic logic: If bought SKU A → Recommend SKU B (Never SKU A)',
        goalOfEmail: 'Introduce the logical companion product using purchase-history affinity rules.',
        previewHeadline: 'Complete your routine with your Returning Buyer Perk.',
        previewCopy:
          'Explains why Product B amplifies the results of Product A they already own, paired with a returning-buyer bundle offer.',
        previewCta: 'Explore My Recommended Pairing →',
        openRateBench: '46–52% Open (placeholder)',
        clickRateBench: '7–10% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 04',
        timingBadge: 'Day 38 (Replenishment)',
        nodeTitle: 'Predictive Refill & Subscription Upgrade',
        subjectLine: 'Running low on {{ item_name }}? Reorder in 2 clicks before you run out',
        preheader: 'Or switch to auto-delivery and save 15% on every refill.',
        delayRule: 'Timed to average consumption cycle (e.g. Day 38 for 45-day supply)',
        conditionalSplitNote: 'Applies to consumable SKUs (skincare, coffee, supplements, pet)',
        goalOfEmail: 'Catch the buyer 7 days before their bottle or bag runs empty so they don’t switch to Amazon.',
        previewHeadline: 'Time for a fresh restock? Skip the search bar.',
        previewCopy:
          'Pre-filled one-click reorder cart link alongside a "Subscribe & Save 15%" upgrade option.',
        previewCta: 'Restock My Supply in 1 Click →',
        openRateBench: '49–55% Open (placeholder)',
        clickRateBench: '10–14% Click (placeholder)',
      },
    ],
  },
  {
    id: 'winback-vip-flow',
    tabCode: '04',
    tabLabel: 'Win-Back & VIP Loyalty',
    categoryTag: 'D2C E-Commerce',
    triggerEvent: 'Trigger: 60–90 Days Since Last Order OR Crosses 3+ Orders / ₹10k LTV',
    exitCondition: 'Smart Exit: Places Order OR Sunset Policy Suppresses Unengaged after Step 4',
    totalEmailsCount: '4 Retention & Sunset Emails',
    revenueImpactStat: 'Reactivates 9–15% of lapsing customers before churn (placeholder)',
    summary:
      'Reward your top 10% spenders like insiders while automatically intercepting at-risk customers at Day 60, 75, and 90—and cleanly sunsetting dead addresses to protect your sender reputation.',
    emails: [
      {
        stepNum: 'EMAIL 01',
        timingBadge: 'VIP Milestone Trigger',
        nodeTitle: 'VIP Inner Circle Induction (Top Tier Buyers)',
        subjectLine: 'You unlocked Gold Status at {{ brand_name }} — here are your perks',
        preheader: '24-hour early access to drops + permanent free express shipping.',
        delayRule: 'Immediate when Lifetime Orders ≥ 3 or LTV ≥ ₹10,000',
        conditionalSplitNote: 'VIP Segment Branch',
        goalOfEmail: 'Make repeat buyers feel recognized and lock in long-term brand advocacy.',
        previewHeadline: 'Welcome to the top 5% of {{ brand_name }} customers.',
        previewCopy:
          'Personal thank-you badge, private early-access link to upcoming launches, and a dedicated VIP support priority line.',
        previewCta: 'Access My VIP Vault →',
        openRateBench: '62–69% Open (placeholder)',
        clickRateBench: '14–18% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 02',
        timingBadge: '60 Days Lapsed',
        nodeTitle: '“What’s New Since You Visited” Roundup',
        subjectLine: 'A lot has happened at {{ brand_name }} since your last order',
        preheader: '3 new formulas, upgraded packaging & faster 24-hour dispatch.',
        delayRule: '60 days since last purchase',
        conditionalSplitNote: 'Lapsing Customer Branch',
        goalOfEmail: 'Re-ignite interest with product innovation and new arrivals before resorting to heavy discounts.',
        previewHeadline: 'Look what launched while you were away.',
        previewCopy:
          'Editorial showcase of new releases, upgraded formulations, and top-rated community favorites from the past two months.',
        previewCta: 'See What’s New →',
        openRateBench: '38–44% Open (placeholder)',
        clickRateBench: '5–8% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 03',
        timingBadge: '75 Days Lapsed',
        nodeTitle: 'High-Value Win-Back Offer (“We Miss You”)',
        subjectLine: 'We saved a ₹500 comeback credit on your account',
        preheader: 'Valid for 7 days on any order above ₹1,999.',
        delayRule: '75 days since last purchase (if 0 orders)',
        conditionalSplitNote: 'High-LTV Win-Back Offer',
        goalOfEmail: 'Give lapsed past buyers a compelling financial reason to return and restart their buying habit.',
        previewHeadline: 'Come back and take ₹500 off your next order.',
        previewCopy:
          'Bold credit voucher block paired with their previously purchased category and 1-click cart reactivation.',
        previewCta: 'Redeem My ₹500 Comeback Credit →',
        openRateBench: '36–42% Open (placeholder)',
        clickRateBench: '6–9% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 04',
        timingBadge: '90 Days Unengaged',
        nodeTitle: 'Deliverability Sunset & Preference Check',
        subjectLine: 'Should we pause your emails, or keep you on the list?',
        preheader: 'One click to stay subscribed (or switch to monthly-only digests).',
        delayRule: '90 days with 0 opens and 0 clicks',
        conditionalSplitNote: 'Deliverability Protection Rule: Auto-suppresses non-clickers',
        goalOfEmail: 'Keep your Gmail/Yahoo sender reputation above 99% by pruning unengaged ghost addresses.',
        previewHeadline: 'We hate cluttering inboxes. Want to stay in touch?',
        previewCopy:
          'Gives subscribers a 1-click button to "Keep Me Subscribed" or "Send Only Monthly Highlights" before automatic list suppression.',
        previewCta: 'Yes, Keep Me on the List →',
        openRateBench: '28–34% Open (placeholder)',
        clickRateBench: '4–6% Click (placeholder)',
      },
    ],
  },
  {
    id: 'newsletter-editorial-flow',
    tabCode: '05',
    tabLabel: 'Newsletters & Product Drops',
    categoryTag: 'Retention & Editorial',
    triggerEvent: 'Trigger: Weekly / Bi-Weekly Segmented Campaign Calendar',
    exitCondition: 'Smart Exclusion: Excludes anyone currently mid-checkout or in Angry Support Ticket',
    totalEmailsCount: '4–8 Monthly Segmented Broadcasts',
    revenueImpactStat: 'Drives predictable weekly traffic & launch-day revenue spikes (placeholder)',
    summary:
      'Most brand newsletters are boring coupon blasts that train subscribers to tune out. We run an 80/20 editorial-to-promo calendar that subscribers actually look forward to opening every week.',
    emails: [
      {
        stepNum: 'CAMPAIGN 01',
        timingBadge: 'Week 1 • Educational',
        nodeTitle: 'The Value-First Editorial Issue',
        subjectLine: 'The 3-minute Sunday read: 4 myths costing you better sleep',
        preheader: 'Backed by clinical studies + one subtle product spotlight at the end.',
        delayRule: 'Sent to Engaged 90-Day Segment',
        conditionalSplitNote: '80% Editorial Value / 20% Product Tie-In',
        goalOfEmail: 'Train subscribers that opening your emails always teaches them something useful—skyrocketing open rates for future sales.',
        previewHeadline: 'ISSUE #42: Why your evening routine starts at 2:00 PM.',
        previewCopy:
          'Magazine-style layout with scannable subheads, an actionable tip box, and a soft native callout to the relevant product.',
        previewCta: 'Read the Full 3-Min Breakdown →',
        openRateBench: '44–52% Open (placeholder)',
        clickRateBench: '5–8% Click (placeholder)',
      },
      {
        stepNum: 'CAMPAIGN 02',
        timingBadge: 'Week 2 • Early Access',
        nodeTitle: 'New Launch / Waitlist Early-Access Drop',
        subjectLine: '[EARLY ACCESS] The Monsoon Edition is live 24h early for subscribers',
        preheader: 'Only 400 units in Batch #1 — private link inside.',
        delayRule: 'Sent to VIPs + Engaged 60-Day Segment',
        conditionalSplitNote: 'Excludes unengaged to maximize inbox placement',
        goalOfEmail: 'Reward email subscribers with exclusive first access so they never unsubscribe.',
        previewHeadline: 'Subscribers get first pick before we post on Instagram.',
        previewCopy:
          'High-contrast product launch hero, key spec callouts, batch inventory counter, and direct-to-PDP links.',
        previewCta: 'Shop Early Access Batch #1 →',
        openRateBench: '48–56% Open (placeholder)',
        clickRateBench: '9–13% Click (placeholder)',
      },
      {
        stepNum: 'CAMPAIGN 03',
        timingBadge: 'Week 3 • Social Proof',
        nodeTitle: 'Community Spotlight & Problem-Solver Issue',
        subjectLine: 'How 3 customers solved {{ specific_pain_point }} in 21 days',
        preheader: 'Real routines, unedited photos & exact product pairings.',
        delayRule: 'Segmented by past category interest',
        conditionalSplitNote: 'Dynamic block swaps based on browsed category',
        goalOfEmail: 'Move mid-funnel subscribers from curiosity to conviction using peer case studies.',
        previewHeadline: 'Real routines from our community this month.',
        previewCopy:
          'Three customer mini-stories with "Shop Their Routine" bundles and dermatologist/expert commentary.',
        previewCta: 'Shop Featured Routines →',
        openRateBench: '42–48% Open (placeholder)',
        clickRateBench: '6–9% Click (placeholder)',
      },
      {
        stepNum: 'CAMPAIGN 04',
        timingBadge: 'Week 4 • Promo Event',
        nodeTitle: 'High-Converting Promotional / Payday Event',
        subjectLine: '48-Hour Payday Bundle Event: Build your 3-piece kit & save 20%',
        preheader: 'Plus: 1-click opt-out of event reminders if you’re already stocked.',
        delayRule: 'Morning launch + 6-hour non-opener resend with new subject',
        conditionalSplitNote: 'Includes "Snooze Promo Emails" link to prevent unsubscribes',
        goalOfEmail: 'Drive end-of-month revenue targets with clean bundle math and respectful frequency controls.',
        previewHeadline: 'Build your custom 3-step bundle & save 20% through Sunday.',
        previewCopy:
          'Visual bundle builder math (Pick 1 + Pick 1 + Pick 1), clear savings breakdown, and countdown to Sunday midnight.',
        previewCta: 'Build My 20% Off Bundle →',
        openRateBench: '45–53% Open (placeholder)',
        clickRateBench: '8–12% Click (placeholder)',
      },
    ],
  },
  {
    id: 'b2b-lead-nurture-flow',
    tabCode: '06',
    tabLabel: 'B2B Lead Nurture & Demo',
    categoryTag: 'B2B & SaaS',
    triggerEvent: 'Trigger: Lead Magnet Download / Webinar / Pricing Page Visit (HubSpot / ActiveCampaign)',
    exitCondition: 'Smart Exit: Books Discovery Call in Calendly/HubSpot → Stops Nurture & Alerts AE',
    totalEmailsCount: '4 Intent-Driven B2B Emails',
    revenueImpactStat: 'Increases MQL-to-SQL booked pipeline by +32–44% (placeholder)',
    summary:
      'B2B buying committees take weeks or months to decide. We connect HubSpot, ActiveCampaign, or Customer.io to your CRM—sending sharp, human-sounding sequences that turn cold downloads into booked sales demos.',
    emails: [
      {
        stepNum: 'EMAIL 01',
        timingBadge: 'Immediate (< 2 Mins)',
        nodeTitle: 'Asset Delivery + Zero-Fluff Executive Summary',
        subjectLine: 'Your requested {{ asset_name }} PDF (+ the 3-bullet summary)',
        preheader: 'Page 7 has the exact cost-comparison table most CFOs bookmark.',
        delayRule: 'Immediate upon form fill',
        conditionalSplitNote: 'Synced to HubSpot / Salesforce Contact Owner',
        goalOfEmail: 'Deliver the promised resource immediately and highlight the highest-leverage insight on page 7.',
        previewHeadline: 'Here is the benchmark report you requested.',
        previewCopy:
          'Direct PDF link (no second gate), 3 executive takeaways right in the email body, and a low-friction question.',
        previewCta: 'Download Report PDF (2.4 MB) →',
        openRateBench: '62–70% Open (placeholder)',
        clickRateBench: '18–24% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 02',
        timingBadge: 'Day 3 • Diagnostic',
        nodeTitle: 'The Cost-of-Inaction Breakdown',
        subjectLine: 'Why most {{ industry }} teams lose 14 hrs/week on manual {{ process }}',
        preheader: 'A 2-minute breakdown of the hidden bottleneck—and how to audit yours.',
        delayRule: '3 days after download (if no call booked)',
        conditionalSplitNote: 'Dynamic industry token ({{ contact.industry }})',
        goalOfEmail: 'Agitate the status-quo problem and position your methodology as the modern standard.',
        previewHeadline: 'The hidden tax of legacy spreadsheets in 2026.',
        previewCopy:
          'Plain-text editorial style from a senior partner/AE showing before/after workflow architecture.',
        previewCta: 'Calculate Your Team’s Time Saved →',
        openRateBench: '48–55% Open (placeholder)',
        clickRateBench: '7–11% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 03',
        timingBadge: 'Day 7 • Proof & ROI',
        nodeTitle: 'Peer Case Study & Architecture Walkthrough',
        subjectLine: 'Case Study: How {{ client_peer }} cut onboarding time by 64% in 6 weeks',
        preheader: 'Exact tech stack, timeline, and 90-day ROI numbers inside.',
        delayRule: '7 days after download',
        conditionalSplitNote: 'High-Intent Trigger: Boosts priority if Pricing Page visited',
        goalOfEmail: 'De-risk the decision for technical and financial stakeholders with hard metrics.',
        previewHeadline: 'How a 180-person team replaced 4 disconnected tools.',
        previewCopy:
          '3-metric outcome box, architecture summary, and a 2-minute Loom-style product walkthrough link.',
        previewCta: 'See the 2-Min Architecture Tour →',
        openRateBench: '45–52% Open (placeholder)',
        clickRateBench: '8–12% Click (placeholder)',
      },
      {
        stepNum: 'EMAIL 04',
        timingBadge: 'Day 12 • Direct Ask',
        nodeTitle: 'The 15-Minute Custom Audit / Sandbox Offer',
        subjectLine: 'Worth a 15-min look at your {{ company_name }} workflow this week?',
        preheader: 'No generic slide deck—we’ll map your exact integration scope live.',
        delayRule: '12 days after download (Sent from assigned AE’s address)',
        conditionalSplitNote: 'Logs reply directly in HubSpot / Slack sales channel',
        goalOfEmail: 'Convert warmed-up prospects into a concrete calendar booking with a specific value promise.',
        previewHeadline: 'Want us to map a custom blueprint for {{ company_name }}?',
        previewCopy:
          'Short, respectful plain-text note offering two specific time slots or a direct calendar link for a 15-minute working session.',
        previewCta: 'Book 15-Min Architecture Call →',
        openRateBench: '44–51% Open (placeholder)',
        clickRateBench: '6–10% Reply/Book (placeholder)',
      },
    ],
  },
];

/* ============================================================================
   MAIN COMPONENT — EMAIL MARKETING (PART 1: SECTIONS 1–4)
============================================================================ */

interface EmailMarketingProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const EmailMarketing: React.FC<EmailMarketingProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Single Source of Truth from Services.tsx */
  const serviceData = useMemo(
    () => services.find((s) => s.slug === 'email-marketing')!,
    []
  );

  /* Related industry objects */
  const relatedIndustryObjs = useMemo(
    () =>
      serviceData.relatedIndustries
        .map((slug) => industries.find((i) => i.slug === slug))
        .filter((i): i is NonNullable<typeof i> => Boolean(i)),
    [serviceData]
  );

  /* Section 1: Interactive Inbox Preview State */
  const [selectedInboxId, setSelectedInboxId] = useState<string>(HERO_INBOX_EMAILS[0].id);
  const activeInboxEmail = useMemo(
    () => HERO_INBOX_EMAILS.find((e) => e.id === selectedInboxId) || HERO_INBOX_EMAILS[0],
    [selectedInboxId]
  );

  /* Section 3: Interactive Flow Blueprint State */
  const [activeFlowId, setActiveFlowId] = useState<string>(LIFECYCLE_FLOW_BLUEPRINTS[0].id);
  const [activeEmailNodeIdx, setActiveEmailNodeIdx] = useState<number>(0);

  const activeFlowBlueprint = useMemo(
    () =>
      LIFECYCLE_FLOW_BLUEPRINTS.find((f) => f.id === activeFlowId) ||
      LIFECYCLE_FLOW_BLUEPRINTS[0],
    [activeFlowId]
  );

  const activeEmailNode =
    activeFlowBlueprint.emails[activeEmailNodeIdx] || activeFlowBlueprint.emails[0];

  /* Trigger Quote Modal Helper */
  const triggerQuoteModal = (customContext?: string) => {
    const label = customContext || serviceData.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* SEO Meta + Schema */
  useEffect(() => {
    document.title =
      'Email Marketing & Lifecycle Automation (Klaviyo, HubSpot) | WebXCode';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        serviceData.description
      );
    }
  }, [serviceData.description]);

  const jsonLdSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: serviceData.name,
      description: serviceData.description,
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      areaServed: ['India', 'United States', 'United Kingdom', 'United Arab Emirates'],
      serviceType: 'Email Marketing & Lifecycle Automation',
    }),
    [serviceData]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* ======================================================================
          SECTION 1 — HERO: LIVE INBOX PREVIEW & LIFECYCLE REVENUE CONSOLE
          Layout: 50/50 Split — Left Value Prop + Right Interactive Inbox Client
          Background: Deep Navy (#1e242e)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Subtle radial blue glow & geometric grid */}
        <div className="absolute -top-24 right-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none opacity-75" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb: Home > Services > Brand & Content > Email Marketing */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/65 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/35" />
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/35" />
              </li>
              <li>
                <Link
                  href="/services#pillar-brand-content"
                  className="hover:text-white transition-colors"
                >
                  {serviceData.category}
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-white/35" />
              </li>
              <li className="text-primary-100 font-semibold" aria-current="page">
                {serviceData.name}
              </li>
            </ol>
          </nav>

          {/* 50 / 50 Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Left 6 Cols: Headline, Value Prop, CTAs, Benchmark Strip */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <span>BRAND &amp; CONTENT • LIFECYCLE &amp; CRM AUTOMATION</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight">
                Your Most Profitable Channel Is{' '}
                <span className="text-primary">The One You Own.</span>
              </h1>

              <p className="mt-4 text-[17px] sm:text-[18.5px] font-semibold text-primary-100 leading-snug">
                {serviceData.tagline}
              </p>

              <p className="mt-3.5 text-[15.5px] sm:text-[16.5px] text-white/80 leading-[1.68]">
                {serviceData.description} Every email we ship is permission-based, authenticated
                for primary inbox placement, and tracked down to real orders and booked pipeline.
              </p>

              {/* Best For Badges from Single Source of Truth */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/55 mr-1">
                  BUILT FOR:
                </span>
                {serviceData.bestFor.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-white/[0.07] border border-white/15 text-[12px] font-semibold text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Primary + Secondary CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Free Email & Lifecycle Revenue Audit')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15.5px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free Email &amp; Flow Audit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#flow-architecture"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-[15.5px] transition-all"
                >
                  <span>Explore the 6 Core Flows</span>
                </a>
              </div>

              {/* Key Metric + Timeline Strip from Single Source of Truth */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-primary-100">
                    BENCHMARK REVENUE SHARE
                  </div>
                  <div className="text-[18px] sm:text-[20px] font-extrabold text-white mt-1 leading-tight">
                    22–30% Store Rev
                  </div>
                  <div className="text-[11.5px] text-white/65 mt-0.5">
                    Driven by automated flows (placeholder)
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-primary-100">
                    LAUNCH TIMELINE
                  </div>
                  <div className="text-[18px] sm:text-[20px] font-extrabold text-white mt-1 leading-tight">
                    2–3 Weeks Setup
                  </div>
                  <div className="text-[11.5px] text-white/65 mt-0.5">
                    {serviceData.typicalTimeline}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                  <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-primary-100">
                    INBOX COMPLIANCE
                  </div>
                  <div className="text-[18px] sm:text-[20px] font-extrabold text-white mt-1 leading-tight">
                    100% Opt-In
                  </div>
                  <div className="text-[11.5px] text-white/65 mt-0.5">
                    SPF, DKIM &amp; DMARC verified
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Interactive Live Inbox Preview Window */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white text-navy border-2 border-white/20 shadow-2xl overflow-hidden">
                {/* Top Email Client Window Chrome */}
                <div className="bg-navy text-white px-4 sm:px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-white/90">
                      <Inbox className="w-3.5 h-3.5 text-primary" />
                      <span>PRIMARY INBOX SIMULATOR • CLICK ANY SUBJECT LINE</span>
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary/25 border border-primary/40 font-mono text-[10px] font-extrabold text-primary-100">
                    DKIM / DMARC: PASS ✓
                  </span>
                </div>

                {/* 4 Clickable Inbox Subject Rows */}
                <div
                  className="divide-y divide-navy-08 bg-primary-50/35"
                  role="tablist"
                  aria-label="Live Inbox Email Previews"
                >
                  {HERO_INBOX_EMAILS.map((email) => {
                    const isSelected = email.id === activeInboxEmail.id;
                    return (
                      <button
                        key={email.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedInboxId(email.id)}
                        className={`w-full text-left px-4 sm:px-5 py-3 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-white border-l-4 border-l-primary shadow-xs'
                            : 'hover:bg-white/70 border-l-4 border-l-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 min-w-0">
                          <Star
                            className={`w-4 h-4 shrink-0 mt-0.5 ${
                              isSelected || email.starred
                                ? 'text-primary fill-primary'
                                : 'text-navy-40'
                            }`}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[12.5px] font-extrabold text-navy truncate">
                                {email.senderName}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded font-mono text-[9.5px] font-extrabold uppercase ${
                                  isSelected
                                    ? 'bg-primary text-white'
                                    : 'bg-primary-50 text-primary border border-primary-100'
                                }`}
                              >
                                {email.flowBadge}
                              </span>
                            </div>
                            <div
                              className={`text-[13px] mt-0.5 line-clamp-1 ${
                                isSelected ? 'font-extrabold text-navy' : 'font-semibold text-navy-80'
                              }`}
                            >
                              {email.subjectLine}
                            </div>
                            <div className="text-[11.5px] text-navy-60 line-clamp-1">
                              {email.preheaderText}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-mono text-[10.5px] font-bold text-navy-60 block">
                            {email.timestamp}
                          </span>
                          <span className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] font-extrabold text-primary">
                            <span>{isSelected ? 'Viewing' : 'Open'}</span>
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Live Opened Email Reading Pane */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeInboxEmail.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="p-5 sm:p-6 bg-white border-t border-navy-15"
                  >
                    {/* Sender Metadata + Live Metrics Strip */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-4 border-b border-navy-08">
                      <div>
                        <div className="text-[11.5px] font-mono text-navy-60">
                          From: <strong className="text-navy">{activeInboxEmail.senderName}</strong>{' '}
                          &lt;{activeInboxEmail.senderHandle}&gt;
                        </div>
                        <div className="text-[14px] sm:text-[15px] font-extrabold text-navy mt-0.5">
                          {activeInboxEmail.subjectLine}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-primary-50 border border-primary-100 font-mono text-[10.5px] font-extrabold text-primary">
                        {activeInboxEmail.revenueOrConvMetric}
                      </span>
                    </div>

                    {/* Simulated Branded Email Body Card */}
                    <div className="rounded-2xl bg-primary-50/55 border border-primary-100 p-4 sm:p-5">
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary">
                        {activeInboxEmail.emailHeaderTag}
                      </div>
                      <h2 className="mt-1.5 text-[17px] sm:text-[19px] font-extrabold text-navy leading-snug">
                        {activeInboxEmail.emailHeadline}
                      </h2>
                      <p className="mt-2 text-[13px] sm:text-[13.5px] text-navy-70 leading-relaxed">
                        {activeInboxEmail.emailBodyText}
                      </p>

                      {/* Dynamic Offer / Cart Block */}
                      <div className="mt-3.5 p-2.5 rounded-xl bg-white border border-primary/30 font-mono text-[11px] font-extrabold text-navy flex items-center justify-between gap-2">
                        <span>{activeInboxEmail.emailOfferCallout}</span>
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white text-[12px] font-bold">
                          <span>{activeInboxEmail.emailCtaText}</span>
                        </span>

                        <div className="flex items-center gap-3 font-mono text-[11px] font-bold text-navy">
                          <span className="inline-flex items-center gap-1 text-primary">
                            <Eye className="w-3.5 h-3.5" />
                            {activeInboxEmail.openRate}
                          </span>
                          <span className="inline-flex items-center gap-1 text-navy-70">
                            <MousePointerClick className="w-3.5 h-3.5 text-primary" />
                            {activeInboxEmail.clickRate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Why This Flow Converts Note */}
                    <div className="mt-3.5 flex items-start gap-2 text-[12px] text-navy-70">
                      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-navy">Why it converts:</strong>{' '}
                        {activeInboxEmail.whyItWorksNote}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — WHY EMAIL IS YOUR HIGHEST-MARGIN OWNED CHANNEL
          Layout: "Rented Attention vs Owned Audience" Ledger + Compounding Math
          Background: Crisp White (#ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span>OWNED AUDIENCE ECONOMICS</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Stop Paying Ad Platforms Twice to Reach{' '}
              <span className="text-primary">Your Own Customers</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Paid ads are essential for top-of-funnel discovery—but when CPCs rise and 97% of
              first-time visitors leave without buying, a store or B2B funnel without automated
              email leaks profit every single day.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Cols: Rented Attention vs Owned Email Ledger */}
            <div className="lg:col-span-7 rounded-[24px] border border-navy-08 bg-white shadow-soft overflow-hidden flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-12 bg-navy text-white px-5 py-4 text-[12px] font-mono font-extrabold uppercase tracking-wider">
                  <div className="col-span-4">Channel Dimension</div>
                  <div className="col-span-4 text-white/70 px-2">Rented Ads &amp; Social</div>
                  <div className="col-span-4 text-primary-100 pl-2">Owned Email &amp; Flows</div>
                </div>

                <div className="divide-y divide-navy-08">
                  {RENT_VS_OWN_ROWS.map((row) => (
                    <div
                      key={row.criterion}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 p-5 items-start hover:bg-primary-50/30 transition-colors"
                    >
                      <div className="sm:col-span-4 font-extrabold text-[14.5px] text-navy">
                        {row.criterion}
                      </div>
                      <div className="sm:col-span-4 text-[13px] text-navy-60 leading-relaxed bg-primary-50/35 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                        <span className="sm:hidden font-mono text-[10px] font-bold uppercase text-navy-50 block mb-1">
                          Rented Attention:
                        </span>
                        {row.rentedText}
                      </div>
                      <div className="sm:col-span-4 text-[13px] font-semibold text-navy leading-relaxed bg-primary-50/70 sm:bg-primary-50/50 p-3 rounded-xl border border-primary-100">
                        <span className="sm:hidden font-mono text-[10px] font-bold uppercase text-primary block mb-1">
                          Owned Email Channel:
                        </span>
                        {row.ownedText}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Compliance & Permission Callout */}
              <div className="p-5 bg-primary-50/60 border-t border-primary-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-[13px] font-bold text-navy">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                  <span>
                    Strict No-Spam Policy: We never buy, rent, or scrape lists. 100% permission-based
                    first-party growth.
                  </span>
                </div>
                <span className="font-mono text-[11px] font-extrabold text-primary uppercase">
                  GDPR • CAN-SPAM • DPDP READY
                </span>
              </div>
            </div>

            {/* Right 5 Cols: The 3-Stage Lifecycle Multiplier Card */}
            <div className="lg:col-span-5 rounded-[24px] bg-navy text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-72 h-72 blue-glow pointer-events-none opacity-60" />

              <div className="relative z-10">
                <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider">
                  THE LIFECYCLE MULTIPLIER
                </span>

                <h3 className="mt-4 text-[22px] sm:text-[25px] font-extrabold text-white leading-snug">
                  How Email Makes Your Paid Ads &amp; SEO Twice as Profitable
                </h3>
                <p className="mt-2 text-[14px] text-white/75 leading-relaxed">
                  Instead of letting 97% of paid clicks bounce forever, we install a 3-layer capture
                  and retention system:
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      step: '01',
                      title: 'Capture Intent Before Bounce (4–8% Opt-In)',
                      desc: 'Smart behavior-triggered pop-ups, two-step quizzes, and B2B lead magnets turn anonymous traffic into known subscribers.',
                      stat: '3x More Leads from Same Traffic (placeholder)',
                    },
                    {
                      step: '02',
                      title: 'Automate First-Order Conversion (Flows 01 & 02)',
                      desc: 'Welcome, browse-abandonment, and cart recovery sequences follow up automatically across the first 72 hours.',
                      stat: '15–22% Abandoned Checkouts Saved (placeholder)',
                    },
                    {
                      step: '03',
                      title: 'Compound Repeat LTV (Flows 03, 04 & Campaigns)',
                      desc: 'Post-purchase cross-sells, timed refills, and editorial newsletters drive second and third orders at zero ad cost.',
                      stat: '22–30% Total Store Revenue Share (placeholder)',
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="p-4 rounded-2xl bg-white/[0.06] border border-white/10"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-mono text-[11px] font-extrabold text-primary-100">
                          STAGE {item.step}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary/25 border border-primary/40 font-mono text-[10px] font-bold text-white">
                          {item.stat}
                        </span>
                      </div>
                      <h4 className="text-[15px] font-extrabold text-white">{item.title}</h4>
                      <p className="mt-1 text-[12.5px] text-white/75 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-6 pt-5 border-t border-white/15 flex items-center justify-between gap-3">
                <span className="text-[12.5px] font-semibold text-white/80">
                  Works alongside your paid media &amp; store:
                </span>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href="/services/performance-marketing"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white text-[11.5px] font-bold transition-colors"
                  >
                    <span>Performance Marketing</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/services/ecommerce-development"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white text-[11.5px] font-bold transition-colors"
                  >
                    <span>E-commerce</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — INTERACTIVE LIFECYCLE FLOW ARCHITECTURE BLUEPRINT
          Layout: 6 Flow Tabs + Interactive 4-Node Sequence Map + Node Inspector
          Background: Light Blue Tint (#f0f7fd)
      ====================================================================== */}
      <section
        id="flow-architecture"
        className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <GitBranch className="w-3.5 h-3.5 text-primary" />
                <span>AUTOMATED FLOW BLUEPRINTS</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Inspect Our 6 Core{' '}
                <span className="text-primary">Revenue &amp; Nurture Flows</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-md leading-[1.65]">
              Select any lifecycle flow below, then click through its 4 automated email nodes to see
              exact triggers, time delays, conditional splits, and subject lines.
            </p>
          </div>

          {/* 6 Flow Selector Pills */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8"
            role="tablist"
            aria-label="Email Lifecycle Flows"
          >
            {LIFECYCLE_FLOW_BLUEPRINTS.map((flow) => {
              const isSelected = flow.id === activeFlowBlueprint.id;
              return (
                <button
                  key={flow.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setActiveFlowId(flow.id);
                    setActiveEmailNodeIdx(0);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-md'
                      : 'bg-white text-navy border-navy-08 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span
                      className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        isSelected ? 'bg-primary text-white' : 'bg-primary-50 text-primary'
                      }`}
                    >
                      FLOW {flow.tabCode}
                    </span>
                    <span
                      className={`font-mono text-[9.5px] font-bold ${
                        isSelected ? 'text-primary-100' : 'text-navy-50'
                      }`}
                    >
                      4 Nodes
                    </span>
                  </div>
                  <div className="text-[13.5px] font-extrabold leading-snug">{flow.tabLabel}</div>
                </button>
              );
            })}
          </div>

          {/* Flow Canvas Container */}
          <div className="rounded-[24px] bg-white border-2 border-navy-15 shadow-soft overflow-hidden">
            {/* Top Trigger & Exit Logic Bar */}
            <div className="bg-navy text-white px-5 sm:px-7 py-4 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                  {activeFlowBlueprint.categoryTag}
                </span>
                <span className="font-mono text-[12px] font-bold text-primary-100">
                  {activeFlowBlueprint.triggerEvent}
                </span>
              </div>
              <div className="font-mono text-[11.5px] text-white/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>{activeFlowBlueprint.exitCondition}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Flow Summary + Benchmark Banner */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-navy-08">
                <div className="max-w-3xl">
                  <h3 className="text-[22px] sm:text-[26px] font-extrabold text-navy">
                    Flow {activeFlowBlueprint.tabCode}: {activeFlowBlueprint.tabLabel}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] text-navy-70 leading-relaxed">
                    {activeFlowBlueprint.summary}
                  </p>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-primary-50 border border-primary-100 shrink-0">
                  <div className="font-mono text-[10px] font-extrabold uppercase text-primary">
                    EXPECTED FLOW IMPACT
                  </div>
                  <div className="text-[14px] font-extrabold text-navy mt-0.5">
                    {activeFlowBlueprint.revenueImpactStat}
                  </div>
                </div>
              </div>

              {/* 4 Connected Visual Sequence Nodes (Click to Inspect) */}
              <div className="mb-3 font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                CLICK ANY NODE (01–04) IN THE AUTOMATION SEQUENCE TO INSPECT:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                {activeFlowBlueprint.emails.map((node, idx) => {
                  const isNodeActive = idx === activeEmailNodeIdx;
                  return (
                    <button
                      key={node.stepNum}
                      type="button"
                      onClick={() => setActiveEmailNodeIdx(idx)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                        isNodeActive
                          ? 'bg-navy text-white border-primary shadow-lg -translate-y-0.5'
                          : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`px-2.5 py-0.5 rounded font-mono text-[10.5px] font-extrabold ${
                              isNodeActive
                                ? 'bg-primary text-white'
                                : 'bg-primary-50 text-primary'
                            }`}
                          >
                            {node.stepNum}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 font-mono text-[10.5px] font-bold ${
                              isNodeActive ? 'text-primary-100' : 'text-navy-60'
                            }`}
                          >
                            <Clock className="w-3 h-3 text-primary" />
                            {node.timingBadge}
                          </span>
                        </div>

                        <h4
                          className={`text-[15px] font-extrabold leading-snug ${
                            isNodeActive ? 'text-white' : 'text-navy'
                          }`}
                        >
                          {node.nodeTitle}
                        </h4>

                        <p
                          className={`mt-1.5 text-[12px] line-clamp-2 ${
                            isNodeActive ? 'text-white/75' : 'text-navy-60'
                          }`}
                        >
                          &ldquo;{node.subjectLine}&rdquo;
                        </p>
                      </div>

                      <div
                        className={`mt-3 pt-2.5 border-t font-mono text-[10.5px] font-bold flex items-center justify-between ${
                          isNodeActive
                            ? 'border-white/15 text-primary-100'
                            : 'border-navy-08 text-primary'
                        }`}
                      >
                        <span>{isNodeActive ? 'Inspecting Node' : 'Inspect Email'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Email Node Deep-Dive Inspector Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeFlowBlueprint.id}-${activeEmailNode.stepNum}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="mt-6 rounded-2xl bg-primary-50/60 border border-primary-100 p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
                >
                  {/* Left 6 Cols: Trigger Logic, Conditional Split & Conversion Goal */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold">
                          {activeEmailNode.stepNum} • {activeEmailNode.timingBadge}
                        </span>
                        <span className="font-mono text-[11.5px] font-bold text-primary">
                          {activeEmailNode.openRateBench} • {activeEmailNode.clickRateBench}
                        </span>
                      </div>

                      <h4 className="text-[20px] sm:text-[22px] font-extrabold text-navy">
                        {activeEmailNode.nodeTitle}
                      </h4>

                      <div className="mt-4 space-y-3">
                        <div className="p-3.5 rounded-xl bg-white border border-navy-08">
                          <div className="font-mono text-[10.5px] font-extrabold uppercase text-primary">
                            TIMING &amp; CONDITIONAL SPLIT LOGIC
                          </div>
                          <div className="text-[13px] font-bold text-navy mt-1">
                            {activeEmailNode.delayRule}
                          </div>
                          <div className="text-[12.5px] text-navy-70 mt-0.5">
                            {activeEmailNode.conditionalSplitNote}
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-navy-08">
                          <div className="font-mono text-[10.5px] font-extrabold uppercase text-primary">
                            STRATEGIC GOAL OF THIS EMAIL
                          </div>
                          <p className="text-[13px] text-navy-80 mt-1 leading-relaxed">
                            {activeEmailNode.goalOfEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(
                            `Email Flow Setup: ${activeFlowBlueprint.tabLabel}`
                          )
                        }
                        className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white text-[13px] font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <span>Build This Flow for Our Brand</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        href="/services/copywriting"
                        className="text-[12.5px] font-bold text-navy hover:text-primary inline-flex items-center gap-1"
                      >
                        <span>See Conversion Copywriting</span>
                        <ArrowRight className="w-3.5 h-3.5 text-primary" />
                      </Link>
                    </div>
                  </div>

                  {/* Right 6 Cols: Simulated Email Specimen Card */}
                  <div className="lg:col-span-6 rounded-2xl bg-white border border-navy-15 p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="pb-3 mb-3.5 border-b border-navy-08">
                        <div className="font-mono text-[10.5px] font-bold text-navy-50 uppercase">
                          SUBJECT LINE &amp; PREHEADER SPECIMEN
                        </div>
                        <div className="text-[14.5px] font-extrabold text-navy mt-1">
                          Subject: {activeEmailNode.subjectLine}
                        </div>
                        <div className="text-[12.5px] text-navy-60 mt-0.5">
                          Preheader: {activeEmailNode.preheader}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-navy text-white">
                        <div className="font-mono text-[10px] font-bold text-primary-100 uppercase">
                          EMAIL BODY STRUCTURE PREVIEW
                        </div>
                        <div className="mt-1.5 text-[16.5px] font-extrabold text-white leading-snug">
                          {activeEmailNode.previewHeadline}
                        </div>
                        <p className="mt-2 text-[13px] text-white/80 leading-relaxed">
                          {activeEmailNode.previewCopy}
                        </p>
                        <div className="mt-4">
                          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white font-mono text-[11.5px] font-bold">
                            <span>{activeEmailNode.previewCta}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-navy-08 flex items-center justify-between font-mono text-[11px] text-navy-60">
                      <span>Mobile + Dark-Mode Tested HTML</span>
                      <span className="text-primary font-bold">UTM + Revenue Tracked ✓</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — WHAT WE DELIVER: FULL-STACK EMAIL & CRM DELIVERABLES
          Layout: 6 Core Deliverables (Single Source of Truth) + Related Industries
          Background: Crisp White (#ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span>COMPLETE SCOPE OF WORK</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Everything Included in Our{' '}
                <span className="text-primary">Email Marketing &amp; Lifecycle Setup</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-md leading-[1.65]">
              We don&apos;t just hand you a Canva graphic. We handle DNS authentication, ESP data
              events, custom HTML/Klaviyo templates, copywriting, and revenue attribution.
            </p>
          </div>

          {/* 6 Deliverables Grid mapped from Single Source of Truth + Expanded Technical Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceData.deliverables.map((delivTitle, index) => {
              const deliverablesDetails = [
                {
                  code: 'DELIVERABLE 01',
                  tools: 'Klaviyo • HubSpot • Brevo • ActiveCampaign',
                  desc: 'Full ESP account architecture, Shopify/WooCommerce or CRM webhook integration, SPF/DKIM/DMARC authentication, custom sending domain, and a 14–21 day IP/domain deliverability warmup schedule.',
                  checklist: [
                    'Custom branded sending subdomain setup',
                    'Real-time Viewed Product & Checkout events',
                    'Historical customer & order data sync',
                  ],
                },
                {
                  code: 'DELIVERABLE 02',
                  tools: 'High-Intent Acquisition & Cart Recovery',
                  desc: 'Multi-step Welcome Series with pop-up/quiz capture, Site Abandonment, Browse Abandonment, and split-tested Abandoned Cart & Checkout flows tailored by cart value.',
                  checklist: [
                    'Mobile-friendly two-step signup pop-up',
                    'Dynamic cart product blocks & auto-coupons',
                    'High-AOV vs Standard-AOV conditional splits',
                  ],
                },
                {
                  code: 'DELIVERABLE 03',
                  tools: 'LTV, Repeat Orders & Churn Prevention',
                  desc: 'Automated Post-Purchase onboarding, delivery-synced review requests, predictive replenishment reminders, VIP loyalty tier induction, and 60/90-day Win-Back sequences.',
                  checklist: [
                    'First-time vs repeat buyer messaging splits',
                    'Category-affinity cross-sell logic',
                    'Automated 90-day sunset list hygiene flow',
                  ],
                },
                {
                  code: 'DELIVERABLE 04',
                  tools: 'HubSpot • Salesforce • Customer.io • Zoho',
                  desc: 'Behavior-driven B2B sequences for lead magnets, webinar attendees, pricing-page visitors, and post-demo follow-ups—written in crisp plain-text and light-editorial formats.',
                  checklist: [
                    'Lead-score & page-visit trigger rules',
                    'Sales rep (AE) sender personalization',
                    'Direct Calendly / HubSpot meeting handoff',
                  ],
                },
                {
                  code: 'DELIVERABLE 05',
                  tools: 'Figma-to-ESP Modular Design System',
                  desc: 'Custom-coded, mobile-first email templates with dark-mode rendering support (Apple Mail, Gmail, Outlook), live web-safe typography, and reusable drag-and-drop blocks.',
                  checklist: [
                    'Tested across iOS, Android, Gmail & Outlook',
                    'Dark-mode contrast & logo legibility locks',
                    'Fast-loading compressed retina product cards',
                  ],
                },
                {
                  code: 'DELIVERABLE 06',
                  tools: 'RFM Segments, Split Testing & GA4 Attribution',
                  desc: 'Behavioral segmentation (Engaged 30/60/90, VIPs, Window Shoppers), continuous A/B testing on subject lines and send times, and clean GA4 + ESP revenue reporting.',
                  checklist: [
                    'Continuous subject line & offer A/B tests',
                    'Unengaged suppression to protect inbox placement',
                    'Monthly flow + campaign revenue scorecard',
                  ],
                },
              ][index] || {
                code: `DELIVERABLE 0${index + 1}`,
                tools: 'Full-Stack Lifecycle Execution',
                desc: 'End-to-end strategy, copy, design, and technical automation setup.',
                checklist: ['Custom configuration', 'QA tested', 'Revenue tracked'],
              };

              return (
                <div
                  key={delivTitle}
                  className="rounded-[24px] bg-primary-50/40 hover:bg-white border border-navy-08 hover:border-primary p-6 sm:p-7 transition-all shadow-xs hover:shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[10.5px] font-extrabold uppercase">
                        {deliverablesDetails.code}
                      </span>
                      <span className="w-8 h-8 rounded-xl bg-primary-50 text-primary flex items-center justify-center font-mono text-[12px] font-extrabold">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-[18.5px] sm:text-[20px] font-extrabold text-navy leading-snug">
                      {delivTitle}
                    </h3>

                    <div className="mt-1.5 font-mono text-[11px] font-bold text-primary">
                      {deliverablesDetails.tools}
                    </div>

                    <p className="mt-3 text-[13.5px] text-navy-70 leading-relaxed">
                      {deliverablesDetails.desc}
                    </p>
                  </div>

                  <ul className="mt-5 pt-4 border-t border-navy-08 space-y-2">
                    {deliverablesDetails.checklist.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2 text-[12.5px] font-semibold text-navy"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Bottom Industry & Cross-Service Strip */}
          <div className="mt-10 p-6 rounded-[24px] bg-navy text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                HIGH-IMPACT INDUSTRIES &amp; CONNECTED CAPABILITIES
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-bold text-white/80 mr-1">
                  Top Industries:
                </span>
                {relatedIndustryObjs.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white text-[12px] font-bold transition-colors"
                  >
                    <span>{ind.name}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
                <Link
                  href="/industries/b2b-saas"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white text-[12px] font-bold transition-colors"
                >
                  <span>B2B / SaaS</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/services/wordpress-shopify-development"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.07] hover:bg-primary border border-white/15 text-white text-[12px] font-bold transition-colors"
              >
                <span>Shopify &amp; Store Integration</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/services/conversion-rate-optimization"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.07] hover:bg-primary border border-white/15 text-white text-[12px] font-bold transition-colors"
              >
                <span>CRO &amp; Pop-Up Testing</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/services/analytics-tracking-setup"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.07] hover:bg-primary border border-white/15 text-white text-[12px] font-bold transition-colors"
              >
                <span>Analytics &amp; Tracking</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <Link
                href="/ai-solutions/crm-lead-automation"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.07] hover:bg-primary border border-white/15 text-white text-[12px] font-bold transition-colors"
              >
                <span>CRM &amp; Lead Automation</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmailMarketing;
