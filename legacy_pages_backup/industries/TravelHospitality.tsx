import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check,
  Plane,
  Compass,
  MapPin,
  Calendar,
  Users,
  BedDouble,
  Wifi,
  Coffee,
  Sparkles,
  Utensils,
  Mountain,
  Sun,
  Building2,
  MessageSquare,
  Globe,
  Star,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  Luggage,
  KeyRound,
  Ticket,
  Stamp,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { industries, IndustryIcon } from '../Industries';

const IMG_RESORT_HERO =
  '/src/assets/images/project_luxury_ecommerce_ui_1791104938782.jpg';
const IMG_ROOM_SUITE =
  '/src/assets/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_ROOM_VILLA =
  '/src/assets/images/project_fintech_saas_ui_1791104929193.jpg';
const IMG_ROOM_HERITAGE =
  '/src/assets/images/project_ai_enterprise_ui_1791104952051.jpg';
const IMG_HOSPITALITY_TEAM =
  '/src/assets/images/why_webxcode_team_office_1791104914357.jpg';
const IMG_CLIENT_AVATAR =
  '/src/assets/images/testimonial_2_avatar_1791105060710.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT TRAVEL & HOSPITALITY ITEM FROM INDUSTRIES
============================================================================ */
const travelIndustry =
  industries.find((item) => item.slug === 'travel-hospitality') ||
  industries[10];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 2: Who We Serve — Airport Split-Flap Departure Board (8 Rows) */
export interface DepartureBoardRow {
  id: string;
  business: string;
  gate: string;
  status: string;
  tooltip: string;
}

const DEPARTURE_BOARD_ROWS: DepartureBoardRow[] = [
  {
    id: 'dep-1',
    business: 'Hotels & Resorts',
    gate: 'A1',
    status: 'DIRECT BOOKINGS',
    tooltip:
      'High-converting room showcases, real-time rate parity widgets and zero-commission direct booking flows.',
  },
  {
    id: 'dep-2',
    business: 'Boutique Stays & Homestays',
    gate: 'A2',
    status: 'BOOK DIRECT',
    tooltip:
      'Story-driven villa and homestay websites with instant WhatsApp availability checks and calendar sync.',
  },
  {
    id: 'dep-3',
    business: 'Tour Operators',
    gate: 'B1',
    status: 'ITINERARY SALES',
    tooltip:
      'Day-by-day interactive itinerary pages, custom trip calculators and instant deposit checkout.',
  },
  {
    id: 'dep-4',
    business: 'Travel Agencies & DMCs',
    gate: 'B2',
    status: 'PACKAGE LEADS',
    tooltip:
      'Destination hubs, B2B agent portals and high-intent honeymoon, family and group package funnels.',
  },
  {
    id: 'dep-5',
    business: 'Restaurants & Cafés',
    gate: 'C1',
    status: 'TABLE BOOKINGS',
    tooltip:
      'Interactive digital menus, instant table reservation slots and "restaurants near me" Google Maps ranking.',
  },
  {
    id: 'dep-6',
    business: 'Banquets & Event Venues',
    gate: 'C2',
    status: 'EVENT ENQUIRIES',
    tooltip:
      '360° hall walkthroughs, guest capacity calculators and date-availability enquiry forms for weddings & MICE.',
  },
  {
    id: 'dep-7',
    business: 'Adventure & Experiences',
    gate: 'D1',
    status: 'ONLINE TICKETS',
    tooltip:
      'Date-and-batch slot ticketing, waiver forms and instant mobile QR passes for treks, water sports and tours.',
  },
  {
    id: 'dep-8',
    business: 'Wellness Retreats',
    gate: 'D2',
    status: 'RETREAT BOOKINGS',
    tooltip:
      'Serene program pages for Ayurveda, yoga and detox retreats with multi-day package and room-tier selection.',
  },
];

/* Section 3: OTA Commission Calculator Defaults */
const OTA_CALC_DEFAULTS = {
  rooms: 30,
  ratePerNight: 5000,
  occupancyPct: 65,
  otaSharePct: 70,
  otaCommissionPct: 18,
  shiftPctOptions: [10, 20, 30] as const,
  defaultShiftPct: 20 as 10 | 20 | 30,
};

/* Section 4: The Guest Journey — Passport Stamps (7 Stamps Across 2 Facing Pages) */
export interface PassportStampItem {
  id: string;
  stampNumber: string;
  stepName: string;
  portCode: string;
  shape: 'circle' | 'rectangle';
  rotationClass: string;
  caveatNote: string;
  pageSide: 'left' | 'right';
}

const PASSPORT_STAMPS: PassportStampItem[] = [
  {
    id: 'st-1',
    stampNumber: '01',
    stepName: 'DREAM',
    portCode: 'ENTRY · INSPIRATION',
    shape: 'circle',
    rotationClass: '-rotate-3',
    caveatNote: 'Inspiring destination & room pages',
    pageSide: 'left',
  },
  {
    id: 'st-2',
    stampNumber: '02',
    stepName: 'PLAN',
    portCode: 'ROUTE · ITINERARY',
    shape: 'rectangle',
    rotationClass: 'rotate-2',
    caveatNote: 'Itineraries, packages and FAQs',
    pageSide: 'left',
  },
  {
    id: 'st-3',
    stampNumber: '03',
    stepName: 'BOOK',
    portCode: 'VERIFIED · DIRECT',
    shape: 'circle',
    rotationClass: '-rotate-2',
    caveatNote: 'Fast direct booking with best-rate promise',
    pageSide: 'left',
  },
  {
    id: 'st-4',
    stampNumber: '04',
    stepName: 'PRE-ARRIVAL',
    portCode: 'GATE · READY',
    shape: 'rectangle',
    rotationClass: 'rotate-1',
    caveatNote: 'WhatsApp confirmations, upsells, directions',
    pageSide: 'left',
  },
  {
    id: 'st-5',
    stampNumber: '05',
    stepName: 'STAY',
    portCode: 'IN-RESORT · LIVE',
    shape: 'circle',
    rotationClass: 'rotate-3',
    caveatNote: 'Digital guest guide, in-stay requests',
    pageSide: 'right',
  },
  {
    id: 'st-6',
    stampNumber: '06',
    stepName: 'POST-STAY',
    portCode: 'DEPARTURE · 5★',
    shape: 'rectangle',
    rotationClass: '-rotate-2',
    caveatNote: 'Thank-you messages and review requests',
    pageSide: 'right',
  },
  {
    id: 'st-7',
    stampNumber: '07',
    stepName: 'RETURN',
    portCode: 'VIP · REPEAT GUEST',
    shape: 'circle',
    rotationClass: 'rotate-2',
    caveatNote: 'Loyalty offers for the next trip',
    pageSide: 'right',
  },
];

/* Section 5: Direct Booking Engine Demo — Currency Rates, Rooms & Add-ons */
export type BookingCurrency = 'INR' | 'USD' | 'EUR';

const CURRENCY_CONFIG: Record<
  BookingCurrency,
  { symbol: string; rateFromInr: number; label: string }
> = {
  INR: { symbol: '₹', rateFromInr: 1, label: '₹ INR' },
  USD: { symbol: '$', rateFromInr: 0.012, label: '$ USD' },
  EUR: { symbol: '€', rateFromInr: 0.011, label: '€ EUR' },
};

export const DEMO_DATE_PRESETS = [
  {
    id: 'dp-1',
    checkIn: '14 Nov 2026',
    checkOut: '17 Nov 2026',
    nights: 3,
    label: '3 Nights (Weekend Escape)',
  },
  {
    id: 'dp-2',
    checkIn: '20 Dec 2026',
    checkOut: '24 Dec 2026',
    nights: 4,
    label: '4 Nights (Holiday Stay)',
  },
  {
    id: 'dp-3',
    checkIn: '08 Jan 2027',
    checkOut: '10 Jan 2027',
    nights: 2,
    label: '2 Nights (Quick Getaway)',
  },
];

export interface DemoRoomItem {
  id: string;
  name: string;
  size: string;
  bedType: string;
  amenities: [string, string, string];
  directPriceInr: number;
  otaPriceInr: number;
  image: string;
  imageAlt: string;
}

const DEMO_ROOMS: DemoRoomItem[] = [
  {
    id: 'rm-1',
    name: 'Panoramic Valley View Suite',
    size: '540 sq. ft.',
    bedType: 'King Bed + Private Balcony',
    amenities: ['High-Speed Wi-Fi', 'Artisan Breakfast', 'Mountain View'],
    directPriceInr: 6800,
    otaPriceInr: 8000,
    image: IMG_ROOM_SUITE,
    imageAlt: 'Panoramic Valley View Suite with king bed and private balcony',
  },
  {
    id: 'rm-2',
    name: 'Private Plunge Pool Villa',
    size: '920 sq. ft.',
    bedType: 'Four-Poster King + Deck',
    amenities: ['Heated Plunge Pool', 'Butler On Call', 'Evening High Tea'],
    directPriceInr: 11500,
    otaPriceInr: 13600,
    image: IMG_ROOM_VILLA,
    imageAlt: 'Private Plunge Pool Villa with wooden deck at luxury resort',
  },
  {
    id: 'rm-3',
    name: 'Heritage Courtyard Deluxe',
    size: '420 sq. ft.',
    bedType: 'Queen Bed · Garden Wing',
    amenities: ['High-Speed Wi-Fi', 'Morning Yoga', 'Rain Shower'],
    directPriceInr: 4900,
    otaPriceInr: 5800,
    image: IMG_ROOM_HERITAGE,
    imageAlt: 'Heritage Courtyard Deluxe room overlooking resort gardens',
  },
];

export interface DemoAddOnItem {
  id: string;
  name: string;
  priceInr: number;
}

const DEMO_ADD_ONS: DemoAddOnItem[] = [
  { id: 'ao-breakfast', name: 'Breakfast Buffet', priceInr: 650 },
  { id: 'ao-pickup', name: 'Airport Pickup', priceInr: 1800 },
  { id: 'ao-checkout', name: 'Late Checkout (4 PM)', priceInr: 1200 },
  { id: 'ao-spa', name: 'Spa Credit Voucher', priceInr: 2500 },
];

/* Section 6: Services — Postcard Wall (9 Postcards) */
export interface PostcardServiceItem {
  id: string;
  stampCode: string;
  postmarkCity: string;
  title: string;
  shortHook: string;
  caveatLine: string;
  bullets: [string, string, string];
  tiltClass: string;
  image: string;
  imageAlt: string;
}

