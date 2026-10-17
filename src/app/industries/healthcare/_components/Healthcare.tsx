'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Check,
  CheckCircle2,
  Building2,
  Stethoscope,
  Sparkles,
  Eye,
  HeartPulse,
  Activity,
  Microscope,
  Baby,
  Smartphone,
  Search,
  UserCheck,
  ShieldCheck,
  Calendar,
  Bell,
  MapPin,
  FileText,
  Star,
  Clock,
  Lock,
  Globe,
  MessageSquare,
  Plus,
  Minus,
  AlertCircle,
  Loader2,
  Phone,
  Languages,
  Contrast,
  Type,
  ClipboardList,
} from 'lucide-react';
import { industries, IndustryIcon } from '@/app/industries/_components/Industries';

const IMG_DOCTOR_AVATAR_1 =
  '/images/testimonial_1_avatar_1791105049302.jpg';
const IMG_DOCTOR_AVATAR_2 =
  '/images/testimonial_2_avatar_1791105060710.jpg';
const IMG_DOCTOR_AVATAR_3 =
  '/images/testimonial_3_avatar_1791105072578.jpg';
const IMG_CLINIC_TEAM =
  '/images/why_webxcode_team_office_1791104914357.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT HEALTHCARE ITEM FROM INDUSTRIES
============================================================================ */
const healthcareIndustry =
  industries.find((item) => item.slug === 'healthcare') || industries[8];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 1: Hero — Appointment Card Auto-Loop Data */
const HERO_DATE_CHIPS = [
  { id: 'hd-1', day: 'Today', date: '14 Oct' },
  { id: 'hd-2', day: 'Tomorrow', date: '15 Oct' },
  { id: 'hd-3', day: 'Thu', date: '16 Oct' },
  { id: 'hd-4', day: 'Fri', date: '17 Oct' },
];

const HERO_TIME_SLOTS = [
  '10:30 AM',
  '12:00 PM',
  '04:30 PM',
  '06:00 PM',
];

/* Section 2: Who We Serve — Hospital Wayfinding Signage (9 Segments) */
export interface WayfindingSegment {
  id: string;
  wingCode: string;
  floorLabel: string;
  name: string;
  arrowDir: 'left' | 'right';
  iconName:
    | 'hospital'
    | 'dental'
    | 'skin'
    | 'eye'
    | 'ivf'
    | 'physio'
    | 'lab'
    | 'pediatric'
    | 'healthtech';
  description: string;
  solutionChips: [string, string];
}

const WAYFINDING_SEGMENTS: WayfindingSegment[] = [
  {
    id: 'wf-hospitals',
    wingCode: 'WING A · LEVEL 01',
    floorLabel: 'A1',
    name: 'Hospitals & Multi-Specialty Centers',
    arrowDir: 'right',
    iconName: 'hospital',
    description:
      'Department directories, doctor finders across 20+ specialties, emergency contact strips and multi-branch appointment routing.',
    solutionChips: ['Multi-Specialty Doctor Finder', 'HIS & Appointment Sync'],
  },
  {
    id: 'wf-dental',
    wingCode: 'WING B · LEVEL 01',
    floorLabel: 'B1',
    name: 'Dental Clinics',
    arrowDir: 'left',
    iconName: 'dental',
    description:
      'Treatment pages for implants, aligners and smile design with chair-slot booking and automated WhatsApp recall reminders.',
    solutionChips: ['Chair-Time Slot Booking', 'Local "Dentist Near Me" SEO'],
  },
  {
    id: 'wf-skin',
    wingCode: 'WING C · LEVEL 02',
    floorLabel: 'C2',
    name: 'Skin & Aesthetic Clinics',
    arrowDir: 'right',
    iconName: 'skin',
    description:
      'Doctor-led dermatology and laser procedure explainers, concern-based navigation and private consultation booking.',
    solutionChips: ['Procedure & Concern Hubs', 'WhatsApp Consultation Bot'],
  },
  {
    id: 'wf-eye',
    wingCode: 'WING D · LEVEL 02',
    floorLabel: 'D2',
    name: 'Eye Care Centers',
    arrowDir: 'left',
    iconName: 'eye',
    description:
      'High-contrast, senior-friendly websites for cataract, LASIK and retina centers with 1-tap call and large-text readability.',
    solutionChips: ['Senior-Accessible UI', 'Multi-Center Map Ranking'],
  },
  {
    id: 'wf-ivf',
    wingCode: 'WING E · LEVEL 03',
    floorLabel: 'E3',
    name: 'IVF & Fertility Centers',
    arrowDir: 'right',
    iconName: 'ivf',
    description:
      'Calm, empathetic step-by-step fertility journey guides, confidential counselor callbacks and compliant patient education.',
    solutionChips: ['Private Callback Flows', 'Guideline-Safe Content'],
  },
  {
    id: 'wf-physio',
    wingCode: 'WING F · LEVEL 03',
    floorLabel: 'F3',
    name: 'Physiotherapy & Rehab',
    arrowDir: 'left',
    iconName: 'physio',
    description:
      'Condition-specific recovery pages (back pain, sports injury, post-op rehab) with multi-session package booking and home-visit slots.',
    solutionChips: ['Session & Home-Visit Booking', 'Condition SEO Pages'],
  },
  {
    id: 'wf-labs',
    wingCode: 'WING G · LEVEL 04',
    floorLabel: 'G4',
    name: 'Diagnostic Labs & Imaging',
    arrowDir: 'right',
    iconName: 'lab',
    description:
      'Searchable A–Z test and health-checkup package catalogs, morning home-sample collection slots and secure PDF report downloads.',
    solutionChips: ['Home Sample Slot Booking', 'Online Report Portal'],
  },
  {
    id: 'wf-pediatric',
    wingCode: 'WING H · LEVEL 04',
    floorLabel: 'H4',
    name: "Pediatric & Women's Health",
    arrowDir: 'left',
    iconName: 'pediatric',
    description:
      'Reassuring maternity, vaccination schedule and child-specialist portals with urgent same-day slot visibility for parents.',
    solutionChips: ['Same-Day Pediatric Slots', 'Vaccination & Care Guides'],
  },
  {
    id: 'wf-healthtech',
    wingCode: 'WING J · LEVEL 05',
    floorLabel: 'J5',
    name: 'Health-Tech & Telemedicine Startups',
    arrowDir: 'right',
    iconName: 'healthtech',
    description:
      'Fast, conversion-focused web platforms, video consultation flows, doctor onboarding portals and E-E-A-T medical content hubs.',
    solutionChips: ['Telemedicine Web App', 'Doctor-Reviewed SEO Engine'],
  },
];

/* Section 3: The Patient Journey — Pulse Line (8 Steps) */
export interface PatientJourneyStep {
  stepNumber: string;
  title: string;
  description: string;
  position: 'above' | 'below';
  tag: string;
}

const PATIENT_JOURNEY_STEPS: PatientJourneyStep[] = [
  {
    stepNumber: '01',
    title: 'Search Symptoms',
    description: 'Helpful, doctor-reviewed content that answers questions',
    position: 'above',
    tag: 'Medical SEO & AEO',
  },
  {
    stepNumber: '02',
    title: 'Find a Doctor',
    description: 'Clear specialist profiles and departments',
    position: 'below',
    tag: 'Doctor Directory',
  },
  {
    stepNumber: '03',
    title: 'Check Trust',
    description: 'Qualifications, experience and genuine reviews',
    position: 'above',
    tag: 'Verified Credentials',
  },
  {
    stepNumber: '04',
    title: 'Book',
    description: 'Online booking in under a minute',
    position: 'below',
    tag: 'Real-Time Slots',
  },
  {
    stepNumber: '05',
    title: 'Reminder',
    description: 'WhatsApp/SMS reminders to cut no-shows',
    position: 'above',
    tag: 'Automated Alerts',
  },
  {
    stepNumber: '06',
    title: 'Visit',
    description: 'Directions, parking and what to bring',
    position: 'below',
    tag: 'Google Maps & Prep',
  },
  {
    stepNumber: '07',
    title: 'Follow-up',
    description: 'Reports, prescriptions and follow-up booking',
    position: 'above',
    tag: 'Patient Portal',
  },
  {
    stepNumber: '08',
    title: 'Review',
    description: 'Gentle review requests after the visit',
    position: 'below',
    tag: 'Reputation Flow',
  },
];

/* Section 4: Find a Doctor & Book — Interactive Demo Data */
export const DEMO_SPECIALTIES = [
  'All Specialties',
  'Dermatology',
  'Dentistry',
  'Orthopedics',
  'Pediatrics',
  'Eye Care',
  'General Physician',
] as const;

export const DEMO_LOCATIONS = [
  'All Branches',
  'Main Center — South Extension',
  'City Clinic — Gurgaon Sec 44',
  'West Wing — Indiranagar',
] as const;

export const DEMO_DATES = [
  { id: 'd-today', label: 'Today', sub: '14 Oct' },
  { id: 'd-tom', label: 'Tomorrow', sub: '15 Oct' },
  { id: 'd-thu', label: 'Thu, 16 Oct', sub: '16 Oct' },
  { id: 'd-fri', label: 'Fri, 17 Oct', sub: '17 Oct' },
  { id: 'd-sat', label: 'Sat, 18 Oct', sub: '18 Oct' },
];

export interface DemoDoctor {
  id: string;
  name: string;
  qualifications: string;
  specialty:
    | 'Dermatology'
    | 'Dentistry'
    | 'Orthopedics'
    | 'Pediatrics'
    | 'Eye Care'
    | 'General Physician';
  branch:
    | 'Main Center — South Extension'
    | 'City Clinic — Gurgaon Sec 44'
    | 'West Wing — Indiranagar';
  experience: string;
  languages: string;
  fee: string;
  nextAvailable: string;
  avatar: string;
  slots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

const DEMO_DOCTORS: DemoDoctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Ananya Sharma (Placeholder)',
    qualifications: 'MD (Dermatology), Fellowship in Clinical Cosmetology',
    specialty: 'Dermatology',
    branch: 'Main Center — South Extension',
    experience: '12 yrs',
    languages: 'English, Hindi',
    fee: '₹900',
    nextAvailable: 'Today 5:30 PM',
    avatar: IMG_DOCTOR_AVATAR_2,
    slots: {
      morning: ['10:00 AM', '10:30 AM', '11:15 AM'],
      afternoon: ['02:00 PM', '03:15 PM'],
      evening: ['05:30 PM', '06:15 PM', '07:00 PM'],
    },
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Verma (Placeholder)',
    qualifications: 'MS (Orthopedics), Joint Replacement Specialist',
    specialty: 'Orthopedics',
    branch: 'City Clinic — Gurgaon Sec 44',
    experience: '16 yrs',
    languages: 'English, Hindi',
    fee: '₹1,100',
    nextAvailable: 'Today 4:00 PM',
    avatar: IMG_DOCTOR_AVATAR_1,
    slots: {
      morning: ['09:30 AM', '11:00 AM'],
      afternoon: ['01:30 PM', '04:00 PM'],
      evening: ['05:45 PM', '06:30 PM'],
    },
  },
  {
    id: 'doc-3',
    name: 'Dr. Meera Krishnan (Placeholder)',
    qualifications: 'MDS (Prosthodontics & Implantology)',
    specialty: 'Dentistry',
    branch: 'West Wing — Indiranagar',
    experience: '10 yrs',
    languages: 'English, Hindi, Kannada',
    fee: '₹700',
    nextAvailable: 'Today 3:00 PM',
    avatar: IMG_DOCTOR_AVATAR_3,
    slots: {
      morning: ['10:15 AM', '11:30 AM'],
      afternoon: ['03:00 PM', '03:45 PM'],
      evening: ['05:15 PM', '06:45 PM'],
    },
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikramaditya Sen (Placeholder)',
    qualifications: 'MD (Pediatrics), Newborn & Child Health Specialist',
    specialty: 'Pediatrics',
    branch: 'Main Center — South Extension',
    experience: '14 yrs',
    languages: 'English, Hindi, Bengali',
    fee: '₹850',
    nextAvailable: 'Today 6:00 PM',
    avatar: IMG_DOCTOR_AVATAR_1,
    slots: {
      morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
      afternoon: ['02:30 PM'],
      evening: ['06:00 PM', '06:30 PM', '07:15 PM'],
    },
  },
  {
    id: 'doc-5',
    name: 'Dr. Priya Nair (Placeholder)',
    qualifications: 'MS (Ophthalmology), Cataract & Cornea Surgeon',
    specialty: 'Eye Care',
    branch: 'City Clinic — Gurgaon Sec 44',
    experience: '15 yrs',
    languages: 'English, Hindi, Malayalam',
    fee: '₹950',
    nextAvailable: 'Tomorrow 10:30 AM',
    avatar: IMG_DOCTOR_AVATAR_2,
    slots: {
      morning: ['10:30 AM', '11:15 AM', '11:45 AM'],
      afternoon: ['02:15 PM', '03:30 PM'],
      evening: ['05:00 PM', '06:00 PM'],
    },
  },
  {
    id: 'doc-6',
    name: 'Dr. Kabir Malhotra (Placeholder)',
    qualifications: 'MD (Internal Medicine), Senior General Physician',
    specialty: 'General Physician',
    branch: 'West Wing — Indiranagar',
    experience: '18 yrs',
    languages: 'English, Hindi, Punjabi',
    fee: '₹800',
    nextAvailable: 'Today 5:00 PM',
    avatar: IMG_DOCTOR_AVATAR_3,
    slots: {
      morning: ['09:15 AM', '10:15 AM', '11:30 AM'],
      afternoon: ['01:45 PM', '03:15 PM'],
      evening: ['05:00 PM', '06:15 PM', '07:00 PM'],
    },
  },
];

