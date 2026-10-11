import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Check,
  GraduationCap,
  BookOpen,
  School,
  Laptop,
  Award,
  Users,
  Globe,
  Briefcase,
  Baby,
  Target,
  Play,
  Lock,
  CheckCircle2,
  Clock,
  Pin,
  FileText,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Loader2,
  Download,
  Filter,
  HelpCircle,
} from 'lucide-react';
import { industries, IndustryIcon } from '../Industries';

const IMG_CAMPUS_HERO =
  '/src/assets/images/why_webxcode_team_office_1791104914357.jpg';
const IMG_LMS_LESSON =
  '/src/assets/images/hero_laptop_ui_showcase_1791104898778.jpg';
const IMG_STUDENT_AVATAR =
  '/src/assets/images/testimonial_1_avatar_1791105046374.jpg';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT EDUCATION & EDTECH ITEM FROM INDUSTRIES
============================================================================ */
const educationIndustry =
  industries.find((item) => item.slug === 'education-edtech') || industries[11];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS
============================================================================ */

/* Section 1: Hero Floating Glass Notifications (Placeholders) */
const HERO_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New enquiry · Class 11 Science · Parent',
    meta: 'Just now · Auto-assigned to Counsellor Desk',
  },
  {
    id: 'notif-2',
    title: 'Brochure downloaded · MBA',
    meta: '1 min ago · WhatsApp syllabus PDF delivered',
  },
  {
    id: 'notif-3',
    title: 'Counselling booked · Today 5 PM',
    meta: '3 mins ago · Calendar invite & SMS sent',
  },
];

/* Section 2: Who We Serve — The Timetable (3 Days × 3 Periods = 9 Segments) */
export interface TimetableCellItem {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed';
  dayFull: string;
  period: 'Period 1' | 'Period 2' | 'Period 3';
  timeSlot: string;
  title: string;
  iconKey:
    | 'school'
    | 'university'
    | 'coaching'
    | 'edtech'
    | 'creator'
    | 'vocational'
    | 'preschool'
    | 'abroad'
    | 'corporate';
  description: string;
  solutions: [string, string];
}

const TIMETABLE_SEGMENTS: TimetableCellItem[] = [
  {
    id: 'tt-mon-1',
    day: 'Mon',
    dayFull: 'Monday',
    period: 'Period 1',
    timeSlot: '09:00 – 10:00',
    title: 'Schools (K–12)',
    iconKey: 'school',
    description:
      'Parent-friendly campus websites, virtual school tours, online admission forms and automated parent enquiry follow-ups.',
    solutions: ['Online Admission Portal', 'Parent & Student Portal'],
  },
  {
    id: 'tt-mon-2',
    day: 'Mon',
    dayFull: 'Monday',
    period: 'Period 2',
    timeSlot: '10:00 – 11:00',
    title: 'Colleges & Universities',
    iconKey: 'university',
    description:
      'Multi-department university portals, interactive course finders, NAAC/NIRF showcase hubs and high-volume admission funnels.',
    solutions: ['Multi-Campus Website', 'Course Finder & CRM'],
  },
  {
    id: 'tt-mon-3',
    day: 'Mon',
    dayFull: 'Monday',
    period: 'Period 3',
    timeSlot: '11:00 – 12:00',
    title: 'Coaching Institutes',
    iconKey: 'coaching',
    description:
      'Result-focused JEE, NEET, UPSC, CA & foundation websites with scholarship test registration and batch-wise seat booking.',
    solutions: ['Batch & Test Registration', 'Google Ads for Admissions'],
  },
  {
    id: 'tt-tue-1',
    day: 'Tue',
    dayFull: 'Tuesday',
    period: 'Period 1',
    timeSlot: '09:00 – 10:00',
    title: 'EdTech Startups',
    iconKey: 'edtech',
    description:
      'High-converting SaaS/B2C web apps, interactive live-class dashboards, trial-class funnels and subscription checkout.',
    solutions: ['EdTech Web App & MVP', 'Demo Class Funnel'],
  },
  {
    id: 'tt-tue-2',
    day: 'Tue',
    dayFull: 'Tuesday',
    period: 'Period 2',
    timeSlot: '10:00 – 11:00',
    title: 'Online Course Creators',
    iconKey: 'creator',
    description:
      'Custom cohort & self-paced course platforms with video protection, quizzes, certificates and zero-commission fee checkout.',
    solutions: ['Custom LMS Platform', 'Cohort Landing Pages'],
  },
  {
    id: 'tt-tue-3',
    day: 'Tue',
    dayFull: 'Tuesday',
    period: 'Period 3',
    timeSlot: '11:00 – 12:00',
    title: 'Skill & Vocational Training',
    iconKey: 'vocational',
    description:
      'Career-focused websites for IT, design, aviation, hospitality and trade academies with placement showcases and EMI options.',
    solutions: ['Placement & Course SEO', 'AI WhatsApp Counsellor'],
  },
  {
    id: 'tt-wed-1',
    day: 'Wed',
    dayFull: 'Wednesday',
    period: 'Period 1',
    timeSlot: '09:00 – 10:00',
    title: 'Preschools',
    iconKey: 'preschool',
    description:
      'Warm, reassuring websites for preschools, daycares and multi-branch franchises with "Book a School Visit" local SEO.',
    solutions: ['Local Map Pack SEO', 'Center Visit Scheduler'],
  },
  {
    id: 'tt-wed-2',
    day: 'Wed',
    dayFull: 'Wednesday',
    period: 'Period 2',
    timeSlot: '10:00 – 11:00',
    title: 'Study Abroad Consultants',
    iconKey: 'abroad',
    description:
      'Country & university finder tools, eligibility calculators, IELTS/PTE prep pages and automated visa-counselling booking.',
    solutions: ['University Eligibility Tool', 'Counsellor Lead Kanban'],
  },
  {
    id: 'tt-wed-3',
    day: 'Wed',
    dayFull: 'Wednesday',
    period: 'Period 3',
    timeSlot: '11:00 – 12:00',
    title: 'Corporate Training',
    iconKey: 'corporate',
    description:
      'Enterprise L&D platforms, SCORM-ready employee training portals, workshop booking funnels and HR assessment dashboards.',
    solutions: ['Enterprise LMS Portal', 'B2B Workshop Funnels'],
  },
];

/* Section 3: The Admission Journey — Board Game Path (12 Tiles + 3 Blue Ladders) */
export interface BoardGameTile {
  step: number;
  label: string;
  tag?: string;
  detail: string;
  ladderTo?: {
    targetStep: number;
    targetName: string;
    shortcutNote: string;
  };
}

const BOARD_GAME_PATH_STEPS: BoardGameTile[] = [
  {
    step: 1,
    label: 'Search',
    tag: 'START',
    detail: 'Student or parent searches Google for courses, schools or exams',
  },
  {
    step: 2,
    label: 'Visit Website',
    detail: 'Lands on your fast, mobile-first campus or course page',
  },
  {
    step: 3,
    label: 'Compare Courses',
    detail: 'Checks eligibility, syllabus, fees and batch timings',
  },
  {
    step: 4,
    label: 'Download Brochure',
    detail: 'Requests syllabus & fee structure PDF',
    ladderTo: {
      targetStep: 7,
      targetName: 'Book Counselling',
      shortcutNote: 'Smart forms with auto-scheduling',
    },
  },
  {
    step: 5,
    label: 'Ask Questions',
    detail: 'Asks about scholarships, hostel, transport or batch seats',
    ladderTo: {
      targetStep: 7,
      targetName: 'Book Counselling',
      shortcutNote: 'AI counsellor answers instantly',
    },
  },
  {
    step: 6,
    label: 'Wait for Reply',
    detail: 'Traditional institutes lose 40% of leads here—we skip the wait',
    ladderTo: {
      targetStep: 9,
      targetName: 'Apply',
      shortcutNote: 'WhatsApp follow-ups in minutes',
    },
  },
  {
    step: 7,
    label: 'Book Counselling',
    detail: 'Picks a 1-on-1 counselling slot or academic call',
  },
  {
    step: 8,
    label: 'Campus Visit / Demo Class',
    detail: 'Attends a live demo lecture or guided campus walkthrough',
  },
  {
    step: 9,
    label: 'Apply',
    detail: 'Completes multi-step online admission form on phone or laptop',
  },
  {
    step: 10,
    label: 'Pay Fees',
    detail: 'Pays application or semester fee via UPI, card, netbanking or EMI',
  },
  {
    step: 11,
    label: 'Documents',
    detail: 'Uploads marksheets & ID proofs with instant verification status',
  },
  {
    step: 12,
    label: 'Enrolled',
    tag: 'FINISH',
    detail: 'Welcome kit, student portal login & batch timetable issued!',
  },
];

/* Section 4: Course Finder — Options & Sample Courses */
export const COURSE_INTEREST_OPTIONS = [
  'All Interests',
  'Engineering',
  'Medical',
  'Commerce',
  'Design',
  'Computer Science',
  'Management',
] as const;

export const COURSE_LEVEL_OPTIONS = [
  'All Levels',
  'Class 11–12',
  'Undergraduate',
  'Postgraduate',
  'Short Course',
] as const;

export const COURSE_MODE_OPTIONS = [
  'All Modes',
  'Online',
  'Classroom',
  'Hybrid',
] as const;

export interface SampleCourseItem {
  id: string;
  name: string;
  interest:
    | 'Engineering'
    | 'Medical'
    | 'Commerce'
    | 'Design'
    | 'Computer Science'
    | 'Management';
  level: 'Class 11–12' | 'Undergraduate' | 'Postgraduate' | 'Short Course';
  mode: 'Online' | 'Classroom' | 'Hybrid';
  duration: string;
  annualFeeNumeric: number; // in INR
  feeRangeDisplay: string;
  seatsFillingFast?: boolean;
  highlights: string;
}

const SAMPLE_COURSES: SampleCourseItem[] = [
  {
    id: 'crs-1',
    name: 'B.Tech in Artificial Intelligence & Data Science',
    interest: 'Engineering',
    level: 'Undergraduate',
    mode: 'Classroom',
    duration: '4 Years · 8 Semesters',
    annualFeeNumeric: 185000,
    feeRangeDisplay: '₹1.85L / year',
    seatsFillingFast: true,
    highlights: 'NAAC A+ Campus · Industry Capstone Labs · 94% Placement Track',
  },
  {
    id: 'crs-2',
    name: '2-Year Integrated NEET-UG + Class 11–12 Science',
    interest: 'Medical',
    level: 'Class 11–12',
    mode: 'Hybrid',
    duration: '2 Years · Classroom + App',
    annualFeeNumeric: 95000,
    feeRangeDisplay: '₹95,000 / year',
    seatsFillingFast: true,
    highlights: 'Daily Practice Papers · All-India Test Series · 1-on-1 Doubt Cell',
  },
  {
    id: 'crs-3',
    name: 'Executive MBA in Product & Growth Management',
    interest: 'Management',
    level: 'Postgraduate',
    mode: 'Online',
    duration: '12 Months · Live Weekend Classes',
    annualFeeNumeric: 160000,
    feeRangeDisplay: '₹1.60L total',
    seatsFillingFast: false,
    highlights: 'Live Faculty Sessions · Harvard Case Studies · Career Mentorship',
  },
  {
    id: 'crs-4',
    name: 'Full-Stack Web & Cloud Engineering Bootcamp',
    interest: 'Computer Science',
    level: 'Short Course',
    mode: 'Online',
    duration: '24 Weeks · Cohort-Based',
    annualFeeNumeric: 65000,
    feeRangeDisplay: '₹65,000 total',
    seatsFillingFast: true,
    highlights: '12 Live Production Projects · Mock Interviews · Placement Cell',
  },
  {
    id: 'crs-5',
    name: 'B.Des in UI/UX & Digital Product Design',
    interest: 'Design',
    level: 'Undergraduate',
    mode: 'Classroom',
    duration: '4 Years · Studio Track',
    annualFeeNumeric: 220000,
    feeRangeDisplay: '₹2.20L / year',
    seatsFillingFast: false,
    highlights: 'Design Studio Labs · Portfolio Mentorship · Global Exchange',
  },
  {
    id: 'crs-6',
    name: 'CA Foundation + B.Com (Hons.) Integrated Track',
    interest: 'Commerce',
    level: 'Undergraduate',
    mode: 'Hybrid',
    duration: '3 Years · Morning + Online',
    annualFeeNumeric: 75000,
    feeRangeDisplay: '₹75,000 / year',
    seatsFillingFast: false,
    highlights: ' Chartered Faculty · Mock Board Exams · Articleship Guidance',
  },
];

/* Section 5: Services — The Growth Syllabus (Modules 01–10) */
export interface SyllabusModuleItem {
  id: string;
  moduleNo: string;
  title: string;
  shortHook: string;
  lessonsCount: string;
  description: string;
  bullets: [string, string, string];
}