const POSTCARD_SERVICES: PostcardServiceItem[] = [
  {
    id: 'pc-1',
    stampCode: 'AIR MAIL · 01',
    postmarkCity: 'DIRECT RESORT WEB',
    title: 'Hotel & Resort Websites',
    shortHook: 'Photo-rich, fast and built for direct bookings',
    caveatLine: 'Turn lookers into direct-booked guests!',
    bullets: [
      'Editorial room, dining and experience galleries with sub-2s mobile load speed',
      'Sticky "Book Direct & Save" rate-comparison bar across every page',
      'Direct WhatsApp & phone concierge triggers for group and wedding enquiries',
    ],
    tiltClass: 'lg:-rotate-1',
    image: IMG_RESORT_HERO,
    imageAlt: 'Luxury hotel and resort website showcase',
  },
  {
    id: 'pc-2',
    stampCode: 'AIR MAIL · 02',
    postmarkCity: 'REAL-TIME SYNC',
    title: 'Booking Engine & Channel Manager Integration',
    shortHook: 'Real-time rates and availability',
    caveatLine: 'Zero overbookings, 0% OTA cut on direct stays.',
    bullets: [
      'Seamless integration with STAAH, AxisRooms, eZee, SiteMinder, Cloudbeds & SynXis',
      'Live "Direct Rate vs OTA Rate" price-check widget on room cards',
      'Instant UPI, international card and partial-deposit payment gateway setup',
    ],
    tiltClass: 'lg:rotate-1',
    image: IMG_ROOM_SUITE,
    imageAlt: 'Hotel booking engine and channel manager integration',
  },
  {
    id: 'pc-3',
    stampCode: 'AIR MAIL · 03',
    postmarkCity: 'EXPEDITION HUB',
    title: 'Tour & Package Websites',
    shortHook: 'Itinerary pages, enquiry forms and package builders',
    caveatLine: 'Every day of the journey, mapped out beautifully.',
    bullets: [
      'Day-by-day expandable itineraries with route maps, inclusions and hotel tiers',
      'Interactive "Customize My Trip" date, group-size and budget configurators',
      'Downloadable branded PDF itineraries that capture verified traveller leads',
    ],
    tiltClass: 'lg:-rotate-1',
    image: IMG_ROOM_VILLA,
    imageAlt: 'Tour operator and holiday package itinerary website',
  },
  {
    id: 'pc-4',
    stampCode: 'AIR MAIL · 04',
    postmarkCity: 'ORGANIC SEARCH',
    title: 'Travel & Destination SEO',
    shortHook: 'Rank for destination, "hotels in [city]" and experience searches',
    caveatLine: 'Be the first property travellers discover on Google.',
    bullets: [
      'Destination guide hubs ("Best time to visit", "Things to do near...") that capture early planners',
      'Google Business Profile & Local Map Pack dominance for hotels, resorts and cafés',
      'Hotel, LodgingBusiness, TouristTrip and FAQ Schema.org structured data',
    ],
    tiltClass: 'lg:rotate-1',
    image: IMG_ROOM_HERITAGE,
    imageAlt: 'Travel and destination SEO ranking strategy',
  },
  {
    id: 'pc-5',
    stampCode: 'AIR MAIL · 05',
    postmarkCity: 'HIGH-INTENT ADS',
    title: 'Google Ads & Hotel Ads',
    shortHook: 'Capture guests searching for your property and destination',
    caveatLine: 'Stop letting OTAs outbid you on your own hotel name!',
    bullets: [
      'Brand-protection search campaigns so OTAs don’t hijack your property name searches',
      'Google Hotel Ads feed setup showing your official direct rate right in Google Maps',
      'Seasonal package and destination search campaigns tracked to confirmed revenue',
    ],
    tiltClass: 'lg:-rotate-1',
    image: IMG_HOSPITALITY_TEAM,
    imageAlt: 'Google Hotel Ads and hospitality search campaign dashboard',
  },
  {
    id: 'pc-6',
    stampCode: 'AIR MAIL · 06',
    postmarkCity: '24/7 CONCIERGE',
    title: 'AI Concierge & WhatsApp Assistant',
    shortHook: 'Answers guest questions 24/7 in multiple languages',
    caveatLine: 'Replies at 2 AM while your front desk sleeps.',
    bullets: [
      'Answers check-in times, airport transfer rates, pet policies and extra-bed queries 24/7',
      'Shares live room availability links and captures WhatsApp booking leads automatically',
      'Communicates fluently with domestic and international guests in multiple languages',
    ],
    tiltClass: 'lg:rotate-1',
    image: IMG_RESORT_HERO,
    imageAlt: 'AI hotel concierge and WhatsApp guest assistant',
  },
  {
    id: 'pc-7',
    stampCode: 'AIR MAIL · 07',
    postmarkCity: '5-STAR TRUST',
    title: 'Reviews & Reputation Management',
    shortHook: 'Collect and respond to reviews across platforms',
    caveatLine: 'More 5-star reviews = higher occupancy & ADR.',
    bullets: [
      'Automated post-checkout WhatsApp & email review invitations for happy guests',
      'Centralized review monitoring across Google Maps and hospitality directories',
      'Live verified guest review feeds embedded directly on your room pages',
    ],
    tiltClass: 'lg:-rotate-1',
    image: IMG_ROOM_SUITE,
    imageAlt: 'Hotel guest review and reputation management system',
  },
  {
    id: 'pc-8',
    stampCode: 'AIR MAIL · 08',
    postmarkCity: 'GLOBAL GUESTS',
    title: 'Multilingual & Multi-Currency Websites',
    shortHook: 'For international guests',
    caveatLine: 'Welcome travellers from London, Dubai, Tokyo & New York.',
    bullets: [
      'Automatic or 1-click currency display (₹ INR, $ USD, € EUR, £ GBP, AED)',
      'Translated room & tour pages with international `hreflang` SEO tags',
      'Stripe, Razorpay International and multi-currency card acceptance',
    ],
    tiltClass: 'lg:rotate-1',
    image: IMG_ROOM_VILLA,
    imageAlt: 'Multilingual and multi-currency hospitality website',
  },
  {
    id: 'pc-9',
    stampCode: 'AIR MAIL · 09',
    postmarkCity: 'DINING & EVENTS',
    title: 'Restaurant & Venue Websites',
    shortHook: 'Menus, table bookings and event enquiries',
    caveatLine: 'Fill tables on weekdays and banquet halls all season.',
    bullets: [
      'Fast, mobile-friendly interactive food & beverage menus (no slow 30MB PDFs)',
      'Instant table reservation widget with WhatsApp confirmation & location pin',
      'Dedicated wedding, corporate off-site and banquet hall enquiry funnels',
    ],
    tiltClass: 'lg:-rotate-1',
    image: IMG_ROOM_HERITAGE,
    imageAlt: 'Fine dining restaurant and wedding banquet venue website',
  },
];

/* Section 7: Season Planner — 12-Month Strip Data (Hill Station · Beach · City) */
export type DestinationType = 'Hill Station' | 'Beach' | 'City';
export type SeasonDemandTier = 'Low' | 'Shoulder' | 'Peak';

export interface MonthSeasonData {
  month: string;
  fullMonth: string;
  tier: SeasonDemandTier;
  occupancyTarget: string;
}

const SEASON_PATTERNS: Record<DestinationType, MonthSeasonData[]> = {
  'Hill Station': [
    { month: 'Jan', fullMonth: 'January', tier: 'Shoulder', occupancyTarget: '68%' },
    { month: 'Feb', fullMonth: 'February', tier: 'Shoulder', occupancyTarget: '64%' },
    { month: 'Mar', fullMonth: 'March', tier: 'Shoulder', occupancyTarget: '72%' },
    { month: 'Apr', fullMonth: 'April', tier: 'Peak', occupancyTarget: '88%' },
    { month: 'May', fullMonth: 'May', tier: 'Peak', occupancyTarget: '94%' },
    { month: 'Jun', fullMonth: 'June', tier: 'Peak', occupancyTarget: '92%' },
    { month: 'Jul', fullMonth: 'July', tier: 'Low', occupancyTarget: '46%' },
    { month: 'Aug', fullMonth: 'August', tier: 'Low', occupancyTarget: '48%' },
    { month: 'Sep', fullMonth: 'September', tier: 'Shoulder', occupancyTarget: '62%' },
    { month: 'Oct', fullMonth: 'October', tier: 'Peak', occupancyTarget: '85%' },
    { month: 'Nov', fullMonth: 'November', tier: 'Shoulder', occupancyTarget: '70%' },
    { month: 'Dec', fullMonth: 'December', tier: 'Peak', occupancyTarget: '95%' },
  ],
  Beach: [
    { month: 'Jan', fullMonth: 'January', tier: 'Peak', occupancyTarget: '94%' },
    { month: 'Feb', fullMonth: 'February', tier: 'Peak', occupancyTarget: '90%' },
    { month: 'Mar', fullMonth: 'March', tier: 'Shoulder', occupancyTarget: '74%' },
    { month: 'Apr', fullMonth: 'April', tier: 'Shoulder', occupancyTarget: '65%' },
    { month: 'May', fullMonth: 'May', tier: 'Low', occupancyTarget: '45%' },
    { month: 'Jun', fullMonth: 'June', tier: 'Low', occupancyTarget: '42%' },
    { month: 'Jul', fullMonth: 'July', tier: 'Low', occupancyTarget: '48%' },
    { month: 'Aug', fullMonth: 'August', tier: 'Shoulder', occupancyTarget: '60%' },
    { month: 'Sep', fullMonth: 'September', tier: 'Shoulder', occupancyTarget: '68%' },
    { month: 'Oct', fullMonth: 'October', tier: 'Shoulder', occupancyTarget: '78%' },
    { month: 'Nov', fullMonth: 'November', tier: 'Peak', occupancyTarget: '91%' },
    { month: 'Dec', fullMonth: 'December', tier: 'Peak', occupancyTarget: '97%' },
  ],
  City: [
    { month: 'Jan', fullMonth: 'January', tier: 'Shoulder', occupancyTarget: '72%' },
    { month: 'Feb', fullMonth: 'February', tier: 'Peak', occupancyTarget: '88%' },
    { month: 'Mar', fullMonth: 'March', tier: 'Peak', occupancyTarget: '85%' },
    { month: 'Apr', fullMonth: 'April', tier: 'Shoulder', occupancyTarget: '70%' },
    { month: 'May', fullMonth: 'May', tier: 'Low', occupancyTarget: '55%' },
    { month: 'Jun', fullMonth: 'June', tier: 'Low', occupancyTarget: '58%' },
    { month: 'Jul', fullMonth: 'July', tier: 'Shoulder', occupancyTarget: '68%' },
    { month: 'Aug', fullMonth: 'August', tier: 'Shoulder', occupancyTarget: '70%' },
    { month: 'Sep', fullMonth: 'September', tier: 'Peak', occupancyTarget: '86%' },
    { month: 'Oct', fullMonth: 'October', tier: 'Peak', occupancyTarget: '89%' },
    { month: 'Nov', fullMonth: 'November', tier: 'Peak', occupancyTarget: '92%' },
    { month: 'Dec', fullMonth: 'December', tier: 'Shoulder', occupancyTarget: '76%' },
  ],
};

const SEASON_PLAYBOOK_BY_TIER: Record<
  SeasonDemandTier,
  {
    headline: string;
    recommendation: string;
    tactics: [string, string, string];
  }
> = {
  Low: {
    headline: 'Low Season Strategy — Protect Base Occupancy & Build Pipeline',
    recommendation:
      'Run off-season packages, weekday offers and long-stay deals; push SEO content for next season',
    tactics: [
      'Launch workcation, monsoon/summer-retreat and 3rd-night-free direct packages',
      'Target corporate off-sites, wellness retreats and local weekend staycations',
      'Publish high-intent destination SEO guides 90 days ahead of the next peak window',
    ],
  },
  Shoulder: {
    headline: 'Shoulder Season Strategy — Capture Early-Bird & Group Bookings',
    recommendation: 'Early-bird campaigns, Google Ads for upcoming peak',
    tactics: [
      'Activate Google Search & Hotel Ads for travellers researching upcoming holiday dates',
      'Promote "Book 30 Days Early & Save 15% Direct" member rate offers',
      'Send WhatsApp & email return-guest privileges to past guests',
    ],
  },
  Peak: {
    headline: 'Peak Season Strategy — Maximize Direct Margin & Guest Spend',
    recommendation:
      'Focus on direct-booking conversion, upsells and review collection',
    tactics: [
      'Highlight "Best Rate + Free Room Upgrade Only on Official Website" to beat OTAs',
      'Automate pre-arrival WhatsApp upsells (airport pickup, candlelight dinner, spa credit)',
      'Trigger post-checkout Google review collection while guest satisfaction is highest',
    ],
  },
};

/* Section 8: Case Study — The Hotel Key Card */
const KEY_CARD_CASE_STUDY = {
  resortName: 'The Deodar Crest Resort & Spa (Placeholder)',
  locationTag: '42-Key Luxury Mountain Resort · Himachal Pradesh',
  roomKeyLabel: 'ROOM 2026',
  metrics: [
    { label: 'Direct bookings', value: '18% → 46%' },
    { label: 'OTA commission saved', value: '₹22 Lakh / year' },
    { label: 'Website conversion rate', value: '+2.3x' },
    { label: 'Review rating', value: '4.2 → 4.7' },
  ],
  whatWeDid: [
    'Website',
    'Booking Engine',
    'Travel SEO',
    'Google Hotel Ads',
    'WhatsApp Concierge',
  ],
  quote:
    'We were paying nearly ₹30 Lakh a year in OTA commissions because our old website couldn’t take real-time bookings on mobile. WebXCode rebuilt our resort site, integrated our channel manager and launched Google Hotel Ads—direct bookings jumped from 18% to 46% in two seasons.',
  clientName: 'Vikramaditya Singhania (Placeholder)',
  clientRole: 'Managing Director, The Deodar Crest Resort & Spa',
};

