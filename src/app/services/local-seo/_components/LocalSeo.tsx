'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Search,
  MapPin,
  Phone,
  Navigation,
  Globe,
  Star,
  Store,
  Stethoscope,
  Utensils,
  Scissors,
  Wrench,
  GraduationCap,
  Building2,
  ShieldCheck,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  FileText,
  ExternalLink,
  Compass,
  Award,
  TrendingUp,
} from 'lucide-react';
import { services } from '@/app/services/_components/Services';

/* ==========================================================================
   SECTION 1 — HERO: LIVE GOOGLE MAPS 3-PACK SIMULATOR DATA (4 BUSINESS TYPES)
   ========================================================================== */
interface CompetitorMapCard {
  rank: 2 | 3;
  name: string;
  rating: string;
  reviewsCount: string;
  distance: string;
  category: string;
  statusNote: string;
}

interface HeroLocalCategorySpec {
  id: string;
  chipLabel: string;
  searchQuery: string;
  cityTag: string;
  pinCoords: { top: string; left: string };
  competitorPins: { top: string; left: string; rank: number }[];
  rankOneBusiness: {
    name: string;
    category: string;
    rating: string;
    reviewsCount: string;
    distance: string;
    address: string;
    openHours: string;
    attributes: string[];
    monthlyCallsMetric: string;
    monthlyDirectionsMetric: string;
  };
  competitors: CompetitorMapCard[];
}

const HERO_LOCAL_CATEGORIES: HeroLocalCategorySpec[] = [
  {
    id: 'dental-clinic',
    chipLabel: 'Dental Clinic',
    searchQuery: 'best dental implant clinic near me',
    cityTag: 'Within 2.5 km • Open Now',
    pinCoords: { top: '38%', left: '48%' },
    competitorPins: [
      { top: '26%', left: '28%', rank: 2 },
      { top: '62%', left: '72%', rank: 3 },
    ],
    rankOneBusiness: {
      name: 'YourBrand Dental & Implant Studio',
      category: 'Dental Clinic • Cosmetic Dentist',
      rating: '4.9',
      reviewsCount: '480',
      distance: '0.8 km',
      address: 'Suite 204, Metro Plaza, Main Link Road',
      openHours: 'Open ⋅ Closes 8:30 PM',
      attributes: ['Same-Day Appointments', '3D CBCT Scan On-Site', 'Verified GBP'],
      monthlyCallsMetric: '+184 calls/mo',
      monthlyDirectionsMetric: '+310 direction taps/mo',
    },
    competitors: [
      {
        rank: 2,
        name: 'City Care Family Dentistry',
        rating: '4.3',
        reviewsCount: '92',
        distance: '2.1 km',
        category: 'Dentist',
        statusNote: 'Missing service attributes',
      },
      {
        rank: 3,
        name: 'SmileLine Dental Centre',
        rating: '4.1',
        reviewsCount: '64',
        distance: '3.4 km',
        category: 'Dental Clinic',
        statusNote: 'No recent GBP posts',
      },
    ],
  },
  {
    id: 'cafe-restaurant',
    chipLabel: 'Cafe & Restaurant',
    searchQuery: 'specialty coffee & brunch cafe near me',
    cityTag: 'Within 1.8 km • Top Rated',
    pinCoords: { top: '42%', left: '52%' },
    competitorPins: [
      { top: '28%', left: '68%', rank: 2 },
      { top: '66%', left: '30%', rank: 3 },
    ],
    rankOneBusiness: {
      name: 'YourBrand Roastery & Kitchen',
      category: 'Specialty Cafe • All-Day Brunch',
      rating: '4.9',
      reviewsCount: '1,120',
      distance: '0.6 km',
      address: '14 Courtyard Lane, High Street District',
      openHours: 'Open ⋅ Closes 11:00 PM',
      attributes: ['Live Menu Schema', 'Table Reservation Link', 'Outdoor Seating'],
      monthlyCallsMetric: '+260 calls/mo',
      monthlyDirectionsMetric: '+890 direction taps/mo',
    },
    competitors: [
      {
        rank: 2,
        name: 'Corner Bean Bistro',
        rating: '4.4',
        reviewsCount: '215',
        distance: '1.5 km',
        category: 'Cafe',
        statusNote: 'No menu URL linked',
      },
      {
        rank: 3,
        name: 'Urban Brew House',
        rating: '4.2',
        reviewsCount: '140',
        distance: '2.3 km',
        category: 'Coffee Shop',
        statusNote: 'Outdated holiday hours',
      },
    ],
  },
  {
    id: 'salon-spa',
    chipLabel: 'Salon & Spa',
    searchQuery: 'luxury hair salon & skin clinic near me',
    cityTag: 'Within 3.0 km • Open Now',
    pinCoords: { top: '35%', left: '45%' },
    competitorPins: [
      { top: '58%', left: '25%', rank: 2 },
      { top: '30%', left: '74%', rank: 3 },
    ],
    rankOneBusiness: {
      name: 'YourBrand Atelier Salon & MedSpa',
      category: 'Hair Salon • Skin Care Clinic',
      rating: '4.9',
      reviewsCount: '630',
      distance: '1.1 km',
      address: 'Floor 1, Galleria Promenade, West Avenue',
      openHours: 'Open ⋅ Closes 9:00 PM',
      attributes: ['Instant WhatsApp Booking', 'Price List Live', '140+ Client Photos'],
      monthlyCallsMetric: '+215 calls/mo',
      monthlyDirectionsMetric: '+440 direction taps/mo',
    },
    competitors: [
      {
        rank: 2,
        name: 'Glamour Studio Unisex Salon',
        rating: '4.3',
        reviewsCount: '118',
        distance: '2.4 km',
        category: 'Beauty Salon',
        statusNote: 'Unanswered reviews',
      },
      {
        rank: 3,
        name: 'Aura Hair & Beauty Lounge',
        rating: '4.0',
        reviewsCount: '76',
        distance: '3.1 km',
        category: 'Hair Salon',
        statusNote: 'Inconsistent phone NAP',
      },
    ],
  },
  {
    id: 'home-services',
    chipLabel: 'Home Services',
    searchQuery: 'modular kitchen & interior showroom near me',
    cityTag: 'Within 5.0 km • Verified',
    pinCoords: { top: '44%', left: '46%' },
    competitorPins: [
      { top: '24%', left: '34%', rank: 2 },
      { top: '64%', left: '68%', rank: 3 },
    ],
    rankOneBusiness: {
      name: 'YourBrand Bespoke Kitchens & Interiors',
      category: 'Interior Design Studio • Modular Showroom',
      rating: '5.0',
      reviewsCount: '310',
      distance: '1.4 km',
      address: 'Plot 42, Design Mile, Ring Road',
      openHours: 'Open ⋅ Closes 8:00 PM',
      attributes: ['Experience Center Walkthrough', 'Free Site Measure', 'Service Area: 25 km'],
      monthlyCallsMetric: '+145 calls/mo',
      monthlyDirectionsMetric: '+275 showroom visits/mo',
    },
    competitors: [
      {
        rank: 2,
        name: 'Metro Home Decor & Woodworks',
        rating: '4.2',
        reviewsCount: '58',
        distance: '3.8 km',
        category: 'Furniture Store',
        statusNote: 'Wrong primary category',
      },
      {
        rank: 3,
        name: 'Prime Space Contractors',
        rating: '4.0',
        reviewsCount: '41',
        distance: '4.9 km',
        category: 'General Contractor',
        statusNote: 'No city landing page',
      },
    ],
  },
];