/* Section 5: Services — The Prescription Pad (9 Prescribed Items) */
export interface PrescriptionServiceItem {
  id: string;
  rxNumber: string;
  title: string;
  shortSummary: string;
  dosage: string;
  description: string;
  bullets: [string, string, string];
}

const PRESCRIPTION_SERVICES: PrescriptionServiceItem[] = [
  {
    id: 'rx-1',
    rxNumber: '01',
    title: 'Hospital & Clinic Websites',
    shortSummary: 'Fast, accessible, trust-first websites',
    dosage: 'One-time build',
    description:
      'We design and build calm, patient-friendly websites with clear department navigation, specialist credentials, insurance panels and sub-2-second mobile load times.',
    bullets: [
      'Structured department, treatment and doctor profile architecture',
      'Senior-friendly typography (17px+ body text) and high-contrast WCAG readability',
      '1-tap emergency phone, directions and appointment bar on mobile',
    ],
  },
  {
    id: 'rx-2',
    rxNumber: '02',
    title: 'Online Appointment Booking & Doctor Directory',
    shortSummary: 'Real-time slots, multi-branch, reminders',
    dosage: 'Always on',
    description:
      'Let patients filter doctors by specialty, branch, language or availability and confirm an appointment in under 60 seconds—integrated with your reception workflow.',
    bullets: [
      'Searchable doctor directory with qualifications, timings and consultation fees',
      'Morning / Afternoon / Evening time-slot picker with instant confirmation',
      'Automated WhatsApp and SMS reminders that reduce appointment no-shows',
    ],
  },
  {
    id: 'rx-3',
    rxNumber: '03',
    title: 'Local SEO & Google Business Profile (Multi-Location)',
    shortSummary: 'Rank on maps for every branch',
    dosage: 'Monthly',
    description:
      'Most patients search "dentist near me" or "best eye hospital in [city]". We optimize your Google Business Profiles and location pages so every branch ranks in the top map pack.',
    bullets: [
      'Dedicated branch & neighborhood pages with accurate NAP, parking and map embeds',
      'Doctor-level and department-level Google Business Profile optimization',
      'MedicalOrganization, Physician and DiagnosticLab Schema.org markup',
    ],
  },
  {
    id: 'rx-4',
    rxNumber: '04',
    title: 'Healthcare Content & SEO',
    shortSummary: 'Doctor-reviewed, E-E-A-T and AEO-friendly content',
    dosage: 'Monthly',
    description:
      'Healthcare search requires strict Experience, Expertise, Authoritativeness and Trustworthiness (E-E-A-T). We create clear symptom and treatment guides reviewed by your doctors.',
    bullets: [
      '"Medically reviewed by Dr. [Name]" author attribution and credential boxes',
      'Patient-friendly Q&A formatting built for Google search and AI answer engines',
      'Zero exaggerated cure claims—100% aligned with medical ethics and guidelines',
    ],
  },
  {
    id: 'rx-5',
    rxNumber: '05',
    title: 'Google Ads for Healthcare',
    shortSummary: 'Policy-compliant search campaigns',
    dosage: 'Monthly',
    description:
      'Capture high-intent patients actively searching for treatments, checkup packages or specialist consultations—managed carefully within Google healthcare ad policies.',
    bullets: [
      'High-intent search and call-only ads for treatments, diagnostics and OPDs',
      'Ad copy and landing pages structured to comply with healthcare advertising rules',
      'Call and booking tracking without passing personal health data to ad pixels',
    ],
  },
  {
    id: 'rx-6',
    rxNumber: '06',
    title: 'WhatsApp AI Assistant',
    shortSummary: 'Answers FAQs, books appointments, shares timings 24/7',
    dosage: 'Always on',
    description:
      'A polite, non-diagnostic reception assistant on WhatsApp and web that shares OPD timings, location pins, test preparation notes and books slots round the clock.',
    bullets: [
      'Answers routine queries (OPD hours, insurance accepted, fasting instructions)',
      'Books, reschedules or cancels appointments and alerts your front desk',
      'Strict safety guardrails: never gives medical diagnosis; escalates urgent queries to staff',
    ],
  },
  {
    id: 'rx-7',
    rxNumber: '07',
    title: 'Patient Portal & Reports',
    shortSummary: 'Secure report downloads and telemedicine integration',
    dosage: 'As needed',
    description:
      'Give patients a secure, OTP-verified portal to download diagnostic lab PDFs, view prescription summaries or join scheduled video consultations.',
    bullets: [
      'OTP-verified lab report and discharge summary download portal',
      'Seamless video consultation links for follow-ups and out-of-town patients',
      'API bridges to connect with your existing HIS,HMS or LIMS software',
    ],
  },
  {
    id: 'rx-8',
    rxNumber: '08',
    title: 'Reviews & Reputation Management',
    shortSummary: 'Genuine review collection and response workflows',
    dosage: 'Ongoing',
    description:
      'Build authentic patient trust on Google Maps and healthcare directories with gentle post-visit feedback requests and professional, privacy-safe responses.',
    bullets: [
      'Automated post-visit WhatsApp/SMS feedback check-in with patients',
      'Private escalation path for service complaints before they become public issues',
      'HIPAA/DPDP-mindful response templates that never disclose patient details',
    ],
  },
  {
    id: 'rx-9',
    rxNumber: '09',
    title: 'Multilingual Websites',
    shortSummary: 'English, Hindi and regional languages',
    dosage: 'One-time setup',
    description:
      'Help patients and family members read treatment details and book appointments in the language they are most comfortable with.',
    bullets: [
      'Instant language toggle for English, Hindi and regional Indian languages',
      'Translated doctor profiles, preparation checklists and booking forms',
      'Multilingual local SEO (`hreflang`) to capture regional patient searches',
    ],
  },
];

/* Section 6: Privacy, Safety & Compliance — Vitals Monitor (6 Readout Tiles) */
export interface VitalsTileItem {
  id: string;
  label: string;
  readout: string;
  unitCode: string;
  explanation: string;
  wavePath: string;
}

const VITALS_MONITOR_TILES: VitalsTileItem[] = [
  {
    id: 'vit-1',
    label: 'SSL / HTTPS',
    readout: 'SECURE',
    unitCode: 'TLS 1.3 · 256-BIT',
    explanation: 'Encrypted connections on every page',
    wavePath:
      'M 0 18 L 28 18 L 36 6 L 44 28 L 52 12 L 60 18 L 110 18 L 118 8 L 126 26 L 134 18 L 180 18',
  },
  {
    id: 'vit-2',
    label: 'CONSENT',
    readout: 'ON',
    unitCode: 'EXPLICIT OPT-IN',
    explanation: 'Clear consent on every form, privacy-first design',
    wavePath:
      'M 0 18 L 40 18 L 48 8 L 56 26 L 64 18 L 120 18 L 128 7 L 136 27 L 144 18 L 180 18',
  },
  {
    id: 'vit-3',
    label: 'DATA MINIMUM',
    readout: "ONLY WHAT'S NEEDED",
    unitCode: 'ZERO PHI LOGS',
    explanation:
      'We collect the minimum patient data; no sensitive data in chatbot logs',
    wavePath:
      'M 0 18 L 22 18 L 30 9 L 38 25 L 46 18 L 95 18 L 103 9 L 111 25 L 119 18 L 180 18',
  },
  {
    id: 'vit-4',
    label: 'ACCESS',
    readout: 'ROLE-BASED',
    unitCode: 'RBAC · AUDITABLE',
    explanation: 'Only the right staff see the right data',
    wavePath:
      'M 0 18 L 34 18 L 42 6 L 50 28 L 58 18 L 112 18 L 120 6 L 128 28 L 136 18 L 180 18',
  },
  {
    id: 'vit-5',
    label: 'REGULATIONS',
    readout: 'DPDP-AWARE · HIPAA-AWARE',
    unitCode: 'INDIA & US READY',
    explanation:
      "Built with India's DPDP Act in mind, and HIPAA-aware setups for US clients using compliant vendors",
    wavePath:
      'M 0 18 L 25 18 L 33 7 L 41 27 L 49 14 L 57 18 L 115 18 L 123 7 L 131 27 L 139 18 L 180 18',
  },
  {
    id: 'vit-6',
    label: 'CONTENT',
    readout: 'GUIDELINE-SAFE',
    unitCode: 'E-E-A-T VERIFIED',
    explanation:
      'Content written to respect medical advertising guidelines (no cure claims or misleading testimonials)',
    wavePath:
      'M 0 18 L 38 18 L 46 8 L 54 26 L 62 18 L 108 18 L 116 8 L 124 26 L 132 18 L 180 18',
  },
];

/* Section 7: Accessibility Demo Copy (English & Hindi) */
const ACCESSIBILITY_DEMO_CONTENT = {
  en: {
    badge: 'SENIOR-FRIENDLY PATIENT VIEW',
    clinicName: 'Prana Heart & Eye Care Center (Placeholder)',
    department: 'Department of Ophthalmology & Preventive Cardiology',
    timingsLabel: 'OPD Timings:',
    timingsValue: 'Mon – Sat · 8:30 AM to 7:30 PM (Wheelchair Accessible)',
    bodyText:
      'Clear directions, large readable fonts and simple 2-step appointment booking—designed so patients of every age can book without needing help.',
    ctaButton: 'Book Appointment →',
    callButton: 'Call Reception: 1800-000-CARE',
  },
  hi: {
    badge: 'वरिष्ठ नागरिकों के लिए सरल डिज़ाइन',
    clinicName: 'प्राण हार्ट एंड आई केयर सेंटर (उदाहरण)',
    department: 'नेत्र रोग एवं हृदय देखभाल विभाग',
    timingsLabel: 'ओपीडी समय:',
    timingsValue: 'सोमवार – शनिवार · सुबह 8:30 से शाम 7:30 बजे (व्हीलचेयर सुविधा)',
    bodyText:
      'स्पष्ट जानकारी, बड़े अक्षर और केवल 2 आसान चरणों में अपॉइंटमेंट बुकिंग — ताकि हर उम्र के मरीज़ बिना किसी परेशानी के डॉक्टर से समय ले सकें।',
    ctaButton: 'अपॉइंटमेंट बुक करें →',
    callButton: 'रिसेप्शन कॉल: 1800-000-CARE',
  },
};

