'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Smartphone,
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
  Wifi,
  WifiOff,
  Bell,
  Fingerprint,
  MapPin,
  QrCode,
  Play,
  Share2,
  Download,
  Code2,
  GitBranch,
  Radio,
  Compass,
  Calendar,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Users,
  MessageSquare,
} from 'lucide-react';
import { services, ServiceIcon } from '@/app/services/_components/Services';

/* ============================================================================
   SINGLE SOURCE OF TRUTH: IMPORT MOBILE-APP-DEVELOPMENT ITEM FROM ../Services
============================================================================ */
const mobileAppDevService =
  services.find((item) => item.slug === 'mobile-app-development') || services[3];

/* ============================================================================
   PAGE CONTENT DATA ARRAYS (Top of file — single source of truth)
============================================================================ */

/* Section 1: Hero Dual-Device Stage (iOS iPhone + Android Pixel) Data */
export type HeroScreenKey = 'home' | 'detail' | 'checkout' | 'push';

export interface HeroScreenSpec {
  key: HeroScreenKey;
  tabLabel: string;
  stepNumber: string;
  iosHeaderTitle: string;
  androidHeaderTitle: string;
  latencyBadge: string;
  fpsBadge: string;
  summary: string;
  iosHighlights: [string, string];
  androidHighlights: [string, string];
}

const HERO_DEVICE_SCREENS: HeroScreenSpec[] = [
  {
    key: 'home',
    tabLabel: 'Home',
    stepNumber: '01',
    iosHeaderTitle: 'Good Morning, Aarav',
    androidHeaderTitle: 'Explore Pulse • Bengaluru',
    latencyBadge: '18ms API Sync',
    fpsBadge: '60 FPS Native UI',
    summary:
      'Personalized discovery feed with instant skeleton hydration, cached offline cards, and platform-native navigation bars.',
    iosHighlights: ['SF Symbols + Cupertino Tab Bar', 'CoreHaptics subtle selection feedback'],
    androidHighlights: ['Material 3 Navigation Bar + FAB', 'Predictive back-gesture support'],
  },
  {
    key: 'detail',
    tabLabel: 'Detail / Booking',
    stepNumber: '02',
    iosHeaderTitle: 'Select Slot & Specialist',
    androidHeaderTitle: 'Book Instant Session',
    latencyBadge: 'WebSocket Live Slots',
    fpsBadge: 'Shared-Element Transition',
    summary:
      'Real-time slot picker with shared-element hero transitions, live availability locks, and offline-first draft persistence.',
    iosHighlights: ['Native Cupertino Date/Slot Wheel', 'Live Activity Lock Screen widget ready'],
    androidHighlights: ['Material 3 Bottom Sheet Picker', 'Google Calendar & Maps intent sync'],
  },
  {
    key: 'checkout',
    tabLabel: 'Checkout',
    stepNumber: '03',
    iosHeaderTitle: 'Confirm & Face ID Pay',
    androidHeaderTitle: '1-Tap UPI & Biometric Pay',
    latencyBadge: 'PCI-DSS Tokenized',
    fpsBadge: 'Biometric Enclave',
    summary:
      'Zero-friction mobile checkout combining Face ID / Touch ID hardware enclave verification with native UPI intent, Apple Pay, and Google Pay.',
    iosHighlights: ['Face ID Secure Enclave + Apple Pay', 'StoreKit 2 auto-renewable billing'],
    androidHighlights: ['Direct GPay / PhonePe UPI Intent', 'BiometricPrompt CryptoObject auth'],
  },
  {
    key: 'push',
    tabLabel: 'Push Notification',
    stepNumber: '04',
    iosHeaderTitle: 'APNs Rich Notification',
    androidHeaderTitle: 'FCM High-Priority Channel',
    latencyBadge: '<400ms Push Delivery',
    fpsBadge: 'Universal Deep Link',
    summary:
      'Rich interactive push notifications via APNs and FCM that deep-link users straight to the exact booking or order screen.',
    iosHighlights: ['APNs Rich Media + Action Buttons', 'Universal Links (`apple-app-site-association`)'],
    androidHighlights: ['FCM Notification Channels + Actions', 'Android App Links (`assetlinks.json`)'],
  },
];

/* Section 2: App Archetypes Matrix (6 Cards) */
export type ArchetypeFilterKey =
  | 'All'
  | 'Consumer'
  | 'E-commerce'
  | 'Booking'
  | 'B2B / Field'
  | 'Learning'
  | 'IoT / Connected';

export interface AppArchetypeCard {
  id: string;
  code: string;
  filterCategory: Exclude<ArchetypeFilterKey, 'All'>;
  name: string;
  recommendedStack: string;
  typicalTimeline: string;
  bestFor: string;
  tagline: string;
  keyModules: [string, string, string, string];
  miniWireframe: {
    screenTitle: string;
    primaryMetricLabel: string;
    primaryMetricValue: string;
    statusChip: string;
    rows: [string, string, string];
  };
}

const APP_ARCHETYPES: AppArchetypeCard[] = [
  {
    id: 'arch-consumer',
    code: 'ARCHETYPE 01',
    filterCategory: 'Consumer',
    name: 'Consumer & Community App',
    recommendedStack: 'React Native / Flutter',
    typicalTimeline: '8–12 weeks',
    bestFor: 'Social platforms, creator communities, loyalty & membership clubs',
    tagline:
      'High-engagement consumer apps engineered for daily active usage, smooth media feeds, real-time chat, and viral referral loops.',
    keyModules: [
      '60fps virtualized media feeds, stories & short video playback',
      'Real-time 1:1 & group messaging with WebSockets and push alerts',
      'Deep-linked referral invites, gamified streaks & reward wallets',
      'Automated content moderation hooks, user blocking & privacy controls',
    ],
    miniWireframe: {
      screenTitle: 'Community Feed • Live',
      primaryMetricLabel: 'DAU / MAU Stickiness',
      primaryMetricValue: '48% Daily Return',
      statusChip: '60 FPS Feed',
      rows: [
        'Creator Story Rail + Instant Prefetch',
        'Live Discussion Thread (WebSockets)',
        'Streak & Loyalty Points Wallet',
      ],
    },
  },
  {
    id: 'arch-mcommerce',
    code: 'ARCHETYPE 02',
    filterCategory: 'E-commerce',
    name: 'D2C Shopping & M-Commerce App',
    recommendedStack: 'React Native + Shopify / Custom API',
    typicalTimeline: '6–10 weeks',
    bestFor: 'D2C fashion, beauty, electronics, grocery & multi-brand retailers',
    tagline:
      'Turn one-time web buyers into high-LTV repeat customers with an app that loads catalogs instantly and checks out in one tap.',
    keyModules: [
      'Real-time catalog, inventory & cart sync with Shopify, WooCommerce or custom ERP',
      '1-tap native UPI intent (GPay, PhonePe, Paytm), Apple Pay & saved cards',
      'Segmented push notifications for back-in-stock, price drops & abandoned carts',
      'App-exclusive early access drops, barcode scanner & loyalty tier perks',
    ],
    miniWireframe: {
      screenTitle: 'VIP Drop • Bag (2 Items)',
      primaryMetricLabel: 'Repeat Purchase Lift',
      primaryMetricValue: '3.2× vs Mobile Web',
      statusChip: '1-Tap UPI / Apple Pay',
      rows: [
        'Instant Variant Swatch & Size Fit Guide',
        'Slide-Up Cart + Free Gift Progress Bar',
        'Push Alert: "Flash Drop Live in 10m"',
      ],
    },
  },
  {
    id: 'arch-booking',
    code: 'ARCHETYPE 03',
    filterCategory: 'Booking',
    name: 'On-Demand, Booking & Delivery App',
    recommendedStack: 'Flutter / React Native + Node.js',
    typicalTimeline: '10–14 weeks',
    bestFor: 'Healthcare clinics, salons, home services, food delivery, ride & travel',
    tagline:
      'Multi-app ecosystems (Customer App + Partner/Driver App + Admin Dispatch) with live GPS tracking and instant slot booking.',
    keyModules: [
      'Live Google Maps / Mapbox route tracking with accurate ETA calculations',
      'Real-time appointment slot engine or automated partner dispatch matching',
      'In-app masked voice/chat bridge between customer and service provider',
      'Split payouts, tip collection, digital invoice PDF & post-service rating flow',
    ],
    miniWireframe: {
      screenTitle: 'Live Dispatch • ETA 08 Min',
      primaryMetricLabel: 'Booking Completion',
      primaryMetricValue: '< 45 Sec Flow',
      statusChip: 'Live GPS Socket',
      rows: [
        'Interactive Map Pin + Route Polyline',
        'Verified Partner Card + Masked Call',
        'OTP Handover & Instant Wallet Split',
      ],
    },
  },
  {
    id: 'arch-b2b',
    code: 'ARCHETYPE 04',
    filterCategory: 'B2B / Field',
    name: 'B2B, Field-Force & Enterprise App',
    recommendedStack: 'React Native / Kotlin + SQLite Sync',
    typicalTimeline: '8–12 weeks',
    bestFor: 'Field sales reps, warehouse ops, logistics fleets, inspections & approvals',
    tagline:
      'Offline-first operational apps that keep working in basements, highways, and remote sites—syncing automatically when signal returns.',
    keyModules: [
      'Local encrypted SQLite / Realm database with conflict-free background delta sync',
      'High-speed camera barcode/QR scanning, OCR document capture & e-signatures',
      'Geo-fenced attendance check-ins, route beat planning & expense logging',
      'Enterprise SSO (Okta, Azure AD), role-based permissions & audit logs',
    ],
    miniWireframe: {
      screenTitle: 'Field Ops • Offline Mode',
      primaryMetricLabel: 'Offline Reliability',
      primaryMetricValue: '100% Zero Data Loss',
      statusChip: 'SQLite Queue (14)',
      rows: [
        'QR Batch Scanner + Photo Proof Capture',
        'Geo-Fenced Site Check-In Verified',
        'Auto-Sync to SAP / Zoho CRM on 4G',
      ],
    },
  },
  {
    id: 'arch-learning',
    code: 'ARCHETYPE 05',
    filterCategory: 'Learning',
    name: 'Learning, Fitness & Subscription App',
    recommendedStack: 'Flutter / React Native + Native Media',
    typicalTimeline: '8–12 weeks',
    bestFor: 'EdTech cohorts, test-prep institutes, wellness, meditation & fitness coaches',
    tagline:
      'Habit-forming media and learning apps with adaptive video streaming, offline encrypted downloads, and subscription paywalls.',
    keyModules: [
      'Adaptive HLS video & background audio player with encrypted offline downloads',
      'Interactive quizzes, timed mock tests, workout timers & habit streak calendars',
      'Apple StoreKit 2, Google Play Billing & Razorpay/Stripe subscription management',
      'Live cohort classes, community leaderboards & verifiable completion certificates',
    ],
    miniWireframe: {
      screenTitle: 'Module 04 • Offline Ready',
      primaryMetricLabel: 'Course / Habit Retention',
      primaryMetricValue: '+64% 30-Day Streak',
      statusChip: 'HLS + DRM Video',
      rows: [
        '1080p Adaptive Player (1.5x + Notes)',
        'Encrypted Offline Lesson Download',
        'Daily Streak Tracker & Quiz Scorecard',
      ],
    },
  },
  {
    id: 'arch-iot',
    code: 'ARCHETYPE 06',
    filterCategory: 'IoT / Connected',
    name: 'Companion & Connected Device App (BLE / IoT)',
    recommendedStack: 'Swift / Kotlin or React Native + Native BLE',
    typicalTimeline: '10–16 weeks',
    bestFor: 'EV mobility, smart home hardware, wearables, medical & industrial sensors',
    tagline:
      'Low-latency hardware companion apps engineered for reliable Bluetooth Low Energy (BLE) pairing, live telemetry, and OTA updates.',
    keyModules: [
      'Custom GATT profile Bluetooth Low Energy (BLE) & Wi-Fi provisioning flows',
      'Real-time 60fps sensor telemetry graphs, battery health & alert thresholds',
      'Secure Over-The-Air (OTA) firmware update delivery with checksum verification',
      'Background device health monitoring, Apple HealthKit / Google Health Connect sync',
    ],
    miniWireframe: {
      screenTitle: 'BLE Connected • -54 dBm',
      primaryMetricLabel: 'Packet Latency',
      primaryMetricValue: '< 25ms GATT Sync',
      statusChip: 'Firmware v2.4.1',
      rows: [
        'Device Battery 92% • Live Telemetry',
        '1-Tap Hardware Mode & Lock Toggle',
        'OTA Firmware Checksum Verified ✓',
      ],
    },
  },
];