/* ==========================================================================
   SECTION 2 — HOW GOOGLE DECIDES LOCAL RANKINGS: THE 3-RING RADAR
   ========================================================================== */
interface RadarSignalCheck {
  title: string;
  detail: string;
  impactTag: string;
}

interface RadarPillarSpec {
  id: 'proximity' | 'relevance' | 'prominence';
  ringIndex: string;
  name: string;
  tagline: string;
  radiusLabel: string;
  whatGoogleMeasures: string;
  howWebXCodeOptimizes: string;
  signals: RadarSignalCheck[];
  diagnosticSnippetLabel: string;
  diagnosticSnippet: string;
}

const RADAR_PILLARS: RadarPillarSpec[] = [
  {
    id: 'proximity',
    ringIndex: 'RING 01 // DISTANCE & RADIUS',
    name: 'Proximity (How Close You Are)',
    tagline: 'Expanding your effective ranking radius from 500m to the entire city & surrounding suburbs.',
    radiusLabel: '1 km → 5 km → 15 km Radius Expansion',
    whatGoogleMeasures:
      'Google calculates the physical GPS coordinates of the searcher relative to your verified business pin, your defined service-area polygons, and the neighborhood entities mentioned on your linked landing page.',
    howWebXCodeOptimizes:
      'While you cannot move your physical building, most businesses only rank within 500 meters because their pin placement, service-area boundaries, and neighborhood landing pages are unconfigured. We widen your green-zone radius across every nearby locality.',
    signals: [
      {
        title: 'Exact Rooftop Pin & Entrance Geocode',
        detail: 'Calibrate verified latitude/longitude coordinates and street-view entrance markers so Google Maps never misroutes walk-ins.',
        impactTag: 'GPS Precision',
      },
      {
        title: 'Hyper-Local Neighborhood & Suburb Pages',
        detail: 'Build dedicated area pages targeting high-income neighborhoods, tech parks, and commuter corridors within a 15 km drive.',
        impactTag: 'Radius +3.2×',
      },
      {
        title: 'Service-Area Polygon & Postal Code Mapping',
        detail: 'Configure explicit postal codes, sub-localities, and GeoCircle schema for both storefront and at-home service businesses.',
        impactTag: 'GeoCircle JSON-LD',
      },
      {
        title: 'Embedded Driving Landmark & Route Context',
        detail: 'Reference nearby metro stations, hospitals, and major intersections on your location page to reinforce local entity co-occurrence.',
        impactTag: 'Local Entities',
      },
    ],
    diagnosticSnippetLabel: 'GEOCIRCLE & LOCALITY SCHEMA',
    diagnosticSnippet: `"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 19.0760, "longitude": 72.8777 },
  "geoRadius": "15000"
},
"containsPlace": ["Bandra West", "Andheri", "Lower Parel", "BKC"]`,
  },
  {
    id: 'relevance',
    ringIndex: 'RING 02 // CATEGORY & INTENT MATCH',
    name: 'Relevance (How Well You Match)',
    tagline: 'Making sure Google knows every exact treatment, dish, product or service you offer.',
    radiusLabel: '100% Category, Attribute & Keyword Alignment',
    whatGoogleMeasures:
      'Google checks whether your primary & secondary GBP categories, itemized service catalog, business description, website H1s, and structured schema match the exact words the customer typed.',
    howWebXCodeOptimizes:
      'Most local businesses pick one generic category (e.g., "Doctor" or "Store") and leave 80% of their Google Business Profile blank. We reverse-engineer top-ranking competitors and map every commercial service directly into your profile and site.',
    signals: [
      {
        title: 'Primary + 9 Secondary GBP Category Audit',
        detail: 'Select the highest-converting primary category plus all relevant secondary categories unlocked in Google’s taxonomy.',
        impactTag: '#1 Ranking Factor',
      },
      {
        title: 'Itemized Services, Products & Menu Catalog',
        detail: 'Populate every service/treatment/product with keyword-rich descriptions, transparent price ranges, and direct booking URLs.',
        impactTag: 'Long-Tail Match',
      },
      {
        title: 'Location Landing Page On-Page Alignment',
        detail: 'Match your GBP link destination with a fast page featuring [Service + City] in the H1, title tag, and LocalBusiness schema.',
        impactTag: 'GBP ↔ Web Sync',
      },
      {
        title: '25+ Business Attributes & Pre-Seeded Q&A',
        detail: 'Enable wheelchair access, parking, payment methods, women-led/veteran badges, and seed top buyer questions with authoritative answers.',
        impactTag: 'Voice & Filter Ready',
      },
    ],
    diagnosticSnippetLabel: 'GBP CATEGORY & CATALOG BLUEPRINT',
    diagnosticSnippet: `Primary Category:   Dental Clinic (gcid:dental_clinic)
Secondary (4 of 9): Cosmetic Dentist • Dental Implants Periodontist • Orthodontist • Pediatric Dentist
Service Catalog:    28 Itemized Treatments linked to dedicated /services/[slug] URLs`,
  },
  {
    id: 'prominence',
    ringIndex: 'RING 03 // AUTHORITY & TRUST',
    name: 'Prominence (How Trusted You Are)',
    tagline: 'Outranking older competitors with review velocity, 100% clean NAP citations, and local links.',
    radiusLabel: '4.8★+ Rating • 60+ Citations • Local PR',
    whatGoogleMeasures:
      'When two businesses are equally close and relevant, Google ranks the one with stronger real-world authority: review count, review recency, keyword mentions inside customer reviews, consistent NAP directories, and local backlinks.',
    howWebXCodeOptimizes:
      'We build a systematic review engine (QR cards + WhatsApp/SMS flows), clean up every duplicate or mismatched directory listing across 60+ platforms, and earn hyper-local city press & chamber backlinks.',
    signals: [
      {
        title: 'Consistent Review Velocity & Keyword-Rich Replies',
        detail: 'Generate steady 5-star reviews from real customers and respond to 100% of reviews within 24 hours with natural service+city context.',
        impactTag: 'Trust Signal',
      },
      {
        title: '60+ Local Directory NAP Cleanup & Sync',
        detail: 'Audit and lock identical Name, Address, and Phone formatting across Apple Maps, Bing Places, Justdial, Practo, Zomato, Sulekha, and Yelp.',
        impactTag: 'Zero NAP Conflict',
      },
      {
        title: 'Weekly GBP Posts, Offers & Geotagged Photos',
        detail: 'Keep your profile active with real team photos, storefront shots, event updates, and promotional offer cards that boost engagement.',
        impactTag: 'Freshness Signal',
      },
      {
        title: 'Local Press, Sponsorship & City Backlinks',
        detail: 'Acquire authoritative regional mentions from city publications, trade associations, and neighborhood business directories.',
        impactTag: 'Local Authority',
      },
    ],
    diagnosticSnippetLabel: 'NAP CITATION & REVIEW VELOCITY LOG',
    diagnosticSnippet: `✔ NAP Consistency Score: 99.4% across 64 verified directories (Apple Maps, Bing, Justdial, IndiaMART)
✔ Review Velocity:       +28 new 5★ reviews/month • 100% owner response rate (<6 hrs)
✔ Photo Engagement:      3.4× more photo views than category median`,
  },
];