/* Section 8: Case Study — The Patient Chart */
const PATIENT_CHART_CASE_STUDY = {
  clinicName: 'Arogya Multi-Specialty & Eye Institute (Placeholder)',
  specialty: 'Ophthalmology, Orthopedics & Diagnostics',
  locations: '3 Branches (NCR)',
  duration: '5 Months',
  vitalsRows: [
    {
      metric: 'Online appointments / month',
      before: '120',
      after: '410',
      delta: '+241%',
    },
    {
      metric: 'No-show rate',
      before: '28%',
      after: '11%',
      delta: '−17 pts',
    },
    {
      metric: 'Google Maps calls / month',
      before: '90',
      after: '260',
      delta: '2.9x',
    },
    {
      metric: 'Page load time',
      before: '5.2s',
      after: '1.4s',
      delta: '3.7x faster',
    },
  ],
  doctorsNote:
    'Earlier, elderly patients struggled to find our doctors’ timings on mobile and nearly 3 in 10 booked slots were no-shows. WebXCode redesigned our website with a 60-second booking flow and WhatsApp reminders—online appointments more than tripled across all 3 branches.',
  doctorAuthor: 'Dr. S. K. Deshmukh — Medical Director (Placeholder)',
  treatmentPlan: [
    'New website',
    'Online booking',
    'Local SEO for 3 branches',
    'WhatsApp reminders',
    'Review workflow',
  ],
};

/* Section 9: Healthcare FAQ (6 Questions) */
const HEALTHCARE_FAQS = [
  {
    id: 'hfaq-1',
    question: 'Can patients book appointments directly on our website?',
    answer:
      'Yes. We build intuitive, mobile-first doctor directories and appointment booking flows where patients can filter by specialty, branch, language or date, pick a morning/afternoon/evening slot, and receive instant confirmation along with automated WhatsApp and SMS reminders to reduce no-shows.',
  },
  {
    id: 'hfaq-2',
    question: 'Can you integrate with our existing hospital or clinic software?',
    answer:
      'Yes. We can integrate your website’s doctor directory, slot availability and lead forms with popular Hospital Information Systems (HIS), clinic management platforms (such as Practo Ray, MocDoc, HealthPlix, KareXpert or custom REST APIs), CRM tools and WhatsApp Business APIs.',
  },
  {
    id: 'hfaq-3',
    question: 'How do you keep patient data private and secure?',
    answer:
      'We follow a strict data-minimization and privacy-first architecture: TLS/HTTPS encryption across every page, explicit consent checkboxes on forms, role-based access, and zero storage of sensitive medical histories inside marketing pixels or public chatbot logs. We build with India’s DPDP Act in mind and configure HIPAA-aware architectures using BAA-ready cloud vendors for US healthcare providers.',
  },
  {
    id: 'hfaq-4',
    question: 'Can you run Google Ads for our clinic? Are there restrictions?',
    answer:
      'Yes, we manage high-intent Google Search and Local campaigns for hospitals, clinics and diagnostic centers. Healthcare advertising on Google has strict policies—certain procedures, prescription references and jurisdictions require certification, and personalized remarketing is restricted for sensitive health conditions. We structure both your ad copy and landing pages to remain policy-compliant.',
  },
  {
    id: 'hfaq-5',
    question: 'Who writes and reviews medical content on our website?',
    answer:
      'Our healthcare content team researches and drafts patient-friendly, E-E-A-T structured symptom, procedure and department pages. Because medical accuracy is paramount, every clinical article or treatment page goes through your qualified doctors for review and sign-off before publication, and displays a clear "Medically reviewed by Dr. [Name]" credential block.',
  },
  {
    id: 'hfaq-6',
    question: 'Can you manage websites and maps for multiple branches?',
    answer:
      'Absolutely. We build multi-branch hospital and clinic architectures where each location has its own dedicated SEO landing page (with local doctors, OPD hours, parking directions and embedded maps) paired with synchronized Google Business Profile management so you rank in "near me" searches across every neighborhood you serve.',
  },
];

/* Section 10: Lab Test Request Form Checkboxes & Branch Chips */
const HEALTH_CHECK_BRANCH_OPTIONS = ['1', '2–5', '6+'];

const HEALTH_CHECK_TESTS = [
  { id: 'test-speed', code: 'PANEL 01', label: 'Speed Test' },
  { id: 'test-booking', code: 'PANEL 02', label: 'Booking Flow Test' },
  { id: 'test-seo', code: 'PANEL 03', label: 'Local SEO Scan' },
  { id: 'test-trust', code: 'PANEL 04', label: 'Trust & Reviews Check' },
  {
    id: 'test-a11y',
    code: 'PANEL 05',
    label: 'Mobile & Accessibility Check',
  },
];

/* Helper Icon Renderer for Wayfinding Signage */
const WayfindingIcon: React.FC<{
  name: WayfindingSegment['iconName'];
  className?: string;
}> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'hospital':
      return <Building2 className={className} />;
    case 'dental':
      return <Sparkles className={className} />;
    case 'skin':
      return <Star className={className} />;
    case 'eye':
      return <Eye className={className} />;
    case 'ivf':
      return <HeartPulse className={className} />;
    case 'physio':
      return <Activity className={className} />;
    case 'lab':
      return <Microscope className={className} />;
    case 'pediatric':
      return <Baby className={className} />;
    case 'healthtech':
      return <Smartphone className={className} />;
    default:
      return <Stethoscope className={className} />;
  }
};