/* Section 3: Interactive Stack Selector — Cross-Platform vs Native vs PWA */
export type StackApproachKey = 'react-native' | 'flutter' | 'native' | 'pwa';

export interface StackApproachSpec {
  key: StackApproachKey;
  tabLabel: string;
  codeBadge: string;
  headline: string;
  subtitle: string;
  codeSharePercent: string;
  uiRenderingModel: string;
  performanceProfile: string;
  timeToMarket: string;
  bestWhen: [string, string, string];
  tradeoffs: [string, string];
  architectureLayers: [string, string, string, string];
  scorecard: {
    developmentSpeed: number;
    nativePerformance: number;
    codeReuse: number;
    hardwareAccess: number;
  };
}

const STACK_APPROACHES: StackApproachSpec[] = [
  {
    key: 'react-native',
    tabLabel: 'React Native',
    codeBadge: 'STACK 01 • NEW ARCHITECTURE (JSI)',
    headline: 'React Native (TypeScript + Expo / Bare Workflow)',
    subtitle:
      'One TypeScript codebase compiling to true native UIViews on iOS and Android Views—ideal when you want shared logic with your React/Next.js web stack.',
    codeSharePercent: '85%–92% Shared Code (iOS + Android + Web Logic)',
    uiRenderingModel: 'True OEM Native Widgets via synchronous JSI / Fabric renderer',
    performanceProfile: '60/120 FPS animations via Reanimated 3 worklets on UI thread',
    timeToMarket: '8–12 weeks for dual-store iOS + Android launch',
    bestWhen: [
      'You want both iOS and Android apps fast while sharing TypeScript models with your web team',
      'Your app relies on rich native gestures, OTA instant JS updates (EAS Update), and deep third-party SDKs',
      'You need custom Swift/Kotlin TurboModules for specialized camera, payment, or BLE hardware',
    ],
    tradeoffs: [
      'Heavy 3D games or complex AR scenes still require dedicated native or Unity views',
      'Major OS upgrades occasionally require native dependency alignment across CocoaPods/Gradle',
    ],
    architectureLayers: [
      'UI Layer: React Native Fabric + Reanimated 3 + Gesture Handler',
      'State & Offline: TanStack Query + Zustand + MMKV / SQLite Encrypted Storage',
      'Native Bridge: JSI TurboModules (Swift / Kotlin) for zero-bridge-serialization overhead',
      'Release Pipeline: Expo Application Services (EAS) + Fastlane CI/CD + OTA Hotfixes',
    ],
    scorecard: {
      developmentSpeed: 95,
      nativePerformance: 92,
      codeReuse: 94,
      hardwareAccess: 94,
    },
  },
  {
    key: 'flutter',
    tabLabel: 'Flutter',
    codeBadge: 'STACK 02 • IMPELLER ENGINE',
    headline: 'Flutter (Dart + Impeller GPU Rendering Engine)',
    subtitle:
      'Google’s compiled UI toolkit that paints every pixel directly on the GPU via Impeller—delivering identical, ultra-fluid custom interfaces across iOS and Android.',
    codeSharePercent: '90%–95% Single Dart Codebase',
    uiRenderingModel: 'Custom Skia / Impeller GPU Canvas (zero OEM widget discrepancies)',
    performanceProfile: 'Ahead-of-Time (AOT) compiled ARM machine code with zero shader jank',
    timeToMarket: '8–12 weeks for pixel-identical iOS + Android release',
    bestWhen: [
      'You want a highly bespoke, brand-heavy UI with custom animations that looks 100% identical on every OS version',
      'Your product needs complex interactive charts, custom canvases, or multi-step fintech/booking flows',
      'You want rock-solid AOT compiled performance with a strongly typed Dart architecture',
    ],
    tradeoffs: [
      'Initial app binary download size is slightly larger (~4–7 MB overhead) due to bundled rendering engine',
      'Over-the-air code push requires Shorebird or store releases rather than standard JS bundle swaps',
    ],
    architectureLayers: [
      'UI Layer: Flutter Impeller Engine + Custom Design System Tokens',
      'State & Offline: Riverpod / Bloc + Drift (SQLite) + Hive Local Cache',
      'Platform Channels: Typed Pigeon MethodChannels to Swift (iOS) & Kotlin (Android)',
      'Release Pipeline: Codemagic / GitHub Actions + Fastlane Automated Store Tracks',
    ],
    scorecard: {
      developmentSpeed: 94,
      nativePerformance: 95,
      codeReuse: 96,
      hardwareAccess: 92,
    },
  },
  {
    key: 'native',
    tabLabel: 'Native iOS & Android (Swift / Kotlin)',
    codeBadge: 'STACK 03 • 100% PLATFORM NATIVE',
    headline: 'Pure Native iOS (Swift / SwiftUI) & Android (Kotlin / Jetpack Compose)',
    subtitle:
      'Dedicated platform codebases built directly on Apple and Google’s first-party frameworks for maximum hardware control, lowest memory footprint, and day-one OS APIs.',
    codeSharePercent: 'Separate iOS & Android UI (Optional Kotlin Multiplatform shared core)',
    uiRenderingModel: 'First-Party Apple SwiftUI / UIKit & Android Jetpack Compose',
    performanceProfile: 'Maximum raw CPU/GPU throughput, Metal/Vulkan access & lowest battery drain',
    timeToMarket: '12–18 weeks (parallel iOS & Android squads)',
    bestWhen: [
      'Your app is hardware-intensive: continuous BLE medical/EV telemetry, ARKit/ARCore, or low-latency audio/video processing',
      'You need immediate access to Apple Watch (watchOS), Wear OS, App Clips, Dynamic Island Live Activities, or CarPlay/Android Auto',
      'Regulated banking, defence, or healthcare products requiring strict native security enclaves',
    ],
    tradeoffs: [
      'Maintaining two separate UI codebases requires higher engineering investment and coordination',
      'Feature parity across iOS and Android must be QA-verified across two distinct pipelines',
    ],
    architectureLayers: [
      'iOS Stack: Swift 5.10 + SwiftUI + Combine/Async-Await + CoreData / SwiftData',
      'Android Stack: Kotlin + Jetpack Compose + Coroutines/Flow + Room DB',
      'Hardware APIs: CoreBluetooth, HealthKit, ARKit, CallKit, BiometricPrompt, NFC',
      'Release Pipeline: Xcode Cloud + Gradle Play Publisher + Phased Store Rollouts',
    ],
    scorecard: {
      developmentSpeed: 76,
      nativePerformance: 100,
      codeReuse: 45,
      hardwareAccess: 100,
    },
  },
  {
    key: 'pwa',
    tabLabel: 'PWA / Hybrid',
    codeBadge: 'STACK 04 • INSTANT WEB-TO-APP',
    headline: 'Progressive Web App (PWA) & Capacitor Hybrid Wrapper',
    subtitle:
      'Installable mobile web apps with Service Worker offline caching and Web Push—optionally wrapped via Capacitor for rapid validation and zero app-store commission.',
    codeSharePercent: '98% Shared with Existing React / Next.js Web Application',
    uiRenderingModel: 'Hardware-Accelerated WebView / Mobile Browser Engine',
    performanceProfile: 'Sub-2s load via Service Worker precaching; ideal for content & CRUD flows',
    timeToMarket: '3–6 weeks to launch across Web + Home Screen install',
    bestWhen: [
      'You want to validate an MVP fast or serve B2B portals without waiting for App Store review cycles',
      'You want 100% of digital subscription revenue without paying 15%–30% in-app purchase commissions',
      'Your users discover you via Google Search or QR codes at tables, clinics, or retail stores',
    ],
    tradeoffs: [
      'Limited background execution, Bluetooth/NFC access, and biometric capabilities compared to React Native/Flutter',
      'Apple iOS App Store rejects thin WebView wrappers unless they include substantial native functionality',
    ],
    architectureLayers: [
      'Frontend: Next.js / React + Tailwind CSS + Responsive Touch Gestures',
      'Offline Engine: Workbox Service Workers + IndexedDB Local Persistence',
      'Native Shell (Optional): Ionic Capacitor plugins for Camera, Haptics & Push',
      'Distribution: Instant HTTPS URL + Web App Manifest + TWA / Enterprise MDM',
    ],
    scorecard: {
      developmentSpeed: 98,
      nativePerformance: 74,
      codeReuse: 99,
      hardwareAccess: 68,
    },
  },
];