/* ==========================================================================
   SECTION 3 — GOOGLE BUSINESS PROFILE (GBP) OPTIMIZATION SHOWCASE (8 HOTSPOTS)
   ========================================================================== */
interface GbpHotspotSpec {
  id: string;
  number: string;
  zoneLabel: string;
  title: string;
  impactBadge: string;
  whatMostBusinessesDoWrong: string;
  whatWebXCodeEngineers: string;
  deliverableChecklist: string[];
}

const GBP_HOTSPOTS: GbpHotspotSpec[] = [
  {
    id: 'gbp-01',
    number: '01',
    zoneLabel: 'Primary & Secondary Categories',
    title: 'Precision Category Taxonomy Selection',
    impactBadge: 'HIGHEST RANK WEIGHT',
    whatMostBusinessesDoWrong:
      'Picking a broad category like "Consultant" or "Medical Center" and leaving secondary category slots completely empty.',
    whatWebXCodeEngineers:
      'We audit the exact hidden category IDs (`gcid`) used by the top 3 Map Pack leaders in your city and configure your Primary + up to 9 Secondary categories to capture every high-intent search variation.',
    deliverableChecklist: [
      'Competitor GCID reverse-engineering audit',
      'Primary category conversion alignment',
      'Seasonal category rotation (when applicable)',
    ],
  },
  {
    id: 'gbp-02',
    number: '02',
    zoneLabel: 'Business Name & Verified Pin',
    title: 'Compliant Brand Naming & Pin Calibration',
    impactBadge: 'SUSPENSION-SAFE',
    whatMostBusinessesDoWrong:
      'Either stuffing spammy keywords into the business name (risking instant Google suspension) or placing the map pin on the wrong side of a complex.',
    whatWebXCodeEngineers:
      'We align your real-world signage, legal registration, and GBP title for 100% Google guideline compliance—while locking your map pin and entrance coordinates to the exact storefront door.',
    deliverableChecklist: [
      'Google Guidelines compliance & suspension protection',
      'Exact rooftop & street-view entrance pin calibration',
      'Competitor spam-name fighting & redressal filings',
    ],
  },
  {
    id: 'gbp-03',
    number: '03',
    zoneLabel: 'Services, Products & Menu Catalog',
    title: 'Full Itemized Service & Product Showcase',
    impactBadge: '+40% LONG-TAIL MATCHES',
    whatMostBusinessesDoWrong:
      'Listing zero products or services, forcing searchers to click away to figure out pricing or availability.',
    whatWebXCodeEngineers:
      'We build out visual Product Cards and categorized Service Menus with 300-character SEO descriptions, price ranges, high-res photos, and UTM-tagged landing page buttons.',
    deliverableChecklist: [
      '15–40 itemized service entries with descriptions',
      'Visual Product Carousel cards with CTA links',
      'Structured Menu / Treatment / Price list upload',
    ],
  },
  {
    id: 'gbp-04',
    number: '04',
    zoneLabel: 'Photos, Exterior Shots & Short Videos',
    title: 'High-Converting Visual & Storefront Library',
    impactBadge: '2.4× MORE DIRECTION REQUESTS',
    whatMostBusinessesDoWrong:
      'Uploading 3 blurry stock photos once in 2021 and never adding exterior signage, team, or work-in-progress shots.',
    whatWebXCodeEngineers:
      'Google’s Vision AI reads image content (dental chairs, espresso machines, showroom interiors). We curate and upload monthly authentic exterior, interior, team, and work photos plus 30-second vertical walkthroughs.',
    deliverableChecklist: [
      'Google Vision AI-friendly photo shot-list for your team',
      'Exterior signage photos from 3 approach angles',
      'Monthly fresh photo & 30s video upload cadence',
    ],
  },
  {
    id: 'gbp-05',
    number: '05',
    zoneLabel: 'Weekly Google Posts, Offers & Events',
    title: 'Active Google Updates & Promotional Offers',
    impactBadge: 'LIVE CONVERSION HOOKS',
    whatMostBusinessesDoWrong:
      'Leaving the "Updates" feed dead for months, signaling to both Google and buyers that the business might be inactive.',
    whatWebXCodeEngineers:
      'We publish weekly Google Posts—highlighting seasonal offers, new arrivals, patient/client success stories, and time-bound deals with direct "Book Online" or "Call Now" buttons.',
    deliverableChecklist: [
      '4 custom-designed Google Posts every month',
      'Promotional Offer cards with coupon codes & expiry dates',
      'UTM-tracked click attribution into GA4',
    ],
  },
  {
    id: 'gbp-06',
    number: '06',
    zoneLabel: 'Q&A Seeded Answers',
    title: 'Owner-Seeded Questions & Instant Answers',
    impactBadge: 'VOICE & AI OVERVIEWS',
    whatMostBusinessesDoWrong:
      'Allowing random Local Guides to answer customer questions inaccurately—or leaving the Q&A section empty.',
    whatWebXCodeEngineers:
      'We proactively publish and upvote the top 15 questions your buyers ask (parking, insurance, consultation fees, custom orders, turnaround times) with authoritative owner-verified answers.',
    deliverableChecklist: [
      '15 pre-seeded buyer FAQs with verified owner answers',
      '24/7 monitoring for new public questions',
      'Keyword alignment for voice search & AI Local Overviews',
    ],
  },
  {
    id: 'gbp-07',
    number: '07',
    zoneLabel: 'Reviews & Keyword-Rich Owner Responses',
    title: 'Review Generation & Strategic Reply Engine',
    impactBadge: 'TOP TRUST FACTOR',
    whatMostBusinessesDoWrong:
      'Never asking happy customers for reviews, or replying with a generic copy-pasted "Thanks" to every review.',
    whatWebXCodeEngineers:
      'We equip your front desk or delivery team with custom QR review stands and WhatsApp links, and write thoughtful, personalized responses to every review that reinforce your core services and location.',
    deliverableChecklist: [
      'Custom print-ready QR code table stand & WhatsApp template',
      'Professional response to 100% of positive & critical reviews',
      'Unfair/fake review flagging & policy escalation support',
    ],
  },
  {
    id: 'gbp-08',
    number: '08',
    zoneLabel: 'Booking Links, WhatsApp & UTM Call Tracking',
    title: 'Frictionless Booking & Exact ROI Attribution',
    impactBadge: '100% TRACKABLE LEADS',
    whatMostBusinessesDoWrong:
      'Linking the website button to a slow homepage with no UTM parameters, making Google Maps traffic look like random "Direct" traffic in analytics.',
    whatWebXCodeEngineers:
      'We wire custom UTM tracking parameters onto your website, appointment, and menu links—and integrate instant WhatsApp/appointment booking URLs so you see every call, chat, and walk-in generated.',
    deliverableChecklist: [
      'UTM-tagged Website, Appointment & Menu URLs',
      'GA4 & Google Search Console separated GBP revenue reporting',
      'Direct WhatsApp / Calendly / Practo / Reservation deep links',
    ],
  },
];

/* ==========================================================================
   SECTION 4 — WHO THIS IS FOR: 6 LOCAL BUSINESS CARDS
   ========================================================================== */
interface LocalIndustryCardSpec {
  id: string;
  title: string;
  subtitle: string;
  iconName: 'Stethoscope' | 'Utensils' | 'Scissors' | 'Wrench' | 'GraduationCap' | 'Building2';
  sampleSearches: string[];
  whatWeDeliver: string;
  keyOutcomeBadge: string;
  industryLink?: {
    label: string;
    to: string;
  };
}