/* ============================================================================
   MAIN HEALTHCARE INDUSTRY PAGE COMPONENT
============================================================================ */
const Healthcare: React.FC<{
  onOpenQuoteModal?: (service?: string) => void;
}> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = (service?: string) => {
    if (propOpenQuoteModal) propOpenQuoteModal(service);
    else quoteModalCtx.openQuoteModal(service);
  };
  const prefersReducedMotion = useReducedMotion();

  /* Section 1: Hero Auto-Looping Appointment Card State */
  const [heroActiveSlotIdx, setHeroActiveSlotIdx] = useState<number>(2); // 04:30 PM
  const [heroIsBooked, setHeroIsBooked] = useState<boolean>(false);

  /* Section 2: Hospital Wayfinding Signage Active Segment */
  const [activeWayfindingId, setActiveWayfindingId] =
    useState<string>('wf-hospitals');

  /* Section 4: Interactive Doctor Directory & Booking Demo State */
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<string>('All Specialties');
  const [selectedLocation, setSelectedLocation] =
    useState<string>('All Branches');
  const [selectedDateId, setSelectedDateId] = useState<string>('d-today');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('doc-1');
  const [selectedSlot, setSelectedSlot] = useState<string>('05:30 PM');
  const [demoPatientName, setDemoPatientName] = useState<string>('');
  const [demoPatientPhone, setDemoPatientPhone] = useState<string>('');
  const [demoBookingError, setDemoBookingError] = useState<string>('');
  const [demoBookingConfirmed, setDemoBookingConfirmed] =
    useState<boolean>(false);
  const [demoActionNotice, setDemoActionNotice] = useState<string>('');
  const slotHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const confirmBoxRef = useRef<HTMLDivElement | null>(null);

  /* Section 5: Prescription Pad Expanded Service Row */
  const [expandedRxId, setExpandedRxId] = useState<string>('rx-1');

  /* Section 7: Accessibility Demo Toggles */
  const [a11yLargeText, setA11yLargeText] = useState<boolean>(false);
  const [a11yHighContrast, setA11yHighContrast] = useState<boolean>(false);
  const [a11yHindi, setA11yHindi] = useState<boolean>(false);

  /* Section 9: FAQ Accordion State */
  const [openFaqId, setOpenFaqId] = useState<string>('hfaq-1');

  /* Section 10: Free Website Health Check — Lab Test Request Form State */
  const [healthForm, setHealthForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    websiteUrl: '',
    branches: '1',
    selectedTests: HEALTH_CHECK_TESTS.map((t) => t.id),
  });
  const [healthErrors, setHealthErrors] = useState<{
    name?: string;
    organization?: string;
    email?: string;
    phone?: string;
    websiteUrl?: string;
  }>({});
  const [healthSubmitting, setHealthSubmitting] = useState<boolean>(false);
  const [healthSubmitted, setHealthSubmitted] = useState<boolean>(false);

  /* SEO Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Healthcare Website Development, Online Booking & Local SEO for Hospitals and Clinics | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'We build calm, accessible, patient-first websites, online doctor appointment booking systems, multi-location Local SEO and WhatsApp AI assistants for hospitals, clinics and diagnostic labs.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 1: Hero Appointment Slot Selection → "Booked ✓" Loop */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const cycleTimer = setInterval(() => {
      setHeroIsBooked((prevBooked) => {
        if (!prevBooked) {
          return true;
        } else {
          setHeroActiveSlotIdx((prevIdx) => (prevIdx + 1) % HERO_TIME_SLOTS.length);
          return false;
        }
      });
    }, 2400);
    return () => clearInterval(cycleTimer);
  }, [prefersReducedMotion]);

  /* Section 2: Active Wayfinding Segment Object */
  const activeWayfinding =
    WAYFINDING_SEGMENTS.find((s) => s.id === activeWayfindingId) ||
    WAYFINDING_SEGMENTS[0];

  /* Section 4: Filtered Doctors & Active Doctor Selection */
  const filteredDoctors = DEMO_DOCTORS.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === 'All Specialties' ||
      doc.specialty === selectedSpecialty;
    const matchesLocation =
      selectedLocation === 'All Branches' || doc.branch === selectedLocation;
    return matchesSpecialty && matchesLocation;
  });

  const activeDoctor =
    filteredDoctors.find((d) => d.id === selectedDoctorId) ||
    filteredDoctors[0] ||
    DEMO_DOCTORS[0];

  const activeDateObj =
    DEMO_DATES.find((d) => d.id === selectedDateId) || DEMO_DATES[0];

  const handleSelectDoctor = (doc: DemoDoctor) => {
    setSelectedDoctorId(doc.id);
    setSelectedSlot(doc.slots.evening[0] || doc.slots.morning[0] || '10:00 AM');
    setDemoBookingConfirmed(false);
    setDemoBookingError('');
    setDemoActionNotice('');
  };

  const handleConfirmDemoBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoPatientName.trim()) {
      setDemoBookingError('Please enter a patient name to test the demo.');
      return;
    }
    if (!demoPatientPhone.trim() || demoPatientPhone.trim().length < 7) {
      setDemoBookingError('Please enter a valid phone number.');
      return;
    }
    setDemoBookingError('');
    setDemoBookingConfirmed(true);
    setTimeout(() => {
      confirmBoxRef.current?.focus();
    }, 60);
  };

  /* Section 10: Toggle Lab Test Checkbox */
  const toggleHealthCheckTest = (testId: string) => {
    setHealthForm((prev) => {
      const exists = prev.selectedTests.includes(testId);
      return {
        ...prev,
        selectedTests: exists
          ? prev.selectedTests.filter((id) => id !== testId)
          : [...prev.selectedTests, testId],
      };
    });
  };

  /* Section 10: Submit Handler for Website Health Check */
  const handleHealthCheckSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      name?: string;
      organization?: string;
      email?: string;
      phone?: string;
      websiteUrl?: string;
    } = {};

    if (!healthForm.name.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!healthForm.organization.trim()) {
      errors.organization = 'Please enter your hospital or clinic name.';
    }
    if (
      !healthForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(healthForm.email.trim())
    ) {
      errors.email = 'Please enter a valid work email.';
    }
    if (!healthForm.phone.trim() || healthForm.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone / WhatsApp number.';
    }
    if (!healthForm.websiteUrl.trim()) {
      errors.websiteUrl = 'Please enter your website URL (or "New Clinic").';
    }

    setHealthErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setHealthSubmitting(true);
    // TODO: Connect Free Website Health Check request form to backend CRM / email service
    setTimeout(() => {
      setHealthSubmitting(false);
      setHealthSubmitted(true);
    }, 600);
  };

  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'healthcare'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Healthcare Website Development, Online Booking & Local SEO',
      serviceType:
        'Hospital & Clinic Website Development, Online Doctor Appointment Booking, Multi-Location Local SEO, Healthcare Content & WhatsApp AI Assistant',
      audience: {
        '@type': 'Audience',
        audienceType: 'hospitals, clinics and healthcare providers',
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
          name: healthcareIndustry.name,
          item: 'https://webxcode.com/industries/healthcare',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: HEALTHCARE_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  const a11ySnippet = a11yHindi
    ? ACCESSIBILITY_DEMO_CONTENT.hi
    : ACCESSIBILITY_DEMO_CONTENT.en;

  return (
    <main className="bg-white text-navy overflow-x-hidden">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Scoped Calm Clinical Precision Animations (Strictly #0571c2, #1e242e, #ffffff) */}
      <style>{`
        @keyframes ecgDrawLine {
          0% { stroke-dashoffset: 1600; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes calmNodeBeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes vitalsTrace {
          0% { stroke-dashoffset: 240; }
          100% { stroke-dashoffset: 0; }
        }
        .ecg-hero-path {
          stroke-dasharray: 1600;
          stroke-dashoffset: 0;
          animation: ecgDrawLine 2.8s ease-out forwards;
        }
        .journey-node-pulse {
          animation: calmNodeBeat 3.2s ease-in-out infinite;
        }
        .vitals-wave-trace {
          stroke-dasharray: 240;
          animation: vitalsTrace 4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ecg-hero-path,
          .journey-node-pulse,
          .vitals-wave-trace {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — PULSE TO BOOKING (navy, 55/45 split + bottom ECG pulse line)
      ==================================================================== */}
      <section className="relative bg-navy text-white pt-12 pb-28 lg:pt-16 lg:pb-36 overflow-hidden border-b border-white/10">
        {/* Faint Dotted Grid & Soft Blue Glow */}
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -right-24 top-12 w-[580px] h-[580px] blue-glow-strong pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 bottom-8 w-[440px] h-[440px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 55% (7 cols) */}
            <div className="lg:col-span-7">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="inline-flex flex-wrap items-center gap-2 text-[14px] font-semibold text-white/75 mb-6"
              >
                <Link
                  href="/"
                  className="hover:text-white transition-colors py-1"
                >
                  Home
                </Link>
                <ChevronRight className="w-4 h-4 text-primary" />
                <Link
                  href="/industries"
                  className="hover:text-white transition-colors py-1"
                >
                  Industries
                </Link>
                <ChevronRight className="w-4 h-4 text-primary" />
                <span className="text-white font-bold" aria-current="page">
                  {healthcareIndustry.name}
                </span>
              </nav>

              {/* Section Pill Label */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  <span>HEALTHCARE</span>
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight mb-5">
                Make It Easy for Patients to{' '}
                <span className="text-primary">
                  Find, Trust and Book You
                </span>
              </h1>

              {/* Accessible 17px+ Body Paragraph */}
              <p className="text-[17px] sm:text-[19px] text-white/75 leading-relaxed mb-8 max-w-2xl">
                We build websites, online booking systems, local SEO and AI
                assistants for hospitals and clinics — so more patients find
                you, book with confidence and actually show up.
              </p>

              {/* CTA Buttons (44px+ Tap Targets) */}
              <div className="flex flex-wrap items-center gap-4 mb-9">
                <a
                  href="#health-check"
                  className="min-h-[48px] px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[16px] shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Get a Free Website Health Check</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#booking-demo"
                  className="min-h-[48px] px-7 py-4 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-extrabold text-[16px] transition-all inline-flex items-center gap-2"
                >
                  <span>Try the Booking Demo</span>
                </a>
              </div>

              {/* Small Trust Row */}
              <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-3 text-[15px] font-semibold text-white/70">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Hospitals</span>
                </span>
                <span className="text-white/30">·</span>
                <span>Clinics</span>
                <span className="text-white/30">·</span>
                <span>Diagnostic labs</span>
                <span className="text-white/30">·</span>
                <span>Health-tech</span>
              </div>
            </div>

            {/* Right 45% (5 cols): Appointment Card Composition + Floating Glass Chips */}
            <div className="lg:col-span-5 relative">
              {/* Floating Glass Chip 1 — Top Left */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-navy/90 border border-primary/50 text-white text-[12px] font-bold shadow-xl backdrop-blur-md mb-3 lg:absolute lg:-top-5 lg:-left-6 z-20">
                <Bell className="w-3.5 h-3.5 text-primary" />
                <span>WhatsApp reminder sent</span>
              </div>

              {/* Floating Glass Chip 2 — Top Right */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-navy/90 border border-white/25 text-white text-[12px] font-bold shadow-xl backdrop-blur-md mb-3 ml-2 lg:ml-0 lg:absolute lg:top-8 lg:-right-4 z-20">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Near you · 1.2 km</span>
              </div>

              {/* White Rounded "Book Appointment" Card */}
              <div className="rounded-[24px] bg-white text-navy p-6 sm:p-7 shadow-2xl border-2 border-primary/30 relative z-10">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-08">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    INSTANT PATIENT BOOKING
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold">
                    Under 60s
                  </span>
                </div>

                {/* Doctor Avatar, Name, Specialty & Blue Stars */}
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={IMG_DOCTOR_AVATAR_2}
                    alt="Dr. Ananya Sharma, Senior Dermatologist"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary shrink-0"
                  />
                  <div>
                    <div className="text-[19px] font-extrabold text-navy leading-snug">
                      Dr. Ananya Sharma
                    </div>
                    <div className="text-[14px] font-bold text-primary">
                      Dermatologist · MD (Placeholder)
                    </div>
                    <div
                      aria-label="Rated 4.9 out of 5 stars"
                      className="flex items-center gap-1 mt-1"
                    >
                      {[0, 1, 2, 3, 4].map((starIdx) => (
                        <Star
                          key={starIdx}
                          className="w-3.5 h-3.5 text-primary fill-primary"
                        />
                      ))}
                      <span className="text-[12px] font-extrabold text-navy ml-1">
                        4.9 (320+ patient reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row of 4 Date Chips */}
                <div className="mb-4">
                  <span className="block text-[11px] font-mono font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                    SELECT DATE
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {HERO_DATE_CHIPS.map((d, idx) => {
                      const active = idx === 0;
                      return (
                        <div
                          key={d.id}
                          className={`py-2 px-2 rounded-xl text-center border text-[12px] font-extrabold ${
                            active
                              ? 'bg-primary-50 border-primary text-primary'
                              : 'bg-white border-navy-15 text-navy'
                          }`}
                        >
                          <div className="text-[11px] opacity-80">{d.day}</div>
                          <div>{d.date}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Row of 4 Time-Slot Chips */}
                <div className="mb-5">
                  <span className="block text-[11px] font-mono font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                    AVAILABLE SLOTS
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {HERO_TIME_SLOTS.map((slot, idx) => {
                      const isSelected = heroActiveSlotIdx === idx;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setHeroActiveSlotIdx(idx);
                            setHeroIsBooked(true);
                          }}
                          className={`min-h-[44px] py-2 px-2 rounded-xl font-mono text-[12px] font-extrabold border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-navy border-navy-15 hover:border-primary'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Auto-Looping Confirm / Booked ✓ Button */}
                <a
                  href="#booking-demo"
                  className={`min-h-[48px] w-full py-3.5 px-5 rounded-full font-extrabold text-[15px] transition-all flex items-center justify-center gap-2 shadow-md ${
                    heroIsBooked
                      ? 'bg-navy text-white border-2 border-primary'
                      : 'bg-primary hover:bg-primary-dark text-white'
                  }`}
                >
                  {heroIsBooked ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>
                        Booked ✓ · Today at {HERO_TIME_SLOTS[heroActiveSlotIdx]}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        Book {HERO_TIME_SLOTS[heroActiveSlotIdx]} Slot
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </a>
              </div>

              {/* Floating Glass Chip 3 — Bottom Right */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-navy/90 border border-primary/50 text-white text-[12px] font-bold shadow-xl backdrop-blur-md mt-3 lg:mt-0 lg:absolute lg:-bottom-4 lg:right-6 z-20">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                <span>24/7 AI assistant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Glowing Blue ECG / Pulse Line Near Bottom of Hero Ending in Check-Circle */}
        <div
          aria-hidden="true"
          className="absolute bottom-3 left-0 right-0 px-4 sm:px-8 pointer-events-none"
        >
          <div className="max-w-[1360px] mx-auto flex items-center gap-2">
            <svg
              viewBox="0 0 1200 64"
              className="w-full h-12 sm:h-14 overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Soft Glow Duplicate Path */}
              <path
                d="M 0 36 L 180 36 L 205 24 L 220 36 L 245 36 L 260 46 L 278 8 L 296 56 L 314 26 L 332 36 L 560 36 L 585 24 L 600 36 L 625 36 L 640 46 L 658 8 L 676 56 L 694 26 L 712 36 L 940 36 L 965 24 L 980 36 L 1005 36 L 1020 46 L 1038 6 L 1058 56 L 1076 24 L 1096 36 L 1195 36"
                fill="none"
                stroke="#0571c2"
                strokeWidth="6"
                strokeOpacity="0.28"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Crisp Animated ECG Line */}
              <path
                d="M 0 36 L 180 36 L 205 24 L 220 36 L 245 36 L 260 46 L 278 8 L 296 56 L 314 26 L 332 36 L 560 36 L 585 24 L 600 36 L 625 36 L 640 46 L 658 8 L 676 56 L 694 26 L 712 36 L 940 36 L 965 24 L 980 36 L 1005 36 L 1020 46 L 1038 6 L 1058 56 L 1076 24 L 1096 36 L 1195 36"
                fill="none"
                stroke="#0571c2"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ecg-hero-path"
              />
            </svg>
            {/* Right End: Last Beat Smoothly Turns Into a Check-Circle Icon */}
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(5,113,194,0.8)] border-2 border-white">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHO WE SERVE — HOSPITAL WAYFINDING SIGNAGE (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHO WE WORK WITH
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight mb-3">
              Built for <span className="text-primary">Every Kind of Care</span>
            </h2>
            <p className="text-[17px] text-navy-70 leading-relaxed">
              Select any department on the hospital directory board below to see
              how we tailor patient journeys for your specialty.
            </p>
          </div>

          {/* Hospital Wayfinding Signage Board + Adjacent Detail Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left (7 cols): Tall Navy Wayfinding Sign Board with Stacked Direction Strips */}
            <div className="lg:col-span-7 rounded-[24px] bg-navy text-white p-4 sm:p-6 border-2 border-navy shadow-2xl">
              {/* Sign Board Top Header Strip */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15 px-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-primary" />
                  <span className="font-mono text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">
                    MAIN DIRECTORY · SPECIALTIES &amp; CARE WINGS
                  </span>
                </div>
                <span className="font-mono text-[11px] font-bold text-primary">
                  TAP / HOVER WING
                </span>
              </div>

              {/* 9 Stacked Horizontal Direction Strips */}
              <div className="space-y-2">
                {WAYFINDING_SEGMENTS.map((seg) => {
                  const isActive = activeWayfindingId === seg.id;
                  return (
                    <div key={seg.id}>
                      <button
                        type="button"
                        aria-expanded={isActive}
                        onClick={() => setActiveWayfindingId(seg.id)}
                        onMouseEnter={() => setActiveWayfindingId(seg.id)}
                        onFocus={() => setActiveWayfindingId(seg.id)}
                        className={`w-full min-h-[54px] px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-left cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white ${
                          isActive
                            ? 'bg-primary text-white border-primary shadow-lg'
                            : 'bg-white/6 hover:bg-white/12 text-white border-white/12'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Alternating Left Arrow if arrowDir === 'left' */}
                          {seg.arrowDir === 'left' && (
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                                isActive
                                  ? 'bg-white text-primary -translate-x-1'
                                  : 'bg-white/10 text-primary'
                              }`}
                            >
                              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                            </span>
                          )}

                          {/* Wing Level Badge */}
                          <span
                            className={`font-mono text-[12px] font-extrabold px-2.5 py-1 rounded-md shrink-0 ${
                              isActive
                                ? 'bg-navy text-white'
                                : 'bg-primary/25 text-primary'
                            }`}
                          >
                            {seg.floorLabel}
                          </span>

                          {/* Segment Icon */}
                          <WayfindingIcon
                            name={seg.iconName}
                            className={`w-5 h-5 shrink-0 ${
                              isActive ? 'text-white' : 'text-primary'
                            }`}
                          />

                          {/* Segment Name */}
                          <span className="text-[16px] sm:text-[17px] font-extrabold truncate">
                            {seg.name}
                          </span>
                        </div>

                        {/* Right Side Wing Code + Right Arrow if arrowDir === 'right' */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`hidden sm:inline font-mono text-[11px] font-bold uppercase tracking-wider ${
                              isActive ? 'text-white/90' : 'text-white/55'
                            }`}
                          >
                            {seg.wingCode}
                          </span>
                          {seg.arrowDir === 'right' && (
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform ${
                                isActive
                                  ? 'bg-white text-primary translate-x-1'
                                  : 'bg-white/10 text-primary'
                              }`}
                            >
                              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Mobile Inline Panel Below Tapped Strip */}
                      {isActive && (
                        <div className="lg:hidden mt-2 mb-3 p-4 rounded-xl bg-white text-navy border-2 border-primary">
                          <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1">
                            {seg.wingCode}
                          </div>
                          <p className="text-[16px] text-navy leading-relaxed mb-3">
                            {seg.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {seg.solutionChips.map((chip) => (
                              <span
                                key={chip}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 text-primary text-[13px] font-extrabold"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>{chip}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right (5 cols, Desktop): Active Wing Detail Panel Beside the Sign */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-[24px] bg-primary-50/55 border-2 border-primary/30 p-8 shadow-soft">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-navy-15">
                  <span className="font-mono text-[12px] font-extrabold uppercase tracking-widest text-primary">
                    {activeWayfinding.wingCode}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[12px] font-extrabold">
                    WING {activeWayfinding.floorLabel}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-5 shadow-md">
                  <WayfindingIcon
                    name={activeWayfinding.iconName}
                    className="w-7 h-7"
                  />
                </div>

                <h3 className="text-[26px] font-extrabold text-navy leading-snug mb-3">
                  {activeWayfinding.name}
                </h3>

                <p className="text-[17px] text-navy-70 leading-relaxed mb-6">
                  {activeWayfinding.description}
                </p>

                <div className="mb-7">
                  <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-2.5">
                    KEY DIGITAL SOLUTIONS:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {activeWayfinding.solutionChips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary/35 text-navy text-[14px] font-extrabold shadow-2xs"
                      >
                        <Check className="w-4 h-4 text-primary" />
                        <span>{chip}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenQuoteModal(`${activeWayfinding.name} Website & SEO`)
                  }
                  className="min-h-[48px] w-full py-3.5 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Discuss {activeWayfinding.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. THE PATIENT JOURNEY — PULSE LINE (light blue tint, 8 Steps)
      ==================================================================== */}
      <section className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              PATIENT JOURNEY
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Every Step of the Patient Journey,{' '}
              <span className="text-primary">Made Simple</span>
            </h2>
          </div>

          {/* Desktop Horizontal ECG Pulse Line with Alternating Above / Below Step Cards */}
          <div className="hidden lg:block relative">
            {/* Horizontal ECG Pulse SVG Across the Middle */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
            >
              <svg
                viewBox="0 0 1200 80"
                className="w-full h-20"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 40 L 60 40 L 75 14 L 90 64 L 105 40 L 210 40 L 225 14 L 240 64 L 255 40 L 360 40 L 375 14 L 390 64 L 405 40 L 510 40 L 525 14 L 540 64 L 555 40 L 660 40 L 675 14 L 690 64 L 705 40 L 810 40 L 825 14 L 840 64 L 855 40 L 960 40 L 975 14 L 990 64 L 1005 40 L 1110 40 L 1125 14 L 1140 64 L 1155 40 L 1200 40"
                  fill="none"
                  stroke="#0571c2"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="grid grid-cols-8 gap-3 relative z-10">
              {PATIENT_JOURNEY_STEPS.map((step) => {
                const isAbove = step.position === 'above';
                return (
                  <div
                    key={step.stepNumber}
                    className="flex flex-col items-center"
                  >
                    {/* Top Slot (Card if above, Spacer if below) */}
                    <div className="h-[195px] w-full flex flex-col justify-end pb-5">
                      {isAbove && (
                        <div className="rounded-[20px] bg-white border-2 border-primary/25 hover:border-primary p-4 shadow-soft transition-all">
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary block mb-1">
                            {step.tag}
                          </span>
                          <h3 className="text-[16px] font-extrabold text-navy leading-snug mb-1.5">
                            {step.title}
                          </h3>
                          <p className="text-[14px] text-navy-70 leading-snug">
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center Circular Blue Node on the Pulse Line */}
                    <div className="journey-node-pulse w-11 h-11 rounded-full bg-primary text-white font-mono text-[13px] font-extrabold flex items-center justify-center border-4 border-white shadow-lg shrink-0">
                      {step.stepNumber}
                    </div>

                    {/* Bottom Slot (Card if below, Spacer if above) */}
                    <div className="h-[195px] w-full flex flex-col justify-start pt-5">
                      {!isAbove && (
                        <div className="rounded-[20px] bg-white border-2 border-primary/25 hover:border-primary p-4 shadow-soft transition-all">
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary block mb-1">
                            {step.tag}
                          </span>
                          <h3 className="text-[16px] font-extrabold text-navy leading-snug mb-1.5">
                            {step.title}
                          </h3>
                          <p className="text-[14px] text-navy-70 leading-snug">
                            {step.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile / Tablet Vertical Pulse Line with Nodes on the Left */}
          <div className="lg:hidden relative pl-6 border-l-4 border-primary space-y-5">
            {PATIENT_JOURNEY_STEPS.map((step) => (
              <div key={step.stepNumber} className="relative">
                <div className="absolute -left-[42px] top-4 w-9 h-9 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center border-4 border-white shadow-md">
                  {step.stepNumber}
                </div>
                <div className="rounded-[20px] bg-white border border-primary/25 p-5 shadow-soft">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block mb-1">
                    STEP {step.stepNumber} · {step.tag}
                  </span>
                  <h3 className="text-[18px] font-extrabold text-navy mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[17px] text-navy-70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. FIND A DOCTOR & BOOK — INTERACTIVE DEMO (white, #booking-demo)
      ==================================================================== */}
      <section
        id="booking-demo"
        className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TRY IT
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight mb-3">
              Booking That Takes{' '}
              <span className="text-primary">Under a Minute</span>
            </h2>
            <p className="text-[17px] text-navy-70 leading-relaxed">
              This is the kind of doctor directory and booking flow we build.
              Try it.
            </p>
          </div>

          {/* Large Rounded "App" Card */}
          <div className="rounded-[28px] bg-white border-2 border-navy-15 shadow-2xl overflow-hidden">
            {/* Top Filter Bar: Specialty Dropdown + Location Dropdown + 5 Date Chips */}
            <div className="p-5 sm:p-6 bg-navy text-white border-b border-white/15">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* Specialty Dropdown (3 cols) */}
                <div className="md:col-span-3">
                  <label
                    htmlFor="demo-specialty-select"
                    className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1.5"
                  >
                    1. Filter by Specialty
                  </label>
                  <div className="relative">
                    <select
                      id="demo-specialty-select"
                      value={selectedSpecialty}
                      onChange={(e) => {
                        setSelectedSpecialty(e.target.value);
                        setDemoBookingConfirmed(false);
                      }}
                      className="w-full min-h-[46px] appearance-none rounded-xl bg-white text-navy px-4 py-2.5 pr-9 text-[15px] font-bold focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      {DEMO_SPECIALTIES.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-navy absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Location Dropdown (4 cols) */}
                <div className="md:col-span-4">
                  <label
                    htmlFor="demo-location-select"
                    className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1.5"
                  >
                    2. Select Hospital Branch
                  </label>
                  <div className="relative">
                    <select
                      id="demo-location-select"
                      value={selectedLocation}
                      onChange={(e) => {
                        setSelectedLocation(e.target.value);
                        setDemoBookingConfirmed(false);
                      }}
                      className="w-full min-h-[46px] appearance-none rounded-xl bg-white text-navy px-4 py-2.5 pr-9 text-[15px] font-bold focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      {DEMO_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-navy absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Date Chips (5 cols) */}
                <div className="md:col-span-5">
                  <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1.5">
                    3. Appointment Date
                  </span>
                  <div
                    role="group"
                    aria-label="Appointment Date"
                    className="grid grid-cols-5 gap-1.5"
                  >
                    {DEMO_DATES.map((d) => {
                      const active = selectedDateId === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setSelectedDateId(d.id);
                            setDemoBookingConfirmed(false);
                          }}
                          className={`min-h-[46px] px-2 py-1.5 rounded-xl text-center transition-all cursor-pointer border ${
                            active
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                          }`}
                        >
                          <div className="text-[11px] font-extrabold leading-tight truncate">
                            {d.label}
                          </div>
                          <div className="text-[10px] opacity-80 font-mono">
                            {d.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Split Inside App Card: Left Doctor List (7 cols) + Right Time-Slot & Confirmation (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-08">
              {/* Left (7 cols): Filtered Doctor Cards */}
              <div className="lg:col-span-7 p-5 sm:p-7 bg-primary-50/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[12px] font-extrabold uppercase tracking-wider text-navy-70">
                    SHOWING {filteredDoctors.length} SPECIALIST
                    {filteredDoctors.length === 1 ? '' : 'S'}
                  </span>
                  {(selectedSpecialty !== 'All Specialties' ||
                    selectedLocation !== 'All Branches') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSpecialty('All Specialties');
                        setSelectedLocation('All Branches');
                      }}
                      className="text-[13px] font-extrabold text-primary hover:underline cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>

                {filteredDoctors.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-white border border-navy-15 text-center">
                    <p className="text-[17px] font-bold text-navy mb-3">
                      No doctors match that exact specialty + branch combination
                      in this sample.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSpecialty('All Specialties');
                        setSelectedLocation('All Branches');
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-full bg-primary text-white text-[14px] font-extrabold cursor-pointer"
                    >
                      Show All 6 Doctors
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {filteredDoctors.map((doc) => {
                      const isSelected = activeDoctor.id === doc.id;
                      return (
                        <article
                          key={doc.id}
                          onClick={() => handleSelectDoctor(doc)}
                          className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-white border-primary shadow-lg'
                              : 'bg-white border-navy-08 hover:border-primary/50'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <img
                                src={doc.avatar}
                                alt={doc.name}
                                loading="lazy"
                                className="w-16 h-16 rounded-2xl object-cover border-2 border-primary shrink-0"
                              />
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-[18px] font-extrabold text-navy">
                                    {doc.name}
                                  </h3>
                                  <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[12px] font-extrabold">
                                    {doc.specialty}
                                  </span>
                                </div>
                                <p className="text-[13px] text-navy-70 font-medium mt-0.5">
                                  {doc.qualifications}
                                </p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-bold text-navy mt-2">
                                  <span>Experience: {doc.experience}</span>
                                  <span>·</span>
                                  <span>Languages: {doc.languages}</span>
                                  <span>·</span>
                                  <span className="text-primary">
                                    Fee: {doc.fee}
                                  </span>
                                </div>
                                <div className="text-[12px] text-navy-50 font-semibold mt-1">
                                  📍 {doc.branch}
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-navy-08">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-extrabold">
                                <Clock className="w-3.5 h-3.5" />
                                <span>Next: {doc.nextAvailable}</span>
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectDoctor(doc);
                                  slotHeadingRef.current?.focus();
                                }}
                                className={`min-h-[44px] px-4 py-2 rounded-full text-[13px] font-extrabold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-primary text-white'
                                    : 'bg-navy text-white hover:bg-primary'
                                }`}
                              >
                                {isSelected
                                  ? 'Selected ✓'
                                  : 'Select Doctor →'}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right (5 cols): Selected Doctor Time-Slot Grid, Mini Form & Confirmation */}
              <div
                aria-live="polite"
                className="lg:col-span-5 p-5 sm:p-7 bg-white flex flex-col justify-between"
              >
                {demoBookingConfirmed ? (
                  <div
                    ref={confirmBoxRef}
                    tabIndex={-1}
                    className="p-6 rounded-2xl bg-primary-50/70 border-2 border-primary text-center my-auto focus:outline-none"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary block mb-1">
                      APPOINTMENT CONFIRMED (DEMO)
                    </span>
                    <h3 className="text-[22px] font-extrabold text-navy mb-2">
                      Booked with {activeDoctor.name}
                    </h3>
                    <p className="text-[16px] text-navy-70 mb-5">
                      Patient:{' '}
                      <strong className="text-navy">{demoPatientName}</strong> (
                      {demoPatientPhone})
                    </p>

                    <div className="p-4 rounded-xl bg-white border border-primary/30 text-left space-y-2 text-[14px] mb-5">
                      <div className="flex justify-between">
                        <span className="text-navy-70 font-semibold">
                          Date &amp; Time:
                        </span>
                        <span className="font-extrabold text-primary">
                          {activeDateObj.label} ({activeDateObj.sub}) ·{' '}
                          {selectedSlot}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy-70 font-semibold">
                          Branch:
                        </span>
                        <span className="font-bold text-navy">
                          {activeDoctor.branch}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-navy-70 font-semibold">
                          Consultation Fee:
                        </span>
                        <span className="font-bold text-navy">
                          {activeDoctor.fee} (Pay at Clinic / Online)
                        </span>
                      </div>
                    </div>

                    {/* Non-functional Demo Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                      <button
                        type="button"
                        onClick={() =>
                          setDemoActionNotice(
                            'Calendar invite (.ics) preview triggered (demo only).'
                          )
                        }
                        className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-primary-50 border border-primary text-primary font-extrabold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Add to Calendar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setDemoActionNotice(
                            'Sample WhatsApp reminder queued for ' +
                              demoPatientPhone +
                              ' (demo only).'
                          )
                        }
                        className="min-h-[44px] px-4 py-2.5 rounded-xl bg-navy hover:bg-primary text-white font-extrabold text-[13px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Bell className="w-4 h-4 text-primary" />
                        <span>Get WhatsApp reminder</span>
                      </button>
                    </div>

                    {demoActionNotice && (
                      <p className="text-[13px] font-bold text-primary mb-3">
                        {demoActionNotice}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setDemoBookingConfirmed(false);
                        setDemoActionNotice('');
                      }}
                      className="text-[13px] font-extrabold text-navy hover:text-primary underline cursor-pointer"
                    >
                      Book Another Slot in Demo
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="pb-4 mb-5 border-b border-navy-08">
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                        STEP 2 · PICK A TIME SLOT
                      </span>
                      <h3
                        ref={slotHeadingRef}
                        tabIndex={-1}
                        className="text-[20px] font-extrabold text-navy focus:outline-none"
                      >
                        {activeDoctor.name}
                      </h3>
                      <p className="text-[14px] text-navy-70 font-medium">
                        {activeDateObj.label} ({activeDateObj.sub}) ·{' '}
                        {activeDoctor.branch}
                      </p>
                    </div>

                    {/* Morning / Afternoon / Evening Slot Groups */}
                    <div className="space-y-4 mb-6">
                      {(
                        [
                          {
                            label: 'Morning',
                            slots: activeDoctor.slots.morning,
                          },
                          {
                            label: 'Afternoon',
                            slots: activeDoctor.slots.afternoon,
                          },
                          {
                            label: 'Evening',
                            slots: activeDoctor.slots.evening,
                          },
                        ] as const
                      ).map((group) => (
                        <div key={group.label}>
                          <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                            {group.label} Slots
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {group.slots.map((slot) => {
                              const active = selectedSlot === slot;
                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  aria-pressed={active}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`min-h-[44px] px-3.5 py-2 rounded-xl font-mono text-[13px] font-extrabold border transition-all cursor-pointer ${
                                    active
                                      ? 'bg-primary text-white border-primary shadow-sm'
                                      : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mini Patient Form */}
                    <form
                      onSubmit={handleConfirmDemoBooking}
                      noValidate
                      className="p-4 sm:p-5 rounded-2xl bg-primary-50/50 border border-primary-100 space-y-3.5"
                    >
                      <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                        STEP 3 · PATIENT DETAILS (DEMO)
                      </div>

                      <div>
                        <label
                          htmlFor="demo-patient-name"
                          className="block text-[13px] font-extrabold text-navy mb-1"
                        >
                          Patient Full Name
                        </label>
                        <input
                          id="demo-patient-name"
                          type="text"
                          value={demoPatientName}
                          onChange={(e) => setDemoPatientName(e.target.value)}
                          placeholder="e.g. Ramesh Kulkarni"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border border-navy-15 text-navy text-[15px] font-medium focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="demo-patient-phone"
                          className="block text-[13px] font-extrabold text-navy mb-1"
                        >
                          Mobile / WhatsApp Number
                        </label>
                        <input
                          id="demo-patient-phone"
                          type="tel"
                          value={demoPatientPhone}
                          onChange={(e) => setDemoPatientPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border border-navy-15 text-navy text-[15px] font-medium focus:outline-none focus:border-primary"
                        />
                      </div>

                      {demoBookingError && (
                        <p className="text-[13px] font-bold text-primary flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{demoBookingError}</span>
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full min-h-[48px] py-3.5 px-5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Confirm Appointment ({selectedSlot})</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[15px] text-navy-70 font-semibold">
            Demo only — no data is saved.
          </p>
        </div>
      </section>

      {/* ====================================================================
          5. SERVICES — THE PRESCRIPTION PAD (navy, White Rx Pad Sheet)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/3 w-[520px] h-[520px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1060px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHAT WE BUILD
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight">
              Our <span className="text-primary">Prescription</span> for Growth
            </h2>
          </div>

          {/* Large White Prescription-Pad Sheet on Navy Background */}
          <div className="rounded-b-[28px] rounded-t-[10px] bg-white text-navy shadow-[0_30px_80px_rgba(0,0,0,0.45)] border-2 border-primary/40 overflow-hidden">
            {/* Torn-Off Top Edge Perforation Strip */}
            <div
              aria-hidden="true"
              className="h-3.5 bg-navy flex items-center justify-between px-3 overflow-hidden"
            >
              {Array.from({ length: 34 }).map((_, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full bg-white -mb-3 shrink-0"
                />
              ))}
            </div>

            {/* Prescription Pad Header Strip */}
            <div className="px-6 sm:px-10 pt-7 pb-6 bg-primary-50/60 border-b-2 border-primary flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Blue "Rx" Mark */}
                <div className="w-14 h-14 rounded-2xl bg-primary text-white font-serif text-[28px] font-extrabold flex items-center justify-center shadow-md shrink-0">
                  Rx
                </div>
                <div>
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary block">
                    CLINICAL DIGITAL GROWTH PLAN
                  </span>
                  <h3 className="text-[22px] sm:text-[26px] font-extrabold text-navy">
                    WebXCode Digital Health Studio
                  </h3>
                </div>
              </div>

              <div className="font-mono text-[12px] text-navy-70 font-bold sm:text-right">
                <div>FOR: HOSPITALS, CLINICS &amp; LABS</div>
                <div className="text-primary">REG NO: WXC-HEALTH-09</div>
              </div>
            </div>

            {/* Line-Ruled Prescribed Items Area (9 Services) */}
            <div className="divide-y divide-primary/15 px-6 sm:px-10 py-4">
              {PRESCRIPTION_SERVICES.map((srv) => {
                const isExpanded = expandedRxId === srv.id;
                return (
                  <div key={srv.id} className="py-4">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedRxId(isExpanded ? '' : srv.id)
                      }
                      className="w-full min-h-[52px] text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-2 -mx-2"
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <span className="font-mono text-[13px] font-extrabold px-2.5 py-1 rounded-lg bg-primary-50 text-primary shrink-0 mt-0.5 sm:mt-0">
                          Rx {srv.rxNumber}
                        </span>
                        <div>
                          <div className="text-[18px] sm:text-[19px] font-extrabold text-navy group-hover:text-primary transition-colors">
                            {srv.title}
                          </div>
                          <div className="text-[15px] text-navy-70">
                            {srv.shortSummary} ·{' '}
                            <em className="font-semibold text-primary not-italic sm:italic">
                              {srv.dosage}
                            </em>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                          {isExpanded ? 'Hide Details' : 'View Rx'}
                        </span>
                        <span className="w-8 h-8 rounded-full bg-primary-50 text-primary flex items-center justify-center">
                          {isExpanded ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
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
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 ml-0 sm:ml-14 p-5 rounded-2xl bg-primary-50/45 border border-primary-100">
                            <p className="text-[17px] text-navy leading-relaxed mb-4">
                              {srv.description}
                            </p>
                            <ul className="space-y-2.5 mb-4">
                              {srv.bullets.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-2.5 text-[15px] font-bold text-navy"
                                >
                                  <Check className="w-4 h-4 text-primary shrink-0 mt-1" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap items-center gap-4">
                              {srv.id === 'rx-7' && (
                                <Link
                                  href="/services/mobile-app-development"
                                  className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-[13px] font-extrabold hover:bg-primary-700 transition-colors"
                                >
                                  <span>Explore Mobile App Development</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              )}
                              <button
                                type="button"
                                onClick={() => onOpenQuoteModal(srv.title)}
                                className="min-h-[44px] inline-flex items-center gap-1.5 text-[14px] font-extrabold text-primary hover:underline cursor-pointer"
                              >
                                <span>Request {srv.title} Quote</span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom of the Pad: Caveat Signature + Round Stamp Graphic */}
            <div className="px-6 sm:px-10 py-6 bg-primary-50/40 border-t-2 border-navy-08 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="block font-mono text-[11px] font-extrabold uppercase tracking-widest text-navy-50 mb-1">
                  PRESCRIBED BY
                </span>
                <div className="font-caveat text-[32px] sm:text-[36px] font-bold text-primary leading-none">
                  Dr. Digital — WebXCode
                </div>
                <div className="w-56 h-[2px] bg-navy/25 mt-1" />
              </div>

              {/* Small Round Stamp Graphic "Results-Focused Care" */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-primary bg-white flex flex-col items-center justify-center text-center p-2 -rotate-6 shadow-sm shrink-0">
                  <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-primary">
                    VERIFIED
                  </span>
                  <span className="text-[11px] font-extrabold text-navy leading-tight my-0.5">
                    Results-Focused Care
                  </span>
                  <span className="font-mono text-[9px] font-bold text-primary">
                    ★ WXC ★
                  </span>
                </div>

                <a
                  href="#health-check"
                  className="min-h-[48px] px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[14px] inline-flex items-center gap-2 shadow-md"
                >
                  <span>Start Your Prescription</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. PRIVACY, SAFETY & COMPLIANCE — VITALS MONITOR (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TRUST &amp; PRIVACY
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Patient Data Deserves{' '}
              <span className="text-primary">Extra Care</span>
            </h2>
          </div>

          {/* Patient Vitals Monitor — Large Dark Navy Screen Panel with Thin Bezel & 6 Readout Tiles */}
          <div className="rounded-[28px] bg-navy text-white p-4 sm:p-7 border-4 border-navy shadow-2xl">
            {/* Monitor Top Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/15 px-2">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">
                  PATIENT PRIVACY &amp; COMPLIANCE VITALS MONITOR
                </span>
              </div>
              <div className="font-mono text-[11px] font-bold text-primary">
                ALL SAFEGUARDS ONLINE · 6 / 6 CHANNELS
              </div>
            </div>

            {/* 6 Readout Tiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VITALS_MONITOR_TILES.map((tile) => (
                <div
                  key={tile.id}
                  className="rounded-2xl bg-white/6 border border-white/15 hover:border-primary p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                        {tile.label}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-primary px-2 py-0.5 rounded bg-primary/15 border border-primary/30">
                        {tile.unitCode}
                      </span>
                    </div>

                    {/* Big Readout Value */}
                    <div className="font-mono text-[20px] sm:text-[22px] font-extrabold text-primary leading-tight mb-3">
                      {tile.readout}
                    </div>

                    {/* Tiny Animated Blue Line Graph */}
                    <div
                      aria-hidden="true"
                      className="rounded-xl bg-navy/80 border border-white/10 px-3 py-2 mb-3"
                    >
                      <svg
                        viewBox="0 0 180 34"
                        className="w-full h-7 overflow-visible"
                        preserveAspectRatio="none"
                      >
                        <path
                          d={tile.wavePath}
                          fill="none"
                          stroke="#0571c2"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="vitals-wave-trace"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* One-Line Explanation */}
                  <p className="text-[16px] text-white/85 leading-relaxed">
                    {tile.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Info Callout Below Monitor (Light Blue Box) */}
          <div className="mt-6 p-5 sm:p-6 rounded-[20px] bg-primary-50 border border-primary-100 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <p className="text-[17px] text-navy leading-relaxed font-medium">
              We build with healthcare privacy and advertising rules in mind and
              work with your compliance team. Final regulatory responsibility
              remains with the healthcare provider.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. DESIGNED FOR EVERY PATIENT — ACCESSIBILITY DEMO (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-2xs">
              ACCESSIBLE BY DESIGN
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Easy to Use for <span className="text-primary">Every Age</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left (5 cols): 3 Big Toggle Switches (role="switch" + aria-checked) */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-[17px] text-navy-70 leading-relaxed mb-4">
                Many hospital and eye-care patients are seniors or family
                caregivers browsing on mobile. Toggle the switches below to see
                how we make clinic pages effortless to read and use:
              </p>

              {/* Toggle 1: Larger Text */}
              <button
                type="button"
                role="switch"
                aria-checked={a11yLargeText}
                onClick={() => setA11yLargeText((prev) => !prev)}
                className={`w-full min-h-[64px] p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                  a11yLargeText
                    ? 'bg-navy text-white border-primary shadow-md'
                    : 'bg-white text-navy border-navy-15 hover:border-primary'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-11 h-11 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                    <Type className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-[18px] font-extrabold">
                      Larger Text
                    </div>
                    <div
                      className={`text-[14px] ${
                        a11yLargeText ? 'text-white/80' : 'text-navy-70'
                      }`}
                    >
                      Scales headings, timings &amp; buttons for senior vision
                    </div>
                  </div>
                </div>

                {/* Switch Track */}
                <span
                  aria-hidden="true"
                  className={`w-14 h-8 rounded-full p-1 transition-colors flex items-center shrink-0 ${
                    a11yLargeText ? 'bg-primary justify-end' : 'bg-navy/20 justify-start'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-white shadow-sm" />
                </span>
              </button>

              {/* Toggle 2: High Contrast */}
              <button
                type="button"
                role="switch"
                aria-checked={a11yHighContrast}
                onClick={() => setA11yHighContrast((prev) => !prev)}
                className={`w-full min-h-[64px] p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                  a11yHighContrast
                    ? 'bg-navy text-white border-primary shadow-md'
                    : 'bg-white text-navy border-navy-15 hover:border-primary'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-11 h-11 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                    <Contrast className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-[18px] font-extrabold">
                      High Contrast
                    </div>
                    <div
                      className={`text-[14px] ${
                        a11yHighContrast ? 'text-white/80' : 'text-navy-70'
                      }`}
                    >
                      Switches to deep navy &amp; crisp white AAA contrast
                    </div>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className={`w-14 h-8 rounded-full p-1 transition-colors flex items-center shrink-0 ${
                    a11yHighContrast
                      ? 'bg-primary justify-end'
                      : 'bg-navy/20 justify-start'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-white shadow-sm" />
                </span>
              </button>

              {/* Toggle 3: हिंदी / English */}
              <button
                type="button"
                role="switch"
                aria-checked={a11yHindi}
                onClick={() => setA11yHindi((prev) => !prev)}
                className={`w-full min-h-[64px] p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary ${
                  a11yHindi
                    ? 'bg-navy text-white border-primary shadow-md'
                    : 'bg-white text-navy border-navy-15 hover:border-primary'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-11 h-11 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                    <Languages className="w-5 h-5" />
                  </span>
                  <div>
                    <div className="text-[18px] font-extrabold">
                      <span lang="hi">हिंदी</span> / English
                    </div>
                    <div
                      className={`text-[14px] ${
                        a11yHindi ? 'text-white/80' : 'text-navy-70'
                      }`}
                    >
                      Instant bilingual patient instructions &amp; booking
                    </div>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className={`w-14 h-8 rounded-full p-1 transition-colors flex items-center shrink-0 ${
                    a11yHindi ? 'bg-primary justify-end' : 'bg-navy/20 justify-start'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-white shadow-sm" />
                </span>
              </button>
            </div>

            {/* Right (7 cols): Live Mini Clinic Website Card That Updates Immediately */}
            <div className="lg:col-span-7">
              <div
                lang={a11yHindi ? 'hi' : 'en'}
                aria-live="polite"
                className={`rounded-[28px] p-6 sm:p-9 border-4 transition-all shadow-2xl ${
                  a11yHighContrast
                    ? 'bg-navy text-white border-primary'
                    : 'bg-white text-navy border-primary/30'
                }`}
              >
                <div
                  className={`flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b ${
                    a11yHighContrast ? 'border-white/25' : 'border-navy-15'
                  }`}
                >
                  <span
                    className={`px-3.5 py-1 rounded-full font-mono text-[12px] font-extrabold uppercase tracking-wider ${
                      a11yHighContrast
                        ? 'bg-white text-navy'
                        : 'bg-primary-50 text-primary'
                    }`}
                  >
                    {a11ySnippet.badge}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold">
                    <span>TEXT: {a11yLargeText ? '120%' : '100%'}</span>
                    <span>·</span>
                    <span>
                      CONTRAST: {a11yHighContrast ? 'HIGH (AAA)' : 'STANDARD'}
                    </span>
                  </div>
                </div>

                <h3
                  className={`font-extrabold leading-tight mb-1.5 transition-all ${
                    a11yLargeText
                      ? 'text-[28px] sm:text-[34px]'
                      : 'text-[22px] sm:text-[26px]'
                  } ${a11yHighContrast ? 'text-white' : 'text-navy'}`}
                >
                  {a11ySnippet.clinicName}
                </h3>

                <div
                  className={`font-bold mb-4 transition-all ${
                    a11yLargeText ? 'text-[19px]' : 'text-[16px]'
                  } text-primary`}
                >
                  {a11ySnippet.department}
                </div>

                {/* OPD Timings Strip */}
                <div
                  className={`p-4 rounded-2xl mb-5 border transition-all ${
                    a11yHighContrast
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-primary-50/60 border-primary-100 text-navy'
                  } ${a11yLargeText ? 'text-[18px]' : 'text-[16px]'}`}
                >
                  <span className="font-extrabold mr-2">
                    {a11ySnippet.timingsLabel}
                  </span>
                  <span className="font-semibold">
                    {a11ySnippet.timingsValue}
                  </span>
                </div>

                {/* Body Copy */}
                <p
                  className={`leading-relaxed mb-6 transition-all ${
                    a11yLargeText
                      ? 'text-[20px] sm:text-[22px] font-semibold'
                      : 'text-[17px]'
                  } ${a11yHighContrast ? 'text-white' : 'text-navy-70'}`}
                >
                  {a11ySnippet.bodyText}
                </p>

                {/* Action Buttons Inside Mini Clinic Card */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <a
                    href="#booking-demo"
                    className={`min-h-[48px] px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold transition-all inline-flex items-center gap-2 shadow-md ${
                      a11yLargeText ? 'text-[18px]' : 'text-[15px]'
                    }`}
                  >
                    <span>{a11ySnippet.ctaButton}</span>
                  </a>
                  <span
                    className={`min-h-[48px] px-5 py-3.5 rounded-full border-2 font-extrabold inline-flex items-center gap-2 ${
                      a11yHighContrast
                        ? 'border-white text-white'
                        : 'border-navy-15 text-navy'
                    } ${a11yLargeText ? 'text-[17px]' : 'text-[14px]'}`}
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{a11ySnippet.callButton}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Blue Check Points Below */}
          <div className="mt-10 pt-6 border-t border-navy-15 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              'WCAG-friendly design',
              'Large tap targets',
              'Simple language',
              'Multilingual content',
            ].map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2.5 text-[17px] font-extrabold text-navy"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. CASE STUDY — THE PATIENT CHART (white, Clipboard + Treatment Plan)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              CASE STUDY
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              <span className="text-primary">
                {PATIENT_CHART_CASE_STUDY.clinicName}
              </span>
              : A Healthier Appointment Book
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left (8 cols): Navy Clipboard Holding a White Patient Chart Report Sheet */}
            <div className="lg:col-span-8 relative pt-6">
              {/* Top Clipboard Metal Clip Drawn in Blue/Navy Line Style */}
              <div
                aria-hidden="true"
                className="relative z-20 mx-auto w-44 h-12 -mb-6 rounded-t-2xl bg-navy border-4 border-primary flex items-center justify-center shadow-lg"
              >
                <div className="w-24 h-3 rounded-full bg-white/90 border border-primary" />
              </div>

              {/* Navy Clipboard Backing Frame */}
              <div className="rounded-[28px] bg-navy p-3 sm:p-5 shadow-2xl border-2 border-navy">
                {/* White Patient Chart Report Sheet */}
                <div className="rounded-[20px] bg-white text-navy p-5 sm:p-8">
                  {/* Chart Header Fields: Client · Specialty · Locations · Duration */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-5 mb-6 border-b-2 border-navy">
                    <div>
                      <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        CLIENT
                      </span>
                      <span className="text-[14px] font-extrabold text-navy">
                        {PATIENT_CHART_CASE_STUDY.clinicName}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        SPECIALTY
                      </span>
                      <span className="text-[14px] font-extrabold text-navy">
                        {PATIENT_CHART_CASE_STUDY.specialty}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        LOCATIONS
                      </span>
                      <span className="text-[14px] font-extrabold text-navy">
                        {PATIENT_CHART_CASE_STUDY.locations}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        DURATION
                      </span>
                      <span className="text-[14px] font-extrabold text-navy">
                        {PATIENT_CHART_CASE_STUDY.duration}
                      </span>
                    </div>
                  </div>

                  {/* Vitals: Before → After Table */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[19px] font-extrabold text-navy">
                        Vitals: Before → After
                      </h3>
                      <span className="font-mono text-[11px] font-bold text-primary">
                        PLACEHOLDER BENCHMARKS
                      </span>
                    </div>

                    <div className="rounded-2xl border border-navy-15 overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-primary-50 text-navy font-mono text-[11px] uppercase tracking-wider">
                            <th className="py-3 px-4 font-extrabold">
                              Clinical Growth Metric
                            </th>
                            <th className="py-3 px-4 font-extrabold">Before</th>
                            <th className="py-3 px-4 font-extrabold text-primary">
                              After
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-08 text-[16px]">
                          {PATIENT_CHART_CASE_STUDY.vitalsRows.map((row) => (
                            <tr key={row.metric}>
                              <td className="py-3.5 px-4 font-bold text-navy">
                                {row.metric}
                              </td>
                              <td className="py-3.5 px-4 font-mono text-navy-70">
                                {row.before}
                              </td>
                              <td className="py-3.5 px-4 font-mono font-extrabold text-primary">
                                {row.after}{' '}
                                <span className="ml-1.5 text-[12px] px-2 py-0.5 rounded-full bg-primary-50 text-primary">
                                  {row.delta}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Small Pulse Line Graph Rising to the Right */}
                  <div className="p-4 rounded-2xl bg-primary-50/45 border border-primary-100 mb-6">
                    <div className="flex items-center justify-between text-[11px] font-mono font-extrabold text-primary mb-1">
                      <span>APPOINTMENT VOLUME TRAJECTORY (MONTH 1 → 5)</span>
                      <span>+241% GROWTH</span>
                    </div>
                    <svg
                      viewBox="0 0 600 64"
                      className="w-full h-14 overflow-visible"
                      role="img"
                      aria-label="Rising pulse line graph showing monthly online appointments growing from 120 to 410"
                    >
                      <path
                        d="M 10 52 L 90 50 L 105 34 L 118 56 L 130 46 L 230 40 L 245 22 L 258 48 L 272 34 L 380 28 L 395 10 L 408 38 L 422 22 L 540 14 L 555 4 L 568 24 L 585 10"
                        fill="none"
                        stroke="#0571c2"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="585" cy="10" r="5" fill="#0571c2" />
                    </svg>
                  </div>

                  {/* "Doctor's Note" Box in Caveat Script */}
                  <div className="p-5 rounded-2xl bg-white border-2 border-dashed border-primary/40">
                    <span className="block font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary mb-1">
                      DOCTOR&apos;S NOTE
                    </span>
                    <p className="font-caveat text-[24px] sm:text-[26px] text-navy leading-snug mb-2">
                      &ldquo;{PATIENT_CHART_CASE_STUDY.doctorsNote}&rdquo;
                    </p>
                    <div className="text-[14px] font-extrabold text-navy-70">
                      — {PATIENT_CHART_CASE_STUDY.doctorAuthor}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right (4 cols): "Treatment Plan" List with Blue Checkmarks + View More Projects Button */}
            <div className="lg:col-span-4 lg:mt-6">
              <div className="rounded-[24px] bg-primary-50/55 border-2 border-primary/30 p-6 sm:p-8 shadow-soft">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary block mb-1">
                  EXECUTED SCOPE
                </span>
                <h3 className="text-[24px] font-extrabold text-navy mb-5">
                  Treatment Plan
                </h3>

                <ul className="space-y-3.5 mb-8">
                  {PATIENT_CHART_CASE_STUDY.treatmentPlan.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-primary-100 text-[17px] font-extrabold text-navy shadow-2xs"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/our-work"
                  className="min-h-[48px] w-full py-3.5 px-6 rounded-full bg-navy hover:bg-primary text-white font-extrabold text-[15px] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>View More Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9. HEALTHCARE FAQ (white, Split Layout with Doctor-and-Patient Card)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left (5 cols): Heading + Soft Card with Doctor-and-Patient Photo & Contact Link */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                FAQ
              </span>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight mb-4">
                Questions from{' '}
                <span className="text-primary">Healthcare Providers</span>
              </h2>
              <p className="text-[17px] text-navy-70 leading-relaxed mb-6">
                Straightforward answers on online appointment booking, HIS
                integrations, patient data privacy and healthcare search
                guidelines.
              </p>

              {/* Soft Card with Doctor-and-Patient Consultation Photo */}
              <div className="rounded-[24px] bg-primary-50/55 border border-primary-100 p-5 shadow-soft">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-navy mb-4">
                  <img
                    src={IMG_CLINIC_TEAM}
                    alt="Healthcare digital specialists discussing clinic website and patient booking workflow"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-[19px] font-extrabold text-navy mb-1.5">
                  Have a Custom HIS or Multi-Branch Question?
                </h3>
                <p className="text-[16px] text-navy-70 leading-relaxed mb-4">
                  Our healthcare web and SEO specialists are happy to walk you
                  through a live clinic architecture.
                </p>
                <Link
                  href="/contact"
                  className="min-h-[44px] inline-flex items-center gap-2 text-[16px] font-extrabold text-primary hover:underline"
                >
                  <span>Speak with our healthcare team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right (7 cols): Accordion with Large, Easy-to-Tap Items */}
            <div className="lg:col-span-7 space-y-3.5">
              {HEALTHCARE_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-[20px] border-2 transition-all overflow-hidden ${
                      isOpen
                        ? 'bg-primary-50/35 border-primary shadow-md'
                        : 'bg-white border-navy-15 hover:border-primary/60'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full min-h-[60px] p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <span className="text-[18px] sm:text-[19px] font-extrabold text-navy leading-snug">
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
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-[17px] text-navy-70 leading-relaxed border-t border-navy-08">
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
          10. FREE WEBSITE HEALTH CHECK — LAB TEST REQUEST FORM CTA (#health-check)
      ==================================================================== */}
      <section
        id="health-check"
        className="bg-white py-12 lg:py-20 px-4 sm:px-6 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto rounded-[32px] bg-navy text-white p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-2xl border-2 border-navy">
          <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
          <div
            aria-hidden="true"
            className="absolute -left-24 bottom-0 w-[520px] h-[520px] blue-glow pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
            {/* Left 45% (5 cols): Pitch + Thin Pulse Line */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                FREE HEALTH CHECK
              </span>
              <h2 className="text-[30px] sm:text-[40px] lg:text-[46px] font-extrabold text-white leading-[1.08] tracking-tight mb-4">
                Get a Free{' '}
                <span className="text-primary">Website Health Check</span>
              </h2>
              <p className="text-[17px] sm:text-[18px] text-white/80 leading-relaxed mb-6">
                We&apos;ll check your website&apos;s speed, booking flow, local
                visibility and trust signals and send you a clear report with
                practical fixes.
              </p>

              {/* Thin Pulse Line Under the Text */}
              <div aria-hidden="true" className="mb-8">
                <svg
                  viewBox="0 0 380 42"
                  className="w-full max-w-[340px] h-10 overflow-visible"
                >
                  <path
                    d="M 0 24 L 85 24 L 98 12 L 110 34 L 124 6 L 138 36 L 150 20 L 164 24 L 360 24"
                    fill="none"
                    stroke="#0571c2"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="360" cy="24" r="4" fill="#0571c2" />
                </svg>
              </div>

              <div className="p-4 rounded-2xl bg-white/6 border border-white/15 text-[15px] text-white/85">
                Need an immediate proposal for a new hospital or clinic build?{' '}
                <button
                  type="button"
                  onClick={() =>
                    onOpenQuoteModal('Healthcare Website & Booking System')
                  }
                  className="text-primary font-extrabold hover:underline cursor-pointer"
                >
                  Open Quick Quote Modal →
                </button>
              </div>
            </div>

            {/* Right 55% (7 cols): White Lab Test Request Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-[24px] bg-white text-navy p-6 sm:p-8 lg:p-10 shadow-2xl border-2 border-primary/40">
                {/* Lab Test Request Form Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b-2 border-navy">
                  <div className="flex items-center gap-2.5">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    <span className="font-mono text-[12px] sm:text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy">
                      WEBSITE HEALTH CHECK · REQUEST FORM
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-extrabold text-primary px-2.5 py-0.5 rounded bg-primary-50">
                    LAB FORM #WXC-01
                  </span>
                </div>

                {healthSubmitted ? (
                  <div className="p-6 sm:p-8 rounded-2xl bg-primary-50 border-2 border-primary text-center">
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>
                    <h3 className="text-[22px] font-extrabold text-navy mb-2">
                      Request received! Your report will arrive within 48 hours.
                    </h3>
                    <p className="text-[17px] text-navy-70 leading-relaxed mb-5">
                      We have queued a diagnostic review for{' '}
                      <strong className="text-navy">
                        {healthForm.organization}
                      </strong>{' '}
                      ({healthForm.websiteUrl}) and will send the report to{' '}
                      <strong className="text-primary">
                        {healthForm.email}
                      </strong>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setHealthSubmitted(false);
                        setHealthForm({
                          name: '',
                          organization: '',
                          email: '',
                          phone: '',
                          websiteUrl: '',
                          branches: '1',
                          selectedTests: HEALTH_CHECK_TESTS.map((t) => t.id),
                        });
                      }}
                      className="min-h-[44px] px-5 py-2.5 rounded-full bg-navy text-white text-[14px] font-extrabold hover:bg-primary transition-colors cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHealthCheckSubmit} noValidate>
                    {/* Thin Bordered Field Rows Styled Like a Lab Requisition Form */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="hc-name"
                          className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          YOUR NAME *
                        </label>
                        <input
                          id="hc-name"
                          type="text"
                          value={healthForm.name}
                          onChange={(e) =>
                            setHealthForm({
                              ...healthForm,
                              name: e.target.value,
                            })
                          }
                          placeholder="Dr. / Administrator Name"
                          className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-navy-15 bg-white text-navy text-[16px] font-medium focus:outline-none focus:border-primary"
                        />
                        {healthErrors.name && (
                          <p className="mt-1 text-[13px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{healthErrors.name}</span>
                          </p>
                        )}
                      </div>

                      {/* Organization (Hospital/Clinic Name) */}
                      <div>
                        <label
                          htmlFor="hc-org"
                          className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          ORGANIZATION (HOSPITAL / CLINIC NAME) *
                        </label>
                        <input
                          id="hc-org"
                          type="text"
                          value={healthForm.organization}
                          onChange={(e) =>
                            setHealthForm({
                              ...healthForm,
                              organization: e.target.value,
                            })
                          }
                          placeholder="e.g. City Care Hospital"
                          className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-navy-15 bg-white text-navy text-[16px] font-medium focus:outline-none focus:border-primary"
                        />
                        {healthErrors.organization && (
                          <p className="mt-1 text-[13px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{healthErrors.organization}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Email */}
                      <div>
                        <label
                          htmlFor="hc-email"
                          className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          WORK EMAIL *
                        </label>
                        <input
                          id="hc-email"
                          type="email"
                          value={healthForm.email}
                          onChange={(e) =>
                            setHealthForm({
                              ...healthForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="admin@yourclinic.com"
                          className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-navy-15 bg-white text-navy text-[16px] font-medium focus:outline-none focus:border-primary"
                        />
                        {healthErrors.email && (
                          <p className="mt-1 text-[13px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{healthErrors.email}</span>
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="hc-phone"
                          className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          PHONE / WHATSAPP *
                        </label>
                        <input
                          id="hc-phone"
                          type="tel"
                          value={healthForm.phone}
                          onChange={(e) =>
                            setHealthForm({
                              ...healthForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-navy-15 bg-white text-navy text-[16px] font-medium focus:outline-none focus:border-primary"
                        />
                        {healthErrors.phone && (
                          <p className="mt-1 text-[13px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{healthErrors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-5">
                      {/* Website URL (7 cols) */}
                      <div className="sm:col-span-7">
                        <label
                          htmlFor="hc-url"
                          className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-70 mb-1.5"
                        >
                          WEBSITE URL *
                        </label>
                        <input
                          id="hc-url"
                          type="text"
                          value={healthForm.websiteUrl}
                          onChange={(e) =>
                            setHealthForm({
                              ...healthForm,
                              websiteUrl: e.target.value,
                            })
                          }
                          placeholder="yourhospital.com"
                          className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-navy-15 bg-white text-navy text-[16px] font-medium focus:outline-none focus:border-primary"
                        />
                        {healthErrors.websiteUrl && (
                          <p className="mt-1 text-[13px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{healthErrors.websiteUrl}</span>
                          </p>
                        )}
                      </div>

                      {/* Number of Branches Chips (5 cols) */}
                      <div className="sm:col-span-5">
                        <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-70 mb-1.5">
                          NUMBER OF BRANCHES
                        </span>
                        <div
                          role="group"
                          aria-label="Number of branches"
                          className="grid grid-cols-3 gap-2"
                        >
                          {HEALTH_CHECK_BRANCH_OPTIONS.map((br) => {
                            const active = healthForm.branches === br;
                            return (
                              <button
                                key={br}
                                type="button"
                                aria-pressed={active}
                                onClick={() =>
                                  setHealthForm({
                                    ...healthForm,
                                    branches: br,
                                  })
                                }
                                className={`min-h-[46px] rounded-xl font-mono text-[14px] font-extrabold border transition-all cursor-pointer ${
                                  active
                                    ? 'bg-primary text-white border-primary shadow-2xs'
                                    : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                                }`}
                              >
                                {br}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* "Tests Requested" Checkboxes Styled Like a Lab Form */}
                    <div className="p-4 rounded-2xl bg-primary-50/50 border border-primary-100 mb-6">
                      <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-2.5">
                        TESTS REQUESTED (DIAGNOSTIC PANELS INCLUDED):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {HEALTH_CHECK_TESTS.map((test) => {
                          const checked = healthForm.selectedTests.includes(
                            test.id
                          );
                          return (
                            <label
                              key={test.id}
                              className={`min-h-[44px] px-3.5 py-2 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                                checked
                                  ? 'bg-white border-primary text-navy font-extrabold shadow-2xs'
                                  : 'bg-white/60 border-navy-15 text-navy-70 font-semibold'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleHealthCheckTest(test.id)}
                                className="w-4 h-4 accent-primary rounded cursor-pointer"
                              />
                              <span className="text-[14px]">{test.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={healthSubmitting}
                      className="w-full min-h-[52px] py-4 px-6 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[16px] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {healthSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Health Check Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Request My Health Check</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="mt-3 text-center text-[13px] text-navy-70 font-semibold">
                      Please don&apos;t share any patient information in this
                      form.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11. EXPLORE OTHER INDUSTRIES (white, compact)
      ==================================================================== */}
      <section className="bg-white py-12 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary block">
                CROSS-INDUSTRY EXPERTISE
              </span>
              <h2 className="text-[20px] sm:text-[22px] font-extrabold text-navy">
                Explore Other Industries We Serve
              </h2>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-[14px] font-extrabold text-primary hover:underline"
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
                    : ind.slug === 'ecommerce'
                    ? '/industries/ecommerce'
                    : ind.slug === 'skincare-beauty'
                    ? '/industries/skincare-beauty'
                    : ind.slug === 'home-decor-furniture'
                    ? '/industries/home-decor-furniture'
                    : ind.slug === 'fashion-lifestyle'
                    ? '/industries/fashion-lifestyle'
                    : ind.slug === 'travel-hospitality'
                    ? '/industries/travel-hospitality'
                    : ind.slug === 'education-edtech'
                    ? '/industries/education-edtech'
                    : `/industries#${ind.slug}`
                }
                className="shrink-0 min-h-[44px] inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-navy-15 bg-white hover:border-primary hover:bg-primary-50 text-navy hover:text-primary text-[14px] font-bold whitespace-nowrap transition-colors"
              >
                <IndustryIcon
                  name={ind.icon}
                  className="w-4 h-4 text-primary shrink-0"
                />
                <span>{ind.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Healthcare;