const SYLLABUS_MODULES: SyllabusModuleItem[] = [
  {
    id: 'mod-01',
    moduleNo: 'Module 01',
    title: 'School, College & University Websites',
    shortHook: 'Fast, accessible, information-rich campus websites',
    lessonsCount: '6 Lessons',
    description:
      'We design flagship academic websites that make it effortless for students and parents to explore courses, faculty, campus life, accreditations and admission dates on any device.',
    bullets: [
      'Department, faculty, hostel, laboratory and placement showcase pages',
      'Mandatory disclosure, NAAC/NIRF/CBSE compliance & academic calendar hubs',
      'Sub-2-second mobile load speed for parents browsing on 4G connections',
    ],
  },
  {
    id: 'mod-02',
    moduleNo: 'Module 02',
    title: 'Admission Landing Pages & Online Applications',
    shortHook: 'Multi-step applications, document uploads, fee payment',
    lessonsCount: '5 Lessons',
    description:
      'Replace paper forms and clunky portals with mobile-friendly multi-step online admission applications that save student progress automatically and boost completion rates.',
    bullets: [
      'Save-and-resume multi-step application forms with OTP verification',
      'Marksheet, photo and ID document upload with automatic size validation',
      'Integrated UPI, card, netbanking and no-cost EMI fee payment gateways',
    ],
  },
  {
    id: 'mod-03',
    moduleNo: 'Module 03',
    title: 'LMS & E-learning Platforms',
    shortHook: 'Courses, video lessons, quizzes, certificates',
    lessonsCount: '7 Lessons',
    description:
      'Custom-branded learning management systems built for cohort courses, recorded video programs, live classes, interactive tests and automated digital certificates.',
    bullets: [
      'DRM-protected adaptive video player with notes, bookmarks & speed controls',
      'Timed mock exams, chapter quizzes, negative marking & instant scorecards',
      'Automated verifiable PDF certificate generation on course completion',
    ],
  },
  {
    id: 'mod-04',
    moduleNo: 'Module 04',
    title: 'EdTech Product & Web App Development',
    shortHook: 'MVPs, student apps, dashboards',
    lessonsCount: '6 Lessons',
    description:
      'From seed-stage EdTech MVPs to full-scale learning products—we engineer scalable React, Node.js and cloud architectures with student, teacher and admin workspaces.',
    bullets: [
      'Interactive student learning dashboards with streaks, leaderboards & analytics',
      'Live class integration (Zoom, Google Meet, WebRTC) with attendance logs',
      'Subscription billing, cohort access control and institutional B2B licensing',
    ],
  },
  {
    id: 'mod-05',
    moduleNo: 'Module 05',
    title: 'SEO & AEO for Education',
    shortHook: 'Rank for course, exam and "best institute in [city]" searches',
    lessonsCount: '5 Lessons',
    description:
      'Capture students and parents at the exact moment they search Google or AI answer engines for courses, syllabus, cutoffs, fee structures and local institutes.',
    bullets: [
      'Programmatic course, exam-prep and city-level landing pages that rank #1',
      'Course, EducationalOrganization and FAQ Schema.org structured data',
      'Google Business Profile optimization for multi-branch coaching & schools',
    ],
  },
  {
    id: 'mod-06',
    moduleNo: 'Module 06',
    title: 'Google Ads for Admissions',
    shortHook: 'Season-focused search and Performance Max campaigns',
    lessonsCount: '4 Lessons',
    description:
      'Maximize your admission-season budget with high-intent Google Search and Performance Max campaigns engineered to lower your cost per verified student enquiry.',
    bullets: [
      'High-intent search campaigns for "admissions open", course and city keywords',
      'Dedicated high-converting landing pages matched to every exam & degree stream',
      'End-to-end conversion tracking from ad click to counsellor call & enrolment',
    ],
  },
  {
    id: 'mod-07',
    moduleNo: 'Module 07',
    title: 'AI Admission Counsellor (Website + WhatsApp)',
    shortHook:
      'Answers fees, eligibility and admission questions 24/7 in multiple languages',
    lessonsCount: '6 Lessons',
    description:
      'Never let a midnight student or parent enquiry go cold. Our AI Admission Counsellor answers course, fee, scholarship and hostel questions instantly on your website and WhatsApp.',
    bullets: [
      'Trained on your official prospectus, fee structure, eligibility & scholarship rules',
      'Automatically shares course brochures on WhatsApp and books counselling slots',
      'Converses fluently in English, Hindi and regional languages 24/7',
    ],
  },
  {
    id: 'mod-08',
    moduleNo: 'Module 08',
    title: 'CRM & Lead Management',
    shortHook: 'Auto-assign counsellors, follow-up reminders, enquiry tracking',
    lessonsCount: '5 Lessons',
    description:
      'Connect your website, landing pages and WhatsApp directly to your admissions CRM (NoPaperForms, Meritto, LeadSquared, Zoho, HubSpot or custom counsellor boards).',
    bullets: [
      'Round-robin or stream-wise automatic lead assignment to admission counsellors',
      'Automated WhatsApp & email follow-up sequences for brochure downloaders',
      'Source-wise ROI tracking showing which campaigns produce actual enrolments',
    ],
  },
  {
    id: 'mod-09',
    moduleNo: 'Module 09',
    title: 'Student & Parent Portals',
    shortHook: 'Results, attendance, fees and announcements',
    lessonsCount: '4 Lessons',
    description:
      'Give students and parents a single, secure login to check timetables, attendance, exam report cards, fee receipts, homework and campus circulars.',
    bullets: [
      'One-click online tuition, transport and hostel fee payment with digital receipts',
      'Downloadable term report cards, attendance calendars and exam schedules',
      'Instant WhatsApp & portal notices for parents and batch students',
    ],
  },
  {
    id: 'mod-10',
    moduleNo: 'Module 10',
    title: 'Virtual Campus Tours',
    shortHook: '360° tours and video walkthroughs for remote students',
    lessonsCount: '3 Lessons',
    description:
      'Help outstation and international families experience your classrooms, laboratories, library, sports complex and hostels from their phone or laptop before visiting.',
    bullets: [
      'Interactive 360° hotspot walkthroughs of labs, auditoriums, hostels & campus',
      'Guided video tour chapters with embedded "Book an In-Person Visit" triggers',
      'Optimized to stream smoothly even on mid-range mobile devices',
    ],
  },
];

/* Section 6: LMS Preview — Mini Course Player Lessons & Quiz */
export interface LmsLessonItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  status: 'completed' | 'current' | 'locked';
}

const LMS_LESSONS: LmsLessonItem[] = [
  {
    id: 'les-1',
    number: '01',
    title: 'Introduction to Classical Mechanics & Force Vectors',
    duration: '14:20',
    status: 'completed',
  },
  {
    id: 'les-2',
    number: '02',
    title: 'Free-Body Diagrams & Equilibrium Systems',
    duration: '19:45',
    status: 'completed',
  },
  {
    id: 'les-3',
    number: '03',
    title: "Lesson 3: Newton's Laws of Motion",
    duration: '22:10',
    status: 'current',
  },
  {
    id: 'les-4',
    number: '04',
    title: 'Friction, Inclined Planes & Pulley Numericals',
    duration: '26:00',
    status: 'locked',
  },
  {
    id: 'les-5',
    number: '05',
    title: 'Circular Motion & Centripetal Acceleration Quiz',
    duration: '15:00',
    status: 'locked',
  },
];

const LMS_QUIZ = {
  question:
    'Quick Concept Check: If the net external force acting on a moving body is zero, what happens to its velocity?',
  options: [
    {
      id: 'opt-a',
      label: 'A',
      text: 'The body immediately comes to rest',
      isCorrect: false,
    },
    {
      id: 'opt-b',
      label: 'B',
      text: 'Its velocity remains constant in magnitude and direction',
      isCorrect: true,
    },
    {
      id: 'opt-c',
      label: 'C',
      text: 'It accelerates uniformly in the direction of motion',
      isCorrect: false,
    },
    {
      id: 'opt-d',
      label: 'D',
      text: 'Its mass decreases proportionally over time',
      isCorrect: false,
    },
  ],
  correctFeedback:
    "Correct! By Newton's First Law of Motion (Law of Inertia), zero net external force means zero acceleration, so velocity stays constant.",
  incorrectFeedback:
    "Not quite! Review Newton's First Law: when net external force F = 0, acceleration a = 0, meaning a moving object continues at constant velocity.",
};

const LMS_FEATURE_CHIPS = [
  'Video lessons',
  'Quizzes & assignments',
  'Certificates',
  'Mobile-friendly & low-bandwidth mode',
];

/* Section 7: Counsellor Kanban Columns & Initial Placeholder Leads */
export type KanbanStageKey =
  | 'New Enquiry'
  | 'Contacted'
  | 'Counselling Booked'
  | 'Applied'
  | 'Enrolled';

export const KANBAN_STAGES: KanbanStageKey[] = [
  'New Enquiry',
  'Contacted',
  'Counselling Booked',
  'Applied',
  'Enrolled',
];

export interface KanbanLeadCard {
  id: string;
  initials: string;
  studentTag: string;
  course: string;
  source: 'Google' | 'Website' | 'WhatsApp';
  timeAgo: string;
  stage: KanbanStageKey;
}

const INITIAL_KANBAN_LEADS: KanbanLeadCard[] = [
  {
    id: 'ld-101',
    initials: 'AR',
    studentTag: 'Applicant #408',
    course: 'B.Tech CSE (AI)',
    source: 'Google',
    timeAgo: '2 min ago',
    stage: 'New Enquiry',
  },
  {
    id: 'ld-102',
    initials: 'SK',
    studentTag: 'Parent Enquiry #409',
    course: 'Class 11 Science',
    source: 'WhatsApp',
    timeAgo: '5 min ago',
    stage: 'New Enquiry',
  },
  {
    id: 'ld-103',
    initials: 'PM',
    studentTag: 'Applicant #404',
    course: 'MBA Executive',
    source: 'Website',
    timeAgo: '12 min ago',
    stage: 'Contacted',
  },
  {
    id: 'ld-104',
    initials: 'VN',
    studentTag: 'Applicant #401',
    course: 'NEET 2-Yr Batch',
    source: 'Google',
    timeAgo: '18 min ago',
    stage: 'Contacted',
  },
  {
    id: 'ld-105',
    initials: 'DT',
    studentTag: 'Parent Enquiry #398',
    course: 'Grade 6 Admission',
    source: 'WhatsApp',
    timeAgo: 'Today, 4:30 PM',
    stage: 'Counselling Booked',
  },
  {
    id: 'ld-106',
    initials: 'KP',
    studentTag: 'Applicant #395',
    course: 'B.Des UI/UX',
    source: 'Website',
    timeAgo: 'Today, 5:00 PM',
    stage: 'Counselling Booked',
  },
  {
    id: 'ld-107',
    initials: 'RJ',
    studentTag: 'Applicant #389',
    course: 'Full-Stack Cohort',
    source: 'Google',
    timeAgo: 'Docs Verified',
    stage: 'Applied',
  },
  {
    id: 'ld-108',
    initials: 'MG',
    studentTag: 'Applicant #384',
    course: 'CA Foundation',
    source: 'Website',
    timeAgo: 'Fee Link Sent',
    stage: 'Applied',
  },
  {
    id: 'ld-109',
    initials: 'NS',
    studentTag: 'Student #377',
    course: 'B.Tech CSE (AI)',
    source: 'WhatsApp',
    timeAgo: 'Fee Paid ✓',
    stage: 'Enrolled',
  },
  {
    id: 'ld-110',
    initials: 'TH',
    studentTag: 'Student #372',
    course: 'MBA Executive',
    source: 'Google',
    timeAgo: 'Batch Assigned ✓',
    stage: 'Enrolled',
  },
];

/* Section 8: Trust, Safety & Access — Notice Board (6 Pinned Notices) */
export interface NoticeBoardItem {
  id: string;
  noticeCode: string;
  title: string;
  description: string;
  isStickyTint: boolean;
  rotationClass: string;
}

const NOTICE_BOARD_ITEMS: NoticeBoardItem[] = [
  {
    id: 'nt-1',
    noticeCode: 'NOTICE 01 · PRIVACY',
    title: 'Student Data Protected',
    description: 'Secure forms and portals; minimum data collected',
    isStickyTint: false,
    rotationClass: 'lg:-rotate-1',
  },
  {
    id: 'nt-2',
    noticeCode: 'NOTICE 02 · DPDP ACT',
    title: 'Parental Consent Ready',
    description:
      "Consent flows for students under 18, built with India's DPDP Act in mind",
    isStickyTint: true,
    rotationClass: 'lg:rotate-1',
  },
  {
    id: 'nt-3',
    noticeCode: 'NOTICE 03 · SPEED',
    title: 'Works on Any Phone',
    description: 'Light, fast pages for low-end devices and slow networks',
    isStickyTint: false,
    rotationClass: 'lg:-rotate-1',
  },
  {
    id: 'nt-4',
    noticeCode: 'NOTICE 04 · LANGUAGES',
    title: 'Multilingual',
    description:
      'English, Hindi and regional languages for students and parents',
    isStickyTint: true,
    rotationClass: 'lg:rotate-1',
  },
  {
    id: 'nt-5',
    noticeCode: 'NOTICE 05 · INCLUSIVITY',
    title: 'Accessible for All',
    description: 'Readable text, clear navigation, screen-reader friendly',
    isStickyTint: false,
    rotationClass: 'lg:-rotate-1',
  },
  {
    id: 'nt-6',
    noticeCode: 'NOTICE 06 · TRANSPARENCY',
    title: 'Honest Claims',
    description:
      'Results and placement claims shown clearly with proper context',
    isStickyTint: false,
    rotationClass: 'lg:rotate-1',
  },
];