const LOCAL_BUSINESS_TYPES: LocalIndustryCardSpec[] = [
  {
    id: 'clinics-hospitals',
    title: 'Clinics, Dentists, Diagnostics & Hospitals',
    subtitle: 'Capture high-urgency patient searches by specialty, symptom, and neighborhood.',
    iconName: 'Stethoscope',
    sampleSearches: [
      '"dental implant clinic near me"',
      '"best dermatologist in [city]"',
      '"24 hour diagnostic lab open now"',
    ],
    whatWeDeliver:
      'Individual doctor & department GBP profiles, Practo/directory sync, MedicalClinic & Physician schema, and HIPAA/patient-safe review flows.',
    keyOutcomeBadge: '+210% Patient Calls & Slot Bookings (placeholder)',
    industryLink: {
      label: 'Explore Healthcare Industry Solutions',
      to: '/industries/healthcare',
    },
  },
  {
    id: 'restaurants-hotels',
    title: 'Restaurants, Cafes, Cloud Kitchens & Hotels',
    subtitle: 'Turn hungry "near me" map searches and travellers into table bookings and direct orders.',
    iconName: 'Utensils',
    sampleSearches: [
      '"rooftop family restaurant near me"',
      '"specialty coffee shop open late"',
      '"boutique business hotel near airport"',
    ],
    whatWeDeliver:
      'Structured menu & dish highlights, Zomato/Swiggy/TripAdvisor NAP alignment, high-res food & room photo cadence, and direct commission-free booking links.',
    keyOutcomeBadge: '+280% Direction Taps & Direct Bookings (placeholder)',
    industryLink: {
      label: 'Explore Travel & Hospitality Solutions',
      to: '/industries/travel-hospitality',
    },
  },
  {
    id: 'salons-spas',
    title: 'Salons, MedSpas, Gyms & Wellness Studios',
    subtitle: 'Dominate local beauty, bridal, skincare, and fitness searches in affluent neighborhoods.',
    iconName: 'Scissors',
    sampleSearches: [
      '"luxury hair salon & balayage near me"',
      '"hydrafacial & laser skin clinic [area]"',
      '"pilates & personal training studio"',
    ],
    whatWeDeliver:
      'Visual treatment & price catalogs, before/after photo gallery uploads, WhatsApp instant appointment links, and automated post-visit QR review cards.',
    keyOutcomeBadge: '3.1× More Walk-Ins & WhatsApp Enquiries (placeholder)',
    industryLink: {
      label: 'Explore Skincare & Beauty Solutions',
      to: '/industries/skincare-beauty',
    },
  },
  {
    id: 'home-services-showrooms',
    title: 'Interior Showrooms, Contractors & Home Services',
    subtitle: 'Win high-ticket local projects for modular kitchens, solar EPC, architecture, and repairs.',
    iconName: 'Wrench',
    sampleSearches: [
      '"modular kitchen experience center near me"',
      '"residential solar installer in [city]"',
      '"luxury interior designer [neighborhood]"',
    ],
    whatWeDeliver:
      'Service-area radius polygons (15–30 km), dedicated suburb landing pages, completed project photo updates, and showroom appointment funnels.',
    keyOutcomeBadge: '+190% Showroom Visits & Site Surveys (placeholder)',
    industryLink: {
      label: 'Explore Interior Design & Architecture',
      to: '/industries/interior-design-architecture',
    },
  },
  {
    id: 'coaching-schools',
    title: 'Schools, Preschools, Coaching & Training Institutes',
    subtitle: 'Be the top-rated institute parents and students visit during admission season.',
    iconName: 'GraduationCap',
    sampleSearches: [
      '"best CBSE school in [locality]"',
      '"IELTS & study abroad coaching near me"',
      '"montessori preschool & daycare [area]"',
    ],
    whatWeDeliver:
      'Campus virtual tour & classroom photo optimization, course/program catalog cards, parent review generation, and admission enquiry landing pages.',
    keyOutcomeBadge: '+240% Campus Tour & Counseling Calls (placeholder)',
    industryLink: {
      label: 'Explore Education & EdTech Solutions',
      to: '/industries/education-edtech',
    },
  },
  {
    id: 'multi-branch-franchises',
    title: 'Multi-Location Retail Chains & Franchise Brands',
    subtitle: 'Centralized governance for 5 to 200+ store locations, branches, and dealer networks.',
    iconName: 'Building2',
    sampleSearches: [
      '"[brand] store near me"',
      '"authorized EV dealership in [city]"',
      '"optical & eyewear showroom [area]"',
    ],
    whatWeDeliver:
      'Bulk GBP verification & store-group management, scalable `/locations/[city]/[branch]` store locator architecture, and branch-by-branch rank & call leaderboards.',
    keyOutcomeBadge: '100% Brand & NAP Governance Across Branches',
    industryLink: {
      label: 'Explore Home Decor & Retail Solutions',
      to: '/industries/home-decor-furniture',
    },
  },
];