/* Section 9: Travel FAQ (6 Questions with Luggage-Tag Numbers) */
const TRAVEL_FAQS = [
  {
    id: 'tfaq-1',
    tagNo: '01',
    question: 'Can you integrate our existing booking engine or channel manager?',
    answer:
      'Yes. We integrate seamlessly with leading hotel booking engines and channel managers—including STAAH, AxisRooms, eZee Reservation, SiteMinder, Cloudbeds, DJUBO and SynXis—so your website displays live room inventory, dynamic seasonal pricing and instant confirmation without double-bookings.',
  },
  {
    id: 'tfaq-2',
    tagNo: '02',
    question: 'How do direct bookings actually reduce OTA commission?',
    answer:
      'OTAs typically charge 15% to 25% commission on every reservation—including guests who already knew your property name and simply searched for you on Google. By combining a fast direct-booking website, a "Best Rate Direct" comparison widget, brand-protection Google Ads and WhatsApp re-booking offers, we shift those guests to book directly with you at 0% OTA commission.',
  },
  {
    id: 'tfaq-3',
    tagNo: '03',
    question: 'Can the website show different currencies and languages?',
    answer:
      'Yes. For hotels, resorts and tour operators welcoming international travellers, we build multi-currency switchers (₹ INR, $ USD, € EUR, £ GBP, AED) and multilingual pages with proper `hreflang` SEO tags, paired with international card and domestic UPI payment gateways.',
  },
  {
    id: 'tfaq-4',
    tagNo: '04',
    question: 'Can you run Google Hotel Ads and search campaigns for us?',
    answer:
      'Absolutely. We set up and manage both Google Search campaigns (for destination, honeymoon, resort and brand keywords) and Google Hotel Ads feeds so your official website rate appears directly inside Google Maps and Google Travel alongside the OTAs.',
  },
  {
    id: 'tfaq-5',
    tagNo: '05',
    question: 'Do you build websites for tour packages with itineraries?',
    answer:
      'Yes. For tour operators, travel agencies and DMCs, we build structured day-by-day itinerary pages with route maps, inclusion/exclusion tabs, departure date calendars, downloadable PDF brochures and custom trip enquiry calculators.',
  },
  {
    id: 'tfaq-6',
    tagNo: '06',
    question: 'Can the AI assistant answer guest questions on WhatsApp?',
    answer:
      'Yes. Our AI Concierge works on both your website and WhatsApp Business API 24/7—answering questions about check-in/out timings, pool & spa hours, airport transfers, pet policies and Sightseeing, while sharing direct booking links or alerting your reservations desk for group enquiries.',
  },
];

/* Section 10: Business Types for Ticket CTA Form */
const AUDIT_BUSINESS_TYPES = [
  'Hotel/Resort',
  'Homestay',
  'Tour Operator',
  'Restaurant/Venue',
  'Other',
];