/* Quiz Recommendation Matrix for Section 3 */
export type QuizPlatformChoice = 'both' | 'ios-first' | 'android-first';
export type QuizHardwareChoice = 'standard' | 'intensive';
export type QuizTimelineChoice = 'fast-mvp' | 'flagship-scale';

/* Section 4: Native Capabilities Interactive Phone Workbench (8 Capabilities) */
export interface NativeCapabilitySpec {
  id: string;
  number: string;
  shortTitle: string;
  categoryTag: string;
  screenBadge: string;
  screenHeadline: string;
  screenSubtext: string;
  iosImplementation: string;
  androidImplementation: string;
  whyUsersLoveIt: string;
  securityOrPerfNote: string;
  interactiveDemoState: {
    statusLabel: string;
    primaryActionText: string;
    activeFeedbackText: string;
    metrics: [
      { label: string; value: string },
      { label: string; value: string },
      { label: string; value: string },
    ];
  };
}

const NATIVE_CAPABILITIES: NativeCapabilitySpec[] = [
  {
    id: 'cap-push',
    number: '01',
    shortTitle: 'Push Notifications & Deep Linking',
    categoryTag: 'ENGAGEMENT & RETENTION',
    screenBadge: 'APNs + FCM UNIVERSAL LINKS',
    screenHeadline: 'Order #WX-804 Out for Delivery',
    screenSubtext:
      'Tap notification to bypass the home screen and open live rider map at exact coordinates.',
    iosImplementation:
      'Apple Push Notification service (APNs) + UNNotificationServiceExtension for rich media & Universal Links (`apple-app-site-association`).',
    androidImplementation:
      'Firebase Cloud Messaging (FCM) high-priority channels + verified Android App Links (`assetlinks.json`).',
    whyUsersLoveIt:
      'Tapping a notification or WhatsApp link opens the exact screen inside the app—even if the user had to install the app first (deferred deep linking).',
    securityOrPerfNote:
      'Token rotation, silent background data pushes, and granular topic opt-in controls prevent notification fatigue.',
    interactiveDemoState: {
      statusLabel: 'DEEP LINK PAYLOAD: /orders/WX-804/track',
      primaryActionText: 'Simulate Push Tap → Deep Link',
      activeFeedbackText: 'Routed directly to Order #WX-804 Live Map in 140ms (Skipped 3 screens)',
      metrics: [
        { label: 'Delivery Speed', value: '< 400ms' },
        { label: 'Open-to-Action Lift', value: '+3.1×' },
        { label: 'Deferred Link Match', value: '99.4%' },
      ],
    },
  },
  {
    id: 'cap-offline',
    number: '02',
    shortTitle: 'Offline-First & Background Sync',
    categoryTag: 'ZERO-DROP RELIABILITY',
    screenBadge: 'ENCRYPTED SQLITE + DELTA SYNC',
    screenHeadline: 'Airplane Mode Active • 3 Actions Queued',
    screenSubtext:
      'Users keep browsing, logging forms, and adding items offline. Mutations auto-sync when 4G/Wi-Fi returns.',
    iosImplementation:
      'SQLCipher / CoreData local persistence + BGTaskScheduler background refresh tasks.',
    androidImplementation:
      'Room / SQLite encrypted local DB + Jetpack WorkManager guaranteed background sync queue.',
    whyUsersLoveIt:
      'No spinning loaders in elevators, metro tunnels, or low-network zones. Every tap feels instantaneous because reads and writes hit local storage first.',
    securityOrPerfNote:
      'Idempotent mutation keys and timestamp/CRDT conflict resolution prevent duplicate orders or overwritten records.',
    interactiveDemoState: {
      statusLabel: 'LOCAL DB: 148 RECORDS CACHED • QUEUE: 3',
      primaryActionText: 'Reconnect Network & Flush Queue',
      activeFeedbackText: '3 offline mutations synced to cloud API with zero conflicts ✓',
      metrics: [
        { label: 'Local Read Time', value: '2.4ms' },
        { label: 'Offline Availability', value: '100%' },
        { label: 'Conflict Loss', value: '0 Records' },
      ],
    },
  },
  {
    id: 'cap-biometric',
    number: '03',
    shortTitle: 'Biometric Login (Face ID / Fingerprint)',
    categoryTag: 'HARDWARE SECURITY',
    screenBadge: 'SECURE ENCLAVE + KEYSTORE',
    screenHeadline: 'Unlock Vault with Face ID / Touch ID',
    screenSubtext:
      'Cryptographic keys stay locked inside device hardware—no passwords to forget or SMS OTP delays.',
    iosImplementation:
      'LocalAuthentication framework (Face ID / Touch ID) backed by iOS Keychain & Secure Enclave.',
    androidImplementation:
      'AndroidX BiometricPrompt API (Class 3 Strong Biometrics) bound to Android Hardware Keystore.',
    whyUsersLoveIt:
      'Returning users sign in or authorize high-value payments in under 0.6 seconds with a glance or thumb press.',
    securityOrPerfNote:
      'Biometric templates never leave the device chip; authentication unlocks an asymmetric hardware-backed token.',
    interactiveDemoState: {
      statusLabel: 'ENCLAVE STATUS: HARDWARE KEY LOCKED',
      primaryActionText: 'Test Biometric Hardware Verify',
      activeFeedbackText: 'Biometric CryptoObject verified • JWT session refreshed in 310ms ✓',
      metrics: [
        { label: 'Sign-In Time', value: '0.5s' },
        { label: 'Login Drop-Off', value: '-68%' },
        { label: 'Storage Tier', value: 'Hardware TEE' },
      ],
    },
  },
  {
    id: 'cap-payments',
    number: '04',
    shortTitle: 'In-App Payments, Subscriptions & UPI',
    categoryTag: 'MONETIZATION ENGINE',
    screenBadge: 'UPI INTENT • APPLE PAY • STOREKIT 2',
    screenHeadline: '1-Tap Checkout: ₹1,499 / $19 Pro Plan',
    screenSubtext:
      'Native payment sheets for physical goods (UPI, Cards, Apple/Google Pay) and digital subscriptions.',
    iosImplementation:
      'Apple Pay (PKPaymentAuthorizationController) + StoreKit 2 for auto-renewable subscriptions & server webhooks.',
    androidImplementation:
      'Direct UPI Intent (GPay, PhonePe, Paytm), Google Pay API & Google Play Billing Library v7.',
    whyUsersLoveIt:
      'No typing 16-digit card numbers or switching apps to copy VPA handles—native sheets complete payment in one biometric tap.',
    securityOrPerfNote:
      'Server-side receipt validation and signed webhook listeners prevent spoofed client unlock states.',
    interactiveDemoState: {
      statusLabel: 'GATEWAY: RAZORPAY + STRIPE + STOREKIT',
      primaryActionText: 'Trigger 1-Tap Native Payment Sheet',
      activeFeedbackText: 'Webhook verified • Order / Subscription entitlement unlocked instantly ✓',
      metrics: [
        { label: 'Checkout Steps', value: '1 Tap' },
        { label: 'Payment Success', value: '96.8%' },
        { label: 'PCI Scope', value: 'Tokenized' },
      ],
    },
  },
  {
    id: 'cap-gps',
    number: '05',
    shortTitle: 'Live Location, Maps & Geofencing',
    categoryTag: 'SPATIAL & LOGISTICS',
    screenBadge: 'CORE LOCATION + FUSED GPS',
    screenHeadline: 'Live Tracking • 1.2 km Away (4 Mins)',
    screenSubtext:
      'Battery-smart background location updates, custom map pins, route polylines, and automatic arrival geofences.',
    iosImplementation:
      'CoreLocation (Significant-Change & CLCircularRegion geofencing) + MapKit / Google Maps SDK.',
    androidImplementation:
      'Google Play Services FusedLocationProviderClient + GeofencingClient + Foreground Service.',
    whyUsersLoveIt:
      'Customers watch their delivery or technician arrive smoothly on a live map without draining either phone’s battery.',
    securityOrPerfNote:
      'Adaptive distance-filter sampling throttles GPS polling when stationary, cutting battery consumption by up to 60%.',
    interactiveDemoState: {
      statusLabel: 'GEOFENCE: 200M ARRIVAL ZONE ARMED',
      primaryActionText: 'Simulate Enter 200m Geofence',
      activeFeedbackText: 'Geofence triggered • "Arriving at Gate" alert dispatched automatically ✓',
      metrics: [
        { label: 'GPS Accuracy', value: '±3.5 Meters' },
        { label: 'Battery Savings', value: '-58% Drain' },
        { label: 'Socket Refresh', value: 'Every 2s' },
      ],
    },
  },
  {
    id: 'cap-camera',
    number: '06',
    shortTitle: 'Camera, QR/Barcode & Document Scan',
    categoryTag: 'VISION & CAPTURE',
    screenBadge: '60FPS VISION PIPELINE',
    screenHeadline: 'Instant QR / Barcode & KYC Document OCR',
    screenSubtext:
      'Sub-second barcode recognition, auto-cropped document scanning, and client-side image compression.',
    iosImplementation:
      'AVFoundation + Apple VisionKit (VNDocumentCameraViewController) + CoreImage barcode detection.',
    androidImplementation:
      'Jetpack CameraX + Google ML Kit Barcode Scanning & Document Scanner API.',
    whyUsersLoveIt:
      'Point the camera at any QR code, warehouse SKU barcode, or ID card—recognition happens in milliseconds even in low light.',
    securityOrPerfNote:
      'On-device EXIF stripping and WebP/HEIC compression reduce upload payloads by 80% on slow mobile networks.',
    interactiveDemoState: {
      statusLabel: 'CAMERA FRAME PROCESSOR: 60 FPS READY',
      primaryActionText: 'Simulate Barcode + ID OCR Scan',
      activeFeedbackText: 'Decoded SKU #89014250012 in 42ms • Compressed 4.2MB → 310KB ✓',
      metrics: [
        { label: 'Barcode Lock', value: '< 50ms' },
        { label: 'Upload Compression', value: '-85% Size' },
        { label: 'OCR Processing', value: 'On-Device' },
      ],
    },
  },
  {
    id: 'cap-realtime',
    number: '07',
    shortTitle: 'Real-Time Chat, Voice & Video',
    categoryTag: 'LIVE COMMUNICATION',
    screenBadge: 'WEBSOCKETS + WEBRTC MEDIA',
    screenHeadline: 'Encrypted Doctor / Support Video & Chat',
    screenSubtext:
      'Low-latency in-app messaging with typing indicators, file attachments, and HD WebRTC video/voice calls.',
    iosImplementation:
      'Apple CallKit (native lock-screen incoming call UI) + WebRTC / Agora / LiveKit native SDK.',
    androidImplementation:
      'Android TelecomManager ConnectionService + WebRTC hardware video codec acceleration.',
    whyUsersLoveIt:
      'Incoming consultations or support calls ring just like a regular phone call and adapt smoothly to fluctuating 4G/5G speeds.',
    securityOrPerfNote:
      'End-to-end TLS/SRTP media encryption with local message caching for instant chat history loading.',
    interactiveDemoState: {
      statusLabel: 'WEBRTC ICE: CONNECTED (SRTP ENCRYPTED)',
      primaryActionText: 'Send Live Socket Message + Ping',
      activeFeedbackText: 'Message delivered & read-receipt ACK received in 28ms ✓',
      metrics: [
        { label: 'Socket Roundtrip', value: '28ms' },
        { label: 'Call UI', value: 'Native CallKit' },
        { label: 'Bitrate', value: 'Adaptive HD' },
      ],
    },
  },
  {
    id: 'cap-ai',
    number: '08',
    shortTitle: 'On-Device AI & Smart Search',
    categoryTag: 'INTELLIGENT UX',
    screenBadge: 'HYBRID CLOUD + ON-DEVICE AI',
    screenHeadline: 'Voice-to-Intent Search & Smart Copilot',
    screenSubtext:
      'Natural-language voice/text search, instant image tagging, and contextual in-app AI assistants.',
    iosImplementation:
      'Apple Core ML / Speech framework + streaming SSE cloud LLM endpoints with tool-calling.',
    androidImplementation:
      'TensorFlow Lite / AICore + Android SpeechRecognizer + streaming RAG vector search.',
    whyUsersLoveIt:
      'Instead of tapping through 6 filter menus, users speak or type "Book a pediatric dentist near Indiranagar tomorrow evening" and get pre-filled results.',
    securityOrPerfNote:
      'Strict PII redaction before cloud inference, with token-streaming responses starting in under 350ms.',
    interactiveDemoState: {
      statusLabel: 'INTENT PARSER: STREAMING SSE READY',
      primaryActionText: 'Run Natural-Language App Action',
      activeFeedbackText: 'Parsed 3 filters + pre-selected slot in 290ms ✓',
      metrics: [
        { label: 'First Token', value: '290ms' },
        { label: 'Search Conversion', value: '+2.4×' },
        { label: 'Privacy Guard', value: 'PII Masked' },
      ],
    },
  },
];