/* Helper to render Lucide icon for Industry Cards */
const LocalIndustryIcon: React.FC<{
  name: LocalIndustryCardSpec['iconName'];
  className?: string;
}> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Stethoscope':
      return <Stethoscope className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Scissors':
      return <Scissors className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'GraduationCap':
      return <GraduationCap className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    default:
      return <MapPin className={className} />;
  }
};

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */
interface LocalSeoProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const LocalSeo: React.FC<LocalSeoProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Single source of truth from Services.tsx */
  const localSeoServiceItem = useMemo(
    () => services.find((s) => s.slug === 'local-seo'),
    []
  );

  /* Section 1: Interactive Hero Business Type Switcher */
  const [selectedHeroCatId, setSelectedHeroCatId] = useState<string>(
    HERO_LOCAL_CATEGORIES[0].id
  );
  const activeHeroCat = useMemo(
    () =>
      HERO_LOCAL_CATEGORIES.find((c) => c.id === selectedHeroCatId) ||
      HERO_LOCAL_CATEGORIES[0],
    [selectedHeroCatId]
  );

  /* Section 2: Interactive 3-Ring Radar Switcher */
  const [selectedRadarId, setSelectedRadarId] = useState<
    'proximity' | 'relevance' | 'prominence'
  >('relevance');
  const activeRadarPillar = useMemo(
    () => RADAR_PILLARS.find((p) => p.id === selectedRadarId) || RADAR_PILLARS[1],
    [selectedRadarId]
  );

  /* Section 3: Interactive GBP Command Center Hotspot */
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(
    GBP_HOTSPOTS[0].id
  );
  const activeHotspot = useMemo(
    () => GBP_HOTSPOTS.find((h) => h.id === selectedHotspotId) || GBP_HOTSPOTS[0],
    [selectedHotspotId]
  );

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* Global Quote Modal Trigger helper */
  const triggerQuoteModal = (preselectedService?: string) => {
    const svcLabel = preselectedService || localSeoServiceItem?.name || 'Local SEO';
    if (onOpenQuoteModal) {
      onOpenQuoteModal(svcLabel);
      return;
    }
    window.dispatchEvent(
      new CustomEvent('open-quote-modal', {
        detail: {
          service: svcLabel,
        },
      })
    );
  };

  /* JSON-LD Structured Data (Service) */
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: localSeoServiceItem?.name || 'Local SEO Services',
      description:
        localSeoServiceItem?.description ||
        'Google Business Profile (GBP) optimization, Google Maps 3-Pack rankings, local NAP citations, review management, and hyper-local city/branch landing pages.',
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      serviceType: 'Local SEO & Google Business Profile Optimization',
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
    }),
    [localSeoServiceItem]
  );

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ======================================================================
         SECTION 1 — HERO: LIVE GOOGLE MAPS 3-PACK SIMULATOR (bg: #1e242e navy)
         ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Radial blue glow + subtle street-grid pattern */}
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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] text-white/70 font-medium">
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
                {localSeoServiceItem?.name || 'Local SEO'}
              </li>
            </ol>
          </nav>

          {/* 50% / 50% Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 50% (6 cols on lg) */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>LOCAL SEO • GOOGLE MAPS &amp; NEAR-ME SEARCH</span>
              </div>

              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight">
                Be the First Business{' '}
                <span className="text-primary">People Find Nearby</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65]">
                {localSeoServiceItem?.description ||
                  'Own the "near me" searches and Google Maps 3-Pack in every city and neighborhood you serve. Ideal for clinics, hotels, showrooms, schools, and multi-location service brands.'}{' '}
                We turn local searches into real <strong className="text-white">phone calls, direction taps, and walk-in customers</strong>.
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Free Local SEO & Google Maps Audit')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free Local SEO Audit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#gbp-optimizer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See What We Optimize</span>
                </a>
              </div>

              {/* 4 Capability Chips below buttons */}
              <div className="mt-9 pt-7 border-t border-white/10">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white/55 mb-3">
                  COMPLETE LOCAL DOMINANCE STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Google Business Profile', icon: Store },
                    { label: 'Local 3-Pack Rankings', icon: MapPin },
                    { label: 'Reviews & Reputation', icon: Star },
                    { label: 'City & Area Pages', icon: Compass },
                  ].map((chip) => {
                    const IconComp = chip.icon;
                    return (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 text-[13px] font-semibold text-white/90"
                      >
                        <IconComp className="w-3.5 h-3.5 text-primary" />
                        <span>{chip.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 50% (6 cols on lg): Interactive Google Maps "Local 3-Pack" Simulator */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.06] border border-white/15 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
                {/* Top Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 mb-3.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[11px] font-bold text-white/80 uppercase tracking-wider">
                      GOOGLE MAPS 3-PACK SIMULATOR
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-primary-100">
                    Select a business type
                  </span>
                </div>

                {/* 4 Interactive Business Type Chips */}
                <div
                  className="flex flex-wrap items-center gap-1.5 mb-3.5"
                  role="tablist"
                  aria-label="Local Business Categories"
                >
                  {HERO_LOCAL_CATEGORIES.map((cat) => {
                    const isSelected = cat.id === selectedHeroCatId;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedHeroCatId(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-navy/70 text-white/75 border-white/15 hover:border-white/40 hover:text-white'
                        }`}
                      >
                        {cat.chipLabel}
                      </button>
                    );
                  })}
                </div>

                {/* Search Input Bar */}
                <div className="rounded-full bg-white text-navy px-4 py-2.5 flex items-center justify-between gap-2 shadow-inner border border-navy-15">
                  <div className="flex items-center gap-2 min-w-0">
                    <Search className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-mono text-[12.5px] sm:text-[13.5px] font-bold text-navy truncate">
                      {activeHeroCat.searchQuery}
                    </span>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[10px] font-extrabold shrink-0">
                    <Navigation className="w-2.5 h-2.5" />
                    <span>{activeHeroCat.cityTag}</span>
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHeroCat.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3.5 space-y-3"
                  >
                    {/* Stylized Neighborhood Map Canvas with Radar Rings & Pins */}
                    <div className="relative h-36 sm:h-40 rounded-2xl bg-[#141a24] border border-white/15 overflow-hidden">
                      {/* Stylized Map Roads SVG */}
                      <svg
                        viewBox="0 0 600 200"
                        className="w-full h-full object-cover opacity-35"
                        aria-hidden="true"
                      >
                        {/* Secondary blocks & streets */}
                        <path
                          d="M0 45 L600 45 M0 110 L600 110 M0 165 L600 165 M110 0 L110 200 M260 0 L260 200 M430 0 L430 200 M530 0 L530 200"
                          stroke="#3b82f6"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                        />
                        {/* Major arterial roads */}
                        <path
                          d="M-20 140 Q 220 70, 620 95"
                          stroke="#2b7de9"
                          strokeWidth="5"
                          fill="none"
                        />
                        <path
                          d="M295 -10 L 270 210"
                          stroke="#2b7de9"
                          strokeWidth="4"
                          fill="none"
                        />
                      </svg>

                      {/* Proximity Radar Rings around #1 Pin */}
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                        style={{
                          top: activeHeroCat.pinCoords.top,
                          left: activeHeroCat.pinCoords.left,
                        }}
                      >
                        <div className="w-40 h-40 rounded-full border border-primary/30 bg-primary/5 animate-ping" style={{ animationDuration: '3.5s' }} />
                      </div>
                      <div
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
                        style={{
                          top: activeHeroCat.pinCoords.top,
                          left: activeHeroCat.pinCoords.left,
                        }}
                      >
                        <div className="w-24 h-24 rounded-full border border-primary/50 bg-primary/15" />
                      </div>

                      {/* Dimmed Competitor Pins #2 & #3 */}
                      {activeHeroCat.competitorPins.map((cp) => (
                        <div
                          key={cp.rank}
                          style={{ top: cp.top, left: cp.left }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-navy/90 border border-white/25 text-white/70 font-mono text-[10px] font-bold shadow"
                        >
                          <MapPin className="w-3 h-3 text-white/50" />
                          <span>#{cp.rank}</span>
                        </div>
                      ))}

                      {/* Highlighted #1 Client Pin */}
                      <div
                        style={{
                          top: activeHeroCat.pinCoords.top,
                          left: activeHeroCat.pinCoords.left,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold shadow-lg border-2 border-white"
                      >
                        <MapPin className="w-3.5 h-3.5 fill-white text-primary" />
                        <span>#1 YOUR BUSINESS</span>
                      </div>

                      {/* Bottom Map Overlay Telemetry */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10.5px] font-mono bg-navy/85 backdrop-blur-xs px-3 py-1 rounded-lg border border-white/10">
                        <span className="text-emerald-300 font-bold">
                          {activeHeroCat.rankOneBusiness.monthlyCallsMetric}
                        </span>
                        <span className="text-primary-100 font-bold">
                          {activeHeroCat.rankOneBusiness.monthlyDirectionsMetric}
                        </span>
                      </div>
                    </div>

                    {/* #1 Local 3-Pack Winner Card */}
                    <div className="rounded-2xl bg-white text-navy p-4 border-2 border-primary shadow-xl">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 font-mono text-[10px] font-extrabold uppercase">
                              #1 MAP PACK LEADER
                            </span>
                            <span className="font-mono text-[11px] font-bold text-primary">
                              • {activeHeroCat.rankOneBusiness.distance} away
                            </span>
                          </div>
                          <h2 className="text-[15px] sm:text-[16px] font-extrabold text-navy mt-1">
                            {activeHeroCat.rankOneBusiness.name}
                          </h2>
                        </div>

                        {/* Star Rating Pill */}
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[12px] font-extrabold text-amber-700 shrink-0">
                          <span>{activeHeroCat.rankOneBusiness.rating}</span>
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span className="text-navy-60 font-mono text-[11px]">
                            ({activeHeroCat.rankOneBusiness.reviewsCount})
                          </span>
                        </div>
                      </div>

                      <div className="mt-1.5 text-[12px] text-navy-70 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-navy">
                          {activeHeroCat.rankOneBusiness.category}
                        </span>
                        <span>•</span>
                        <span>{activeHeroCat.rankOneBusiness.address}</span>
                      </div>

                      {/* Open Status + GBP Attributes */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold text-[11px]">
                          {activeHeroCat.rankOneBusiness.openHours}
                        </span>
                        {activeHeroCat.rankOneBusiness.attributes.map((attr) => (
                          <span
                            key={attr}
                            className="px-2 py-0.5 rounded bg-primary-50 text-primary font-semibold text-[11px]"
                          >
                            ✔ {attr}
                          </span>
                        ))}
                      </div>

                      {/* 3 Action Buttons: Call, Directions, Website */}
                      <div className="mt-3 pt-2.5 border-t border-navy-08 grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            triggerQuoteModal(
                              `Local SEO Audit (${activeHeroCat.chipLabel})`
                            )
                          }
                          className="py-1.5 px-2.5 rounded-xl bg-primary text-white font-bold text-[11.5px] inline-flex items-center justify-center gap-1.5 hover:bg-primary-700 transition-colors cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            triggerQuoteModal(
                              `Local SEO Audit (${activeHeroCat.chipLabel})`
                            )
                          }
                          className="py-1.5 px-2.5 rounded-xl bg-primary-50 text-primary hover:bg-primary hover:text-white font-bold text-[11.5px] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Directions</span>
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            triggerQuoteModal(
                              `Local SEO Audit (${activeHeroCat.chipLabel})`
                            )
                          }
                          className="py-1.5 px-2.5 rounded-xl bg-primary-50 text-primary hover:bg-primary hover:text-white font-bold text-[11.5px] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Website</span>
                        </button>
                      </div>
                    </div>

                    {/* Competitors #2 and #3 Dimmed Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeHeroCat.competitors.map((comp) => (
                        <div
                          key={comp.rank}
                          className="rounded-xl bg-white/[0.04] border border-white/10 p-3 opacity-80"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[12px] font-bold text-white truncate">
                              #{comp.rank} {comp.name}
                            </span>
                            <span className="font-mono text-[10px] text-white/60 shrink-0">
                              {comp.distance}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-[11px]">
                            <span className="text-amber-300 font-semibold">
                              ★ {comp.rating} ({comp.reviewsCount})
                            </span>
                            <span className="font-mono text-[10px] text-rose-300/90 truncate">
                              {comp.statusNote}
                            </span>
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
         SECTION 2 — HOW GOOGLE DECIDES LOCAL RANKINGS: THE 3-RING RADAR (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              HOW LOCAL RANKINGS WORK
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Google Ranks Local Businesses on{' '}
              <span className="text-primary">3 Signals</span> — We Engineer All 3
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Google’s official local algorithm evaluates every business on{' '}
              <strong className="text-navy">Proximity, Relevance, and Prominence</strong>. Click any
              of the 3 radar rings below to see how we expand your ranking radius across your entire
              city.
            </p>
          </div>

          {/* 2-Column Interactive Radar Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (5 cols on lg): Visual 3-Ring Local Radar + 3 Selector Buttons */}
            <div className="lg:col-span-5 rounded-[24px] bg-navy text-white p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/80">
                    LOCAL RANKING RADAR // 1KM → 15KM
                  </span>
                </div>
                <span className="font-mono text-[11px] text-primary-100">
                  Interactive
                </span>
              </div>

              {/* Concentric 3-Ring Radar Visual */}
              <div className="my-6 relative flex items-center justify-center py-4">
                {/* Outer Ring: 15 km (Prominence) */}
                <button
                  type="button"
                  onClick={() => setSelectedRadarId('prominence')}
                  aria-label="Inspect Prominence Signal (15km ring)"
                  className={`w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer relative ${
                    selectedRadarId === 'prominence'
                      ? 'border-primary bg-primary/20 shadow-[0_0_40px_rgba(43,125,233,0.35)]'
                      : 'border-white/20 bg-white/[0.03] hover:border-white/40'
                  }`}
                >
                  <span className="absolute top-2.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100 bg-navy/90 px-2 py-0.5 rounded-full border border-white/15">
                    15 KM • PROMINENCE
                  </span>

                  {/* Middle Ring: 5 km (Relevance) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRadarId('relevance');
                    }}
                    className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer relative ${
                      selectedRadarId === 'relevance'
                        ? 'border-primary bg-primary/30 shadow-[0_0_30px_rgba(43,125,233,0.45)]'
                        : 'border-white/25 bg-white/[0.04] hover:border-white/50'
                    }`}
                  >
                    <span className="absolute top-2 font-mono text-[10px] font-extrabold uppercase tracking-wider text-white bg-navy/90 px-2 py-0.5 rounded-full border border-white/15">
                      5 KM • RELEVANCE
                    </span>

                    {/* Inner Ring: 1 km (Proximity) */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRadarId('proximity');
                      }}
                      className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                        selectedRadarId === 'proximity'
                          ? 'border-white bg-primary text-white shadow-lg'
                          : 'border-primary/60 bg-navy/90 text-white hover:border-white'
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-white mb-0.5" />
                      <span className="font-mono text-[9.5px] font-extrabold uppercase">
                        1 KM PIN
                      </span>
                      <span className="font-mono text-[8.5px] text-white/80">
                        PROXIMITY
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              {/* 3 Pillar Selector Tabs */}
              <div
                className="space-y-2.5"
                role="tablist"
                aria-label="Google Local Ranking Pillars"
              >
                {RADAR_PILLARS.map((pillar, idx) => {
                  const isSelected = pillar.id === selectedRadarId;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setSelectedRadarId(pillar.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-white/[0.05] text-white border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-white text-primary'
                              : 'bg-white/10 text-primary-100'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[14px] font-extrabold truncate">
                            {pillar.name}
                          </div>
                          <div
                            className={`font-mono text-[11px] truncate ${
                              isSelected ? 'text-white/90' : 'text-white/60'
                            }`}
                          >
                            {pillar.radiusLabel}
                          </div>
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-white translate-x-0.5' : 'text-white/40'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column (7 cols on lg): Selected Signal Deep-Dive Panel */}
            <div className="lg:col-span-7">
              <div className="h-full rounded-[24px] bg-primary-50/50 border border-primary-100 p-6 sm:p-8 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRadarPillar.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-primary-100">
                        <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider">
                          {activeRadarPillar.ringIndex}
                        </span>
                        <span className="font-mono text-[12px] font-bold text-primary">
                          {activeRadarPillar.radiusLabel}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[24px] sm:text-[28px] font-extrabold text-navy leading-snug">
                        {activeRadarPillar.name}
                      </h3>
                      <p className="mt-1.5 text-[15px] font-semibold text-primary">
                        {activeRadarPillar.tagline}
                      </p>

                      {/* What Google Measures vs How WebXCode Optimizes */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-4 rounded-2xl bg-white border border-navy-08">
                          <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-navy-60 mb-1">
                            WHAT GOOGLE MEASURES
                          </div>
                          <p className="text-[13px] text-navy-70 leading-relaxed">
                            {activeRadarPillar.whatGoogleMeasures}
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white border border-primary/30">
                          <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-primary mb-1">
                            HOW WEBXCODE WINS IT
                          </div>
                          <p className="text-[13px] text-navy leading-relaxed font-medium">
                            {activeRadarPillar.howWebXCodeOptimizes}
                          </p>
                        </div>
                      </div>

                      {/* 4 Engineering Signals Grid */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeRadarPillar.signals.map((sig) => (
                          <div
                            key={sig.title}
                            className="p-4 rounded-2xl bg-white border border-navy-08 shadow-xs flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-primary-50 text-primary flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3" strokeWidth={2.5} />
                                </span>
                                <span className="px-2 py-0.5 rounded bg-primary-50 text-primary font-mono text-[10px] font-bold">
                                  {sig.impactTag}
                                </span>
                              </div>
                              <h4 className="text-[14.5px] font-extrabold text-navy">
                                {sig.title}
                              </h4>
                              <p className="text-[12.5px] text-navy-70 leading-relaxed mt-1">
                                {sig.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Monospace Diagnostic Blueprint */}
                      <div className="mt-5 rounded-2xl bg-navy text-white p-4">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                          <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-primary-100">
                            {activeRadarPillar.diagnosticSnippetLabel}
                          </span>
                          <span className="font-mono text-[10px] text-emerald-400">
                            ● VERIFIED IMPLEMENTATION
                          </span>
                        </div>
                        <pre className="font-mono text-[11.5px] text-white/90 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                          {activeRadarPillar.diagnosticSnippet}
                        </pre>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <span className="text-[13px] font-semibold text-navy-70">
                        Want to see your current ranking radius across your city?
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(
                            `Local Radius & ${activeRadarPillar.name} Audit`
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[13.5px] transition-all cursor-pointer shrink-0"
                      >
                        <span>Check My City Ranking Radius</span>
                        <ArrowRight className="w-4 h-4" />
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
         SECTION 3 — GOOGLE BUSINESS PROFILE (GBP) OPTIMIZATION SHOWCASE:
                     INTERACTIVE PROFILE ANATOMY (bg: #f0f7fd)
         ====================================================================== */}
      <section id="gbp-optimizer" className="py-[72px] lg:py-[112px] bg-primary-50 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              GOOGLE BUSINESS PROFILE COMMAND CENTER
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Your Google Business Profile Is Your{' '}
              <span className="text-primary">New Homepage</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Over 60% of local customers call, message, or get directions directly from your Google
              Business Profile without ever clicking through to a website. Click all{' '}
              <strong className="text-navy">8 numbered hotspots</strong> below to inspect how we
              turn a basic listing into a 24/7 customer magnet.
            </p>
          </div>

          {/* Interactive 8-Hotspot GBP Command Center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 7 Cols: Visual Google Business Profile Card with 8 Clickable Hotspots */}
            <div className="lg:col-span-7 rounded-[24px] bg-white border border-navy-08 shadow-soft p-5 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Simulated GBP Browser Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-navy-08">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy">
                      GOOGLE BUSINESS PROFILE // 100% OPTIMIZED BLUEPRINT
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-primary">
                    Click Hotspots 01 – 08
                  </span>
                </div>

                {/* Visual GBP Card Mockup */}
                <div className="rounded-2xl bg-primary-50/40 border border-primary-100 p-4 sm:p-5 space-y-4">
                  {/* Top Row: Cover Photos (#04) + Business Title (#02) + Categories (#01) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-stretch">
                    {/* Hotspot 02 & 01: Business Name + Primary/Secondary Categories */}
                    <div className="sm:col-span-7 space-y-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedHotspotId('gbp-02')}
                        className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedHotspotId === 'gbp-02'
                            ? 'bg-navy text-white border-primary shadow-md'
                            : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-primary">
                            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                              02
                            </span>
                            <span>VERIFIED NAME &amp; PIN</span>
                          </span>
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="text-[15px] font-extrabold mt-1">
                          YourBrand Multi-Specialty Clinic &amp; Diagnostics
                        </div>
                        <div
                          className={`text-[11.5px] mt-0.5 ${
                            selectedHotspotId === 'gbp-02' ? 'text-white/75' : 'text-navy-60'
                          }`}
                        >
                          Exact entrance pin • 100% suspension-safe naming
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedHotspotId('gbp-01')}
                        className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedHotspotId === 'gbp-01'
                            ? 'bg-navy text-white border-primary shadow-md'
                            : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-primary">
                            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                              01
                            </span>
                            <span>PRIMARY + 9 SECONDARY CATEGORIES</span>
                          </span>
                          <span className="font-mono text-[10px] font-bold text-emerald-600">
                            #1 Factor
                          </span>
                        </div>
                        <div className="text-[13px] font-bold mt-1">
                          Medical Clinic • Dental Clinic • Diagnostic Center +7 more
                        </div>
                      </button>
                    </div>

                    {/* Hotspot 04: Geotagged Photos & 30s Walkthrough Videos */}
                    <button
                      type="button"
                      onClick={() => setSelectedHotspotId('gbp-04')}
                      className={`sm:col-span-5 text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedHotspotId === 'gbp-04'
                          ? 'bg-navy text-white border-primary shadow-md'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-primary">
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                            04
                          </span>
                          <span>PHOTOS &amp; VIDEO</span>
                        </span>
                        <span className="font-mono text-[10px] font-bold text-primary">
                          180+ Media
                        </span>
                      </div>

                      <div className="my-2 grid grid-cols-3 gap-1.5">
                        {['Exterior', 'Interior', '30s Tour'].map((tag) => (
                          <div
                            key={tag}
                            className={`h-12 rounded-lg flex items-center justify-center font-mono text-[9.5px] font-bold border ${
                              selectedHotspotId === 'gbp-04'
                                ? 'bg-white/10 border-white/15 text-white'
                                : 'bg-primary-50 border-primary-100 text-primary'
                            }`}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>

                      <div
                        className={`text-[11px] font-medium ${
                          selectedHotspotId === 'gbp-04' ? 'text-white/80' : 'text-navy-60'
                        }`}
                      >
                        Vision-AI verified storefront, team &amp; equipment shots
                      </div>
                    </button>
                  </div>

                  {/* Middle Row: Reviews (#07) + Booking & UTM Call Tracking (#08) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <button
                      type="button"
                      onClick={() => setSelectedHotspotId('gbp-07')}
                      className={`text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedHotspotId === 'gbp-07'
                          ? 'bg-navy text-white border-primary shadow-md'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-primary">
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                            07
                          </span>
                          <span>REVIEWS &amp; KEYWORD REPLIES</span>
                        </span>
                        <span className="text-amber-500 font-extrabold text-[12px]">
                          ★★★★★ 4.9 (640)
                        </span>
                      </div>
                      <div className="text-[13px] font-bold mt-1.5">
                        QR Review Stand + 100% Owner Reply SLA
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedHotspotId('gbp-08')}
                      className={`text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedHotspotId === 'gbp-08'
                          ? 'bg-navy text-white border-primary shadow-md'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-primary">
                          <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                            08
                          </span>
                          <span>BOOKING, WHATSAPP &amp; UTM</span>
                        </span>
                        <Phone className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="text-[13px] font-bold mt-1.5">
                        1-Tap WhatsApp + UTM Call &amp; GA4 Tracking
                      </div>
                    </button>
                  </div>

                  {/* Bottom Row: Services & Menu (#03) + Weekly Posts (#05) + Q&A (#06) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedHotspotId('gbp-03')}
                      className={`text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedHotspotId === 'gbp-03'
                          ? 'bg-navy text-white border-primary shadow-md'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-primary">
                        <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                          03
                        </span>
                        <span>SERVICES &amp; MENU</span>
                      </span>
                      <div className="text-[13px] font-extrabold mt-1.5">
                        30+ Itemized Services &amp; Price Cards
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedHotspotId('gbp-05')}
                      className={`text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedHotspotId === 'gbp-05'
                          ? 'bg-navy text-white border-primary shadow-md'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-primary">
                        <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                          05
                        </span>
                        <span>WEEKLY POSTS</span>
                      </span>
                      <div className="text-[13px] font-extrabold mt-1.5">
                        Offers, Events &amp; What&apos;s New Cards
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedHotspotId('gbp-06')}
                      className={`text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedHotspotId === 'gbp-06'
                          ? 'bg-navy text-white border-primary shadow-md'
                          : 'bg-white text-navy border-navy-08 hover:border-primary/50'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase text-primary">
                        <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                          06
                        </span>
                        <span>SEEDED Q&amp;A</span>
                      </span>
                      <div className="text-[13px] font-extrabold mt-1.5">
                        15 Verified Owner Answers
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Numbered Pill Bar at Bottom of Left Panel */}
              <div className="mt-5 pt-4 border-t border-navy-08 flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold text-navy-60">
                  JUMP TO HOTSPOT:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {GBP_HOTSPOTS.map((h) => {
                    const isActive = h.id === selectedHotspotId;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setSelectedHotspotId(h.id)}
                        className={`w-7 h-7 rounded-lg font-mono text-[11px] font-extrabold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-primary text-white shadow-xs'
                            : 'bg-primary-50 text-navy hover:bg-primary/20'
                        }`}
                      >
                        {h.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Active Hotspot Engineering Inspector */}
            <div className="lg:col-span-5">
              <div className="h-full rounded-[24px] bg-navy text-white p-6 sm:p-8 shadow-xl flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHotspot.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/15">
                        <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase">
                          HOTSPOT #{activeHotspot.number} • {activeHotspot.zoneLabel}
                        </span>
                        <span className="font-mono text-[11px] font-bold text-emerald-400">
                          {activeHotspot.impactBadge}
                        </span>
                      </div>

                      <h3 className="mt-5 text-[22px] sm:text-[25px] font-extrabold text-white leading-snug">
                        {activeHotspot.title}
                      </h3>

                      {/* What Most Do Wrong vs What WebXCode Engineers */}
                      <div className="mt-5 space-y-3.5">
                        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-400/25">
                          <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-rose-300 mb-1">
                            ✖ WHAT MOST LOCAL LISTINGS DO WRONG
                          </div>
                          <p className="text-[13px] text-white/85 leading-relaxed">
                            {activeHotspot.whatMostBusinessesDoWrong}
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-primary/20 border border-primary/40">
                          <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-primary-100 mb-1">
                            ✔ HOW WEBXCODE OPTIMIZES IT
                          </div>
                          <p className="text-[13.5px] text-white leading-relaxed font-medium">
                            {activeHotspot.whatWebXCodeEngineers}
                          </p>
                        </div>
                      </div>

                      {/* 3 Included Deliverables */}
                      <div className="mt-5">
                        <div className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-white/60 mb-2.5">
                          INCLUDED IN OUR GBP OPTIMIZATION
                        </div>
                        <ul className="space-y-2">
                          {activeHotspot.deliverableChecklist.map((item) => (
                            <li
                              key={item}
                              className="p-3 rounded-xl bg-white/[0.06] border border-white/10 flex items-center gap-2.5 text-[13px] text-white/90 font-medium"
                            >
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/15">
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(
                            `Free Google Business Profile Audit (${activeHotspot.zoneLabel})`
                          )
                        }
                        className="w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                      >
                        <span>Get My Google Business Profile Audited</span>
                        <ArrowRight className="w-4 h-4" />
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
         SECTION 4 — WHO THIS IS FOR: 6 LOCAL BUSINESS CARDS (bg: #ffffff)
         ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-10 lg:mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              BUILT FOR REAL-WORLD BUSINESSES
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              If Customers Visit You or You Visit Them —{' '}
              <span className="text-primary">You Need Local SEO</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Whether you operate a single clinic, a flagship showroom, an at-home service fleet, or
              50 retail branches across India—we tailor your local search strategy to how your
              customers actually book and buy.
            </p>
          </div>

          {/* 6-Card Grid (3x2 on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {LOCAL_BUSINESS_TYPES.map((biz) => (
              <div
                key={biz.id}
                className="rounded-[24px] bg-white border border-navy-08 hover:border-primary shadow-soft hover:shadow-soft-hover p-6 sm:p-7 flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Icon + Outcome Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                      <LocalIndustryIcon name={biz.iconName} className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10.5px] font-extrabold">
                      {biz.keyOutcomeBadge}
                    </span>
                  </div>

                  <h3 className="text-[19px] sm:text-[20px] font-extrabold text-navy leading-snug">
                    {biz.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-navy-70 leading-relaxed">
                    {biz.subtitle}
                  </p>

                  {/* Sample "Near Me" Searches */}
                  <div className="mt-4 pt-3.5 border-t border-navy-08">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-navy-50 mb-2">
                      HIGH-INTENT SEARCHES WE WIN:
                    </div>
                    <div className="space-y-1.5">
                      {biz.sampleSearches.map((q) => (
                        <div
                          key={q}
                          className="px-3 py-1.5 rounded-lg bg-primary-50/60 border border-primary-100 font-mono text-[11.5px] font-bold text-primary flex items-center gap-2"
                        >
                          <Search className="w-3 h-3 shrink-0" />
                          <span className="truncate">{q}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What We Deliver */}
                  <p className="mt-4 text-[13px] text-navy-70 leading-relaxed">
                    <strong className="text-navy">What we build: </strong>
                    {biz.whatWeDeliver}
                  </p>
                </div>

                {/* Bottom Links */}
                <div className="mt-6 pt-4 border-t border-navy-08 flex flex-col gap-2.5">
                  {biz.industryLink && (
                    <Link
                      href={biz.industryLink.to}
                      className="inline-flex items-center justify-between text-[12.5px] font-bold text-primary hover:text-navy transition-colors"
                    >
                      <span>{biz.industryLink.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => triggerQuoteModal(`Local SEO for ${biz.title}`)}
                    className="w-full py-2.5 px-4 rounded-full bg-navy hover:bg-primary text-white font-semibold text-[13px] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Get Local Audit for This Sector</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cross-Link Strip to National/Global SEO Services & Google Ads */}
          <div className="mt-10 pt-8 border-t border-navy-08 flex flex-wrap items-center justify-between gap-4">
            <span className="text-[14px] font-extrabold text-navy">
              Also targeting national search keywords or immediate top-of-page paid search calls?
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/services/seo-services"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-all"
              >
                <Search className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>Explore Full SEO, AEO &amp; GEO Services</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/services/google-ads-sem"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-all"
              >
                <span>Google Ads (SEM) &amp; Local Call Ads</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/locations/delhi"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50 hover:bg-navy text-navy hover:text-white border border-primary-100 text-[13px] font-bold transition-all"
              >
                <MapPin className="w-4 h-4 text-primary group-hover:text-primary-100" />
                <span>Delhi Local SEO &amp; Growth Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LocalSeo;