/* ============================================================================
   MAIN TRAVEL & HOSPITALITY INDUSTRY PAGE COMPONENT
============================================================================ */
const TravelHospitality: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  const prefersReducedMotion = useReducedMotion();

  /* Section 2: Departure Board Active Row (Tooltip) */
  const [activeDepartureId, setActiveDepartureId] = useState<string>('dep-1');

  /* Section 3: OTA Commission Calculator State */
  const [rooms, setRooms] = useState<number>(OTA_CALC_DEFAULTS.rooms);
  const [ratePerNight, setRatePerNight] = useState<number>(
    OTA_CALC_DEFAULTS.ratePerNight
  );
  const [occupancyPct, setOccupancyPct] = useState<number>(
    OTA_CALC_DEFAULTS.occupancyPct
  );
  const [otaSharePct, setOtaSharePct] = useState<number>(
    OTA_CALC_DEFAULTS.otaSharePct
  );
  const [otaCommissionPct, setOtaCommissionPct] = useState<number>(
    OTA_CALC_DEFAULTS.otaCommissionPct
  );
  const [shiftPct, setShiftPct] = useState<10 | 20 | 30>(
    OTA_CALC_DEFAULTS.defaultShiftPct
  );

  /* Section 4: Mobile Passport Page Toggle ('left' | 'right') */
  const [mobilePassportPage, setMobilePassportPage] = useState<
    'left' | 'right'
  >('left');

  /* Section 5: Direct Booking Engine Demo State */
  const [bookingPresetId, setBookingPresetId] = useState<string>('dp-1');
  const [calendarPopoverOpen, setCalendarPopoverOpen] =
    useState<boolean>(false);
  const [adults, setAdults] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [currency, setCurrency] = useState<BookingCurrency>('INR');
  const [selectedRoomId, setSelectedRoomId] = useState<string>('rm-1');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([
    'ao-breakfast',
  ]);
  const [demoBookingConfirmed, setDemoBookingConfirmed] =
    useState<boolean>(false);

  /* Section 6: Postcard Wall Flipped Card IDs (Tap/Click/Enter + Hover) */
  const [flippedPostcardIds, setFlippedPostcardIds] = useState<string[]>([]);

  /* Section 7: Season Planner Destination Type & Selected Month Index */
  const [destinationType, setDestinationType] =
    useState<DestinationType>('Hill Station');
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(6); // July (Low season default demo)

  /* Section 8: Hotel Key Card 3D Tilt State */
  const [keyCardTilt, setKeyCardTilt] = useState<{
    rotateX: number;
    rotateY: number;
  }>({ rotateX: 0, rotateY: 0 });

  /* Section 9: Travel FAQ Accordion State */
  const [openFaqId, setOpenFaqId] = useState<string>('tfaq-1');

  /* Section 10: Ticket CTA Form State */
  const [auditForm, setAuditForm] = useState({
    name: '',
    email: '',
    phone: '',
    propertyName: '',
    websiteUrl: '',
    businessType: 'Hotel/Resort',
    roomsCount: '',
  });
  const [auditErrors, setAuditErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    propertyName?: string;
    websiteUrl?: string;
  }>({});
  const [auditSubmitting, setAuditSubmitting] = useState<boolean>(false);
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);

  /* SEO Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Hotel & Travel Website Development, Booking Engines & Travel SEO | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'We build high-converting hotel, resort and tour operator websites, direct booking engines, channel manager integrations, travel SEO and 24/7 WhatsApp AI concierges.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 3: OTA Commission Math (Exact Prompt Formula)
     yearly room revenue = rooms × rate × 365 × occupancy
     OTA commission = revenue × OTA share × commission %
     savings = revenue × shift % × commission % (where shift is the share of total bookings moved from OTA to direct, capped at OTA share)
  */
  const effectiveShiftPct = Math.min(shiftPct, otaSharePct);
  const yearlyRoomRevenue =
    rooms * ratePerNight * 365 * (occupancyPct / 100);
  const currentOtaCommissionPerYear = Math.round(
    yearlyRoomRevenue * (otaSharePct / 100) * (otaCommissionPct / 100)
  );
  const annualDirectSavings = Math.round(
    yearlyRoomRevenue * (effectiveShiftPct / 100) * (otaCommissionPct / 100)
  );
  const remainingOtaCommission = Math.max(
    0,
    currentOtaCommissionPerYear - annualDirectSavings
  );
  const keptShareOfCommissionPct =
    currentOtaCommissionPerYear > 0
      ? Math.round((annualDirectSavings / currentOtaCommissionPerYear) * 100)
      : 0;

  const formatInr = (val: number) =>
    `₹${Math.round(val).toLocaleString('en-IN')}`;

  /* Section 5: Direct Booking Engine Demo Calculations & Currency Conversion */
  const activeDatePreset =
    DEMO_DATE_PRESETS.find((p) => p.id === bookingPresetId) ||
    DEMO_DATE_PRESETS[0];
  const activeRoom =
    DEMO_ROOMS.find((r) => r.id === selectedRoomId) || DEMO_ROOMS[0];

  const convertPrice = (amountInr: number) => {
    const cfg = CURRENCY_CONFIG[currency];
    const converted = Math.round(amountInr * cfg.rateFromInr);
    return currency === 'INR'
      ? `${cfg.symbol}${converted.toLocaleString('en-IN')}`
      : `${cfg.symbol}${converted.toLocaleString('en-US')}`;
  };

  const roomSubtotalInr = activeRoom.directPriceInr * activeDatePreset.nights;
  const otaSubtotalInr = activeRoom.otaPriceInr * activeDatePreset.nights;
  const directRoomSavingsInr = otaSubtotalInr - roomSubtotalInr;

  const addOnsTotalInr = selectedAddOnIds.reduce((sum, id) => {
    const found = DEMO_ADD_ONS.find((a) => a.id === id);
    return sum + (found ? found.priceInr : 0);
  }, 0);

  const preTaxTotalInr = roomSubtotalInr + addOnsTotalInr;
  const taxesInr = Math.round(preTaxTotalInr * 0.12); // 12% GST sample
  const grandTotalInr = preTaxTotalInr + taxesInr;

  const toggleAddOn = (id: string) => {
    setDemoBookingConfirmed(false);
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /* Section 6: Toggle Postcard Flip (Keyboard & Click/Tap) */
  const togglePostcardFlip = (id: string) => {
    setFlippedPostcardIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /* Section 7: Active Season Month Data */
  const currentSeasonMonths = SEASON_PATTERNS[destinationType];
  const selectedMonthData =
    currentSeasonMonths[selectedMonthIdx] || currentSeasonMonths[0];
  const selectedPlaybook = SEASON_PLAYBOOK_BY_TIER[selectedMonthData.tier];

  /* Section 8: Key Card Mouse Move Handler */
  const handleKeyCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width - 0.5) * 10);
    const rotateX = ((0.5 - y / rect.height) * 8);
    setKeyCardTilt({ rotateX, rotateY });
  };

  const handleKeyCardMouseLeave = () => {
    setKeyCardTilt({ rotateX: 0, rotateY: 0 });
  };

  /* Section 10: Submit Handler for Free Direct Booking Audit Ticket Form */
  const handleBookingAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      name?: string;
      email?: string;
      phone?: string;
      propertyName?: string;
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
    if (!auditForm.propertyName.trim()) {
      errors.propertyName = 'Please enter your property or business name.';
    }
    if (!auditForm.websiteUrl.trim()) {
      errors.websiteUrl = 'Please enter your website URL (or "New Property").';
    }

    setAuditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setAuditSubmitting(true);
    // TODO: Connect Free Direct Booking Audit ticket form to backend CRM / email service
    setTimeout(() => {
      setAuditSubmitting(false);
      setAuditSubmitted(true);
    }, 600);
  };

  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'travel-hospitality'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Hotel & Travel Website Development, Booking Engines & Travel SEO',
      serviceType:
        'Hotel & Resort Website Development, Direct Booking Engine & Channel Manager Integration, Tour & Package Websites, Travel SEO, Google Hotel Ads & WhatsApp AI Concierge',
      audience: {
        '@type': 'Audience',
        audienceType:
          'hotels, resorts, tour operators and hospitality businesses',
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
          name: travelIndustry.name,
          item: 'https://webxcode.com/industries/travel-hospitality',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: TRAVEL_FAQS.map((faq) => ({
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

      {/* Scoped Travel Memorabilia Animations (Strictly #0571c2, #1e242e, #ffffff) */}
      <style>{`
        @keyframes splitFlapFlip {
          0% { transform: rotateX(-85deg); opacity: 0.2; }
          60% { transform: rotateX(12deg); opacity: 1; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
        @keyframes stampPressIn {
          0% { transform: scale(1.22) rotate(-6deg); opacity: 0; }
          70% { transform: scale(0.96) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes planeArcGlide {
          0% { transform: translate(0px, 0px) rotate(-14deg); }
          50% { transform: translate(18px, -8px) rotate(-4deg); }
          100% { transform: translate(0px, 0px) rotate(-14deg); }
        }
        .split-flap-char {
          display: inline-block;
          transform-origin: center center;
          animation: splitFlapFlip 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .passport-stamp-badge {
          animation: stampPressIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-plane-glide {
          animation: planeArcGlide 4.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .split-flap-char,
          .passport-stamp-badge,
          .hero-plane-glide {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — BOOK DIRECT BOARDING PASS (navy + photo, 45/55 split)
      ==================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-12 w-[540px] h-[540px] blue-glow-strong pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-10 bottom-0 w-[480px] h-[480px] blue-glow pointer-events-none"
        />

        {/* Dotted Blue Flight Path Arc Curving from Left Panel Over to Right Resort Photo */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-14 left-[36%] w-[420px] h-[150px] pointer-events-none z-20"
        >
          <svg
            viewBox="0 0 420 150"
            className="w-full h-full overflow-visible"
          >
            <path
              d="M 10 120 Q 210 -20 395 75"
              fill="none"
              stroke="#0571c2"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <circle cx="10" cy="120" r="5" fill="#0571c2" />
            <circle cx="395" cy="75" r="5" fill="#ffffff" stroke="#0571c2" strokeWidth="3" />
          </svg>
          {/* Plane Icon Traveling Along the Flight Path Arc */}
          <div className="hero-plane-glide absolute top-[26px] left-[215px] w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_25px_rgba(5,113,194,0.9)] border-2 border-white">
            <Plane className="w-5 h-5" />
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Mobile: Photo on Top, Text + Boarding Pass Below | Desktop: 45/55 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 45% (5 cols on lg): Navy Content Panel */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="inline-flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/75 mb-5"
              >
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <Link
                  to="/industries"
                  className="hover:text-white transition-colors"
                >
                  Industries
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-primary" />
                <span className="text-white font-bold" aria-current="page">
                  {travelIndustry.name}
                </span>
              </nav>

              {/* Section Label Pill */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Plane className="w-3.5 h-3.5 text-primary" />
                  <span>TRAVEL &amp; HOSPITALITY</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold text-white leading-[1.08] tracking-tight mb-5">
                More Direct Bookings.{' '}
                <span className="text-primary">Less OTA Commission.</span>
              </h1>

              {/* Paragraph */}
              <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed mb-8">
                We build beautiful booking websites, direct booking engines,
                travel SEO and AI concierges for hotels, resorts and tour
                operators — so guests book with you, not through someone else.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#booking-audit"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Get a Free Direct Booking Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#ota-calculator"
                  className="px-6 py-4 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-extrabold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <span>Calculate OTA Savings</span>
                </a>
              </div>
            </div>

            {/* Right 55% (7 cols on lg): Destination/Resort Photo + Boarding-Pass Booking Widget */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative">
                {/* Large Rounded Destination/Resort Photo */}
                <div className="relative rounded-[28px] overflow-hidden aspect-[16/10] bg-navy border-2 border-white/15 shadow-2xl">
                  <img
                    src={IMG_RESORT_HERO}
                    alt="Luxury mountain and coastal resort pool deck welcoming direct-booking guests"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-full bg-navy/85 border border-white/20 text-white font-mono text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                      ★ OFFICIAL PROPERTY FLAGSHIP
                    </span>
                    <span className="px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                      0% OTA COMMISSION
                    </span>
                  </div>
                </div>

                {/* Boarding-Pass Style Booking Widget Overlapping Bottom on Desktop, Stacked Below on Mobile */}
                <div className="mt-4 lg:mt-0 lg:-mt-16 lg:mx-5 relative z-20 rounded-[22px] bg-white text-navy shadow-2xl border-2 border-primary/35 overflow-hidden">
                  {/* Top Boarding Pass Airline-Style Header Bar */}
                  <div className="px-5 py-2.5 bg-navy text-white flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.16em]">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-primary" />
                      <span>BOARDING PASS · DIRECT RESERVATION</span>
                    </div>
                    <span className="text-primary font-extrabold">
                      GATE D1 · PRIORITY CHECK-IN
                    </span>
                  </div>

                  {/* Main Part + Perforated Divider + Stub Part */}
                  <div className="grid grid-cols-1 md:grid-cols-12 relative">
                    {/* Left Main Part (8 cols) */}
                    <div className="md:col-span-8 p-5">
                      {/* FROM: Search -> TO: [Your Resort] */}
                      <div className="flex items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-navy-08">
                        <div>
                          <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-navy-50">
                            FROM
                          </span>
                          <span className="text-[16px] font-extrabold text-navy">
                            Search
                          </span>
                        </div>

                        <div className="flex-1 flex items-center justify-center px-2">
                          <div className="w-full border-t-2 border-dashed border-primary relative flex items-center justify-center">
                            <Plane className="w-4 h-4 text-primary bg-white px-0.5 -mt-2" />
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
                            TO (DIRECT)
                          </span>
                          <span className="text-[16px] font-extrabold text-primary">
                            [Your Resort]
                          </span>
                        </div>
                      </div>

                      {/* Check-in · Check-out · Guests + Book Direct Button */}
                      <div className="grid grid-cols-3 gap-2 mb-3.5">
                        <div className="p-2.5 rounded-xl bg-primary-50/55 border border-primary-100">
                          <span className="block font-mono text-[10px] font-extrabold uppercase text-navy-50">
                            CHECK-IN
                          </span>
                          <span className="text-[13px] font-extrabold text-navy">
                            14 Nov 2026
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-primary-50/55 border border-primary-100">
                          <span className="block font-mono text-[10px] font-extrabold uppercase text-navy-50">
                            CHECK-OUT
                          </span>
                          <span className="text-[13px] font-extrabold text-navy">
                            17 Nov 2026
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-primary-50/55 border border-primary-100">
                          <span className="block font-mono text-[10px] font-extrabold uppercase text-navy-50">
                            GUESTS
                          </span>
                          <span className="text-[13px] font-extrabold text-navy">
                            2 Adults
                          </span>
                        </div>
                      </div>

                      <a
                        href="#booking-demo"
                        className="w-full py-3 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[14px] transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        <span>Book Direct</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Perforated Divider with Notched Semicircles + Stub Part (4 cols) */}
                    <div className="md:col-span-4 relative border-t-2 md:border-t-0 md:border-l-2 border-dashed border-navy/25 bg-primary-50/45 p-5 flex flex-col justify-between items-center text-center">
                      {/* Top & Bottom Ticket Notch Cutouts on Desktop */}
                      <span
                        aria-hidden="true"
                        className="hidden md:block absolute -top-3 -left-3 w-6 h-6 rounded-full bg-navy"
                      />
                      <span
                        aria-hidden="true"
                        className="hidden md:block absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-navy"
                      />

                      <div>
                        <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary block">
                          DIRECT RATE
                        </span>
                        <div className="text-[26px] font-extrabold text-navy leading-tight mt-0.5">
                          Save 15%
                        </div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-white border border-primary/30 text-[11px] font-bold text-primary mt-1">
                          + Free Welcome Drink
                        </span>
                      </div>

                      {/* Barcode Graphic (Placeholder) */}
                      <div className="w-full mt-4 pt-3 border-t border-navy-08 flex flex-col items-center">
                        <div
                          aria-hidden="true"
                          className="flex items-center justify-center gap-[2px] h-7 w-full max-w-[140px]"
                        >
                          {[
                            2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4,
                            2, 1, 3,
                          ].map((w, i) => (
                            <span
                              key={i}
                              className="h-full bg-navy"
                              style={{ width: `${w}px` }}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[9px] text-navy-50 tracking-widest mt-1">
                          WX-DIRECT-PASS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHO WE SERVE — AIRPORT SPLIT-FLAP DEPARTURE BOARD (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHO WE WORK WITH
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Now Boarding:{' '}
              <span className="text-primary">Every Hospitality Business</span>
            </h2>
          </div>

          {/* Wide Navy Split-Flap Departure Board */}
          <div className="rounded-[26px] bg-navy text-white p-4 sm:p-7 border-4 border-navy shadow-2xl">
            {/* Departure Board Top Header Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b-2 border-white/15 px-2">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-md">
                  <Plane className="w-5 h-5" />
                </span>
                <div>
                  <span className="font-mono text-[18px] sm:text-[22px] font-extrabold uppercase tracking-[0.2em] text-white block leading-none">
                    DEPARTURES
                  </span>
                  <span className="font-mono text-[10px] text-white/65 uppercase tracking-widest">
                    TERMINAL WXC · DIRECT GROWTH ROUTES
                  </span>
                </div>
              </div>

              <div className="font-mono text-[11px] font-bold text-primary">
                HOVER OR TAP ANY FLIGHT ROW
              </div>
            </div>

            {/* Column Headers (Desktop) */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-2 font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/60 border-b border-white/10">
              <div className="col-span-6">BUSINESS</div>
              <div className="col-span-2 text-center">GATE</div>
              <div className="col-span-4 text-right">STATUS</div>
            </div>

            {/* 8 Split-Flap Rows */}
            <div className="divide-y divide-white/10">
              {DEPARTURE_BOARD_ROWS.map((row, idx) => {
                const isActive = activeDepartureId === row.id;
                return (
                  <div
                    key={row.id}
                    onMouseEnter={() => setActiveDepartureId(row.id)}
                    onFocus={() => setActiveDepartureId(row.id)}
                    onClick={() => setActiveDepartureId(row.id)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveDepartureId(row.id);
                      }
                    }}
                    className={`p-3.5 sm:px-4 sm:py-4 transition-all cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${
                      isActive ? 'bg-white/10' : 'hover:bg-white/6'
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      {/* BUSINESS Column */}
                      <div className="md:col-span-6 flex items-center justify-between md:justify-start gap-3">
                        <span className="font-mono text-[16px] sm:text-[18px] font-extrabold text-white tracking-wide">
                          {row.business}
                        </span>
                        {/* Mobile Gate Pill */}
                        <span className="md:hidden px-2.5 py-0.5 rounded bg-white/10 border border-white/20 font-mono text-[12px] font-extrabold text-white">
                          GATE {row.gate}
                        </span>
                      </div>

                      {/* GATE Column (Desktop Split-Flap Tile) */}
                      <div className="hidden md:flex md:col-span-2 justify-center">
                        <span className="px-3 py-1 rounded-md bg-navy border border-white/25 font-mono text-[14px] font-extrabold text-white shadow-inner">
                          {row.gate}
                        </span>
                      </div>

                      {/* STATUS Column (Split-Flap Tiles in Blue) */}
                      <div className="md:col-span-4 flex md:justify-end">
                        {/* Accessible full status text for screen readers */}
                        <span className="sr-only">{row.status}</span>
                        <div
                          aria-hidden="true"
                          className="inline-flex flex-wrap gap-[2px] px-2.5 py-1.5 rounded-lg bg-navy border border-primary/50"
                        >
                          {row.status.split('').map((char, charIdx) => (
                            <span
                              key={charIdx}
                              style={{
                                animationDelay: `${idx * 45 + charIdx * 18}ms`,
                              }}
                              className={`split-flap-char font-mono text-[12px] sm:text-[13px] font-extrabold px-1 py-0.5 rounded-xs ${
                                char === ' '
                                  ? 'w-2'
                                  : 'bg-primary/20 text-primary border-b border-primary/40'
                              }`}
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tooltip / One-Line Description Below Active Row */}
                    {isActive && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[14px] text-white/85">
                        <p className="font-medium">{row.tooltip}</p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenQuoteModal(`${row.business} Website & SEO`);
                          }}
                          className="text-[12px] font-mono font-extrabold text-primary hover:underline shrink-0 self-start sm:self-center cursor-pointer"
                        >
                          BOARD THIS PLAN →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. OTA COMMISSION CALCULATOR (light blue tint, #ota-calculator)
      ==================================================================== */}
      <section
        id="ota-calculator"
        className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              THE OTA PROBLEM
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              How Much Are You{' '}
              <span className="text-primary">Paying OTAs Every Year?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left (6 cols): White Inputs Card with Sliders + Editable Values */}
            <div className="lg:col-span-6 rounded-[24px] bg-white border border-navy-15 p-6 sm:p-8 shadow-soft space-y-5">
              {/* Slider 1: Number of Rooms (5 - 300, default 30) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="ota-rooms-slider"
                    className="text-[14px] font-extrabold text-navy"
                  >
                    Number of rooms
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      aria-label="Number of rooms"
                      min={5}
                      max={300}
                      value={rooms}
                      onChange={(e) =>
                        setRooms(
                          Math.min(300, Math.max(5, Number(e.target.value) || 5))
                        )
                      }
                      className="w-20 px-2.5 py-1 rounded-lg border border-navy-15 text-right font-mono text-[14px] font-extrabold text-primary"
                    />
                    <span className="text-[12px] font-bold text-navy-50">
                      rooms
                    </span>
                  </div>
                </div>
                <input
                  id="ota-rooms-slider"
                  type="range"
                  min={5}
                  max={300}
                  step={1}
                  value={rooms}
                  aria-valuemin={5}
                  aria-valuemax={300}
                  aria-valuenow={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Slider 2: Average Room Rate per Night (₹1,500 - ₹30,000, default ₹5,000) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="ota-rate-slider"
                    className="text-[14px] font-extrabold text-navy"
                  >
                    Average room rate per night
                  </label>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[14px] font-extrabold text-primary">
                      ₹
                    </span>
                    <input
                      type="number"
                      aria-label="Average room rate per night in INR"
                      min={1500}
                      max={30000}
                      step={500}
                      value={ratePerNight}
                      onChange={(e) =>
                        setRatePerNight(
                          Math.min(
                            30000,
                            Math.max(1500, Number(e.target.value) || 1500)
                          )
                        )
                      }
                      className="w-24 px-2.5 py-1 rounded-lg border border-navy-15 text-right font-mono text-[14px] font-extrabold text-primary"
                    />
                  </div>
                </div>
                <input
                  id="ota-rate-slider"
                  type="range"
                  min={1500}
                  max={30000}
                  step={500}
                  value={ratePerNight}
                  aria-valuemin={1500}
                  aria-valuemax={30000}
                  aria-valuenow={ratePerNight}
                  onChange={(e) => setRatePerNight(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Slider 3: Average Occupancy % (20 - 95, default 65) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="ota-occ-slider"
                    className="text-[14px] font-extrabold text-navy"
                  >
                    Average occupancy %
                  </label>
                  <span className="font-mono text-[15px] font-extrabold text-primary">
                    {occupancyPct}%
                  </span>
                </div>
                <input
                  id="ota-occ-slider"
                  type="range"
                  min={20}
                  max={95}
                  step={1}
                  value={occupancyPct}
                  aria-valuemin={20}
                  aria-valuemax={95}
                  aria-valuenow={occupancyPct}
                  onChange={(e) => setOccupancyPct(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Slider 4: Share of Bookings from OTAs % (10 - 95, default 70) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="ota-share-slider"
                    className="text-[14px] font-extrabold text-navy"
                  >
                    Share of bookings from OTAs %
                  </label>
                  <span className="font-mono text-[15px] font-extrabold text-primary">
                    {otaSharePct}%
                  </span>
                </div>
                <input
                  id="ota-share-slider"
                  type="range"
                  min={10}
                  max={95}
                  step={5}
                  value={otaSharePct}
                  aria-valuemin={10}
                  aria-valuemax={95}
                  aria-valuenow={otaSharePct}
                  onChange={(e) => setOtaSharePct(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Slider 5: OTA Commission % (10 - 30, default 18) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="ota-comm-slider"
                    className="text-[14px] font-extrabold text-navy"
                  >
                    OTA commission %
                  </label>
                  <span className="font-mono text-[15px] font-extrabold text-primary">
                    {otaCommissionPct}%
                  </span>
                </div>
                <input
                  id="ota-comm-slider"
                  type="range"
                  min={10}
                  max={30}
                  step={1}
                  value={otaCommissionPct}
                  aria-valuemin={10}
                  aria-valuemax={30}
                  aria-valuenow={otaCommissionPct}
                  onChange={(e) => setOtaCommissionPct(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Target Shift to Direct Bookings Chips: 10% · 20% · 30% */}
              <div className="pt-2 border-t border-navy-08">
                <span className="block text-[13px] font-extrabold text-navy mb-2">
                  Target shift to direct bookings:
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  {OTA_CALC_DEFAULTS.shiftPctOptions.map((opt) => {
                    const active = shiftPct === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setShiftPct(opt)}
                        className={`py-2.5 px-3 rounded-xl font-mono text-[14px] font-extrabold border transition-all cursor-pointer ${
                          active
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                        }`}
                      >
                        {opt}% Shift
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right (6 cols): Navy Card Shaped Like a Suitcase */}
            <div className="lg:col-span-6 pt-5">
              {/* Top Suitcase Handle */}
              <div
                aria-hidden="true"
                className="mx-auto w-36 h-8 -mb-1 rounded-t-2xl border-4 border-b-0 border-navy bg-transparent flex items-end justify-center"
              >
                <div className="w-24 h-3 rounded-t-lg bg-primary" />
              </div>

              {/* Suitcase Body with Two Vertical Strap Lines */}
              <div
                aria-live="polite"
                className="relative rounded-[28px] bg-navy text-white p-6 sm:p-9 border-2 border-primary/40 shadow-2xl overflow-hidden"
              >
                {/* Left & Right Vertical Suitcase Strap Lines */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute top-0 bottom-0 left-7 w-2.5 bg-white/6 border-x border-white/10 pointer-events-none"
                />
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute top-0 bottom-0 right-7 w-2.5 bg-white/6 border-x border-white/10 pointer-events-none"
                />

                <div className="relative z-10 sm:px-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary">
                      ANNUAL OTA DRAIN REPORT
                    </span>
                    <Luggage className="w-5 h-5 text-primary" />
                  </div>

                  <div className="text-[14px] text-white/75 font-semibold">
                    Commission paid to OTAs / year:
                  </div>
                  <div className="font-mono text-[34px] sm:text-[44px] font-extrabold text-white leading-tight my-1 tabular-nums">
                    {formatInr(currentOtaCommissionPerYear)}
                  </div>
                  <div className="text-[12px] text-white/60 font-mono mb-6">
                    Out of {formatInr(yearlyRoomRevenue)} yearly room revenue
                  </div>

                  {/* Horizontal Split Bar: "Paid to OTAs" (light blue tint) vs "Kept by you with direct bookings" (solid blue) */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-[12px] font-bold mb-2">
                      <span className="text-white/80">
                        Paid to OTAs: {formatInr(remainingOtaCommission)}
                      </span>
                      <span className="text-primary font-extrabold">
                        Kept by you: {formatInr(annualDirectSavings)}
                      </span>
                    </div>

                    <div
                      role="img"
                      aria-label={`Commission split bar showing ${
                        100 - keptShareOfCommissionPct
                      }% still paid to OTAs and ${keptShareOfCommissionPct}% kept by you with direct bookings`}
                      className="w-full h-5 rounded-full bg-white/15 overflow-hidden flex p-0.5 border border-white/20"
                    >
                      <div
                        className="h-full bg-white/80 transition-all duration-300 rounded-l-full"
                        style={{
                          width: `${Math.max(
                            8,
                            100 - keptShareOfCommissionPct
                          )}%`,
                        }}
                      />
                      <div
                        className="h-full bg-primary transition-all duration-300 rounded-r-full"
                        style={{
                          width: `${Math.max(8, keptShareOfCommissionPct)}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-white/65 mt-1.5">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-white/80" />
                        <span>Paid to OTAs</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <span>Kept by you with direct bookings</span>
                      </span>
                    </div>
                  </div>

                  {/* Highlight Savings Callout */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-primary/20 border-2 border-primary mb-6">
                    <div className="text-[18px] sm:text-[22px] font-extrabold text-white leading-snug">
                      <span className="text-primary">
                        {formatInr(annualDirectSavings)} saved per year
                      </span>{' '}
                      by moving {effectiveShiftPct}% of bookings to direct
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <a
                      href="#booking-demo"
                      className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[14px] transition-all inline-flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Show Me How</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <span className="text-[12px] text-white/60 italic">
                      Estimate for illustration only.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. THE GUEST JOURNEY — PASSPORT STAMPS (white, Open Passport Booklet)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              GUEST JOURNEY
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              We&apos;re With Your Guests{' '}
              <span className="text-primary">at Every Stop</span>
            </h2>
          </div>

          {/* Mobile Page Switcher (Page 1: Stops 01-04 | Page 2: Stops 05-07) */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setMobilePassportPage('left')}
              className={`px-4 py-2 rounded-full font-mono text-[12px] font-extrabold uppercase border cursor-pointer ${
                mobilePassportPage === 'left'
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-navy border-navy-15'
              }`}
            >
              Passport Page 01 (Stops 1–4)
            </button>
            <button
              type="button"
              onClick={() => setMobilePassportPage('right')}
              className={`px-4 py-2 rounded-full font-mono text-[12px] font-extrabold uppercase border cursor-pointer ${
                mobilePassportPage === 'right'
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-navy border-navy-15'
              }`}
            >
              Passport Page 02 (Stops 5–7)
            </button>
          </div>

          {/* Open Passport Booklet Container */}
          <div className="rounded-[30px] bg-navy p-3 sm:p-5 shadow-2xl border-2 border-navy">
            <div className="rounded-[22px] bg-primary-50/40 border border-primary-100 grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden">
              {/* Center Passport Fold Spine Shadow on Desktop */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-r from-navy/5 via-navy/20 to-navy/5 z-10 pointer-events-none"
              />

              {/* Left Facing Passport Page (Stamps 01 - 04) */}
              <div
                className={`lg:col-span-6 p-6 sm:p-9 bg-white/90 relative ${
                  mobilePassportPage === 'left' ? 'block' : 'hidden lg:block'
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-dashed border-navy-15 font-mono text-[11px] font-bold text-navy-50">
                  <span>PASSPORT · REPUBLIC OF HOSPITALITY</span>
                  <span className="text-primary">VISAS · PAGE 01</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {PASSPORT_STAMPS.filter((s) => s.pageSide === 'left').map(
                    (stamp) => (
                      <div
                        key={stamp.id}
                        className="p-4 rounded-2xl bg-primary-50/40 border border-primary-100 flex flex-col justify-between"
                      >
                        {/* Blue Ink Stamp Badge */}
                        <div
                          className={`passport-stamp-badge self-start mb-3 ${stamp.rotationClass}`}
                        >
                          <div
                            className={`border-2 border-primary px-3.5 py-2 text-primary bg-white/90 shadow-2xs ${
                              stamp.shape === 'circle'
                                ? 'rounded-full border-double px-4 py-2.5'
                                : 'rounded-xl border-dashed'
                            }`}
                          >
                            <div className="font-mono text-[9px] font-extrabold uppercase tracking-widest">
                              {stamp.portCode}
                            </div>
                            <div className="flex items-center gap-1.5 font-mono text-[16px] font-extrabold leading-tight">
                              <Stamp className="w-4 h-4 text-primary shrink-0" />
                              <span>
                                {stamp.stampNumber} · {stamp.stepName}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Handwritten Caveat Note */}
                        <p className="font-caveat text-[23px] font-bold text-navy leading-snug">
                          {stamp.caveatNote}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Right Facing Passport Page (Stamps 05 - 07 + Official Seal) */}
              <div
                className={`lg:col-span-6 p-6 sm:p-9 bg-white/90 relative ${
                  mobilePassportPage === 'right' ? 'block' : 'hidden lg:block'
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-dashed border-navy-15 font-mono text-[11px] font-bold text-navy-50">
                  <span>DIRECT GUEST LIFECYCLE</span>
                  <span className="text-primary">VISAS · PAGE 02</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {PASSPORT_STAMPS.filter((s) => s.pageSide === 'right').map(
                    (stamp) => (
                      <div
                        key={stamp.id}
                        className="p-4 rounded-2xl bg-primary-50/40 border border-primary-100 flex flex-col justify-between"
                      >
                        <div
                          className={`passport-stamp-badge self-start mb-3 ${stamp.rotationClass}`}
                        >
                          <div
                            className={`border-2 border-primary px-3.5 py-2 text-primary bg-white/90 shadow-2xs ${
                              stamp.shape === 'circle'
                                ? 'rounded-full border-double px-4 py-2.5'
                                : 'rounded-xl border-dashed'
                            }`}
                          >
                            <div className="font-mono text-[9px] font-extrabold uppercase tracking-widest">
                              {stamp.portCode}
                            </div>
                            <div className="flex items-center gap-1.5 font-mono text-[16px] font-extrabold leading-tight">
                              <Stamp className="w-4 h-4 text-primary shrink-0" />
                              <span>
                                {stamp.stampNumber} · {stamp.stepName}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="font-caveat text-[23px] font-bold text-navy leading-snug">
                          {stamp.caveatNote}
                        </p>
                      </div>
                    )
                  )}

                  {/* 4th Slot on Right Page: WebXCode Direct Hospitality Crest */}
                  <div className="p-4 rounded-2xl bg-navy text-white flex flex-col justify-between">
                    <div className="font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary">
                      OFFICIAL IMMIGRATION SEAL
                    </div>
                    <div className="my-2 text-[16px] font-extrabold leading-snug">
                      100% Guest Data Owned by Your Property
                    </div>
                    <a
                      href="#booking-audit"
                      className="inline-flex items-center gap-1.5 text-[12px] font-mono font-extrabold text-primary hover:underline"
                    >
                      <span>STAMP YOUR PROPERTY</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. DIRECT BOOKING ENGINE DEMO (navy, #booking-demo)
      ==================================================================== */}
      <section
        id="booking-demo"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10 scroll-mt-20"
      >
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -right-24 top-1/4 w-[520px] h-[520px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TRY IT
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight">
              A Booking Engine That{' '}
              <span className="text-primary">Guests Love to Use</span>
            </h2>
          </div>

          {/* Large White Rounded "Booking App" Card on Navy */}
          <div className="rounded-[28px] bg-white text-navy shadow-2xl border-2 border-primary/40 overflow-hidden">
            {/* Top Bar: Date Range Picker + Guests Stepper + Currency Toggle */}
            <div className="p-5 sm:p-6 bg-primary-50/60 border-b border-navy-08">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                {/* Date Range Picker + Popover (5 cols) */}
                <div className="lg:col-span-5 relative">
                  <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary mb-1">
                    CHECK-IN &amp; CHECK-OUT DATES
                  </span>
                  <button
                    type="button"
                    aria-expanded={calendarPopoverOpen}
                    onClick={() => setCalendarPopoverOpen((prev) => !prev)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-navy-15 hover:border-primary flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <div className="text-[14px] font-extrabold text-navy">
                          {activeDatePreset.checkIn} →{' '}
                          {activeDatePreset.checkOut}
                        </div>
                        <div className="text-[11px] font-bold text-primary">
                          {activeDatePreset.label}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-extrabold text-primary underline">
                      Change
                    </span>
                  </button>

                  {/* Mini Calendar Range Popover */}
                  {calendarPopoverOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 z-30 rounded-2xl bg-white border-2 border-primary p-4 shadow-2xl">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-navy-08">
                        <span className="font-mono text-[11px] font-extrabold uppercase text-primary">
                          SELECT SAMPLE STAY RANGE
                        </span>
                        <button
                          type="button"
                          onClick={() => setCalendarPopoverOpen(false)}
                          className="text-[11px] font-extrabold text-navy hover:text-primary cursor-pointer"
                        >
                          Done ✓
                        </button>
                      </div>
                      <div className="space-y-2">
                        {DEMO_DATE_PRESETS.map((preset) => {
                          const active = bookingPresetId === preset.id;
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                setBookingPresetId(preset.id);
                                setCalendarPopoverOpen(false);
                                setDemoBookingConfirmed(false);
                              }}
                              className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-[13px] font-extrabold cursor-pointer ${
                                active
                                  ? 'bg-primary text-white'
                                  : 'bg-primary-50/50 text-navy hover:bg-primary-50'
                              }`}
                            >
                              <span>
                                {preset.checkIn} – {preset.checkOut}
                              </span>
                              <span className="font-mono text-[11px]">
                                {preset.nights} Nights
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Guests Stepper: Adults & Children (4 cols) */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-3">
                  <div className="px-3.5 py-2 rounded-xl bg-white border border-navy-15 flex items-center justify-between">
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase text-navy-50">
                        ADULTS
                      </span>
                      <span className="text-[14px] font-extrabold text-navy">
                        {adults}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label="Decrease adults"
                        onClick={() => setAdults((a) => Math.max(1, a - 1))}
                        className="w-7 h-7 rounded-lg bg-primary-50 text-primary flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Increase adults"
                        onClick={() => setAdults((a) => Math.min(6, a + 1))}
                        className="w-7 h-7 rounded-lg bg-primary-50 text-primary flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-white border border-navy-15 flex items-center justify-between">
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase text-navy-50">
                        CHILDREN
                      </span>
                      <span className="text-[14px] font-extrabold text-navy">
                        {childrenCount}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-label="Decrease children"
                        onClick={() =>
                          setChildrenCount((c) => Math.max(0, c - 1))
                        }
                        className="w-7 h-7 rounded-lg bg-primary-50 text-primary flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Increase children"
                        onClick={() =>
                          setChildrenCount((c) => Math.min(4, c + 1))
                        }
                        className="w-7 h-7 rounded-lg bg-primary-50 text-primary flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Currency Toggle: ₹ / $ / € (3 cols) */}
                <div className="lg:col-span-3 flex flex-col lg:items-end">
                  <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50 mb-1">
                    DISPLAY CURRENCY
                  </span>
                  <div
                    role="group"
                    aria-label="Currency selector"
                    className="inline-flex rounded-xl bg-white p-1 border border-navy-15"
                  >
                    {(['INR', 'USD', 'EUR'] as BookingCurrency[]).map((cur) => {
                      const active = currency === cur;
                      return (
                        <button
                          key={cur}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setCurrency(cur)}
                          className={`px-3 py-1.5 rounded-lg font-mono text-[12px] font-extrabold transition-all cursor-pointer ${
                            active
                              ? 'bg-primary text-white shadow-2xs'
                              : 'text-navy-70 hover:text-navy'
                          }`}
                        >
                          {CURRENCY_CONFIG[cur].label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Booking Split: Left Room List + Add-ons (8 cols) | Right Summary Panel (4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-08">
              {/* Left (8 cols): 3 Room Cards + Add-on Chips */}
              <div className="lg:col-span-8 p-5 sm:p-7 space-y-6">
                <div>
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block mb-3">
                    STEP 1 · SELECT YOUR ROOM OR VILLA (DIRECT RATE vs OTA RATE)
                  </span>

                  <div className="space-y-4">
                    {DEMO_ROOMS.map((room) => {
                      const isSelected = selectedRoomId === room.id;
                      const perNightSavedInr =
                        room.otaPriceInr - room.directPriceInr;
                      return (
                        <article
                          key={room.id}
                          onClick={() => {
                            setSelectedRoomId(room.id);
                            setDemoBookingConfirmed(false);
                          }}
                          className={`rounded-2xl border-2 p-4 transition-all cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-4 items-center ${
                            isSelected
                              ? 'bg-primary-50/40 border-primary shadow-md'
                              : 'bg-white border-navy-15 hover:border-primary/50'
                          }`}
                        >
                          {/* Room Photo (4 cols) */}
                          <div className="sm:col-span-4 aspect-[16/10] rounded-xl overflow-hidden bg-navy">
                            <img
                              src={room.image}
                              alt={room.imageAlt}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Room Specs & Amenities (5 cols) */}
                          <div className="sm:col-span-5">
                            <h3 className="text-[18px] font-extrabold text-navy mb-1">
                              {room.name}
                            </h3>
                            <div className="text-[12px] font-bold text-navy-70 mb-2.5">
                              {room.size} · {room.bedType}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {room.amenities.map((am) => (
                                <span
                                  key={am}
                                  className="px-2.5 py-1 rounded-full bg-primary-50 text-navy text-[11px] font-bold"
                                >
                                  ✓ {am}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Direct Price vs Struck-Through OTA Price (3 cols) */}
                          <div className="sm:col-span-3 sm:text-right flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-navy-08">
                            <div>
                              <div className="text-[11px] font-mono font-bold text-navy-50 line-through">
                                OTA: {convertPrice(room.otaPriceInr)}
                              </div>
                              <div className="font-mono text-[22px] font-extrabold text-primary leading-tight">
                                {convertPrice(room.directPriceInr)}
                              </div>
                              <div className="text-[10px] font-bold text-navy-50">
                                per night
                              </div>
                            </div>

                            <div className="mt-2 flex flex-col sm:items-end gap-1.5">
                              <span className="px-2.5 py-0.5 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold">
                                You save {convertPrice(perNightSavedInr)}/nt
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRoomId(room.id);
                                  setDemoBookingConfirmed(false);
                                }}
                                className={`px-3.5 py-1.5 rounded-full text-[12px] font-extrabold cursor-pointer ${
                                  isSelected
                                    ? 'bg-navy text-white'
                                    : 'bg-primary-50 text-primary hover:bg-primary hover:text-white'
                                }`}
                              >
                                {isSelected ? 'Selected ✓' : 'Select Room'}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                {/* Add-ons Step */}
                <div className="pt-4 border-t border-navy-08">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block mb-2.5">
                    STEP 2 · DIRECT BOOKING EXCLUSIVE ADD-ONS
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {DEMO_ADD_ONS.map((addon) => {
                      const active = selectedAddOnIds.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleAddOn(addon.id)}
                          className={`px-4 py-2.5 rounded-full text-[13px] font-extrabold border transition-all cursor-pointer inline-flex items-center gap-2 ${
                            active
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          {active ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 text-primary" />
                          )}
                          <span>{addon.name}</span>
                          <span
                            className={`font-mono text-[12px] ${
                              active ? 'text-white/90' : 'text-primary'
                            }`}
                          >
                            +{convertPrice(addon.priceInr)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right (4 cols): Summary Panel */}
              <div
                aria-live="polite"
                className="lg:col-span-4 p-5 sm:p-7 bg-primary-50/35 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary block mb-1">
                    RESERVATION SUMMARY
                  </span>
                  <h3 className="text-[20px] font-extrabold text-navy mb-4">
                    {activeRoom.name}
                  </h3>

                  <div className="p-4 rounded-2xl bg-white border border-navy-15 space-y-2.5 text-[14px] mb-5">
                    <div className="flex justify-between">
                      <span className="text-navy-70 font-medium">
                        Stay ({activeDatePreset.nights} nights ×{' '}
                        {convertPrice(activeRoom.directPriceInr)})
                      </span>
                      <span className="font-mono font-extrabold text-navy">
                        {convertPrice(roomSubtotalInr)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-navy-70 font-medium">
                        Guests
                      </span>
                      <span className="font-bold text-navy">
                        {adults} Adults
                        {childrenCount > 0 ? `, ${childrenCount} Children` : ''}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-navy-70 font-medium">
                        Selected Add-ons ({selectedAddOnIds.length})
                      </span>
                      <span className="font-mono font-bold text-navy">
                        {convertPrice(addOnsTotalInr)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-navy-70 font-medium">
                        Taxes &amp; Fees (12% sample)
                      </span>
                      <span className="font-mono font-bold text-navy">
                        {convertPrice(taxesInr)}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-navy-08 flex items-center justify-between">
                      <span className="text-[16px] font-extrabold text-navy">
                        Total Direct Price
                      </span>
                      <span className="font-mono text-[24px] font-extrabold text-primary tabular-nums">
                        {convertPrice(grandTotalInr)}
                      </span>
                    </div>
                  </div>

                  {/* Direct Savings Pill */}
                  <div className="p-3 rounded-xl bg-primary-50 border border-primary/30 text-[13px] font-extrabold text-primary text-center mb-5">
                    ✓ Guest saves {convertPrice(directRoomSavingsInr)} vs OTA on
                    this stay
                  </div>
                </div>

                {demoBookingConfirmed ? (
                  <div className="p-4 rounded-2xl bg-navy text-white border-2 border-primary text-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-2">
                      <Check className="w-5 h-5" />
                    </div>
                    <div className="text-[15px] font-extrabold mb-1">
                      Booking request received! Confirmation sent on WhatsApp.
                    </div>
                    <button
                      type="button"
                      onClick={() => setDemoBookingConfirmed(false)}
                      className="mt-2 text-[12px] font-mono font-bold text-primary underline cursor-pointer"
                    >
                      Reset Demo
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDemoBookingConfirmed(true)}
                    className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Book Now ({convertPrice(grandTotalInr)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[14px] text-white/70 font-medium">
            Demo only — no booking is made.
          </p>
        </div>
      </section>

      {/* ====================================================================
          6. SERVICES — POSTCARD WALL (white, 9 Postcard Cards, 3x3 Grid)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHAT WE DO
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Everything Your Hospitality Brand{' '}
              <span className="text-primary">Needs Online</span>
            </h2>
          </div>

          {/* 9 Postcard Cards (3x3 Grid on Desktop, 2-col on Tablet, 1-col on Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {POSTCARD_SERVICES.map((card) => {
              const isFlipped = flippedPostcardIds.includes(card.id);
              return (
                <article
                  key={card.id}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isFlipped}
                  aria-label={`${card.title} postcard — click or press Enter to flip`}
                  onClick={() => togglePostcardFlip(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      togglePostcardFlip(card.id);
                    }
                  }}
                  className={`group relative rounded-[24px] bg-white border-2 border-navy-15 hover:border-primary shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-primary ${card.tiltClass} hover:rotate-0`}
                >
                  {/* Top Air-Mail Diagonal Blue/White Stripe Border */}
                  <div
                    aria-hidden="true"
                    className="h-2.5 w-full"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(135deg, #0571c2 0px, #0571c2 10px, #ffffff 10px, #ffffff 20px, #1e242e 20px, #1e242e 30px, #ffffff 30px, #ffffff 40px)',
                    }}
                  />

                  <div className="p-5 sm:p-6">
                    {/* Postcard Header: Wavy Postmark + Perforated Blue Postage Stamp */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <span className="inline-block font-mono text-[10px] font-extrabold uppercase tracking-widest text-primary border border-dashed border-primary px-2.5 py-0.5 rounded-full mb-1">
                          {card.postmarkCity}
                        </span>
                        <div className="font-mono text-[10px] text-navy-50 tracking-wider">
                          ═══ ≋≋≋ POSTMARKED DIRECT ≋≋≋
                        </div>
                      </div>

                      {/* Perforated Postage Stamp Badge in Top-Right Corner */}
                      <div className="shrink-0 px-2.5 py-1.5 rounded-lg bg-primary-50 border-2 border-dashed border-primary text-center">
                        <Plane className="w-3.5 h-3.5 text-primary mx-auto mb-0.5" />
                        <span className="block font-mono text-[9px] font-extrabold text-primary leading-none">
                          {card.stampCode}
                        </span>
                      </div>
                    </div>

                    {/* Front vs Back Flip Content (Hover on Desktop OR Click/Tap/Enter Toggle) */}
                    <div className="relative min-h-[260px] flex flex-col justify-between">
                      {/* Front of Postcard (Visible by default, hidden when flipped or hovered on lg) */}
                      <div
                        className={`transition-opacity duration-200 flex flex-col justify-between h-full ${
                          isFlipped
                            ? 'hidden'
                            : 'flex lg:group-hover:hidden'
                        }`}
                      >
                        <div>
                          {/* Destination Photo Thumbnail */}
                          <div className="aspect-[16/9] rounded-xl overflow-hidden bg-navy mb-4 border border-navy-08 relative">
                            <img
                              src={card.image}
                              alt={card.imageAlt}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                            <span className="absolute bottom-2 left-2.5 font-mono text-[10px] font-extrabold text-white bg-navy/80 px-2.5 py-0.5 rounded-full">
                              GREETINGS FROM WEBXCODE
                            </span>
                          </div>

                          <h3 className="text-[20px] font-extrabold text-navy leading-snug mb-1.5">
                            {card.title}
                          </h3>
                          <p className="text-[14px] text-navy-70 font-medium">
                            {card.shortHook}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-dashed border-navy-15 flex items-center justify-between">
                          <span className="font-caveat text-[20px] font-bold text-primary">
                            {card.caveatLine}
                          </span>
                          <span className="font-mono text-[11px] font-extrabold text-primary underline shrink-0 ml-2">
                            Flip card ↻
                          </span>
                        </div>
                      </div>

                      {/* Back of Postcard (Postcard Message Side: 3 Bullets + Enquire Link) */}
                      <div
                        className={`transition-opacity duration-200 flex-col justify-between h-full bg-primary-50/40 rounded-2xl p-4 border border-primary-100 ${
                          isFlipped
                            ? 'flex'
                            : 'hidden lg:group-hover:flex'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-dashed border-primary/30">
                            <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                              POSTCARD BACK · DELIVERABLES
                            </span>
                            <span className="font-mono text-[10px] font-bold text-navy-50">
                              {card.stampCode}
                            </span>
                          </div>

                          <h4 className="text-[17px] font-extrabold text-navy mb-2.5">
                            {card.title}
                          </h4>

                          <ul className="space-y-2 mb-4">
                            {card.bullets.map((bullet) => (
                              <li
                                key={bullet}
                                className="flex items-start gap-2 text-[13px] text-navy font-medium leading-snug"
                              >
                                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2.5 border-t border-primary/20 flex items-center justify-between gap-2 flex-wrap">
                          {card.id === 'pc-2' ? (
                            <Link
                              to="/services/mobile-app-development"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-[12px] font-extrabold text-primary hover:underline"
                            >
                              <span>Mobile &amp; Booking Apps</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          ) : (
                            <a
                              href="#booking-audit"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:underline"
                            >
                              <span>Enquire</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenQuoteModal(card.title);
                            }}
                            className="px-3 py-1 rounded-full bg-navy text-white text-[11px] font-extrabold hover:bg-primary transition-colors cursor-pointer"
                          >
                            Quick Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. SEASON PLANNER — FILL ROOMS YEAR-ROUND (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary/25 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                YEAR-ROUND REVENUE
              </span>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
                Peak, Shoulder or Off-Season —{' '}
                <span className="text-primary">Keep Bookings Coming</span>
              </h2>
            </div>

            {/* Destination Type Toggle: Hill Station · Beach · City */}
            <div>
              <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50 mb-1.5">
                DESTINATION TYPE
              </span>
              <div
                role="group"
                aria-label="Destination type toggle"
                className="inline-flex rounded-full bg-white p-1.5 border border-navy-15 shadow-2xs"
              >
                {(['Hill Station', 'Beach', 'City'] as DestinationType[]).map(
                  (dtype) => {
                    const active = destinationType === dtype;
                    return (
                      <button
                        key={dtype}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setDestinationType(dtype)}
                        className={`px-4 py-2 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                          active
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-navy-70 hover:text-navy'
                        }`}
                      >
                        {dtype}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* 12-Month Strip (Jan–Dec) */}
          <div className="rounded-[26px] bg-white p-5 sm:p-7 border border-navy-15 shadow-lg mb-7">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                CLICK ANY MONTH TO VIEW YOUR {destinationType.toUpperCase()}{' '}
                MARKETING PLAYBOOK
              </span>

              {/* Legend: Low / Shoulder / Peak */}
              <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold">
                <span className="inline-flex items-center gap-1.5 text-navy">
                  <span className="w-3 h-3 rounded-sm bg-primary-50 border border-primary/40" />
                  <span>Low Season</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-navy">
                  <span className="w-3 h-3 rounded-sm bg-primary/35 border border-primary" />
                  <span>Shoulder Season</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-navy">
                  <span className="w-3 h-3 rounded-sm bg-primary" />
                  <span>Peak Season</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2.5">
              {currentSeasonMonths.map((m, idx) => {
                const isSelected = selectedMonthIdx === idx;
                const tierClasses =
                  m.tier === 'Peak'
                    ? 'bg-primary text-white border-primary'
                    : m.tier === 'Shoulder'
                    ? 'bg-primary/20 text-navy border-primary/40'
                    : 'bg-primary-50/70 text-navy border-primary-100';

                return (
                  <button
                    key={m.month}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedMonthIdx(idx)}
                    className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${tierClasses} ${
                      isSelected
                        ? 'ring-4 ring-navy/25 scale-[1.03] shadow-md'
                        : 'hover:border-navy'
                    }`}
                  >
                    <span className="font-mono text-[13px] font-extrabold">
                      {m.month}
                    </span>
                    <span
                      className={`my-1.5 px-2 py-0.5 rounded-full font-mono text-[9px] font-extrabold uppercase ${
                        m.tier === 'Peak'
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-primary'
                      }`}
                    >
                      {m.tier}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        m.tier === 'Peak' ? 'text-white/85' : 'text-navy-70'
                      }`}
                    >
                      {m.occupancyTarget}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Month Recommendation Card */}
          <div
            aria-live="polite"
            className="rounded-[26px] bg-navy text-white p-6 sm:p-9 border-2 border-primary/40 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {selectedMonthData.fullMonth} · {destinationType} ·{' '}
                  {selectedMonthData.tier} Season
                </span>
              </div>
              <h3 className="text-[22px] sm:text-[26px] font-extrabold text-white leading-snug mb-2">
                {selectedPlaybook.headline}
              </h3>
              <p className="text-[15px] text-white/80 leading-relaxed mb-4">
                {selectedPlaybook.recommendation}
              </p>
              <div className="inline-flex items-center gap-2 font-mono text-[12px] font-extrabold text-primary bg-white/10 px-3.5 py-2 rounded-xl">
                <span>Target Occupancy Benchmark:</span>
                <span className="text-white">
                  {selectedMonthData.occupancyTarget}
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/6 rounded-2xl p-5 border border-white/15">
              <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3">
                RECOMMENDED ACTION PLAN FOR{' '}
                {selectedMonthData.fullMonth.toUpperCase()}
              </span>
              <ul className="space-y-3 mb-5">
                {selectedPlaybook.tactics.map((tactic) => (
                  <li
                    key={tactic}
                    className="flex items-start gap-2.5 text-[14px] sm:text-[15px] text-white/90 font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{tactic}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#booking-audit"
                className="inline-flex items-center gap-2 text-[14px] font-extrabold text-primary hover:underline"
              >
                <span>Get a 12-Month Direct Booking Calendar for Your Property</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY — THE HOTEL KEY CARD (navy)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              PROVEN HOSPITALITY RESULTS
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight">
              Your Master Key to{' '}
              <span className="text-primary">Direct Bookings</span>
            </h2>
          </div>

          {/* Oversized Horizontal Hotel Key Card */}
          <div
            onMouseMove={handleKeyCardMouseMove}
            onMouseLeave={handleKeyCardMouseLeave}
            style={{
              transform: prefersReducedMotion
                ? undefined
                : `perspective(1200px) rotateX(${keyCardTilt.rotateX}deg) rotateY(${keyCardTilt.rotateY}deg)`,
              transition: 'transform 0.2s ease-out',
            }}
            className="rounded-[32px] bg-white text-navy shadow-[0_30px_80px_rgba(5,113,194,0.35)] border-2 border-primary overflow-hidden"
          >
            {/* Top Blue Magnetic Key-Card Strip */}
            <div className="bg-primary text-white px-6 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <KeyRound className="w-5 h-5 text-white" />
                <span className="font-mono text-[12px] font-extrabold uppercase tracking-[0.2em]">
                  DIGITAL ROOM KEY · SAMPLE RESULT (PLACEHOLDER)
                </span>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-navy text-white font-mono text-[12px] font-extrabold tracking-widest">
                {KEY_CARD_CASE_STUDY.roomKeyLabel}
              </span>
            </div>

            <div className="p-6 sm:p-10">
              {/* Property Header + Smart Chip Icon */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-7 border-b border-navy-08">
                <div className="flex items-center gap-4">
                  {/* Metallic-Style Blue/Navy Keycard Contact Chip */}
                  <div
                    aria-hidden="true"
                    className="w-14 h-11 rounded-xl bg-primary-50 border-2 border-primary grid grid-cols-3 gap-0.5 p-1.5 shrink-0"
                  >
                    <span className="rounded-2xs bg-primary/30" />
                    <span className="rounded-2xs bg-primary" />
                    <span className="rounded-2xs bg-primary/30" />
                    <span className="rounded-2xs bg-primary" />
                    <span className="rounded-2xs bg-navy" />
                    <span className="rounded-2xs bg-primary" />
                  </div>
                  <div>
                    <h3 className="text-[22px] sm:text-[26px] font-extrabold text-navy">
                      {KEY_CARD_CASE_STUDY.resortName}
                    </h3>
                    <p className="text-[14px] font-bold text-primary">
                      {KEY_CARD_CASE_STUDY.locationTag}
                    </p>
                  </div>
                </div>

                {/* What We Did Chips */}
                <div className="flex flex-wrap gap-2">
                  {KEY_CARD_CASE_STUDY.whatWeDid.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold border border-primary/25"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4 Key Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {KEY_CARD_CASE_STUDY.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-5 rounded-2xl bg-primary-50/50 border border-primary-100"
                  >
                    <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-1">
                      {m.label}
                    </div>
                    <div className="font-mono text-[24px] sm:text-[26px] font-extrabold text-primary leading-tight">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Client Quote + CTA Row */}
              <div className="p-6 rounded-2xl bg-navy text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4 max-w-3xl">
                  <img
                    src={IMG_CLIENT_AVATAR}
                    alt={KEY_CARD_CASE_STUDY.clientName}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary shrink-0 mt-1"
                  />
                  <div>
                    <p className="text-[15px] sm:text-[16px] text-white/90 italic leading-relaxed mb-2">
                      &ldquo;{KEY_CARD_CASE_STUDY.quote}&rdquo;
                    </p>
                    <div className="text-[13px] font-extrabold text-white">
                      {KEY_CARD_CASE_STUDY.clientName}{' '}
                      <span className="text-primary font-normal">
                        — {KEY_CARD_CASE_STUDY.clientRole}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="#booking-audit"
                  className="px-6 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[14px] transition-all inline-flex items-center justify-center gap-2 shrink-0 shadow-lg"
                >
                  <span>Unlock Results Like This</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. TRAVEL FAQ (white, 6 Accordion Items with Luggage-Tag Numbers)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[920px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Questions From{' '}
              <span className="text-primary">Hoteliers &amp; Tour Operators</span>
            </h2>
          </div>

          <div className="space-y-4">
            {TRAVEL_FAQS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border-2 transition-all overflow-hidden ${
                    isOpen
                      ? 'border-primary bg-primary-50/25 shadow-md'
                      : 'border-navy-15 bg-white hover:border-primary/50'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Luggage-Tag Number Badge */}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-navy text-white font-mono text-[12px] font-extrabold shrink-0 border border-primary/40">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>TAG {faq.tagNo}</span>
                      </span>
                      <span className="text-[17px] sm:text-[18px] font-extrabold text-navy">
                        {faq.question}
                      </span>
                    </div>
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

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-[15px] text-navy-70 leading-relaxed border-t border-navy-08">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          10. FINAL CTA — FREE DIRECT BOOKING AUDIT TICKET (navy, #booking-audit)
      ==================================================================== */}
      <section
        id="booking-audit"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10 scroll-mt-20"
      >
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[680px] h-[680px] blue-glow-strong pointer-events-none"
        />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Admission / Travel Ticket Card with Notched Sides & Perforated Divider */}
          <div className="relative rounded-[30px] bg-white text-navy shadow-2xl border-2 border-primary overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Ticket Notch Circle */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy border-r-2 border-primary z-20"
            />
            {/* Right Ticket Notch Circle */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-navy border-l-2 border-primary z-20"
            />

            {/* Left Stub (5 cols): What You Get in Your Free Direct Booking Audit */}
            <div className="lg:col-span-5 bg-primary-50/60 p-6 sm:p-9 lg:border-r-2 lg:border-dashed lg:border-primary/40 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider mb-4">
                  <Ticket className="w-3.5 h-3.5" />
                  <span>ADMIT ONE PROPERTY · FREE AUDIT</span>
                </div>

                <h2 className="text-[28px] sm:text-[34px] font-extrabold text-navy leading-[1.12] tracking-tight mb-4">
                  Get Your Free{' '}
                  <span className="text-primary">Direct Booking Audit</span>
                </h2>

                <p className="text-[15px] text-navy-70 leading-relaxed mb-6">
                  Our hospitality digital team will review your current website,
                  OTA listings and Google presence—and send you a custom action
                  plan within 48 hours:
                </p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    'Website & booking flow review',
                    'OTA vs direct price & ranking check',
                    'Google Maps & Hotel Ads review',
                    'Page speed & mobile check',
                    '90-day direct-booking growth plan',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[15px] font-extrabold text-navy"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ticket Barcode & Serial Footer */}
              <div className="pt-5 border-t border-dashed border-navy-15">
                <div
                  aria-hidden="true"
                  className="h-9 w-full mb-2 rounded-sm"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(90deg, #1e242e 0px, #1e242e 3px, transparent 3px, transparent 6px, #0571c2 6px, #0571c2 8px, transparent 8px, transparent 12px)',
                  }}
                />
                <div className="flex items-center justify-between font-mono text-[10px] font-bold text-navy-50">
                  <span>PASS NO: WXC-DIR-2026</span>
                  <span>0% OTA COMMISSION ROADMAP</span>
                </div>
              </div>
            </div>

            {/* Right Ticket Form (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-white">
              {auditSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-4 shadow-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary mb-1">
                    BOARDING CONFIRMED · AUDIT IN PROGRESS
                  </span>
                  <h3 className="text-[26px] font-extrabold text-navy mb-2">
                    Your Direct Booking Audit Ticket Is Issued!
                  </h3>
                  <p className="text-[15px] text-navy-70 max-w-md mb-6">
                    We&apos;ve received the details for{' '}
                    <span className="font-extrabold text-navy">
                      {auditForm.propertyName}
                    </span>
                    . Our hospitality specialist will send your custom video and
                    PDF audit within 48 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuditSubmitted(false);
                      setAuditForm({
                        name: '',
                        email: '',
                        phone: '',
                        propertyName: '',
                        websiteUrl: '',
                        businessType: 'Hotel/Resort',
                        roomsCount: '',
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-primary-50 text-primary font-extrabold text-[13px] hover:bg-primary hover:text-white transition-colors cursor-pointer"
                  >
                    Submit Another Property
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleBookingAuditSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-navy-08 pb-3 mb-2">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      PASSENGER &amp; PROPERTY DETAILS
                    </span>
                    <span className="font-mono text-[11px] font-bold text-navy-50">
                      PRIORITY DESK
                    </span>
                  </div>

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="th-audit-name"
                        className="block text-[13px] font-extrabold text-navy mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        id="th-audit-name"
                        type="text"
                        value={auditForm.name}
                        onChange={(e) =>
                          setAuditForm({ ...auditForm, name: e.target.value })
                        }
                        placeholder="e.g. Rohan Malhotra"
                        className="w-full px-4 py-3 rounded-xl border border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                      />
                      {auditErrors.name && (
                        <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{auditErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="th-audit-email"
                        className="block text-[13px] font-extrabold text-navy mb-1"
                      >
                        Work Email *
                      </label>
                      <input
                        id="th-audit-email"
                        type="email"
                        value={auditForm.email}
                        onChange={(e) =>
                          setAuditForm({ ...auditForm, email: e.target.value })
                        }
                        placeholder="gm@yourresort.com"
                        className="w-full px-4 py-3 rounded-xl border border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                      />
                      {auditErrors.email && (
                        <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{auditErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone/WhatsApp + Property/Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="th-audit-phone"
                        className="block text-[13px] font-extrabold text-navy mb-1"
                      >
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="th-audit-phone"
                        type="tel"
                        value={auditForm.phone}
                        onChange={(e) =>
                          setAuditForm({ ...auditForm, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                      />
                      {auditErrors.phone && (
                        <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{auditErrors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="th-audit-property"
                        className="block text-[13px] font-extrabold text-navy mb-1"
                      >
                        Property / Business Name *
                      </label>
                      <input
                        id="th-audit-property"
                        type="text"
                        value={auditForm.propertyName}
                        onChange={(e) =>
                          setAuditForm({
                            ...auditForm,
                            propertyName: e.target.value,
                          })
                        }
                        placeholder="e.g. The Emerald Palms Resort"
                        className="w-full px-4 py-3 rounded-xl border border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                      />
                      {auditErrors.propertyName && (
                        <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{auditErrors.propertyName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Website URL + Number of Rooms/Packages */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="th-audit-website"
                        className="block text-[13px] font-extrabold text-navy mb-1"
                      >
                        Website URL *
                      </label>
                      <input
                        id="th-audit-website"
                        type="text"
                        value={auditForm.websiteUrl}
                        onChange={(e) =>
                          setAuditForm({
                            ...auditForm,
                            websiteUrl: e.target.value,
                          })
                        }
                        placeholder="https://yourresort.com"
                        className="w-full px-4 py-3 rounded-xl border border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                      />
                      {auditErrors.websiteUrl && (
                        <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{auditErrors.websiteUrl}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="th-audit-rooms"
                        className="block text-[13px] font-extrabold text-navy mb-1"
                      >
                        Number of Rooms / Packages (Optional)
                      </label>
                      <input
                        id="th-audit-rooms"
                        type="text"
                        value={auditForm.roomsCount}
                        onChange={(e) =>
                          setAuditForm({
                            ...auditForm,
                            roomsCount: e.target.value,
                          })
                        }
                        placeholder="e.g. 36 Rooms / 25 Tour Packages"
                        className="w-full px-4 py-3 rounded-xl border border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                      />
                    </div>
                  </div>

                  {/* Business Type Chips */}
                  <div>
                    <span className="block text-[13px] font-extrabold text-navy mb-2">
                      Business Type
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {AUDIT_BUSINESS_TYPES.map((btype) => {
                        const active = auditForm.businessType === btype;
                        return (
                          <button
                            key={btype}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              setAuditForm({
                                ...auditForm,
                                businessType: btype,
                              })
                            }
                            className={`px-3.5 py-2 rounded-full text-[12px] font-extrabold border transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white border-primary shadow-2xs'
                                : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                            }`}
                          >
                            {btype}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={auditSubmitting}
                    className="w-full py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {auditSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Issuing Your Audit Ticket...</span>
                      </>
                    ) : (
                      <>
                        <span>Get My Free Direct Booking Audit</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. EXPLORE OTHER INDUSTRIES (white, Compact Horizontal Chip Bar)
      ==================================================================== */}
      <section className="bg-white py-12 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary block">
                MORE INDUSTRIES WE SERVE
              </span>
              <h2 className="text-[20px] sm:text-[22px] font-extrabold text-navy">
                Explore Other Industries
              </h2>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:underline"
            >
              <span>View All 14 Industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 no-scrollbar">
            {otherIndustries.map((ind) => {
              const href =
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
                  : ind.slug === 'home-decor-furniture'
                  ? '/industries/home-decor-furniture'
                  : ind.slug === 'fashion-lifestyle'
                  ? '/industries/fashion-lifestyle'
                  : ind.slug === 'healthcare'
                  ? '/industries/healthcare'
                  : ind.slug === 'education-edtech'
                  ? '/industries/education-edtech'
                  : `/industries#${ind.slug}`;

              return (
                <Link
                  key={ind.slug}
                  to={href}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary-50/50 hover:bg-primary hover:text-white text-navy border border-primary-100 text-[13px] font-extrabold transition-all"
                >
                  <IndustryIcon name={ind.icon} className="w-4 h-4" />
                  <span>{ind.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default TravelHospitality;