/* ============================================================================
   MAIN COMPONENT: MobileAppDevelopment (Part 1: Sections 1–4)
============================================================================ */
interface MobileAppDevelopmentProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const MobileAppDevelopment: React.FC<MobileAppDevelopmentProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Helper to open Quote Modal */
  const triggerQuoteModal = (serviceLabel?: string) => {
    const label = serviceLabel || mobileAppDevService.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* SEO Meta Title & Description Sync */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Mobile App Development Services (iOS, Android, React Native & Flutter) | WebXCode';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  /* Section 1 State: Synchronized Dual-Phone Screen Switcher */
  const [activeHeroScreenKey, setActiveHeroScreenKey] = useState<HeroScreenKey>('home');
  const [heroUserInteracted, setHeroUserInteracted] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || heroUserInteracted) return;
    const keys: HeroScreenKey[] = ['home', 'detail', 'checkout', 'push'];
    const timer = setInterval(() => {
      setActiveHeroScreenKey((prev) => {
        const nextIdx = (keys.indexOf(prev) + 1) % keys.length;
        return keys[nextIdx];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, heroUserInteracted]);

  const activeHeroScreen = useMemo(
    () =>
      HERO_DEVICE_SCREENS.find((s) => s.key === activeHeroScreenKey) || HERO_DEVICE_SCREENS[0],
    [activeHeroScreenKey]
  );

  /* Section 2 State: App Archetypes Filter + Selected Card */
  const [archetypeFilter, setArchetypeFilter] = useState<ArchetypeFilterKey>('All');
  const filteredArchetypes = useMemo(() => {
    if (archetypeFilter === 'All') return APP_ARCHETYPES;
    return APP_ARCHETYPES.filter((a) => a.filterCategory === archetypeFilter);
  }, [archetypeFilter]);

  /* Section 3 State: Stack Selector Tabs + 3-Question Recommender Quiz */
  const [activeStackKey, setActiveStackKey] = useState<StackApproachKey>('react-native');
  const [quizPlatform, setQuizPlatform] = useState<QuizPlatformChoice>('both');
  const [quizHardware, setQuizHardware] = useState<QuizHardwareChoice>('standard');
  const [quizTimeline, setQuizTimeline] = useState<QuizTimelineChoice>('fast-mvp');

  const activeStackSpec = useMemo(
    () => STACK_APPROACHES.find((s) => s.key === activeStackKey) || STACK_APPROACHES[0],
    [activeStackKey]
  );

  const recommendedQuizStack = useMemo((): {
    stackKey: StackApproachKey;
    label: string;
    reason: string;
  } => {
    if (quizHardware === 'intensive') {
      return {
        stackKey: 'native',
        label: 'Native iOS (Swift) & Android (Kotlin)',
        reason:
          'Because your app relies on intensive low-level hardware (BLE/IoT, ARKit, continuous background sensors), pure native Swift & Kotlin gives you direct OS framework access and lowest battery overhead.',
      };
    }
    if (quizPlatform === 'both' && quizTimeline === 'fast-mvp') {
      return {
        stackKey: 'react-native',
        label: 'React Native (TypeScript + New Architecture)',
        reason:
          'For launching on both iOS and Android fast with up to 90% shared code, native OEM widgets, and instant OTA updates, React Native is the highest-ROI engineering choice.',
      };
    }
    if (quizPlatform === 'both' && quizTimeline === 'flagship-scale') {
      return {
        stackKey: 'flutter',
        label: 'Flutter (Dart + Impeller GPU Engine)',
        reason:
          'For a flagship dual-platform product requiring pixel-identical custom UI, 60/120fps animations, and AOT-compiled stability across every screen size, Flutter shines.',
      };
    }
    return {
      stackKey: 'react-native',
      label: 'React Native or Targeted Native Build',
      reason:
        'Starting on a single platform with React Native lets you launch fast today and unlock the second platform later with 85%+ code reuse.',
    };
  }, [quizPlatform, quizHardware, quizTimeline]);

  /* Section 4 State: Native Capabilities Workbench */
  const [activeCapabilityId, setActiveCapabilityId] = useState<string>('cap-push');
  const [simulatedCapabilityId, setSimulatedCapabilityId] = useState<string | null>(null);

  const activeCapability = useMemo(
    () =>
      NATIVE_CAPABILITIES.find((c) => c.id === activeCapabilityId) || NATIVE_CAPABILITIES[0],
    [activeCapabilityId]
  );

  /* JSON-LD Service Structured Data */
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: mobileAppDevService.name,
      description: mobileAppDevService.description,
      provider: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      serviceType: 'Mobile Application Development (iOS, Android, React Native, Flutter)',
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'AU'],
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
         SECTION 1 — HERO: THE DUAL-DEVICE STAGE (iOS + ANDROID LIVE PREVIEW)
         (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-white/10">
        {/* Subtle Architectural Grid & Primary Blue Radial Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-28 right-1/4 w-[620px] h-[620px] blue-glow-strong pointer-events-none opacity-75"
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
                {mobileAppDevService.name}
              </li>
            </ol>
          </nav>

          {/* Asymmetric 12-Col Grid: Left 5 Cols Copy | Right 7 Cols Dual-Phone Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
            {/* Left Column (5 Cols on lg) */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[11px] font-bold uppercase tracking-[0.12em] mb-5">
                <Smartphone className="w-3.5 h-3.5 text-primary" />
                <span>MOBILE APP DEVELOPMENT • iOS · ANDROID · CROSS-PLATFORM</span>
              </div>

              <h1 className="text-[34px] sm:text-[44px] lg:text-[50px] font-extrabold text-white leading-[1.08] tracking-tight">
                Mobile Apps People{' '}
                <span className="text-primary">Keep on Their Home Screen</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[17px] text-white/80 leading-[1.65]">
                {mobileAppDevService.description} From consumer marketplaces and D2C shopping apps
                to offline-capable field tools and BLE hardware companions, we ship crash-free apps
                all the way through App Store and Google Play approval.
              </p>

              {/* Two CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal(mobileAppDevService.name)}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[15px] sm:text-[16px] shadow-soft hover:shadow-soft-hover transition-all cursor-pointer"
                >
                  <span>Get a Free App Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#stack-selector"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[15px] transition-all"
                >
                  <span>Compare React Native vs Flutter vs Native</span>
                </a>
              </div>

              {/* 4 Engineering Spec Pills */}
              <div className="mt-9 pt-7 border-t border-white/10 grid grid-cols-2 gap-3">
                {[
                  { code: '01', label: 'iOS & Android', sub: 'Dual-Store Delivery' },
                  { code: '02', label: '60fps Smooth UI', sub: 'Native Thread Animations' },
                  { code: '03', label: 'Offline-Ready', sub: 'Encrypted SQLite Sync' },
                  { code: '04', label: 'Store-Launch Included', sub: 'Apple & Play Compliance' },
                ].map((spec) => (
                  <div
                    key={spec.code}
                    className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-2.5"
                  >
                    <span className="px-2 py-0.5 rounded-md bg-primary/25 border border-primary/40 font-mono text-[10px] font-bold text-primary-100 shrink-0 mt-0.5">
                      {spec.code}
                    </span>
                    <div>
                      <div className="text-[13px] font-extrabold text-white leading-tight">
                        {spec.label}
                      </div>
                      <div className="text-[11px] text-white/65 mt-0.5">{spec.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column (7 Cols on lg): Interactive Dual-Device Stage (iPhone + Pixel) */}
            <div className="lg:col-span-7">
              <div className="rounded-[28px] bg-white/[0.04] border border-white/15 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
                {/* Top Stage Bar + Synchronized 4-Screen Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/85">
                      DUAL-DEVICE STAGE • SYNCED STATE
                    </span>
                  </div>

                  {/* 4 Screen Tabs */}
                  <div
                    role="tablist"
                    aria-label="Preview App Screens on iOS and Android"
                    className="flex flex-wrap items-center gap-1.5 bg-navy/90 p-1 rounded-full border border-white/15"
                  >
                    {HERO_DEVICE_SCREENS.map((scr) => {
                      const isActive = scr.key === activeHeroScreenKey;
                      return (
                        <button
                          key={scr.key}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => {
                            setHeroUserInteracted(true);
                            setActiveHeroScreenKey(scr.key);
                          }}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-primary text-white shadow-xs'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {scr.tabLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Side-by-Side Phone Frames (iOS iPhone Left | Android Pixel Right) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
                  {/* ==================== PHONE 1: iOS (iPhone Frame) ==================== */}
                  <div className="rounded-[32px] bg-navy border-[3px] border-white/25 p-3 shadow-xl flex flex-col justify-between relative overflow-hidden">
                    {/* iOS Top Status Bar + Dynamic Island Pill */}
                    <div>
                      <div className="flex items-center justify-between px-3 pt-1 pb-2.5 text-[10px] font-mono font-bold text-white/80">
                        <span>9:41</span>
                        <div className="w-20 h-4 rounded-full bg-white/15 border border-white/20 flex items-center justify-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-[8px] tracking-wider uppercase text-primary-100">
                            iOS 18
                          </span>
                        </div>
                        <span className="text-primary-100">5G • 100%</span>
                      </div>

                      {/* iOS Screen Surface (White Card inside Bezel) */}
                      <div className="rounded-[22px] bg-white text-navy p-3.5 min-h-[300px] flex flex-col justify-between border border-navy-08">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`ios-${activeHeroScreen.key}`}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                            className="flex-1 flex flex-col justify-between"
                          >
                            <div>
                              {/* Platform Tag */}
                              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-navy-08">
                                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                                  iOS • CUPERTINO UI
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[9px] font-bold">
                                  {activeHeroScreen.fpsBadge}
                                </span>
                              </div>

                              <div className="mt-3 text-[15px] font-extrabold text-navy leading-snug">
                                {activeHeroScreen.iosHeaderTitle}
                              </div>

                              {/* Screen-Specific Mockup Content for iOS */}
                              {activeHeroScreen.key === 'home' && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-2.5 rounded-xl bg-primary-50 border border-primary-100">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-primary">
                                      <span>PERSONALIZED FOR YOU</span>
                                      <span>cached • 0ms</span>
                                    </div>
                                    <div className="text-[13px] font-extrabold text-navy mt-0.5">
                                      Morning Wellness &amp; Lab Checkup
                                    </div>
                                    <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-navy-70">
                                      <span>Next Slot: Today 11:30 AM</span>
                                      <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px]">
                                        Book →
                                      </span>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="p-2 rounded-xl bg-navy text-white">
                                      <div className="text-[9px] font-mono text-primary-100">
                                        STREAK
                                      </div>
                                      <div className="text-[13px] font-extrabold">14 Days ★</div>
                                    </div>
                                    <div className="p-2 rounded-xl bg-primary-50/60 border border-navy-08">
                                      <div className="text-[9px] font-mono text-navy-60">
                                        WALLET
                                      </div>
                                      <div className="text-[13px] font-extrabold text-navy">
                                        2,450 Pts
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {activeHeroScreen.key === 'detail' && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-2.5 rounded-xl bg-primary-50/70 border border-primary-100">
                                    <div className="text-[11px] font-extrabold text-navy">
                                      Dr. Ananya Rao • Senior Specialist
                                    </div>
                                    <div className="text-[10px] text-navy-60">
                                      Live WebSocket Slot Lock • 4.9★
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px] font-bold">
                                    <div className="py-1.5 rounded-lg bg-primary-50 text-navy">
                                      10:30 AM
                                    </div>
                                    <div className="py-1.5 rounded-lg bg-primary text-white shadow-2xs">
                                      11:30 AM ✓
                                    </div>
                                    <div className="py-1.5 rounded-lg bg-primary-50 text-navy">
                                      04:15 PM
                                    </div>
                                  </div>
                                  <div className="p-2 rounded-xl bg-navy text-white flex items-center justify-between text-[10px] font-mono">
                                    <span>Dynamic Island Live Activity</span>
                                    <span className="text-primary-100 font-bold">ARMED</span>
                                  </div>
                                </div>
                              )}

                              {activeHeroScreen.key === 'checkout' && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-2.5 rounded-xl bg-navy text-white flex items-center justify-between">
                                    <div>
                                      <div className="text-[9px] font-mono text-primary-100">
                                        APPLE PAY • STOREKIT 2
                                      </div>
                                      <div className="text-[14px] font-extrabold">₹1,499.00</div>
                                    </div>
                                    <div className="w-8 h-8 rounded-xl bg-primary/30 border border-primary flex items-center justify-center">
                                      <Fingerprint className="w-4 h-4 text-primary-100" />
                                    </div>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-primary-50 border border-primary-100 text-center">
                                    <div className="text-[11px] font-extrabold text-primary">
                                      Face ID Verified in 0.4s ✓
                                    </div>
                                    <div className="text-[10px] text-navy-70 mt-0.5">
                                      Secure Enclave Token • Zero OTP Wait
                                    </div>
                                  </div>
                                </div>
                              )}

                              {activeHeroScreen.key === 'push' && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-2.5 rounded-2xl bg-navy text-white border border-primary shadow-md">
                                    <div className="flex items-center justify-between text-[9px] font-mono text-primary-100 mb-1">
                                      <span>APNs RICH PUSH • NOW</span>
                                      <span>UNIVERSAL LINK</span>
                                    </div>
                                    <div className="text-[12px] font-extrabold">
                                      Your session starts in 15 mins!
                                    </div>
                                    <div className="text-[10px] text-white/75 mt-0.5">
                                      Tap to join HD video room or reschedule.
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] font-bold text-center">
                                      <span className="py-1 rounded-lg bg-primary text-white">
                                        Join Room →
                                      </span>
                                      <span className="py-1 rounded-lg bg-white/10 text-white">
                                        Snooze 5m
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* iOS Spec Bullet Strip + Home Indicator */}
                            <div className="mt-3 pt-2.5 border-t border-navy-08">
                              <ul className="space-y-1">
                                {activeHeroScreen.iosHighlights.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-center gap-1.5 text-[10px] font-bold text-navy-70"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                    <span className="truncate">{item}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-2.5 mx-auto w-20 h-1 rounded-full bg-navy/25" />
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* ==================== PHONE 2: ANDROID (Pixel Frame) ==================== */}
                  <div className="rounded-[28px] bg-navy border-[3px] border-primary/50 p-3 shadow-xl flex flex-col justify-between relative overflow-hidden">
                    {/* Android Status Bar + Punch-Hole Camera */}
                    <div>
                      <div className="flex items-center justify-between px-3 pt-1 pb-2.5 text-[10px] font-mono font-bold text-white/80">
                        <span>09:41</span>
                        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/25 border border-primary/40">
                          <span className="w-2 h-2 rounded-full bg-white" />
                          <span className="text-[8px] tracking-wider uppercase text-primary-100">
                            ANDROID 15
                          </span>
                        </div>
                        <span className="text-primary-100">VoLTE • 98%</span>
                      </div>

                      {/* Android Screen Surface (White Card inside Bezel) */}
                      <div className="rounded-[20px] bg-white text-navy p-3.5 min-h-[300px] flex flex-col justify-between border border-navy-08">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`and-${activeHeroScreen.key}`}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                            transition={{ duration: 0.18 }}
                            className="flex-1 flex flex-col justify-between"
                          >
                            <div>
                              {/* Platform Tag */}
                              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-navy-08">
                                <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                                  ANDROID • MATERIAL 3
                                </span>
                                <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary font-mono text-[9px] font-bold">
                                  {activeHeroScreen.latencyBadge}
                                </span>
                              </div>

                              <div className="mt-3 text-[15px] font-extrabold text-navy leading-snug">
                                {activeHeroScreen.androidHeaderTitle}
                              </div>

                              {/* Screen-Specific Mockup Content for Android */}
                              {activeHeroScreen.key === 'home' && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-2.5 rounded-2xl bg-primary-50 border border-primary-100">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-primary">
                                      <span>MATERIAL YOU SURFACE</span>
                                      <span>SQLite Synced</span>
                                    </div>
                                    <div className="text-[13px] font-extrabold text-navy mt-0.5">
                                      Morning Wellness &amp; Lab Checkup
                                    </div>
                                    <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-navy-70">
                                      <span>Next Slot: Today 11:30 AM</span>
                                      <span className="px-2.5 py-0.5 rounded-lg bg-navy text-white text-[10px]">
                                        Reserve
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between p-2 rounded-xl bg-primary-50/50 border border-navy-08">
                                    <span className="text-[11px] font-bold text-navy">
                                      Quick Scan / Action FAB
                                    </span>
                                    <span className="w-7 h-7 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-[12px] shadow-xs">
                                      +
                                    </span>
                                  </div>
                                </div>
                              )}

                              {activeHeroScreen.key === 'detail' && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-2.5 rounded-2xl bg-primary-50/70 border border-primary-100">
                                    <div className="text-[11px] font-extrabold text-navy">
                                      Dr. Ananya Rao • Senior Specialist
                                    </div>
                                    <div className="text-[10px] text-navy-60">
                                      Shared-Element Hero Transition • 4.9★
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[10px] font-bold">
                                    <div className="py-1.5 rounded-lg bg-primary-50 text-navy">
                                      10:30 AM
                                    </div>
                                    <div className="py-1.5 rounded-lg bg-primary text-white shadow-2xs">
                                      11:30 AM ✓
                                    </div>
                                    <div className="py-1.5 rounded-lg bg-primary-50 text-navy">
                                      04:15 PM
                                    </div>
                                  </div>
                                  <div className="p-2 rounded-xl bg-navy text-white flex items-center justify-between text-[10px] font-mono">
                                    <span>Google Calendar Intent</span>
                                    <span className="text-primary-100 font-bold">AUTO-SYNC</span>
                                  </div>
                                </div>
                              )}

                              {activeHeroScreen.key === 'checkout' && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-2.5 rounded-2xl bg-navy text-white flex items-center justify-between">
                                    <div>
                                      <div className="text-[9px] font-mono text-primary-100">
                                        1-TAP UPI INTENT • GPAY / PHONEPE
                                      </div>
                                      <div className="text-[14px] font-extrabold">₹1,499.00</div>
                                    </div>
                                    <div className="w-8 h-8 rounded-xl bg-primary/30 border border-primary flex items-center justify-center">
                                      <ShieldCheck className="w-4 h-4 text-primary-100" />
                                    </div>
                                  </div>
                                  <div className="p-2.5 rounded-xl bg-primary-50 border border-primary-100 text-center">
                                    <div className="text-[11px] font-extrabold text-primary">
                                      BiometricPrompt + UPI Confirmed ✓
                                    </div>
                                    <div className="text-[10px] text-navy-70 mt-0.5">
                                      Direct Bank VPA • Instant Webhook ACK
                                    </div>
                                  </div>
                                </div>
                              )}

                              {activeHeroScreen.key === 'push' && (
                                <div className="mt-3 space-y-2">
                                  <div className="p-2.5 rounded-2xl bg-navy text-white border border-primary shadow-md">
                                    <div className="flex items-center justify-between text-[9px] font-mono text-primary-100 mb-1">
                                      <span>FCM HIGH-PRIORITY • NOW</span>
                                      <span>APP LINK</span>
                                    </div>
                                    <div className="text-[12px] font-extrabold">
                                      Your session starts in 15 mins!
                                    </div>
                                    <div className="text-[10px] text-white/75 mt-0.5">
                                      Verified `assetlinks.json` deep route.
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px] font-bold text-center">
                                      <span className="py-1 rounded-lg bg-primary text-white">
                                        Open App →
                                      </span>
                                      <span className="py-1 rounded-lg bg-white/10 text-white">
                                        Remind 5m
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Android Spec Bullet Strip + Gesture Pill */}
                            <div className="mt-3 pt-2.5 border-t border-navy-08">
                              <ul className="space-y-1">
                                {activeHeroScreen.androidHighlights.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-center gap-1.5 text-[10px] font-bold text-navy-70"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                    <span className="truncate">{item}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-2.5 mx-auto w-16 h-1 rounded-full bg-navy/25" />
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Synchronized Architecture Caption */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-white/75">
                  <span>
                    <strong className="text-white">
                      Stage {activeHeroScreen.stepNumber} ({activeHeroScreen.tabLabel}):
                    </strong>{' '}
                    {activeHeroScreen.summary}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-primary-100 shrink-0">
                    1 Shared API • 2 Native Experiences
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 2 — WHAT WE BUILD: 6 APP ARCHETYPES MATRIX
         (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header + Category Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                WHAT WE BUILD • 6 PRODUCTION ARCHETYPES
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Engineered for Your Exact{' '}
                <span className="text-primary">Mobile Product Model</span>
              </h2>
              <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
                A consumer social app, a 10-minute delivery platform, and an offline warehouse
                scanner require completely different mobile architectures. Explore the 6 app
                archetypes we build and their recommended stacks.
              </p>
            </div>

            {/* Filter Chips */}
            <div
              role="group"
              aria-label="Filter App Archetypes by Category"
              className="flex flex-wrap items-center gap-2"
            >
              {(
                [
                  'All',
                  'Consumer',
                  'E-commerce',
                  'Booking',
                  'B2B / Field',
                  'Learning',
                  'IoT / Connected',
                ] as ArchetypeFilterKey[]
              ).map((cat) => {
                const isActive = archetypeFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setArchetypeFilter(cat)}
                    className={`px-3.5 py-2 rounded-full text-[12px] font-bold transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-navy text-white border-navy shadow-xs'
                        : 'bg-primary-50/50 text-navy border-navy-08 hover:border-primary'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6 Archetype Cards Grid (3x2 on lg, 2x3 on md) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
            {filteredArchetypes.map((arch) => (
              <article
                key={arch.id}
                className="rounded-[24px] bg-white border-2 border-navy-08 hover:border-primary shadow-soft hover:shadow-xl transition-all p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Meta Row: Code + Timeline */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-wider">
                      {arch.code}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-[12px] font-bold text-navy-60">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{arch.typicalTimeline}</span>
                    </span>
                  </div>

                  {/* Mini Phone Wireframe Header Preview */}
                  <div className="rounded-2xl bg-navy text-white p-4 mb-5 border border-navy shadow-md">
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-mono text-[11px] font-bold text-white/90 truncate">
                          {arch.miniWireframe.screenTitle}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-primary/25 border border-primary/40 font-mono text-[10px] font-bold text-primary-100 shrink-0">
                        {arch.miniWireframe.statusChip}
                      </span>
                    </div>

                    {/* Mini Wireframe Rows */}
                    <div className="space-y-1.5 mb-3">
                      {arch.miniWireframe.rows.map((r, i) => (
                        <div
                          key={r}
                          className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-between text-[11px]"
                        >
                          <span className="font-medium text-white/85 truncate">{r}</span>
                          <span className="font-mono text-[10px] text-primary-100 ml-2 shrink-0">
                            0{i + 1}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-white/65">{arch.miniWireframe.primaryMetricLabel}</span>
                      <span className="font-mono font-extrabold text-primary-100">
                        {arch.miniWireframe.primaryMetricValue}
                      </span>
                    </div>
                  </div>

                  {/* Title + Recommended Stack Badge */}
                  <h3 className="text-[21px] sm:text-[22px] font-extrabold text-navy leading-snug">
                    {arch.name}
                  </h3>

                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-50 border border-primary-100 text-[12px] font-bold text-primary">
                    <Cpu className="w-3.5 h-3.5 shrink-0" />
                    <span>Stack: {arch.recommendedStack}</span>
                  </div>

                  <p className="mt-3 text-[14px] text-navy-70 leading-relaxed">{arch.tagline}</p>

                  {/* 4 Key Modules Included */}
                  <div className="mt-5 pt-4 border-t border-navy-08">
                    <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                      Core Modules Engineered
                    </div>
                    <ul className="space-y-2">
                      {arch.keyModules.map((mod) => (
                        <li
                          key={mod}
                          className="flex items-start gap-2 text-[13px] font-medium text-navy leading-snug"
                        >
                          <Check
                            className="w-4 h-4 text-primary shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="mt-6 pt-4 border-t border-navy-08 flex items-center justify-between gap-3">
                  <span className="text-[12px] font-semibold text-navy-60 truncate">
                    Best for: {arch.bestFor.split(',')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerQuoteModal(`Mobile App: ${arch.name}`)}
                    className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-primary hover:text-navy transition-colors shrink-0 cursor-pointer"
                  >
                    <span>Build This Type of App</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 3 — CROSS-PLATFORM VS NATIVE: INTERACTIVE STACK SELECTOR
         (bg: #f0f7fd primary-50)
      ====================================================================== */}
      <section
        id="stack-selector"
        className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                HONEST ARCHITECTURE COMPARISON
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
                React Native, Flutter, or Pure Native?{' '}
                <span className="text-primary">Pick the Right Stack</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-xl leading-[1.65]">
              We don’t force every client into a single framework. Compare all 4 mobile engineering
              approaches side-by-side—or use the 3-question recommender below to see which stack
              fits your product and budget.
            </p>
          </div>

          {/* 4 Approach Tabs */}
          <div
            role="tablist"
            aria-label="Mobile App Technology Stack Approaches"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
          >
            {STACK_APPROACHES.map((stack) => {
              const isSelected = stack.key === activeStackKey;
              return (
                <button
                  key={stack.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveStackKey(stack.key)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-lg'
                      : 'bg-white text-navy border-navy-08 hover:border-primary'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`font-mono text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-primary-50 text-primary'
                      }`}
                    >
                      {stack.codeBadge.split('•')[0].trim()}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-navy-40'}`}
                    />
                  </div>
                  <div className="text-[16px] font-extrabold leading-snug">{stack.tabLabel}</div>
                  <div
                    className={`text-[12px] mt-1 font-medium ${
                      isSelected ? 'text-white/75' : 'text-navy-60'
                    }`}
                  >
                    {stack.timeToMarket}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stack Comparison Workbench */}
          <div className="rounded-[26px] bg-white border-2 border-navy-15 shadow-soft overflow-hidden mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStackSpec.key}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {/* Top Navy Banner */}
                <div className="bg-navy text-white p-6 sm:p-8 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/25 border border-primary/40 font-mono text-[11px] font-extrabold text-primary-100 uppercase tracking-wider mb-2.5">
                      {activeStackSpec.codeBadge}
                    </span>
                    <h3 className="text-[24px] sm:text-[28px] font-extrabold text-white leading-tight">
                      {activeStackSpec.headline}
                    </h3>
                    <p className="mt-2 text-[14px] sm:text-[15px] text-white/80 leading-relaxed">
                      {activeStackSpec.subtitle}
                    </p>
                  </div>

                  {/* Key Readouts */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10">
                      <div className="font-mono text-[10px] uppercase text-white/60">
                        Code Sharing
                      </div>
                      <div className="text-[14px] font-extrabold text-primary-100 mt-0.5">
                        {activeStackSpec.codeSharePercent}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10">
                      <div className="font-mono text-[10px] uppercase text-white/60">
                        Typical Delivery
                      </div>
                      <div className="text-[14px] font-extrabold text-white mt-0.5">
                        {activeStackSpec.timeToMarket}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body Grid: 7 Cols Best When + Tradeoffs | 5 Cols Stack Layers + Scorecard */}
                <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-6">
                    {/* UI Rendering & Performance Strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-primary-50/60 border border-primary-100">
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                          UI RENDERING ENGINE
                        </div>
                        <div className="text-[14px] font-bold text-navy mt-1">
                          {activeStackSpec.uiRenderingModel}
                        </div>
                      </div>
                      <div className="p-4 rounded-2xl bg-primary-50/60 border border-primary-100">
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                          PERFORMANCE PROFILE
                        </div>
                        <div className="text-[14px] font-bold text-navy mt-1">
                          {activeStackSpec.performanceProfile}
                        </div>
                      </div>
                    </div>

                    {/* Best When Checklist */}
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-3">
                        When to Choose {activeStackSpec.tabLabel}
                      </div>
                      <div className="space-y-2.5">
                        {activeStackSpec.bestWhen.map((point) => (
                          <div
                            key={point}
                            className="p-3.5 rounded-xl bg-primary-50/45 border border-navy-08 flex items-start gap-3"
                          >
                            <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3" strokeWidth={2.5} />
                            </div>
                            <span className="text-[14px] font-semibold text-navy leading-snug">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Honest Trade-offs */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-navy/[0.03] border border-navy-15">
                      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-60 mb-2.5">
                        Honest Engineering Trade-Offs
                      </div>
                      <ul className="space-y-2">
                        {activeStackSpec.tradeoffs.map((tr) => (
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
                  </div>

                  {/* Right 5 Cols: Production Architecture Layers + 4 Scorecard Bars */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                    <div className="rounded-2xl border border-navy-15 p-5 sm:p-6 bg-white">
                      <div className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary mb-3">
                        PRODUCTION ARCHITECTURE LAYERS
                      </div>
                      <div className="space-y-2.5 mb-6">
                        {activeStackSpec.architectureLayers.map((layer, idx) => (
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
                        STACK SCORECARD
                      </div>
                      <div className="space-y-3">
                        {[
                          {
                            label: 'Development & Launch Speed',
                            val: activeStackSpec.scorecard.developmentSpeed,
                          },
                          {
                            label: 'Native UI & Frame Performance',
                            val: activeStackSpec.scorecard.nativePerformance,
                          },
                          {
                            label: 'Cross-Platform Code Reuse',
                            val: activeStackSpec.scorecard.codeReuse,
                          },
                          {
                            label: 'Deep Hardware & OS API Access',
                            val: activeStackSpec.scorecard.hardwareAccess,
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

                    <button
                      type="button"
                      onClick={() =>
                        triggerQuoteModal(`App Stack Consultation: ${activeStackSpec.tabLabel}`)
                      }
                      className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-700 text-white font-bold text-[14px] inline-flex items-center justify-center gap-2 shadow-soft transition-all cursor-pointer"
                    >
                      <span>Discuss a {activeStackSpec.tabLabel} Build</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive 3-Question Mini Recommender: "Not sure? Answer 3 quick questions" */}
          <div className="rounded-[26px] bg-navy text-white p-6 sm:p-8 lg:p-10 border-2 border-primary/40 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 7 Cols: 3 Quick Questions */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                    INTERACTIVE STACK RECOMMENDER
                  </span>
                  <h3 className="text-[22px] sm:text-[26px] font-extrabold text-white mt-1">
                    Not Sure Which Stack Fits? Answer 3 Quick Questions
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Q1: Target Platforms */}
                  <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                    <div className="font-mono text-[10px] font-bold uppercase text-primary-100 mb-2">
                      1. Target Platforms
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { id: 'both', label: 'Both iOS & Android' },
                        { id: 'ios-first', label: 'iOS First' },
                        { id: 'android-first', label: 'Android First' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setQuizPlatform(opt.id as QuizPlatformChoice)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                            quizPlatform === opt.id
                              ? 'bg-primary text-white'
                              : 'bg-white/[0.06] text-white/80 hover:bg-white/10'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q2: Hardware Needs */}
                  <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                    <div className="font-mono text-[10px] font-bold uppercase text-primary-100 mb-2">
                      2. Hardware Depth
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { id: 'standard', label: 'Camera, GPS, Push, Pay' },
                        { id: 'intensive', label: 'Heavy BLE / IoT / ARKit' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setQuizHardware(opt.id as QuizHardwareChoice)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                            quizHardware === opt.id
                              ? 'bg-primary text-white'
                              : 'bg-white/[0.06] text-white/80 hover:bg-white/10'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Q3: Priority */}
                  <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10">
                    <div className="font-mono text-[10px] font-bold uppercase text-primary-100 mb-2">
                      3. Primary Priority
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { id: 'fast-mvp', label: 'Fast Launch + Web Sync' },
                        { id: 'flagship-scale', label: 'Bespoke Custom Canvas UI' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setQuizTimeline(opt.id as QuizTimelineChoice)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                            quizTimeline === opt.id
                              ? 'bg-primary text-white'
                              : 'bg-white/[0.06] text-white/80 hover:bg-white/10'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Instant Recommendation Output */}
              <div
                aria-live="polite"
                className="lg:col-span-5 rounded-2xl bg-white text-navy p-5 sm:p-6 border-2 border-primary flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-navy-08">
                    <span className="px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                      RECOMMENDED STACK
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveStackKey(recommendedQuizStack.stackKey)}
                      className="text-[12px] font-extrabold text-primary hover:underline cursor-pointer"
                    >
                      Inspect Above ↑
                    </button>
                  </div>
                  <h4 className="mt-3.5 text-[20px] font-extrabold text-navy leading-snug">
                    {recommendedQuizStack.label}
                  </h4>
                  <p className="mt-2 text-[13px] sm:text-[14px] text-navy-70 leading-relaxed">
                    {recommendedQuizStack.reason}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    triggerQuoteModal(`Recommended Stack: ${recommendedQuizStack.label}`)
                  }
                  className="mt-5 w-full py-3 px-4 rounded-full bg-navy hover:bg-primary text-white font-bold text-[13px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Get Estimate for This Stack</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
         SECTION 4 — NATIVE CAPABILITIES WORKBENCH (INTERACTIVE PHONE FEATURE DEMO)
         (bg: #ffffff) — 4 Left Pills + Center Interactive Phone + 4 Right Pills
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              HARDWARE &amp; OS CAPABILITIES WORKBENCH
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.14] tracking-tight">
              Built to Use the Full Power of{' '}
              <span className="text-primary">Modern iOS &amp; Android Hardware</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Great mobile apps feel effortless because they integrate deeply with device hardware.
              Click any of the 8 native capabilities around the workbench below to inspect how we
              engineer it on iOS and Android.
            </p>
          </div>

          {/* 3-Column Interactive Workbench: 4 Left Pills (3 cols) | Center Phone & Specs (6 cols) | 4 Right Pills (3 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column (3 cols on lg): Capabilities 01–04 */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-3">
              {NATIVE_CAPABILITIES.slice(0, 4).map((cap) => {
                const isSelected = cap.id === activeCapabilityId;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => {
                      setActiveCapabilityId(cap.id);
                      setSimulatedCapabilityId(null);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-md'
                        : 'bg-primary-50/40 text-navy border-navy-08 hover:border-primary'
                    }`}
                  >
                    <div>
                      <span
                        className={`font-mono text-[10px] font-extrabold uppercase tracking-wider block mb-1 ${
                          isSelected ? 'text-primary-100' : 'text-primary'
                        }`}
                      >
                        CAPABILITY {cap.number}
                      </span>
                      <div className="text-[14px] sm:text-[15px] font-extrabold leading-snug">
                        {cap.shortTitle}
                      </div>
                      <span
                        className={`inline-block mt-1.5 text-[11px] font-semibold ${
                          isSelected ? 'text-white/70' : 'text-navy-60'
                        }`}
                      >
                        {cap.categoryTag}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isSelected ? 'text-primary' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Center Column (6 cols on lg): Interactive Phone Screen + iOS/Android Implementation Readout */}
            <div className="lg:col-span-6">
              <div className="h-full rounded-[28px] bg-navy text-white p-5 sm:p-7 border-2 border-primary/40 shadow-2xl flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCapability.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Phone Top Status Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/15">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold uppercase">
                            MODULE {activeCapability.number}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-primary-100">
                            {activeCapability.screenBadge}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-white/65">
                          iOS + Android Native Bridge
                        </span>
                      </div>

                      {/* Simulated Interactive Phone Screen Card */}
                      <div className="rounded-2xl bg-white text-navy p-5 border border-white/20 shadow-lg">
                        <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-navy-08">
                          <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                            {activeCapability.interactiveDemoState.statusLabel}
                          </span>
                          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                        </div>

                        <h3 className="text-[19px] sm:text-[21px] font-extrabold text-navy leading-snug">
                          {activeCapability.screenHeadline}
                        </h3>
                        <p className="mt-1.5 text-[13px] sm:text-[14px] text-navy-70 leading-relaxed">
                          {activeCapability.screenSubtext}
                        </p>

                        {/* 3 Live Capability Metrics */}
                        <div className="mt-4 grid grid-cols-3 gap-2.5">
                          {activeCapability.interactiveDemoState.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="p-2.5 rounded-xl bg-primary-50/70 border border-primary-100 text-center"
                            >
                              <div className="font-mono text-[14px] sm:text-[15px] font-extrabold text-primary">
                                {m.value}
                              </div>
                              <div className="text-[10px] font-bold text-navy-70 mt-0.5">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Interactive Simulation Trigger Button inside Phone */}
                        <div className="mt-4 pt-3.5 border-t border-navy-08">
                          {simulatedCapabilityId === activeCapability.id ? (
                            <div
                              aria-live="polite"
                              className="p-3 rounded-xl bg-navy text-white text-[12px] sm:text-[13px] font-bold flex items-center justify-between gap-2"
                            >
                              <span>{activeCapability.interactiveDemoState.activeFeedbackText}</span>
                              <button
                                type="button"
                                onClick={() => setSimulatedCapabilityId(null)}
                                className="font-mono text-[10px] text-primary-100 underline shrink-0 cursor-pointer"
                              >
                                Reset
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setSimulatedCapabilityId(activeCapability.id)}
                              className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-700 text-white font-bold text-[13px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                            >
                              <Zap className="w-4 h-4" />
                              <span>{activeCapability.interactiveDemoState.primaryActionText}</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* iOS vs Android Low-Level SDK Breakdown */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/15">
                          <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100 mb-1">
                            iOS Native Implementation
                          </div>
                          <p className="text-[12px] sm:text-[13px] text-white/85 leading-relaxed">
                            {activeCapability.iosImplementation}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/15">
                          <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100 mb-1">
                            Android Native Implementation
                          </div>
                          <p className="text-[12px] sm:text-[13px] text-white/85 leading-relaxed">
                            {activeCapability.androidImplementation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Security / Performance Callout */}
                    <div className="mt-5 pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-[12px] text-white/75">
                        <strong className="text-primary-100">Engineering Guardrail: </strong>
                        {activeCapability.securityOrPerfNote}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          triggerQuoteModal(
                            `Mobile App with ${activeCapability.shortTitle}`
                          )
                        }
                        className="px-4 py-2 rounded-full bg-white text-navy hover:bg-primary hover:text-white text-[12px] font-extrabold shrink-0 transition-colors cursor-pointer"
                      >
                        Include in My App →
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column (3 cols on lg): Capabilities 05–08 */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-3">
              {NATIVE_CAPABILITIES.slice(4, 8).map((cap) => {
                const isSelected = cap.id === activeCapabilityId;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => {
                      setActiveCapabilityId(cap.id);
                      setSimulatedCapabilityId(null);
                    }}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-navy text-white border-navy shadow-md'
                        : 'bg-primary-50/40 text-navy border-navy-08 hover:border-primary'
                    }`}
                  >
                    <div>
                      <span
                        className={`font-mono text-[10px] font-extrabold uppercase tracking-wider block mb-1 ${
                          isSelected ? 'text-primary-100' : 'text-primary'
                        }`}
                      >
                        CAPABILITY {cap.number}
                      </span>
                      <div className="text-[14px] sm:text-[15px] font-extrabold leading-snug">
                        {cap.shortTitle}
                      </div>
                      <span
                        className={`inline-block mt-1.5 text-[11px] font-semibold ${
                          isSelected ? 'text-white/70' : 'text-navy-60'
                        }`}
                      >
                        {cap.categoryTag}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 mt-1 ${
                        isSelected ? 'text-primary' : 'text-navy-40'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MobileAppDevelopment;