/* Section 9: Case Study — The Report Card */
const REPORT_CARD_DATA = {
  instituteName: 'Apex Horizon Institute of Science & Management (Placeholder)',
  type: 'Multi-Campus Coaching & Degree Institute (Placeholder)',
  city: 'Pune & Online (Placeholder)',
  duration: '1 Admission Cycle · 4 Months (Placeholder)',
  rows: [
    {
      subject: 'Admission enquiries / month',
      before: '300',
      after: '960',
      grade: 'A+',
    },
    {
      subject: 'Cost per enquiry',
      before: '₹650',
      after: '₹310',
      grade: 'A',
    },
    {
      subject: 'Enquiry response time',
      before: '1 day',
      after: '5 min',
      grade: 'A+',
    },
    {
      subject: 'Applications completed',
      before: '22%',
      after: '48%',
      grade: 'A',
    },
    {
      subject: 'Website speed (mobile)',
      before: '6.1s',
      after: '1.8s',
      grade: 'A+',
    },
  ],
  teachersRemarks:
    'WebXCode transformed our admission season. Parents can find courses in seconds, our AI WhatsApp counsellor answers fee and scholarship questions at midnight, and our counsellors now close 3x more enrolments.',
  principalSignature: 'Dr. S. K. Deshmukh (Placeholder)',
  principalRole: 'Dean of Admissions, Apex Horizon Institute',
};

/* Section 10: FAQ — The Question Paper (Q1–Q6) */
const EXAM_FAQS = [
  {
    id: 'q1',
    qNo: 'Q1',
    marks: '[10 marks]',
    question:
      'Can you build an online admission form with document upload and fee payment?',
    answer:
      'Yes. We build mobile-friendly, multi-step online admission applications with OTP verification, save-and-resume progress, marksheet/ID document uploads, automatic application numbering, and integrated fee payment via UPI, credit/debit cards, netbanking and EMI providers (Razorpay, PayU, Cashfree, Easebuzz, Stripe).',
  },
  {
    id: 'q2',
    qNo: 'Q2',
    marks: '[10 marks]',
    question:
      'Do you build LMS platforms or integrate with existing ones (Moodle, etc.)?',
    answer:
      'Both. We can build a custom, white-labelled LMS tailored to your exact teaching workflow (video courses, live classes, test series, assignments and certificates) OR integrate your marketing website and student portal seamlessly with Moodle, Canvas, Graphy, Teachable, Thinkific or custom SCORM back-ends.',
  },
  {
    id: 'q3',
    qNo: 'Q3',
    marks: '[10 marks]',
    question:
      'Can the AI counsellor answer fee and eligibility questions on WhatsApp?',
    answer:
      'Yes. Our AI Admission Counsellor works 24/7 on your website and official WhatsApp Business number. It is trained on your prospectus to answer questions on eligibility, fee structures, scholarships, hostel facilities and batch timings in English, Hindi and regional languages—while automatically booking counselling calls and pushing leads into your CRM.',
  },
  {
    id: 'q4',
    qNo: 'Q4',
    marks: '[10 marks]',
    question: 'How do you get more enquiries during admission season?',
    answer:
      'We combine three engines: (1) high-converting course & admission landing pages with interactive course finders, (2) Education SEO & AEO so you rank for course, exam and "best institute in [city]" searches, and (3) season-focused Google Search & Performance Max campaigns tracked all the way to counsellor calls and completed applications.',
  },
  {
    id: 'q5',
    qNo: 'Q5',
    marks: '[10 marks]',
    question: 'How do you keep student and parent data safe?',
    answer:
      "We build all forms, admission portals and student dashboards with strict HTTPS encryption, role-based access control, minimal data collection and explicit parental consent workflows for minors designed with India's Digital Personal Data Protection (DPDP) Act and global student privacy standards in mind.",
  },
  {
    id: 'q6',
    qNo: 'Q6',
    marks: '[10 marks]',
    question:
      'Can you make our website work well on low-end phones and slow internet?',
    answer:
      'Absolutely. Many students and parents browse from Tier-2/3 towns or on budget Android devices over 4G networks. We engineer lightweight pages, compressed next-gen visuals, instant-loading mobile layouts and low-bandwidth course players that load in under 2 seconds.',
  },
];

/* Section 11: Institution Types for Admission Form CTA */
const INSTITUTION_TYPE_CHIPS = [
  'School',
  'College/University',
  'Coaching',
  'EdTech',
  'Online Courses',
  'Other',
];

/* Helper Icon Renderer for Section 2 Timetable Cells */
function TimetableSegmentIcon({
  iconKey,
  className = 'w-5 h-5',
}: {
  iconKey: TimetableCellItem['iconKey'];
  className?: string;
}) {
  switch (iconKey) {
    case 'school':
      return <School className={className} />;
    case 'university':
      return <GraduationCap className={className} />;
    case 'coaching':
      return <Target className={className} />;
    case 'edtech':
      return <Laptop className={className} />;
    case 'creator':
      return <Play className={className} />;
    case 'vocational':
      return <Award className={className} />;
    case 'preschool':
      return <Baby className={className} />;
    case 'abroad':
      return <Globe className={className} />;
    case 'corporate':
      return <Briefcase className={className} />;
    default:
      return <BookOpen className={className} />;
  }
}

/* ============================================================================
   MAIN EDUCATION & EDTECH INDUSTRY PAGE COMPONENT
============================================================================ */
const EducationEdtech: React.FC<{
  onOpenQuoteModal: (service?: string) => void;
}> = ({ onOpenQuoteModal }) => {
  const prefersReducedMotion = useReducedMotion();

  /* Section 2: Timetable Auto-Cycling Current Period + Selected Cell */
  const [currentPeriodIdx, setCurrentPeriodIdx] = useState<number>(0);
  const [selectedTimetableId, setSelectedTimetableId] =
    useState<string>('tt-mon-1');
  const [userPinnedTimetable, setUserPinnedTimetable] =
    useState<boolean>(false);

  /* Section 3: Board Game Path Active Token Position (1 to 12) */
  const [activeTokenStep, setActiveTokenStep] = useState<number>(4);

  /* Section 4: Course Finder State */
  const [selectedInterest, setSelectedInterest] = useState<
    (typeof COURSE_INTEREST_OPTIONS)[number]
  >('All Interests');
  const [selectedLevel, setSelectedLevel] =
    useState<(typeof COURSE_LEVEL_OPTIONS)[number]>('All Levels');
  const [selectedMode, setSelectedMode] =
    useState<(typeof COURSE_MODE_OPTIONS)[number]>('All Modes');
  const [budgetMaxInr, setBudgetMaxInr] = useState<number>(300000); // ₹10K – ₹5L slider default ₹3L

  /* Inline Brochure Lead Form State inside Course Finder */
  const [activeBrochureCourseId, setActiveBrochureCourseId] = useState<
    string | null
  >(null);
  const [brochureForm, setBrochureForm] = useState({
    name: '',
    phone: '',
    city: '',
  });
  const [brochureError, setBrochureError] = useState<string>('');
  const [brochureSentCourseIds, setBrochureSentCourseIds] = useState<string[]>(
    []
  );

  /* Section 5: Syllabus Accordion Open Module ID */
  const [openModuleId, setOpenModuleId] = useState<string>('mod-01');

  /* Section 6: LMS Mini Course Player & Interactive Quiz State */
  const [selectedLessonId, setSelectedLessonId] = useState<string>('les-3');
  const [selectedQuizOptionId, setSelectedQuizOptionId] = useState<
    string | null
  >(null);

  /* Section 7: Counsellor Kanban Animated Lead Cards */
  const [kanbanLeads, setKanbanLeads] =
    useState<KanbanLeadCard[]>(INITIAL_KANBAN_LEADS);
  const [lastMovedLeadId, setLastMovedLeadId] = useState<string>('ld-101');

  /* Section 10: Exam Question Paper FAQ Accordion State */
  const [openFaqId, setOpenFaqId] = useState<string>('q1');

  /* Section 11: Admission Growth Audit Form State */
  const [auditForm, setAuditForm] = useState({
    name: '',
    designation: '',
    institutionName: '',
    email: '',
    phone: '',
    websiteUrl: '',
    institutionType: 'College/University',
  });
  const [auditErrors, setAuditErrors] = useState<{
    name?: string;
    designation?: string;
    institutionName?: string;
    email?: string;
    phone?: string;
    websiteUrl?: string;
  }>({});
  const [auditSubmitting, setAuditSubmitting] = useState<boolean>(false);
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);

  /* SEO Document Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Education & EdTech Website Development, Admissions Marketing & LMS | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'We build high-converting websites, admission funnels, LMS platforms, education SEO and 24/7 WhatsApp AI counsellors for schools, colleges, coaching institutes and EdTech brands.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 2: Auto-Cycle "Current Period" Highlight Cell by Cell Slowly */
  useEffect(() => {
    if (prefersReducedMotion || userPinnedTimetable) return;
    const interval = setInterval(() => {
      setCurrentPeriodIdx((prev) => {
        const next = (prev + 1) % TIMETABLE_SEGMENTS.length;
        setSelectedTimetableId(TIMETABLE_SEGMENTS[next].id);
        return next;
      });
    }, 3400);
    return () => clearInterval(interval);
  }, [prefersReducedMotion, userPinnedTimetable]);

  /* Section 3: Board Game Token Climbs Ladders & Advances Along the Path */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const sequence = [1, 2, 3, 4, 7, 5, 7, 6, 9, 10, 11, 12];
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % sequence.length;
      setActiveTokenStep(sequence[idx]);
    }, 2200);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  /* Section 7: Counsellor Kanban Auto-Moves One Card to the Next Stage Every Few Seconds */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const moveOrder = ['ld-101', 'ld-103', 'ld-105', 'ld-107', 'ld-102'];
    let ptr = 0;

    const timer = setInterval(() => {
      const targetId = moveOrder[ptr % moveOrder.length];
      ptr += 1;

      setKanbanLeads((prev) =>
        prev.map((lead) => {
          if (lead.id !== targetId) return lead;
          const currentStageIdx = KANBAN_STAGES.indexOf(lead.stage);
          const nextStage =
            KANBAN_STAGES[(currentStageIdx + 1) % KANBAN_STAGES.length];
          return {
            ...lead,
            stage: nextStage,
            timeAgo: 'Just updated',
          };
        })
      );
      setLastMovedLeadId(targetId);
    }, 3600);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  /* Section 2: Active Timetable Segment */
  const activeTimetableSegment =
    TIMETABLE_SEGMENTS.find((item) => item.id === selectedTimetableId) ||
    TIMETABLE_SEGMENTS[0];

  /* Section 4: Course Finder Live Filter */
  const filteredCourses = SAMPLE_COURSES.filter((course) => {
    const matchInterest =
      selectedInterest === 'All Interests' ||
      course.interest === selectedInterest;
    const matchLevel =
      selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchMode =
      selectedMode === 'All Modes' || course.mode === selectedMode;
    const matchBudget = course.annualFeeNumeric <= budgetMaxInr;
    return matchInterest && matchLevel && matchMode && matchBudget;
  });

  // Always show 2-3 courses (if strict filter yields 0, fallback to top 2 closest by budget)
  const displayedCourses =
    filteredCourses.length > 0
      ? filteredCourses.slice(0, 3)
      : SAMPLE_COURSES.slice(0, 2);

  const formatBudgetLabel = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)}L`;
    }
    return `₹${Math.round(val / 1000)}K`;
  };

  const handleBrochureFormSubmit = (e: React.FormEvent, courseId: string) => {
    e.preventDefault();
    if (
      !brochureForm.name.trim() ||
      !brochureForm.phone.trim() ||
      !brochureForm.city.trim()
    ) {
      setBrochureError('Please enter your Name, Phone and City.');
      return;
    }
    setBrochureError('');
    setBrochureSentCourseIds((prev) =>
      prev.includes(courseId) ? prev : [...prev, courseId]
    );
    setBrochureForm({ name: '', phone: '', city: '' });
  };

  /* Section 6: LMS Quiz Selection & Progress Ring Calculation */
  const selectedQuizOption = LMS_QUIZ.options.find(
    (o) => o.id === selectedQuizOptionId
  );
  // Base progress is 42%; selecting an answer increases the progress ring slightly (to 50% or 56% if correct)
  const lmsProgressPct = selectedQuizOption
    ? selectedQuizOption.isCorrect
      ? 56
      : 48
    : 42;

  const activeLmsLesson =
    LMS_LESSONS.find((l) => l.id === selectedLessonId) || LMS_LESSONS[2];

  /* Section 11: Submit Handler for Free Admission Growth Audit Form */
  const handleAdmissionAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: {
      name?: string;
      designation?: string;
      institutionName?: string;
      email?: string;
      phone?: string;
      websiteUrl?: string;
    } = {};

    if (!auditForm.name.trim()) {
      errors.name = 'Please enter your full name.';
    }
    if (!auditForm.designation.trim()) {
      errors.designation = 'Please enter your role or designation.';
    }
    if (!auditForm.institutionName.trim()) {
      errors.institutionName = 'Please enter your institution or brand name.';
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
    if (!auditForm.websiteUrl.trim()) {
      errors.websiteUrl = 'Please enter your website URL (or "New Campus").';
    }

    setAuditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setAuditSubmitting(true);
    // TODO: Connect Free Admission Growth Audit application form to backend CRM / admissions pipeline
    setTimeout(() => {
      setAuditSubmitting(false);
      setAuditSubmitted(true);
    }, 600);
  };

  const otherIndustries = industries.filter(
    (ind) => ind.slug !== 'education-edtech'
  );

  /* JSON-LD Structured Data (Service, BreadcrumbList, FAQPage) */
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Education & EdTech Website Development, Admissions Marketing & LMS',
      serviceType:
        'School, College & University Website Development, Admission Funnels, LMS & E-learning Platforms, EdTech Product Development, Education SEO & AI Admission Counsellors',
      audience: {
        '@type': 'Audience',
        audienceType:
          'schools, colleges, coaching institutes and EdTech companies',
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
          name: educationIndustry.name,
          item: 'https://webxcode.com/industries/education-edtech',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: EXAM_FAQS.map((faq) => ({
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

      {/* Scoped Classroom & Chalkboard Animations (Strictly #0571c2, #1e242e, #ffffff) */}
      <style>{`
        @keyframes chalkStrokeDraw {
          0% { stroke-dashoffset: 320; opacity: 0.2; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes chalkFloatPulse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .chalk-draw-line {
          stroke-dasharray: 320;
          stroke-dashoffset: 0;
          animation: chalkStrokeDraw 1.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .chalk-doodle-float {
          animation: chalkFloatPulse 5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .chalk-draw-line,
          .chalk-doodle-float {
            animation: none !important;
          }
        }
      `}</style>

      {/* ====================================================================
          1. HERO — THE CHALKBOARD (navy, 55/45 split)
      ==================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden border-b-8 border-white/15">
        {/* Subtle Chalk-Dust Texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-12 w-[520px] h-[520px] blue-glow-strong pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-[460px] h-[460px] blue-glow pointer-events-none"
        />

        {/* Chalkboard Inner Frame Border (Drawn in Slightly Lighter Navy/White Tint) */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-4 lg:inset-6 rounded-[28px] border-4 border-white/12 pointer-events-none"
        />

        {/* Hand-Drawn Blue Chalk Doodles Around the Chalkboard (Reduced on Mobile) */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none inset-0 absolute overflow-hidden"
        >
          {/* Top-Left Doodle: Atom Symbol */}
          <div className="hidden md:block chalk-doodle-float absolute top-10 left-12 opacity-30">
            <svg width="74" height="74" viewBox="0 0 74 74" fill="none">
              <ellipse
                cx="37"
                cy="37"
                rx="30"
                ry="12"
                transform="rotate(30 37 37)"
                stroke="#0571c2"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <ellipse
                cx="37"
                cy="37"
                rx="30"
                ry="12"
                transform="rotate(-30 37 37)"
                stroke="#0571c2"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <circle cx="37" cy="37" r="4.5" fill="#0571c2" />
            </svg>
          </div>

          {/* Top-Center Doodle: E = mc² + A+ Badge */}
          <div className="hidden lg:flex items-center gap-6 absolute top-11 left-[44%] opacity-35 font-caveat text-[26px] font-bold text-primary -rotate-3">
            <span>E = mc²</span>
            <span className="px-2.5 py-0.5 rounded-full border-2 border-dashed border-primary text-[22px]">
              A+
            </span>
          </div>

          {/* Bottom-Left Doodle: Simple Upward Graph Line */}
          <div className="hidden md:block absolute bottom-14 left-14 opacity-30">
            <svg width="120" height="58" viewBox="0 0 120 58" fill="none">
              <path
                d="M8 50 L8 8 M8 50 L112 50"
                stroke="#ffffff"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M16 44 L42 34 L68 38 L104 12"
                stroke="#0571c2"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="4 3"
              />
              <circle cx="104" cy="12" r="4" fill="#0571c2" />
            </svg>
          </div>

          {/* Top-Right Doodle: Lightbulb Sketch */}
          <div className="hidden xl:block chalk-doodle-float absolute top-12 right-14 opacity-30">
            <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
              <path
                d="M28 10 C17 10 10 18 10 28 C10 35 15 40 19 45 L37 45 C41 40 46 35 46 28 C46 18 39 10 28 10 Z"
                stroke="#0571c2"
                strokeWidth="2.2"
                strokeDasharray="4 3"
              />
              <path
                d="M21 51 H35 M23 56 H33"
                stroke="#ffffff"
                strokeOpacity="0.6"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* 55/45 Split (7 cols Left / 5 cols Right on lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 55% (7 cols): Chalkboard Pitch */}
            <div className="lg:col-span-7">
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
                  {educationIndustry.name}
                </span>
              </nav>

              {/* Section Label Pill */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em]">
                  <GraduationCap className="w-3.5 h-3.5 text-primary" />
                  <span>EDUCATION &amp; EDTECH</span>
                </span>
              </div>

              {/* H1 with Hand-Drawn Blue Chalk Underline Under "More Enrolments." */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
                More Enquiries. Faster Follow-ups.{' '}
                <span className="relative inline-block text-primary pb-2">
                  More Enrolments.
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 320 16"
                    className="absolute left-0 -bottom-0.5 w-full h-3.5 overflow-visible"
                  >
                    <path
                      d="M4 11 Q 160 3 316 10"
                      fill="none"
                      stroke="#0571c2"
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      className="chalk-draw-line"
                    />
                  </svg>
                </span>
              </h1>

              {/* Paragraph */}
              <p className="text-[16px] sm:text-[18px] text-white/75 leading-relaxed mb-8 max-w-2xl">
                We build websites, admission funnels, learning platforms and AI
                counsellors for schools, colleges, coaching institutes and
                EdTech brands — so the right students find you and enrol.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#admission-audit"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <span>Get a Free Admission Growth Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#course-finder"
                  className="px-6 py-4 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 text-white font-extrabold text-[15px] transition-all inline-flex items-center gap-2"
                >
                  <span>Try the Course Finder</span>
                </a>
              </div>
            </div>

            {/* Right 45% (5 cols): Phone Mockup Showing Mobile Admission Page + Floating Glass Notifications */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-[380px] lg:max-w-none">
                {/* Phone Frame */}
                <div className="relative mx-auto w-full max-w-[330px] rounded-[36px] bg-navy border-4 border-white/25 p-3 shadow-2xl">
                  {/* Phone Top Speaker Notch */}
                  <div className="w-24 h-1.5 rounded-full bg-white/20 mx-auto mb-2.5" />

                  {/* Phone Screen: Institute Mobile Admission Page */}
                  <div className="rounded-[26px] bg-white text-navy overflow-hidden border border-navy-08">
                    {/* Campus Header Banner */}
                    <div className="relative h-36 bg-navy">
                      <img
                        src={IMG_CAMPUS_HERO}
                        alt="Students and faculty collaborating on a modern university campus"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase tracking-wider">
                          Admissions Open 2026–27
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-navy/85 text-white font-mono text-[10px] font-bold">
                          NAAC A+
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[15px] font-extrabold leading-tight">
                          Horizon Global University
                        </div>
                        <div className="text-[11px] text-white/80">
                          UG · PG · Integrated Programs
                        </div>
                      </div>
                    </div>

                    {/* Screen Body */}
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2.5 rounded-xl bg-primary-50/60 border border-primary-100">
                          <span className="block font-mono text-[9px] font-extrabold uppercase text-primary">
                            SCHOLARSHIPS
                          </span>
                          <span className="text-[12px] font-extrabold text-navy">
                            Up to 100% Merit
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-primary-50/60 border border-primary-100">
                          <span className="block font-mono text-[9px] font-extrabold uppercase text-primary">
                            AI COUNSELLOR
                          </span>
                          <span className="text-[12px] font-extrabold text-navy">
                            Instant Reply 24/7
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-navy-15 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-navy-50">
                            Next Entrance &amp; Counselling Slot
                          </div>
                          <div className="text-[13px] font-extrabold text-navy">
                            Today · 5:00 PM (Online / Campus)
                          </div>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      </div>

                      <a
                        href="#admission-audit"
                        className="w-full py-3 rounded-full bg-primary text-white font-extrabold text-[13px] flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3 Floating Glass Notifications Appearing One by One */}
                <div className="mt-4 space-y-2.5 lg:mt-0">
                  {HERO_NOTIFICATIONS.map((notif, idx) => {
                    const desktopPos =
                      idx === 0
                        ? 'lg:absolute lg:-left-10 lg:top-8 lg:w-[270px]'
                        : idx === 1
                        ? 'lg:absolute lg:-right-6 lg:top-1/2 lg:-translate-y-1/2 lg:w-[265px]'
                        : 'lg:absolute lg:-left-8 lg:bottom-6 lg:w-[275px]';

                    return (
                      <motion.div
                        key={notif.id}
                        initial={
                          prefersReducedMotion ? false : { opacity: 0, y: 12 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.25, duration: 0.35 }}
                        className={`${desktopPos} z-20 rounded-2xl bg-navy/90 backdrop-blur-md border border-primary/50 p-3 shadow-xl flex items-start gap-2.5`}
                      >
                        <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <div className="text-[12px] font-extrabold text-white leading-snug">
                            {notif.title}
                          </div>
                          <div className="text-[10px] font-mono text-white/70">
                            {notif.meta}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Chalkboard Ledge with a Blue Chalk Stick and Duster */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-5 bg-white/10 border-t border-white/20 flex items-center justify-center gap-8"
        >
          {/* Blue Chalk Stick */}
          <div className="w-16 h-2 rounded-full bg-primary shadow-sm border border-white/40" />
          {/* White Chalk Piece */}
          <div className="w-10 h-2 rounded-full bg-white/85" />
          {/* Chalkboard Duster (Navy + Primary Felt Block) */}
          <div className="w-20 h-3.5 -mt-1.5 rounded-t-md bg-navy border-2 border-white/30 overflow-hidden flex flex-col">
            <span className="h-1.5 w-full bg-primary" />
            <span className="h-2 w-full bg-white/30" />
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. WHO WE SERVE — THE TIMETABLE (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHO WE WORK WITH
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              On <span className="text-primary">Everyone&apos;s Timetable</span>
            </h2>
          </div>

          {/* Desktop & Tablet School Timetable Table (Semantic <table> with <th scope>) */}
          <div className="hidden md:block rounded-[24px] border-2 border-navy overflow-hidden shadow-xl mb-6">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-navy text-white font-mono text-[12px] uppercase tracking-wider">
                  <th
                    scope="col"
                    className="py-4 px-5 w-[130px] border-r border-white/15"
                  >
                    DAY / BELL
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-5 border-r border-white/15"
                  >
                    <div className="flex items-center justify-between">
                      <span>Period 1</span>
                      <span className="text-primary font-bold">
                        09:00 – 10:00
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-4 px-5 border-r border-white/15"
                  >
                    <div className="flex items-center justify-between">
                      <span>Period 2</span>
                      <span className="text-primary font-bold">
                        10:00 – 11:00
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="py-4 px-5">
                    <div className="flex items-center justify-between">
                      <span>Period 3</span>
                      <span className="text-primary font-bold">
                        11:00 – 12:00
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-15">
                {(['Mon', 'Tue', 'Wed'] as const).map((dayCode) => {
                  const rowCells = TIMETABLE_SEGMENTS.filter(
                    (c) => c.day === dayCode
                  );
                  return (
                    <tr key={dayCode} className="divide-x divide-navy-15">
                      <th
                        scope="row"
                        className="py-5 px-5 bg-primary-50/40 font-mono text-[14px] font-extrabold text-navy align-middle"
                      >
                        <span className="block text-primary text-[11px] uppercase">
                          DAY
                        </span>
                        <span>{dayCode}</span>
                      </th>
                      {rowCells.map((cell) => {
                        const isSelected = selectedTimetableId === cell.id;
                        const isAutoCurrent =
                          TIMETABLE_SEGMENTS[currentPeriodIdx]?.id === cell.id;

                        return (
                          <td
                            key={cell.id}
                            className="p-0 align-stretch transition-colors"
                          >
                            <button
                              type="button"
                              onMouseEnter={() => {
                                setUserPinnedTimetable(true);
                                setSelectedTimetableId(cell.id);
                              }}
                              onClick={() => {
                                setUserPinnedTimetable(true);
                                setSelectedTimetableId(cell.id);
                              }}
                              className={`w-full h-full p-5 text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                                isSelected
                                  ? 'bg-primary text-white'
                                  : isAutoCurrent
                                  ? 'bg-primary-50/80 text-navy border-l-4 border-primary'
                                  : 'bg-white text-navy hover:bg-primary-50/50'
                              }`}
                            >
                              <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span
                                    className={`font-mono text-[10px] font-extrabold uppercase tracking-wider ${
                                      isSelected
                                        ? 'text-white/85'
                                        : 'text-primary'
                                    }`}
                                  >
                                    {cell.period}
                                  </span>
                                  {isAutoCurrent && (
                                    <span
                                      className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-extrabold uppercase ${
                                        isSelected
                                          ? 'bg-white text-primary'
                                          : 'bg-primary text-white'
                                      }`}
                                    >
                                      CURRENT PERIOD
                                    </span>
                                  )}
                                </div>
                                <h3
                                  className={`text-[18px] font-extrabold leading-snug ${
                                    isSelected ? 'text-white' : 'text-navy'
                                  }`}
                                >
                                  {cell.title}
                                </h3>
                              </div>

                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-primary-50 text-primary'
                                }`}
                              >
                                <TimetableSegmentIcon iconKey={cell.iconKey} />
                              </div>
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Vertical List Grouped by Day */}
          <div className="md:hidden space-y-5 mb-6">
            {(['Mon', 'Tue', 'Wed'] as const).map((dayCode) => {
              const dayItems = TIMETABLE_SEGMENTS.filter(
                (c) => c.day === dayCode
              );
              return (
                <div
                  key={dayCode}
                  className="rounded-2xl border border-navy-15 overflow-hidden bg-white shadow-sm"
                >
                  <div className="bg-navy text-white px-4 py-2.5 font-mono text-[12px] font-extrabold uppercase flex items-center justify-between">
                    <span>{dayItems[0]?.dayFull} Timetable</span>
                    <span className="text-primary">3 Periods</span>
                  </div>
                  <div className="divide-y divide-navy-08">
                    {dayItems.map((cell) => {
                      const isSelected = selectedTimetableId === cell.id;
                      return (
                        <button
                          key={cell.id}
                          type="button"
                          onClick={() => {
                            setUserPinnedTimetable(true);
                            setSelectedTimetableId(cell.id);
                          }}
                          className={`w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-white'
                              : 'bg-white text-navy'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-primary-50 text-primary'
                              }`}
                            >
                              <TimetableSegmentIcon
                                iconKey={cell.iconKey}
                                className="w-4 h-4"
                              />
                            </span>
                            <div>
                              <span
                                className={`block font-mono text-[10px] font-bold uppercase ${
                                  isSelected ? 'text-white/80' : 'text-primary'
                                }`}
                              >
                                {cell.period} · {cell.timeSlot}
                              </span>
                              <span className="text-[16px] font-extrabold">
                                {cell.title}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail Panel Below Timetable: One-Line Description + 2 Solution Chips */}
          <div
            aria-live="polite"
            className="rounded-[22px] bg-primary-50/60 border-2 border-primary p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                <TimetableSegmentIcon
                  iconKey={activeTimetableSegment.iconKey}
                  className="w-6 h-6"
                />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    {activeTimetableSegment.dayFull} ·{' '}
                    {activeTimetableSegment.period}
                  </span>
                  <h3 className="text-[20px] font-extrabold text-navy">
                    {activeTimetableSegment.title}
                  </h3>
                </div>
                <p className="text-[15px] text-navy-70 font-medium leading-relaxed">
                  {activeTimetableSegment.description}
                </p>
              </div>
            </div>

            {/* 2 Solution Chips */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {activeTimetableSegment.solutions.map((sol) => (
                <span
                  key={sol}
                  className="px-4 py-2 rounded-full bg-white border border-primary text-primary text-[13px] font-extrabold inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{sol}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. THE ADMISSION JOURNEY — BOARD GAME PATH (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary/25 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              ENQUIRY TO ENROLMENT
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Help Students Reach{' '}
              <span className="text-primary">&apos;Enrolled&apos; Faster</span>
            </h2>
          </div>

          {/* Screen-Reader Accessible Text List Alternative for the Board Game Path */}
          <ol className="sr-only">
            {BOARD_GAME_PATH_STEPS.map((tile) => (
              <li key={tile.step}>
                Step {tile.step}: {tile.label} — {tile.detail}.
                {tile.ladderTo
                  ? ` Shortcut ladder to Step ${tile.ladderTo.targetStep} (${tile.ladderTo.targetName}): ${tile.ladderTo.shortcutNote}.`
                  : ''}
              </li>
            ))}
          </ol>

          {/* Board Game Container */}
          <div
            aria-hidden="true"
            className="rounded-[28px] bg-white p-5 sm:p-8 border-2 border-navy shadow-xl relative overflow-hidden"
          >
            {/* Board Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-navy-08">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-extrabold uppercase tracking-wider">
                  ADMISSION LADDERS BOARD
                </span>
                <span className="text-[13px] font-bold text-navy-70">
                  Click any square to move the blue student token
                </span>
              </div>

              {/* Active Token Indicator */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary/30 text-[12px] font-extrabold text-primary">
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span>
                  Token on Tile #{activeTokenStep}:{' '}
                  {
                    BOARD_GAME_PATH_STEPS.find(
                      (s) => s.step === activeTokenStep
                    )?.label
                  }
                </span>
              </div>
            </div>

            {/* 12 Numbered Square Tiles Winding Path (4 cols on lg, 2 cols on sm, 1 col zig-zag on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {BOARD_GAME_PATH_STEPS.map((tile) => {
                const isTokenHere = activeTokenStep === tile.step;
                const isFinish = tile.step === 12;
                const hasLadder = Boolean(tile.ladderTo);

                return (
                  <div
                    key={tile.step}
                    onClick={() => setActiveTokenStep(tile.step)}
                    className={`rounded-2xl p-4 border-2 transition-all cursor-pointer flex flex-col justify-between min-h-[148px] relative ${
                      isTokenHere
                        ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]'
                        : isFinish
                        ? 'bg-navy text-white border-navy'
                        : hasLadder
                        ? 'bg-primary-50/50 text-navy border-primary hover:bg-primary-50'
                        : 'bg-white text-navy border-navy-15 hover:border-primary'
                    }`}
                  >
                    {/* Top Row: Tile Number + START/FINISH Tag or Token */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`font-mono text-[12px] font-extrabold px-2.5 py-0.5 rounded-md ${
                          isTokenHere
                            ? 'bg-white text-primary'
                            : isFinish
                            ? 'bg-primary text-white'
                            : 'bg-primary-50 text-primary'
                        }`}
                      >
                        TILE {String(tile.step).padStart(2, '0')}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {tile.tag && (
                          <span
                            className={`font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              isTokenHere
                                ? 'bg-navy text-white'
                                : 'bg-primary text-white'
                            }`}
                          >
                            {tile.tag}
                          </span>
                        )}
                        {isFinish && (
                          <GraduationCap
                            className={`w-5 h-5 ${
                              isTokenHere ? 'text-white' : 'text-primary'
                            }`}
                          />
                        )}
                        {/* Animated Blue Game Token */}
                        {isTokenHere && (
                          <span className="w-7 h-7 rounded-full bg-white text-primary border-2 border-navy font-mono text-[10px] font-extrabold flex items-center justify-center shadow-md">
                            ★
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Tile Title & Short Detail */}
                    <div>
                      <h3
                        className={`text-[17px] font-extrabold leading-snug mb-1 ${
                          isTokenHere || isFinish ? 'text-white' : 'text-navy'
                        }`}
                      >
                        {tile.label}
                      </h3>
                      <p
                        className={`text-[12px] leading-snug ${
                          isTokenHere || isFinish
                            ? 'text-white/85'
                            : 'text-navy-70'
                        }`}
                      >
                        {tile.detail}
                      </p>
                    </div>

                    {/* Blue Ladder Connector Pill if this Tile Has a Shortcut Ladder */}
                    {tile.ladderTo && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTokenStep(tile.ladderTo!.targetStep);
                        }}
                        className={`mt-3 pt-2 border-t border-dashed flex items-center justify-between text-left text-[11px] font-extrabold cursor-pointer ${
                          isTokenHere
                            ? 'border-white/30 text-white'
                            : 'border-primary/40 text-primary'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1">
                          <span>🪜 LADDER → Tile 0{tile.ladderTo.targetStep}:</span>
                          <span className="underline">
                            {tile.ladderTo.shortcutNote}
                          </span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 3 Highlighted Blue Ladders Legend Strip */}
            <div className="mt-6 pt-5 border-t border-navy-08 grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {[
                {
                  from: 'Ask Questions (Tile 05)',
                  to: 'Book Counselling (Tile 07)',
                  targetStep: 7,
                  note: 'AI counsellor answers instantly',
                },
                {
                  from: 'Wait for Reply (Tile 06)',
                  to: 'Apply (Tile 09)',
                  targetStep: 9,
                  note: 'WhatsApp follow-ups in minutes',
                },
                {
                  from: 'Download Brochure (Tile 04)',
                  to: 'Book Counselling (Tile 07)',
                  targetStep: 7,
                  note: 'Smart forms with auto-scheduling',
                },
              ].map((ladder) => (
                <div
                  key={ladder.from}
                  onClick={() => setActiveTokenStep(ladder.targetStep)}
                  className="p-3.5 rounded-2xl bg-primary-50/70 border border-primary/35 hover:border-primary flex items-start gap-3 cursor-pointer transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary text-white font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0">
                    🪜
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-extrabold uppercase text-primary">
                      {ladder.from} → {ladder.to}
                    </div>
                    <div className="text-[13px] font-extrabold text-navy">
                      {ladder.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 text-center text-[15px] font-extrabold text-navy">
            Every ladder is a day saved in the admission cycle.
          </p>
        </div>
      </section>

      {/* ====================================================================
          4. COURSE FINDER — INTERACTIVE DEMO (white, #course-finder)
      ==================================================================== */}
      <section
        id="course-finder"
        className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TRY IT
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight mb-3">
              Help Students Find{' '}
              <span className="text-primary">the Right Course</span>
            </h2>
            <p className="text-[16px] text-navy-70 font-medium">
              A course finder guides students and captures high-intent
              enquiries. Try the demo.
            </p>
          </div>

          {/* Split Layout: Left 4 Quick Selectors (5 cols) | Right Matching Course Cards (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left (5 cols): 4 Quick Selectors */}
            <div className="lg:col-span-5 rounded-[24px] bg-white p-6 sm:p-7 border-2 border-navy-15 shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-navy-08">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                    INTERACTIVE COURSE FILTER
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedInterest('All Interests');
                    setSelectedLevel('All Levels');
                    setSelectedMode('All Modes');
                    setBudgetMaxInr(300000);
                  }}
                  className="text-[12px] font-extrabold text-primary underline cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>

              {/* 1. Interest Chips */}
              <div>
                <span className="block text-[13px] font-extrabold text-navy mb-2">
                  1. Interest Stream
                </span>
                <div
                  role="group"
                  aria-label="Filter by interest stream"
                  className="flex flex-wrap gap-2"
                >
                  {COURSE_INTEREST_OPTIONS.map((interest) => {
                    const active = selectedInterest === interest;
                    return (
                      <button
                        key={interest}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-[12px] font-extrabold border transition-all cursor-pointer ${
                          active
                            ? 'bg-primary text-white border-primary shadow-2xs'
                            : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Level Chips */}
              <div>
                <span className="block text-[13px] font-extrabold text-navy mb-2">
                  2. Study Level
                </span>
                <div
                  role="group"
                  aria-label="Filter by study level"
                  className="flex flex-wrap gap-2"
                >
                  {COURSE_LEVEL_OPTIONS.map((lvl) => {
                    const active = selectedLevel === lvl;
                    return (
                      <button
                        key={lvl}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-3 py-1.5 rounded-full text-[12px] font-extrabold border transition-all cursor-pointer ${
                          active
                            ? 'bg-primary text-white border-primary shadow-2xs'
                            : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Mode Toggle */}
              <div>
                <span className="block text-[13px] font-extrabold text-navy mb-2">
                  3. Learning Mode
                </span>
                <div
                  role="group"
                  aria-label="Filter by learning mode"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  {COURSE_MODE_OPTIONS.map((mode) => {
                    const active = selectedMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedMode(mode)}
                        className={`py-2 px-3 rounded-xl text-[12px] font-extrabold border transition-all cursor-pointer ${
                          active
                            ? 'bg-navy text-white border-navy'
                            : 'bg-white text-navy border-navy-15 hover:border-primary'
                        }`}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Budget Slider (₹10K – ₹5L per year) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="course-budget-slider"
                    className="text-[13px] font-extrabold text-navy"
                  >
                    4. Max Fee Budget / Year
                  </label>
                  <span className="font-mono text-[15px] font-extrabold text-primary">
                    Up to {formatBudgetLabel(budgetMaxInr)}
                  </span>
                </div>
                <input
                  id="course-budget-slider"
                  type="range"
                  min={10000}
                  max={500000}
                  step={10000}
                  value={budgetMaxInr}
                  aria-valuemin={10000}
                  aria-valuemax={500000}
                  aria-valuenow={budgetMaxInr}
                  onChange={(e) => setBudgetMaxInr(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between font-mono text-[10px] font-bold text-navy-50 mt-1">
                  <span>₹10K / yr</span>
                  <span>₹2.5L / yr</span>
                  <span>₹5L / yr</span>
                </div>
              </div>
            </div>

            {/* Right (7 cols): Matching Course Cards + Inline Brochure Lead Form */}
            <div className="lg:col-span-7 space-y-4">
              <div
                aria-live="polite"
                className="flex items-center justify-between px-1"
              >
                <span className="font-mono text-[12px] font-extrabold uppercase tracking-wider text-primary">
                  {filteredCourses.length > 0
                    ? `SHOWING ${displayedCourses.length} MATCHING PROGRAMS`
                    : 'SHOWING CLOSEST RECOMMENDED PROGRAMS'}
                </span>
                <span className="text-[12px] font-bold text-navy-50">
                  Live Demo · Sample Programs
                </span>
              </div>

              {displayedCourses.map((course) => {
                const isBrochureOpen = activeBrochureCourseId === course.id;
                const isBrochureSent = brochureSentCourseIds.includes(
                  course.id
                );

                return (
                  <article
                    key={course.id}
                    className="rounded-[22px] bg-white border-2 border-navy-15 hover:border-primary p-5 sm:p-6 shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold">
                          {course.interest} · {course.level}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-navy text-white font-mono text-[11px] font-bold">
                          {course.mode}
                        </span>
                      </div>

                      {course.seatsFillingFast && (
                        <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold uppercase tracking-wider">
                          ● Seats filling fast
                        </span>
                      )}
                    </div>

                    <h3 className="text-[20px] sm:text-[22px] font-extrabold text-navy mb-1">
                      {course.name}
                    </h3>
                    <p className="text-[13px] font-bold text-navy-70 mb-4">
                      {course.highlights}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3.5 border-t border-navy-08">
                      <div className="flex items-center gap-5">
                        <div>
                          <span className="block font-mono text-[10px] font-bold uppercase text-navy-50">
                            DURATION
                          </span>
                          <span className="text-[14px] font-extrabold text-navy">
                            {course.duration}
                          </span>
                        </div>
                        <div>
                          <span className="block font-mono text-[10px] font-bold uppercase text-navy-50">
                            FEE STRUCTURE
                          </span>
                          <span className="font-mono text-[16px] font-extrabold text-primary">
                            {course.feeRangeDisplay}
                          </span>
                        </div>
                      </div>

                      {/* Two Action Buttons: Enquire Now + Download Brochure */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <a
                          href="#admission-audit"
                          className="px-4 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[13px] inline-flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Enquire Now</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setBrochureError('');
                            setActiveBrochureCourseId(
                              isBrochureOpen ? null : course.id
                            );
                          }}
                          className="px-4 py-2.5 rounded-full bg-primary-50 hover:bg-primary hover:text-white text-primary font-extrabold text-[13px] inline-flex items-center gap-1.5 border border-primary/30 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Brochure</span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Lead Form When "Download Brochure" is Clicked */}
                    {isBrochureOpen && (
                      <div className="mt-4 pt-4 border-t border-dashed border-primary/40 bg-primary-50/40 rounded-2xl p-4">
                        {isBrochureSent ? (
                          <div className="flex items-center justify-between gap-3 text-navy">
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                                <Check className="w-4 h-4" />
                              </span>
                              <span className="text-[14px] font-extrabold text-primary">
                                Brochure sent on WhatsApp! (Demo only)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setActiveBrochureCourseId(null)}
                              className="text-[12px] font-bold text-navy underline cursor-pointer"
                            >
                              Close
                            </button>
                          </div>
                        ) : (
                          <form
                            onSubmit={(e) =>
                              handleBrochureFormSubmit(e, course.id)
                            }
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[11px] font-extrabold uppercase text-primary">
                                INSTANT WHATSAPP BROCHURE DELIVERY (DEMO)
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveBrochureCourseId(null)}
                                className="text-[11px] font-bold text-navy-50 hover:text-navy cursor-pointer"
                              >
                                Cancel ✕
                              </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              <input
                                type="text"
                                aria-label="Student or Parent Name"
                                placeholder="Your Name *"
                                value={brochureForm.name}
                                onChange={(e) =>
                                  setBrochureForm({
                                    ...brochureForm,
                                    name: e.target.value,
                                  })
                                }
                                className="px-3.5 py-2.5 rounded-xl bg-white border border-navy-15 text-[13px] font-medium text-navy focus:border-primary focus:outline-none"
                              />
                              <input
                                type="tel"
                                aria-label="WhatsApp Phone Number"
                                placeholder="WhatsApp Phone *"
                                value={brochureForm.phone}
                                onChange={(e) =>
                                  setBrochureForm({
                                    ...brochureForm,
                                    phone: e.target.value,
                                  })
                                }
                                className="px-3.5 py-2.5 rounded-xl bg-white border border-navy-15 text-[13px] font-medium text-navy focus:border-primary focus:outline-none"
                              />
                              <input
                                type="text"
                                aria-label="City"
                                placeholder="Your City *"
                                value={brochureForm.city}
                                onChange={(e) =>
                                  setBrochureForm({
                                    ...brochureForm,
                                    city: e.target.value,
                                  })
                                }
                                className="px-3.5 py-2.5 rounded-xl bg-white border border-navy-15 text-[13px] font-medium text-navy focus:border-primary focus:outline-none"
                              />
                            </div>
                            {brochureError && (
                              <p className="text-[12px] font-bold text-primary">
                                {brochureError}
                              </p>
                            )}
                            <button
                              type="submit"
                              className="px-5 py-2.5 rounded-full bg-primary text-white font-extrabold text-[13px] inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <span>Send Brochure on WhatsApp</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SERVICES — THE GROWTH SYLLABUS (navy, Open Ruled Notebook Page)
      ==================================================================== */}
      <section className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none" />
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              WHAT WE BUILD
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-white leading-[1.12] tracking-tight">
              Your <span className="text-primary">Growth Syllabus</span>
            </h2>
          </div>

          {/* Open Ruled Notebook Page on Navy Background */}
          <div
            className="relative rounded-[28px] bg-white text-navy shadow-2xl border-2 border-primary/40 overflow-hidden"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 35px, rgba(5, 113, 194, 0.12) 36px)',
            }}
          >
            {/* Left Vertical Blue Margin Line */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute top-0 bottom-0 left-24 sm:left-32 w-0.5 bg-primary/45 pointer-events-none"
            />

            {/* Two Punched Binder Holes on the Left Edge */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute left-5 top-1/3 w-5 h-5 rounded-full bg-navy border-2 border-primary/40 shadow-inner"
            />
            <div
              aria-hidden="true"
              className="hidden sm:block absolute left-5 top-2/3 w-5 h-5 rounded-full bg-navy border-2 border-primary/40 shadow-inner"
            />

            {/* Top Notebook Header */}
            <div className="p-5 sm:p-8 sm:pl-36 border-b-2 border-primary/30 bg-white/95 flex flex-wrap items-center justify-between gap-3">
              <span className="font-caveat text-[26px] sm:text-[30px] font-bold text-primary">
                WebXCode — Growth Syllabus 2026
              </span>
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50 px-3 py-1 rounded-full bg-primary-50">
                10 CORE MODULES · CLICK ANY MODULE TO EXPAND
              </span>
            </div>

            {/* 10 Syllabus Modules */}
            <div className="divide-y divide-primary/20">
              {SYLLABUS_MODULES.map((mod) => {
                const isOpen = openModuleId === mod.id;
                return (
                  <div
                    key={mod.id}
                    className={`transition-colors ${
                      isOpen ? 'bg-primary-50/55' : 'bg-white/90 hover:bg-primary-50/30'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenModuleId(isOpen ? '' : mod.id)}
                      className="w-full p-4 sm:py-5 sm:px-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 cursor-pointer"
                    >
                      <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                        {/* Module Number in the Left Margin */}
                        <span className="sm:w-24 shrink-0 font-mono text-[12px] font-extrabold uppercase tracking-wider text-primary">
                          {mod.moduleNo}
                        </span>

                        <div>
                          <h3 className="text-[18px] sm:text-[20px] font-extrabold text-navy leading-snug">
                            {mod.title}
                          </h3>
                          <p className="text-[13px] text-navy-70 font-medium">
                            {mod.shortHook}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold border border-primary/25">
                          {mod.lessonsCount}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-primary transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:pl-36 sm:pr-8 pb-6 pt-1 space-y-4">
                        <p className="text-[15px] text-navy font-medium leading-relaxed max-w-3xl">
                          {mod.description}
                        </p>
                        <ul className="space-y-2.5">
                          {mod.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2.5 text-[14px] font-bold text-navy"
                            >
                              <span className="w-5 h-5 rounded-md bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3.5 h-3.5" />
                              </span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 flex flex-wrap items-center gap-4">
                          {mod.id === 'mod-04' && (
                            <Link
                              to="/services/mobile-app-development"
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white text-[12px] font-extrabold hover:bg-primary-700 transition-colors"
                            >
                              <span>Explore Mobile App Development</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                          <a
                            href="#admission-audit"
                            className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:underline"
                          >
                            <span>Include {mod.moduleNo} in My Audit</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => onOpenQuoteModal(mod.title)}
                            className="px-3.5 py-1.5 rounded-full bg-navy text-white text-[12px] font-extrabold hover:bg-primary transition-colors cursor-pointer"
                          >
                            Request Module Quote
                          </button>
                        </div>
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
          6. LMS PREVIEW — MINI COURSE PLAYER (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                LEARNING PLATFORMS
              </span>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
                Learning Platforms Students{' '}
                <span className="text-primary">Actually Enjoy</span>
              </h2>
            </div>

            {/* 4 Feature Chips Next to the Mockup */}
            <div className="flex flex-wrap gap-2">
              {LMS_FEATURE_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="px-3.5 py-2 rounded-full bg-primary-50 text-primary border border-primary/25 text-[12px] font-extrabold inline-flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{chip}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Large Laptop-Style Course Player Mockup */}
          <div className="rounded-[28px] bg-navy p-3 sm:p-5 shadow-2xl border-2 border-navy">
            {/* Laptop Top Browser Bar */}
            <div className="flex items-center justify-between px-4 pb-3 text-white/75 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-2 font-bold text-white">
                  learn.yourinstitute.edu · Physics Cohort 2026
                </span>
              </div>
              <span className="text-primary font-extrabold">
                LOW-BANDWIDTH READY
              </span>
            </div>

            <div className="rounded-[20px] bg-white text-navy overflow-hidden grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-08">
              {/* Left 70% (8 cols on lg): Video Area + Progress Bar + Interactive Quiz Card */}
              <div className="lg:col-span-8 p-5 sm:p-7 space-y-6">
                {/* Video Player Thumbnail */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-navy border border-navy-15 group">
                  <img
                    src={IMG_LMS_LESSON}
                    alt="Interactive video lecture inside custom LMS course player"
                    loading="lazy"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />

                  {/* Center Blue Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_30px_rgba(5,113,194,0.85)] border-2 border-white">
                      <Play className="w-7 h-7 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Video Title & Progress Bar */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[16px] sm:text-[18px] font-extrabold">
                        {activeLmsLesson.title}
                      </span>
                      <span className="font-mono text-[12px] font-bold text-white/85">
                        09:14 / {activeLmsLesson.duration}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/25 overflow-hidden">
                      <div className="w-[45%] h-full bg-primary rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Interactive Quiz Card Below the Video */}
                <div className="rounded-2xl bg-primary-50/45 border-2 border-primary/35 p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary">
                      INTERACTIVE IN-LESSON QUIZ · SELECT AN ANSWER
                    </span>
                    <span className="font-mono text-[11px] font-bold text-navy-50">
                      +14% XP ON CORRECT ANSWER
                    </span>
                  </div>

                  <fieldset>
                    <legend className="text-[16px] sm:text-[17px] font-extrabold text-navy mb-3.5">
                      {LMS_QUIZ.question}
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {LMS_QUIZ.options.map((option) => {
                        const isSelected = selectedQuizOptionId === option.id;
                        return (
                          <label
                            key={option.id}
                            className={`p-3.5 rounded-xl border-2 text-left flex items-start gap-3 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-white text-navy border-navy-15 hover:border-primary'
                            }`}
                          >
                            <input
                              type="radio"
                              name="lms-physics-quiz"
                              value={option.id}
                              checked={isSelected}
                              onChange={() =>
                                setSelectedQuizOptionId(option.id)
                              }
                              className="sr-only"
                            />
                            <span
                              className={`w-6 h-6 rounded-full font-mono text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'bg-white text-primary'
                                  : 'bg-primary-50 text-primary'
                              }`}
                            >
                              {option.label}
                            </span>
                            <span className="text-[13px] font-bold leading-snug">
                              {option.text}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Quiz Answer Feedback Announced in aria-live */}
                  <div aria-live="polite" className="mt-3.5">
                    {selectedQuizOption && (
                      <div
                        className={`p-3.5 rounded-xl border text-[13px] font-bold flex items-start gap-2.5 ${
                          selectedQuizOption.isCorrect
                            ? 'bg-primary text-white border-primary'
                            : 'bg-navy text-white border-navy'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-white" />
                        <span>
                          {selectedQuizOption.isCorrect
                            ? LMS_QUIZ.correctFeedback
                            : LMS_QUIZ.incorrectFeedback}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right 30% (4 cols on lg): Overall Progress Ring + Lesson List */}
              <div className="lg:col-span-4 p-5 sm:p-6 bg-primary-50/25 flex flex-col justify-between">
                <div>
                  {/* Progress Ring Card */}
                  <div className="p-4 rounded-2xl bg-white border border-navy-15 flex items-center gap-4 mb-5">
                    <div className="relative w-16 h-16 shrink-0">
                      <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                        <circle
                          cx="18"
                          cy="18"
                          r="15.5"
                          fill="none"
                          stroke="#e6f2fb"
                          strokeWidth="3.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15.5"
                          fill="none"
                          stroke="#0571c2"
                          strokeWidth="3.5"
                          strokeDasharray={`${lmsProgressPct} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center font-mono text-[13px] font-extrabold text-navy">
                        {lmsProgressPct}%
                      </span>
                    </div>
                    <div>
                      <div className="text-[15px] font-extrabold text-navy">
                        {lmsProgressPct}% complete
                      </div>
                      <div className="text-[12px] text-navy-70 font-medium">
                        Module 01 · Laws of Motion
                      </div>
                    </div>
                  </div>

                  <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-2.5">
                    COURSE CURRICULUM (5 LESSONS)
                  </span>

                  <div className="space-y-2">
                    {LMS_LESSONS.map((lesson) => {
                      const isCurrent = selectedLessonId === lesson.id;
                      const isLocked = lesson.status === 'locked';
                      const isCompleted = lesson.status === 'completed';

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          disabled={isLocked}
                          onClick={() => setSelectedLessonId(lesson.id)}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition-all ${
                            isCurrent
                              ? 'bg-primary text-white border-primary shadow-sm cursor-pointer'
                              : isLocked
                              ? 'bg-white/60 text-navy/45 border-navy-08 cursor-not-allowed'
                              : 'bg-white text-navy border-navy-15 hover:border-primary cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-mono font-extrabold ${
                                isCurrent
                                  ? 'bg-white text-primary'
                                  : isCompleted
                                  ? 'bg-primary text-white'
                                  : 'bg-navy-08 text-navy-50'
                              }`}
                            >
                              {isCompleted ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : isLocked ? (
                                <Lock className="w-3 h-3" />
                              ) : (
                                lesson.number
                              )}
                            </span>
                            <span className="text-[13px] font-extrabold truncate">
                              {lesson.title}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-[11px] shrink-0 ${
                              isCurrent ? 'text-white/90' : 'text-navy-50'
                            }`}
                          >
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-08">
                  <a
                    href="#admission-audit"
                    className="w-full py-3 px-4 rounded-full bg-navy hover:bg-primary text-white font-extrabold text-[13px] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Build Your Custom LMS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7. NEVER LOSE A LEAD — COUNSELLOR KANBAN (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary/25 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
                LEAD MANAGEMENT
              </span>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
                Every Enquiry,{' '}
                <span className="text-primary">Followed Up</span>
              </h2>
            </div>

            {/* Top of the Board Stats Chips */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-2 rounded-full bg-white border border-navy-15 text-[13px] font-extrabold text-navy inline-flex items-center gap-2 shadow-2xs">
                <Clock className="w-4 h-4 text-primary" />
                <span>Avg. first response: 3 min</span>
              </span>
              <span className="px-4 py-2 rounded-full bg-navy text-white text-[13px] font-extrabold inline-flex items-center gap-2 shadow-2xs">
                <Users className="w-4 h-4 text-primary" />
                <span>Follow-ups due today: 12</span>
              </span>
            </div>
          </div>

          {/* Static Screen-Reader Summary for Decorative Kanban Board */}
          <p className="sr-only">
            Counsellor dashboard kanban pipeline tracking student leads across 5
            stages: New Enquiry, Contacted, Counselling Booked, Applied, and
            Enrolled, with average first response time of 3 minutes,
            auto-assignment to counsellors, WhatsApp and email reminders, and
            source-wise reports.
          </p>

          {/* 5-Column Counsellor Kanban Board (Horizontally Scrollable on Mobile) */}
          <div
            aria-hidden="true"
            className="overflow-x-auto pb-4 no-scrollbar"
          >
            <div className="grid grid-cols-5 gap-4 min-w-[980px]">
              {KANBAN_STAGES.map((stage, stageIdx) => {
                const stageLeads = kanbanLeads.filter(
                  (lead) => lead.stage === stage
                );
                const isEnrolledCol = stage === 'Enrolled';

                return (
                  <div
                    key={stage}
                    className={`rounded-[22px] p-4 border-2 flex flex-col justify-between min-h-[340px] ${
                      isEnrolledCol
                        ? 'bg-navy text-white border-navy'
                        : 'bg-white text-navy border-navy-15'
                    }`}
                  >
                    <div>
                      {/* Column Header + Count Badge */}
                      <div
                        className={`flex items-center justify-between gap-2 pb-3 mb-3.5 border-b ${
                          isEnrolledCol
                            ? 'border-white/15'
                            : 'border-navy-08'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-extrabold text-primary">
                            0{stageIdx + 1}
                          </span>
                          <h3
                            className={`text-[14px] font-extrabold ${
                              isEnrolledCol ? 'text-white' : 'text-navy'
                            }`}
                          >
                            {stage}
                          </h3>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-extrabold ${
                            isEnrolledCol
                              ? 'bg-primary text-white'
                              : 'bg-primary-50 text-primary'
                          }`}
                        >
                          {stageLeads.length}
                        </span>
                      </div>

                      {/* Lead Cards Inside Column */}
                      <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                          {stageLeads.map((lead) => {
                            const isJustMoved = lastMovedLeadId === lead.id;
                            return (
                              <motion.div
                                key={lead.id}
                                layout
                                initial={
                                  prefersReducedMotion
                                    ? false
                                    : { opacity: 0, scale: 0.94 }
                                }
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.94 }}
                                transition={{ duration: 0.3 }}
                                className={`p-3.5 rounded-xl border transition-all ${
                                  isEnrolledCol
                                    ? 'bg-white/10 border-white/15 text-white'
                                    : isJustMoved
                                    ? 'bg-primary-50/70 border-primary shadow-md'
                                    : 'bg-primary-50/30 border-navy-15 text-navy'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0">
                                      {lead.initials}
                                    </span>
                                    <span
                                      className={`text-[12px] font-extrabold ${
                                        isEnrolledCol
                                          ? 'text-white'
                                          : 'text-navy'
                                      }`}
                                    >
                                      {lead.studentTag}
                                    </span>
                                  </div>

                                  <span
                                    className={`px-2 py-0.5 rounded-full font-mono text-[9px] font-extrabold uppercase ${
                                      isEnrolledCol
                                        ? 'bg-primary text-white'
                                        : 'bg-white text-primary border border-primary/30'
                                    }`}
                                  >
                                    {lead.source}
                                  </span>
                                </div>

                                <div
                                  className={`text-[13px] font-extrabold mb-1 ${
                                    isEnrolledCol ? 'text-white' : 'text-navy'
                                  }`}
                                >
                                  {lead.course}
                                </div>
                                <div
                                  className={`font-mono text-[10px] font-bold ${
                                    isEnrolledCol
                                      ? 'text-primary'
                                      : 'text-navy-50'
                                  }`}
                                >
                                  {lead.timeAgo}
                                </div>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div
                      className={`pt-3 mt-3 border-t font-mono text-[10px] font-bold flex items-center justify-between ${
                        isEnrolledCol
                          ? 'border-white/15 text-white/70'
                          : 'border-navy-08 text-navy-50'
                      }`}
                    >
                      <span>STAGE {stageIdx + 1}/5</span>
                      <span className="text-primary font-extrabold">
                        AUTO-SYNC ✓
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3 Blue Checkmark Points Below Kanban */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {[
              'Auto-assignment to counsellors',
              'WhatsApp & email reminders',
              'Source-wise reports',
            ].map((pt) => (
              <div
                key={pt}
                className="inline-flex items-center gap-2.5 text-[15px] font-extrabold text-navy"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          8. TRUST, SAFETY & ACCESS — NOTICE BOARD (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              TRUST &amp; SAFETY
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Built Safe for{' '}
              <span className="text-primary">Students and Parents</span>
            </h2>
          </div>

          {/* School Notice Board: Navy Board Container with 6 Pinned Notice Cards */}
          <div className="rounded-[32px] bg-navy p-6 sm:p-10 border-4 border-navy shadow-2xl relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none"
            />

            {/* Notice Board Header Bar */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-white/15">
              <div className="flex items-center gap-2.5">
                <Pin className="w-4 h-4 text-primary" />
                <span className="font-mono text-[12px] font-extrabold uppercase tracking-[0.18em] text-white">
                  CAMPUS DIGITAL NOTICE BOARD · STUDENT PRIVACY &amp; ACCESS
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold">
                6 VERIFIED STANDARDS
              </span>
            </div>

            {/* 6 Pinned Notice Cards (White Paper & Light-Blue Sticky Note Tints Only) */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {NOTICE_BOARD_ITEMS.map((notice) => (
                <article
                  key={notice.id}
                  className={`relative rounded-2xl p-6 pt-8 border-2 shadow-xl transition-transform duration-300 ${
                    notice.rotationClass
                  } hover:rotate-0 ${
                    notice.isStickyTint
                      ? 'bg-primary-50 text-navy border-primary'
                      : 'bg-white text-navy border-white'
                  }`}
                >
                  {/* Blue Pin at Top-Center of the Notice Paper */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary border-2 border-white shadow-md flex items-center justify-center"
                  >
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>

                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                      {notice.noticeCode}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  </div>

                  <h3 className="text-[20px] font-extrabold text-navy mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-[14px] text-navy-70 font-medium leading-relaxed">
                    {notice.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-5 text-center text-[13px] text-navy/60 font-medium">
            Final responsibility for regulatory compliance and published claims
            remains with the institution; we help you build it right.
          </p>
        </div>
      </section>

      {/* ====================================================================
          9. CASE STUDY — THE REPORT CARD (light blue tint)
      ==================================================================== */}
      <section className="bg-primary-50/45 py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-primary border border-primary/25 text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              CASE STUDY
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              <span className="text-primary">
                {REPORT_CARD_DATA.instituteName}
              </span>
              : Top of the Class in Admissions
            </h2>
          </div>

          {/* Student Report Card Container */}
          <div className="rounded-[28px] bg-white border-2 border-navy shadow-2xl overflow-hidden">
            {/* Navy Header Strip */}
            <div className="bg-navy text-white px-6 sm:px-9 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                <span className="font-mono text-[13px] sm:text-[14px] font-extrabold uppercase tracking-[0.16em]">
                  PROGRESS REPORT · ACADEMIC YEAR 2025–26
                </span>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-primary text-white font-mono text-[11px] font-extrabold">
                OVERALL STANDING: DISTINCTION (A+)
              </span>
            </div>

            {/* Uppercase Metadata Fields: Institute · Type · City · Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:px-9 bg-primary-50/45 border-b border-navy-15">
              <div>
                <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  INSTITUTE
                </span>
                <span className="text-[13px] font-extrabold text-navy">
                  {REPORT_CARD_DATA.instituteName}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  TYPE
                </span>
                <span className="text-[13px] font-extrabold text-navy">
                  {REPORT_CARD_DATA.type}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  CITY
                </span>
                <span className="text-[13px] font-extrabold text-navy">
                  {REPORT_CARD_DATA.city}
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                  DURATION
                </span>
                <span className="text-[13px] font-extrabold text-navy">
                  {REPORT_CARD_DATA.duration}
                </span>
              </div>
            </div>

            {/* Report Card Table: Subject · Before · After · Grade */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-navy-15 bg-white font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-50">
                    <th scope="col" className="py-4 px-6 sm:px-9">
                      Subject
                    </th>
                    <th scope="col" className="py-4 px-5">
                      Before
                    </th>
                    <th scope="col" className="py-4 px-5">
                      After
                    </th>
                    <th scope="col" className="py-4 px-6 sm:px-9 text-center">
                      Grade
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-08 text-[15px]">
                  {REPORT_CARD_DATA.rows.map((row) => (
                    <tr
                      key={row.subject}
                      className="hover:bg-primary-50/30 transition-colors"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 sm:px-9 font-extrabold text-navy"
                      >
                        {row.subject}
                      </th>
                      <td className="py-4 px-5 font-mono text-navy-70">
                        {row.before}
                      </td>
                      <td className="py-4 px-5 font-mono text-[18px] font-extrabold text-primary">
                        {row.after}
                      </td>
                      <td className="py-4 px-6 sm:px-9 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-mono text-[14px] font-extrabold shadow-sm">
                          {row.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom of the Card: Teacher's Remarks in Caveat + Principal's Signature + View More Projects Button */}
            <div className="p-6 sm:p-9 bg-primary-50/35 border-t-2 border-navy-15 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="block font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1">
                  TEACHER&apos;S REMARKS (CLIENT QUOTE)
                </span>
                <p className="font-caveat text-[25px] sm:text-[28px] font-bold text-navy leading-snug mb-3">
                  &ldquo;{REPORT_CARD_DATA.teachersRemarks}&rdquo;
                </p>

                <div className="inline-flex flex-col pt-2 border-t border-dashed border-navy/40">
                  <span className="font-caveat text-[22px] font-bold text-primary">
                    {REPORT_CARD_DATA.principalSignature}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-navy-70">
                    PRINCIPAL&apos;S SIGNATURE ·{' '}
                    {REPORT_CARD_DATA.principalRole}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  to="/our-work"
                  className="px-7 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-extrabold text-[15px] shadow-lg transition-all inline-flex items-center gap-2"
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
          10. FAQ — THE QUESTION PAPER (white)
      ==================================================================== */}
      <section className="bg-white py-[72px] lg:py-[112px] border-b border-navy-08">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3">
              FAQ
            </span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[44px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Questions from <span className="text-primary">Educators</span>
            </h2>
          </div>

          {/* Exam Question Paper Sheet */}
          <div className="rounded-[28px] bg-white border-2 border-navy shadow-xl overflow-hidden">
            {/* Exam Paper Header */}
            <div className="p-6 sm:p-8 border-b-2 border-double border-navy bg-primary-50/35">
              <div className="text-center border-b border-navy-15 pb-4 mb-4">
                <div className="font-mono text-[12px] font-extrabold uppercase tracking-[0.2em] text-primary mb-1">
                  SERIES: WXC-EDTECH-2026
                </div>
                <h3 className="text-[19px] sm:text-[22px] font-extrabold text-navy tracking-tight">
                  WEBXCODE · FREQUENTLY ASKED QUESTIONS
                </h3>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[12px] font-extrabold text-navy">
                  <span>Time: 2 minutes</span>
                  <span>Subject: Digital Admissions &amp; LMS</span>
                  <span>Max. Marks: 60</span>
                </div>
              </div>

              <div className="text-[13px] text-navy-70 font-medium">
                <strong className="font-extrabold text-navy">
                  General Instructions:
                </strong>{' '}
                All 6 questions are compulsory. Click on any question row (Q1 to
                Q6) to inspect the model answer sheet below it.
              </div>
            </div>

            {/* Questions Q1–Q6 */}
            <div className="divide-y divide-navy-15">
              {EXAM_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="p-5 sm:p-7">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full text-left flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-navy text-white font-mono text-[13px] font-extrabold shrink-0">
                          {faq.qNo}.
                        </span>
                        <span className="text-[17px] sm:text-[18px] font-extrabold text-navy leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-[12px] font-extrabold text-primary">
                          {faq.marks}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-primary transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Answer Sheet Box (Light Blue Tint Box with Blue Left Border) */}
                    {isOpen && (
                      <div className="mt-4 ml-0 sm:ml-12 p-5 rounded-2xl bg-primary-50/60 border-l-4 border-primary text-[15px] text-navy leading-relaxed">
                        <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-1">
                          ✓ MODEL ANSWER · FULL MARKS AWARDED (10/10)
                        </div>
                        <p>{faq.answer}</p>
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
          11. FREE ADMISSION GROWTH AUDIT — ADMISSION FORM CTA (navy chalkboard, #admission-audit)
      ==================================================================== */}
      <section
        id="admission-audit"
        className="relative bg-navy text-white py-[72px] lg:py-[112px] overflow-hidden border-b border-white/10 scroll-mt-20"
      >
        {/* Chalkboard Dust Texture & Inner Frame */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute inset-4 lg:inset-6 rounded-[28px] border-4 border-white/12 pointer-events-none"
        />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left (5 cols): Chalkboard Pitch + Blue Chalk Arrow Doodle */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/20 text-white border border-primary/40 text-[12px] font-bold uppercase tracking-[0.12em] mb-4">
                FREE AUDIT
              </span>

              <h2 className="text-[30px] sm:text-[40px] lg:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
                Get a Free{' '}
                <span className="text-primary">Admission Growth Audit</span>
              </h2>

              <p className="text-[16px] text-white/80 leading-relaxed mb-7">
                We&apos;ll review your website, enquiry forms, SEO and follow-up
                process and send a clear plan to get more enrolments this
                season.
              </p>

              {/* 3 Blue Checkmark Points */}
              <ul className="space-y-3.5 mb-8">
                {[
                  'Website & enquiry form review',
                  'SEO & ads visibility check',
                  'Follow-up & response time review',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[15px] font-extrabold text-white"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Blue Chalk Arrow Doodle Pointing to the Admission Form */}
              <div
                aria-hidden="true"
                className="hidden lg:flex items-center gap-3 pt-2"
              >
                <span className="font-caveat text-[26px] font-bold text-primary">
                  Fill in your institution details here
                </span>
                <svg width="95" height="36" viewBox="0 0 95 36" fill="none">
                  <path
                    d="M4 22 Q 48 4 86 18"
                    stroke="#0571c2"
                    strokeWidth="3"
                    strokeDasharray="5 4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M78 10 L89 19 L76 26"
                    stroke="#0571c2"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Right (7 cols): White "Admission Form" Paper Card */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] bg-white text-navy p-6 sm:p-9 shadow-2xl border-2 border-primary relative overflow-hidden">
                {/* Admission Form Header Row + Dashed "Affix Logo" Box in Top-Right */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 mb-6 border-b-2 border-navy">
                  <div>
                    <span className="inline-block font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary bg-primary-50 px-3 py-1 rounded-md mb-1.5">
                      APPLICATION FOR FREE AUDIT · FORM NO. WX-EDU-26
                    </span>
                    <h3 className="text-[22px] sm:text-[24px] font-extrabold text-navy">
                      Institutional Admission Growth Application
                    </h3>
                    <p className="text-[12px] font-bold text-navy-50">
                      All fields marked with (*) are required for audit dispatch
                    </p>
                  </div>

                  {/* Decorative Dashed "Affix Logo" Box */}
                  <div
                    aria-hidden="true"
                    className="shrink-0 w-24 h-20 rounded-xl border-2 border-dashed border-primary/50 bg-primary-50/40 flex flex-col items-center justify-center text-center p-2"
                  >
                    <GraduationCap className="w-5 h-5 text-primary mb-1" />
                    <span className="font-mono text-[9px] font-extrabold uppercase text-primary leading-tight">
                      AFFIX CAMPUS LOGO
                    </span>
                  </div>
                </div>

                {auditSubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    {/* Blue Stamp "ACCEPTED" */}
                    <div className="inline-block px-6 py-2.5 rounded-xl border-4 border-double border-primary text-primary font-mono text-[22px] font-extrabold uppercase tracking-[0.2em] -rotate-3 shadow-sm">
                      ✓ ACCEPTED
                    </div>

                    <h4 className="text-[24px] font-extrabold text-navy">
                      Application received! Your audit will arrive within 48
                      hours.
                    </h4>
                    <p className="text-[15px] text-navy-70 max-w-md mx-auto">
                      We have registered the application for{' '}
                      <span className="font-extrabold text-navy">
                        {auditForm.institutionName}
                      </span>
                      . Our education growth specialist will deliver your custom
                      audit report within 48 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAuditSubmitted(false);
                        setAuditForm({
                          name: '',
                          designation: '',
                          institutionName: '',
                          email: '',
                          phone: '',
                          websiteUrl: '',
                          institutionType: 'College/University',
                        });
                      }}
                      className="px-6 py-3 rounded-full bg-primary-50 text-primary font-extrabold text-[13px] hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleAdmissionAuditSubmit}
                    noValidate
                    className="space-y-4"
                  >
                    {/* Bordered Field Row 1: Name + Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="edu-audit-name"
                          className="block font-mono text-[11px] font-extrabold uppercase text-navy mb-1"
                        >
                          1. Applicant Name *
                        </label>
                        <input
                          id="edu-audit-name"
                          type="text"
                          value={auditForm.name}
                          onChange={(e) =>
                            setAuditForm({ ...auditForm, name: e.target.value })
                          }
                          placeholder="e.g. Dr. Ananya Verma"
                          className="w-full px-4 py-3 rounded-xl border-2 border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
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
                          htmlFor="edu-audit-designation"
                          className="block font-mono text-[11px] font-extrabold uppercase text-navy mb-1"
                        >
                          2. Designation *
                        </label>
                        <input
                          id="edu-audit-designation"
                          type="text"
                          value={auditForm.designation}
                          onChange={(e) =>
                            setAuditForm({
                              ...auditForm,
                              designation: e.target.value,
                            })
                          }
                          placeholder="e.g. Director of Admissions / Founder"
                          className="w-full px-4 py-3 rounded-xl border-2 border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                        />
                        {auditErrors.designation && (
                          <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{auditErrors.designation}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bordered Field Row 2: Institution Name + Official Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="edu-audit-institution"
                          className="block font-mono text-[11px] font-extrabold uppercase text-navy mb-1"
                        >
                          3. Institution Name *
                        </label>
                        <input
                          id="edu-audit-institution"
                          type="text"
                          value={auditForm.institutionName}
                          onChange={(e) =>
                            setAuditForm({
                              ...auditForm,
                              institutionName: e.target.value,
                            })
                          }
                          placeholder="e.g. Horizon Global University"
                          className="w-full px-4 py-3 rounded-xl border-2 border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                        />
                        {auditErrors.institutionName && (
                          <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{auditErrors.institutionName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="edu-audit-email"
                          className="block font-mono text-[11px] font-extrabold uppercase text-navy mb-1"
                        >
                          4. Work Email *
                        </label>
                        <input
                          id="edu-audit-email"
                          type="email"
                          value={auditForm.email}
                          onChange={(e) =>
                            setAuditForm({
                              ...auditForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="admissions@yourinstitute.edu"
                          className="w-full px-4 py-3 rounded-xl border-2 border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                        />
                        {auditErrors.email && (
                          <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{auditErrors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bordered Field Row 3: Phone + Website URL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="edu-audit-phone"
                          className="block font-mono text-[11px] font-extrabold uppercase text-navy mb-1"
                        >
                          5. Phone / WhatsApp *
                        </label>
                        <input
                          id="edu-audit-phone"
                          type="tel"
                          value={auditForm.phone}
                          onChange={(e) =>
                            setAuditForm({
                              ...auditForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl border-2 border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
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
                          htmlFor="edu-audit-website"
                          className="block font-mono text-[11px] font-extrabold uppercase text-navy mb-1"
                        >
                          6. Website URL *
                        </label>
                        <input
                          id="edu-audit-website"
                          type="text"
                          value={auditForm.websiteUrl}
                          onChange={(e) =>
                            setAuditForm({
                              ...auditForm,
                              websiteUrl: e.target.value,
                            })
                          }
                          placeholder="https://yourinstitute.edu"
                          className="w-full px-4 py-3 rounded-xl border-2 border-navy-15 focus:border-primary focus:outline-none text-[14px] font-medium text-navy"
                        />
                        {auditErrors.websiteUrl && (
                          <p className="mt-1 text-[12px] font-bold text-primary flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{auditErrors.websiteUrl}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bordered Field Row 4: Institution Type Chips */}
                    <div>
                      <span className="block font-mono text-[11px] font-extrabold uppercase text-navy mb-2">
                        7. Institution Type
                      </span>
                      <div
                        role="group"
                        aria-label="Select institution type"
                        className="flex flex-wrap gap-2"
                      >
                        {INSTITUTION_TYPE_CHIPS.map((itype) => {
                          const active = auditForm.institutionType === itype;
                          return (
                            <button
                              key={itype}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setAuditForm({
                                  ...auditForm,
                                  institutionType: itype,
                                })
                              }
                              className={`px-3.5 py-2 rounded-full text-[12px] font-extrabold border transition-all cursor-pointer ${
                                active
                                  ? 'bg-primary text-white border-primary shadow-2xs'
                                  : 'bg-primary-50/40 text-navy border-navy-15 hover:border-primary'
                              }`}
                            >
                              {itype}
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
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          12. EXPLORE OTHER INDUSTRIES (white, compact)
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
              <span>View All Industries</span>
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
                  : ind.slug === 'travel-hospitality'
                  ? '/industries/travel-hospitality'
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

export default EducationEdtech;


