import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  Check,
  Video,
  Film,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Subtitles,
  Sparkles,
  Camera,
  Scissors,
  Palette,
  Layers,
  Globe2,
  Smartphone,
  Monitor,
  Square,
  Sliders,
  ShieldCheck,
  Clock,
  Wand2,
  Eye,
  FileText,
  Music,
} from 'lucide-react';
import { aiSolutions } from '../AISolutions';

/* ============================================================================
   SECTION 1 — HERO SCREENING ROOM & NLE TIMELINE DATA
============================================================================ */

type AspectRatioMode = '9:16' | '1:1' | '16:9';
type VoiceLanguageMode = 'EN' | 'HI';

interface ScreeningScene {
  id: number;
  code: string;
  timeStart: number; // in seconds (out of 15)
  timeEnd: number;
  title: string;
  shotType: string;
  cameraSpec: string;
  aiPromptTag: string;
  humanFinishTag: string;
  captionEN: string;
  captionHI: string;
  voiceActorEN: string;
  voiceActorHI: string;
  sceneHeadline: string;
  sceneSubline: string;
  badgeText: string;
}

const SCREENING_SCENES: ScreeningScene[] = [
  {
    id: 0,
    code: 'SC-01',
    timeStart: 0,
    timeEnd: 3.75,
    title: 'Scene 1 — Hook',
    shotType: 'MACRO STUDIO REVEAL',
    cameraSpec: '85mm Prime · Slow Push-In · 24fps',
    aiPromptTag: 'AI Scene + Rim Lighting Generation',
    humanFinishTag: 'Senior Editor Speed-Ramp & Hook Typography',
    captionEN: '“Still waiting 6 weeks and ₹4L for a single 15-second product shoot?”',
    captionHI: '“क्या आप अभी भी एक 15-सेकंड के प्रोडक्ट वीडियो के लिए 6 हफ़्ते और ₹4 लाख खर्च कर रहे हैं?”',
    voiceActorEN: 'Arjun (Studio Baritone · EN-IN)',
    voiceActorHI: 'Aarav (Warm Conversational · HI-IN)',
    sceneHeadline: 'THE 3-SECOND THUMB-STOPPER',
    sceneSubline: 'Liquid-glass lighting + kinetic bold hook card',
    badgeText: 'HOOK · 00:00–00:03',
  },
  {
    id: 1,
    code: 'SC-02',
    timeStart: 3.75,
    timeEnd: 7.5,
    title: 'Scene 2 — Product in Action',
    shotType: '360° ORBITAL PRODUCT SHOWCASE',
    cameraSpec: '50mm Anamorphic · Turntable Orbit · 60fps',
    aiPromptTag: 'Physics-Accurate Surface & Water Droplet Motion',
    humanFinishTag: 'Exact SKU Label Composite + Color Match',
    captionEN: '“Turn your product photos into cinema-grade motion—with 100% accurate packaging.”',
    captionHI: '“अपनी प्रोडक्ट फ़ोटो को सिनेमा-ग्रेड वीडियो में बदलें — बिल्कुल सटीक पैकेजिंग के साथ।”',
    voiceActorEN: 'Arjun (Studio Baritone · EN-IN)',
    voiceActorHI: 'Aarav (Warm Conversational · HI-IN)',
    sceneHeadline: 'TRUE-TO-SKU PRODUCT MOTION',
    sceneSubline: 'Real label composited onto AI studio environment',
    badgeText: 'PRODUCT · 00:03–00:07',
  },
  {
    id: 2,
    code: 'SC-03',
    timeStart: 7.5,
    timeEnd: 11.25,
    title: 'Scene 3 — Benefit Callout',
    shotType: 'SPLIT-SCREEN UI + AVATAR EXPLAINER',
    cameraSpec: '35mm Clean Studio · Floating Motion Callouts',
    aiPromptTag: 'Multilingual Lip-Sync Presenter + B-Roll',
    humanFinishTag: 'After Effects Callout Pointers & Sound SFX',
    captionEN: '“Launch 5 hooks across Reels, Shorts and YouTube in English, Hindi and regional languages.”',
    captionHI: '“Reels, Shorts और YouTube के लिए 5 अलग-अलग हुक्स — हिंदी, अंग्रेज़ी और क्षेत्रीय भाषाओं में।”',
    voiceActorEN: 'Meera (Crisp Brand Narrator · EN-GLOBAL)',
    voiceActorHI: 'Priya (Natural Studio Voice · HI-IN)',
    sceneHeadline: 'BENEFIT CALLOUTS & MULTILINGUAL DUBS',
    sceneSubline: 'Custom motion graphics + burned-in dynamic captions',
    badgeText: 'BENEFITS · 00:07–00:11',
  },
  {
    id: 3,
    code: 'SC-04',
    timeStart: 11.25,
    timeEnd: 15,
    title: 'Scene 4 — Offer & CTA',
    shotType: 'END-CARD LOCKUP & SONIC LOGO',
    cameraSpec: '24mm Wide Packshot · Brand Safe-Zone Grid',
    aiPromptTag: 'Multi-Ratio Auto-Reframe (9:16 · 1:1 · 16:9)',
    humanFinishTag: 'Final Broadcast Loudness (-14 LUFS) & Brand QA',
    captionEN: '“Ready in 7–10 days. Tap below to request your custom AI sample reel from WebXCode.”',
    captionHI: '“सिर्फ़ 7–10 दिनों में तैयार। अपना कस्टम AI सैंपल रील पाने के लिए अभी क्लिक करें।”',
    voiceActorEN: 'Arjun (Studio Baritone · EN-IN)',
    voiceActorHI: 'Aarav (Warm Conversational · HI-IN)',
    sceneHeadline: 'HIGH-CONVERTING END CARD & OFFER',
    sceneSubline: 'Exported in 9:16, 1:1 & 16:9 with platform safe zones',
    badgeText: 'OFFER CTA · 00:11–00:15',
  },
];

/* ============================================================================
   SECTION 3 — 6 VIDEO FORMAT VIEWFINDER CARDS DATA
============================================================================ */

interface VideoFormatCard {
  id: string;
  code: string;
  title: string;
  aspectBadge: string;
  durationBadge: string;
  whatItIs: string;
  bestFor: [string, string, string];
  typicalLength: string;
  turnaround: string;
  shotPreviewTitle: string;
  shotPreviewSpecs: string;
  deliverableHighlights: [string, string];
}

const VIDEO_FORMAT_CARDS: VideoFormatCard[] = [
  {
    id: 'product-showcase',
    code: 'FMT-01',
    title: 'Product Showcase & 360° Videos',
    aspectBadge: '9:16 · 1:1 · 16:9',
    durationBadge: '0:06 – 0:20s',
    whatItIs:
      'Turn static studio or packshot photos into fluid 360° turntable spins, macro texture sweeps, and dramatic studio-lit hero reveals—while keeping your exact product silhouette and printed label 100% intact.',
    bestFor: ['Product PDPs & Amazon/Shopify listings', 'New collection launch teasers', 'Luxury, skincare, electronics & apparel'],
    typicalLength: '6s loop, 15s hero cut, or 20s multi-angle showcase',
    turnaround: '4–6 business days per SKU batch',
    shotPreviewTitle: 'STUDIO TURNTABLE + MACRO LIGHTING',
    shotPreviewSpecs: '4K Upscaled · True-SKU Composite · Loop Ready',
    deliverableHighlights: [
      'Real product photo composited with zero label warping',
      'Custom studio backgrounds (marble, botanical, podium, neon)',
    ],
  },
  {
    id: 'social-ad-variants',
    code: 'FMT-02',
    title: 'Social Ad & Reel Variants',
    aspectBadge: '9:16 · 1:1 · 4:5',
    durationBadge: '0:15 – 0:30s',
    whatItIs:
      'Beat ad fatigue on Meta, Instagram Reels, YouTube Shorts, and LinkedIn. We take one winning core script and produce 3–5 distinct opening visual/verbal hooks, pacing cuts, and end-card CTAs so your media buyers can A/B test winners.',
    bestFor: ['Meta & Instagram performance campaigns', 'YouTube Shorts & TikTok/Reels acquisition', 'D2C seasonal sale & drop campaigns'],
    typicalLength: '15s, 20s, or 30s direct-response cuts',
    turnaround: '5–8 business days for a 5-variant ad pack',
    shotPreviewTitle: 'MULTI-HOOK A/B PERFORMANCE PACK',
    shotPreviewSpecs: 'Hook A / B / C · Safe-Zone Checked · Captioned',
    deliverableHighlights: [
      '3–5 interchangeable 3-second opening hooks per concept',
      'Burned-in dynamic captions + clean textless master files',
    ],
  },
  {
    id: 'explainer-walkthrough',
    code: 'FMT-03',
    title: 'Explainer & How-It-Works Videos',
    aspectBadge: '16:9 · 9:16',
    durationBadge: '0:45 – 0:90s',
    whatItIs:
      'Combine crisp UI screen recordings, custom After Effects motion callouts, AI-generated conceptual B-roll, and studio-grade narration to explain complex SaaS products, fintech workflows, or industrial systems in under 90 seconds.',
    bestFor: ['Homepage hero explainers', 'SaaS feature launches & product tours', 'Sales deck & trade-show booth loops'],
    typicalLength: '45s, 60s, or 90s narrative walkthrough',
    turnaround: '7–10 business days including storyboard & motion graphics',
    shotPreviewTitle: 'UI MOTION CALLOUTS + CINEMATIC B-ROLL',
    shotPreviewSpecs: '1080p/4K · Custom Motion Graphics · Chapters',
    deliverableHighlights: [
      'Scripted problem → solution → proof → CTA story arc',
      'Real software UI combined with AI-generated lifestyle scenes',
    ],
  },
  {
    id: 'avatar-presenter',
    code: 'FMT-04',
    title: 'Avatar / Presenter Videos',
    aspectBadge: '16:9 · 9:16',
    durationBadge: '0:30 – 0:90s',
    whatItIs:
      'Need a consistent on-camera presenter without booking a studio, teleprompter, and crew every week? We deploy licensed studio presenters or custom-trained digital twins of your founder/spokesperson (with explicit written consent).',
    bestFor: ['Product onboarding & customer help centers', 'Weekly market updates & founder messages', 'B2B outbound video prospecting & LMS modules'],
    typicalLength: '30s to 90s presenter-led segments',
    turnaround: '4–7 business days once script is locked',
    shotPreviewTitle: 'DIGITAL PRESENTER + B-ROLL CUTAWAYS',
    shotPreviewSpecs: 'Natural Lip-Sync · B-Roll Overlays · Branded Lower-Thirds',
    deliverableHighlights: [
      'Intercut with full-screen B-roll & UI slides so it never feels static',
      'Strict written consent & licensing ledger for every likeness/voice',
    ],
  },
  {
    id: 'multilingual-dubs',
    code: 'FMT-05',
    title: 'Multilingual & Regional Dubs',
    aspectBadge: '9:16 · 16:9 · 1:1',
    durationBadge: 'ANY DURATION',
    whatItIs:
      'Take your best-performing English ad or explainer and adapt it into Hindi, Tamil, Telugu, Marathi, Bengali, Kannada, or global languages—complete with culturally natural script adaptation, neural voice cloning, lip-sync, and localized on-screen supers.',
    bestFor: ['Pan-India Tier-1/2/3 ad expansion', 'Regional dealer & distributor training', 'Global product launches across US/EU/MENA'],
    typicalLength: 'Matches master video (15s to 120s+)',
    turnaround: '3–5 business days per language pack',
    shotPreviewTitle: 'REGIONAL VOICE + LOCALIZED SUPERS',
    shotPreviewSpecs: 'EN · HI · TA · TE · MR · BN · Lip-Sync + SRT',
    deliverableHighlights: [
      'Native-speaker review of translated idioms & CTA phrasing',
      'Replaced on-screen text graphics & SRT/burned-in subtitles',
    ],
  },
  {
    id: 'storyboard-concept-films',
    code: 'FMT-06',
    title: 'Storyboard & Concept Films (Pre-Viz)',
    aspectBadge: '16:9 · 2.39:1',
    durationBadge: '0:30 – 0:60s',
    whatItIs:
      'Pitching a major campaign, TVC, or brand launch? We produce cinematic AI animatics and mood films with temp voiceover, lighting references, camera moves, and sound design—so stakeholders can see and approve the film before a physical shoot.',
    bestFor: ['Brand campaign & TVC pre-visualization', 'Investor & keynote launch teasers', 'Creative testing before committing ₹20L+ production budgets'],
    typicalLength: '30s or 60s cinematic animatic / mood film',
    turnaround: '4–6 business days from creative brief',
    shotPreviewTitle: 'ANAMORPHIC PRE-VIZ & MOOD FILM',
    shotPreviewSpecs: '2.39:1 Scope · Shot-Listed · Sound Designed',
    deliverableHighlights: [
      'Frame-accurate shot list with lens & lighting notes',
      'Can be finished as an AI film or handed to a live-action crew',
    ],
  },
];

/* ============================================================================
   SECTION 4 — 3-TRACK MIXING CONSOLE DATA (AI + HUMAN CRAFT)
============================================================================ */

interface MixingTrackItem {
  id: string;
  trackCode: string;
  trackTitle: string;
  trackRoleBadge: string;
  soloSummary: string;
  faderDefault: number;
  bullets: [
    { title: string; detail: string },
    { title: string; detail: string },
    { title: string; detail: string },
    { title: string; detail: string }
  ];
  outputArtifact: string;
}

const MIXING_CONSOLE_TRACKS: MixingTrackItem[] = [
  {
    id: 'track-direction',
    trackCode: 'CH 01 // PRE-PROD',
    trackTitle: 'Track 1 — Creative Direction (Human)',
    trackRoleBadge: '100% HUMAN STRATEGY',
    soloSummary:
      'Before touching any AI model, our senior copywriters and art directors lock the conversion angle, 3-second hook, visual style guide, and frame-by-frame storyboard.',
    faderDefault: 92,
    bullets: [
      {
        title: 'Brief & Audience Hook Matrix',
        detail: 'We map buyer pain points and write 3–5 distinct opening hooks for paid or organic testing.',
      },
      {
        title: 'Script & Pacing Blueprint',
        detail: 'Word-for-word voiceover script timed to 15s, 30s, or 60s beats with visual cue columns.',
      },
      {
        title: 'Storyboard & Shot List',
        detail: 'Keyframes specifying camera focal length, motion direction, and product placement.',
      },
      {
        title: 'Brand Guardrails & Safe Zones',
        detail: 'Color palette hex codes, typography rules, and Meta/YouTube/Reels UI safe-zone masks.',
      },
    ],
    outputArtifact: 'Approved Script + Visual Storyboard Deck (Signed off before generation)',
  },
  {
    id: 'track-generation',
    trackCode: 'CH 02 // AI ENGINE',
    trackTitle: 'Track 2 — AI Generation (Models)',
    trackRoleBadge: 'GENERATIVE PIPELINE',
    soloSummary:
      'We orchestrate best-in-class video, image, and voice models—generating consistent scenes, camera movement, presenter lip-sync, and multilingual narration in a fraction of shoot time.',
    faderDefault: 86,
    bullets: [
      {
        title: 'Scene, Environment & B-Roll Synthesis',
        detail: 'Photoreal studio backdrops, lifestyle settings, and controlled camera orbits/dolly moves.',
      },
      {
        title: 'Motion Control & Reference Locking',
        detail: 'Depth-map, pose, and style-reference conditioning so lighting and characters stay consistent across cuts.',
      },
      {
        title: 'Neural Voiceover & Regional Dubbing',
        detail: 'Expressive studio voice synthesis in English, Hindi, and regional languages with breath and pacing control.',
      },
      {
        title: 'Rapid Multi-Hook Variations',
        detail: 'Parallel generation of alternate opening visuals and backgrounds for creative A/B testing.',
      },
    ],
    outputArtifact: 'Raw 4K Upscaled AI Plates + Multi-Language Vocal Stems',
  },
  {
    id: 'track-finishing',
    trackCode: 'CH 03 // POST-STUDIO',
    trackTitle: 'Track 3 — Finishing & QA (Human)',
    trackRoleBadge: '100% HUMAN CRAFT',
    soloSummary:
      'Raw AI video is never the final deliverable. Our motion designers and editors composite your real product labels, animate typography, mix audio, and run a strict 12-point quality check.',
    faderDefault: 96,
    bullets: [
      {
        title: 'Real Product & UI Compositing',
        detail: 'We composite your actual packaging, logos, and app screens so text and details never warp or hallucinate.',
      },
      {
        title: 'Editorial Cut, Color Grade & Motion Type',
        detail: 'Frame-accurate editing, brand color grading, kinetic callouts, and burned-in dynamic captions.',
      },
      {
        title: 'Sound Design, Music & Loudness Mix',
        detail: 'Licensed music bed, whooshes/impacts SFX, and broadcast-standard -14 LUFS audio mastering.',
      },
      {
        title: '12-Point Artifact & Compliance QA',
        detail: 'Checking hands, edges, physics, pronunciation, copyright clearance, and platform disclosure labels.',
      },
    ],
    outputArtifact: 'Master MP4s (9:16 · 1:1 · 16:9) + Clean Versions + SRT Captions',
  },
];

/* ============================================================================
   MAIN PAGE COMPONENT
============================================================================ */

interface AiGeneratedVideosProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const AiGeneratedVideos: React.FC<AiGeneratedVideosProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Retrieve Single Source of Truth Entry from AISolutions.tsx */
  const solutionData = useMemo(() => {
    return (
      aiSolutions.find((s) => s.slug === 'ai-generated-videos') || {
        slug: 'ai-generated-videos',
        name: 'AI Generated Videos',
        category: 'AI Marketing' as const,
        badge: 'NEW' as const,
        icon: 'Video' as const,
        tagline: 'Studio-grade product explainers, ad variants & multilingual video at scale',
        description:
          'Produce high-converting video ads, product showcases, founder/avatar explainers, and localized multilingual video variants in days instead of months—combining generative video models, realistic voice synthesis, and human motion-graphics polish.',
        deliverables: [
          'Scriptwriting, storyboard & conversion hook variations for paid & organic video',
          'AI product showcase & lifestyle video generation with brand-consistent styling',
          'Digital presenter / avatar product explainers & onboarding walkthroughs',
          'Multilingual dubbing & lip-sync localization (English, Hindi + 15 languages)',
          'Multi-aspect ratio renders (9:16 Reels/Shorts, 1:1 Feed, 16:9 YouTube/Web)',
          'Human creative director QA, custom captions, sound design & motion graphics',
        ] as [string, string, string, string, string, string],
        bestFor: [
          'Fashion & Lifestyle Labels',
          'Skincare & D2C E-commerce',
          'SaaS & App Launches',
        ] as [string, string, string],
        typicalTimeline: '5–10 business days per campaign batch',
        keyMetric: '4× faster video production at 60% lower cost per creative (placeholder)',
        relatedIndustries: ['fashion-lifestyle', 'skincare-beauty', 'ecommerce', 'b2b-saas'],
        relatedServices: ['creative-communication', 'performance-marketing', 'branding-logo-design'],
        futurePagePath: '/ai-solutions/ai-generated-videos',
      }
    );
  }, []);

  /* Section 1 — Hero Screening Room State */
  const [activeSceneIdx, setActiveSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [aspectMode, setAspectMode] = useState<AspectRatioMode>('16:9');
  const [voiceLang, setVoiceLang] = useState<VoiceLanguageMode>('EN');
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [playheadProgress, setPlayheadProgress] = useState<number>(12.5); // 0..100 across 4 scenes

  /* Section 3 — Active Format Viewfinder Inspection State */
  const [selectedFormatId, setSelectedFormatId] = useState<string>('product-showcase');

  /* Section 4 — Mixing Console Solo/Highlight State */
  const [soloTrackId, setSoloTrackId] = useState<string | null>(null);

  /* SEO Meta Title & Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'AI Video Production Services — Product, Ad & Explainer Videos | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'We create studio-quality product videos, social ad variants, explainers and multilingual dubs — combining AI video generation with human scriptwriting, editing, motion graphics and sound design.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 1 — Playhead Loop Timer (Only runs when user clicks Play and reduced motion is off) */
  useEffect(() => {
    if (!isPlaying || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setPlayheadProgress((prev) => {
        const next = prev + 1.25;
        if (next >= 100) {
          setActiveSceneIdx(0);
          return 0;
        }
        const nextScene = Math.min(3, Math.floor(next / 25));
        setActiveSceneIdx(nextScene);
        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isPlaying, shouldReduceMotion]);

  /* Sync Playhead when user manually clicks a Scene Tab */
  const handleSelectScene = (sceneIdx: number) => {
    setActiveSceneIdx(sceneIdx);
    setPlayheadProgress(sceneIdx * 25 + 12.5);
  };

  const currentScene = SCREENING_SCENES[activeSceneIdx] || SCREENING_SCENES[0];

  /* Format SMPTE Timecode `00:00:SS:FF` from playheadProgress (0..100 => 0..15s @ 24fps) */
  const formattedTimecode = useMemo(() => {
    const totalSecondsFloat = (playheadProgress / 100) * 15;
    const secs = Math.floor(totalSecondsFloat);
    const frames = Math.floor((totalSecondsFloat - secs) * 24);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `00:00:${pad(secs)}:${pad(frames)}`;
  }, [playheadProgress]);

  const triggerQuoteModal = (serviceLabel?: string) => {
    const label = serviceLabel || solutionData.name;
    if (onOpenQuoteModal) {
      onOpenQuoteModal(label);
    } else {
      window.dispatchEvent(new CustomEvent('open-quote-modal', { detail: label }));
    }
  };

  /* JSON-LD Structured Data (Service + BreadcrumbList) */
  const jsonLdData = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'AI Video Production Services — Product, Ad & Explainer Videos',
        serviceType:
          'AI Video Generation, Product Showcase Videos, Social Ad Variants, AI Avatar Explainers, Multilingual Video Dubbing, Human Editorial Finishing',
        description: solutionData.description,
        provider: {
          '@type': 'Organization',
          name: 'WebXCode',
          url: 'https://webxcode.com',
        },
        areaServed: ['India', 'United States', 'United Kingdom', 'UAE', 'Worldwide'],
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
            name: 'AI Solutions',
            item: 'https://webxcode.com/ai-solutions',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'AI Generated Videos',
            item: 'https://webxcode.com/ai-solutions/ai-generated-videos',
          },
        ],
      },
    ],
    [solutionData.description]
  );

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ======================================================================
          SECTION 1 — HERO: THE SCREENING ROOM & TIMELINE (bg: #07182c)
      ====================================================================== */}
      <section className="relative bg-[#07182c] text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden border-b border-white/10">
        {/* Subtle Anamorphic Lens Flare & Studio Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots-dark opacity-25 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[900px] h-[180px] bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 top-8 w-[520px] h-[520px] blue-glow-strong pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-8"
          >
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <Link to="/ai-solutions" className="hover:text-white transition-colors">
              AI Solutions
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <span className="text-white font-semibold" aria-current="page">
              {solutionData.name}
            </span>
          </nav>

          {/* 12-Col Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 48% (6 cols on lg): Positioning, Copy, CTAs & Format Strip */}
            <div className="lg:col-span-6">
              {/* Eyebrow Pill with NEW Badge */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <Film className="w-3.5 h-3.5 text-primary" />
                <span>AI MARKETING · AI VIDEO PRODUCTION</span>
                {solutionData.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-extrabold tracking-wider">
                    {solutionData.badge}
                  </span>
                )}
              </div>

              {/* H1 */}
              <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] font-extrabold text-white leading-[1.07] tracking-[-0.02em]">
                Studio-Quality Videos,{' '}
                <span className="text-primary">Made Faster With AI</span> — Finished by Humans.
              </h1>

              {/* Lead Paragraph */}
              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                We produce high-converting product showcases, social ad variants, software
                explainers, and multilingual video campaigns—combining generative video &amp; voice
                models with human scriptwriting, real product compositing, motion graphics, and
                sound design.
              </p>

              {/* Primary + Secondary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('AI Generated Videos — Request Sample Reel')}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all cursor-pointer"
                >
                  <span>Request a Sample Reel</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="#video-formats"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/30 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>See Video Formats</span>
                </a>
              </div>

              {/* Format & Language Strip */}
              <div className="mt-9 pt-7 border-t border-white/10">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-primary-100 mb-3">
                  MULTI-FORMAT MASTER DELIVERY
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px] font-semibold text-white/90">
                  {[
                    { icon: Smartphone, label: '9:16 Reels & Shorts' },
                    { icon: Square, label: '1:1 Feed' },
                    { icon: Monitor, label: '16:9 YouTube & Web' },
                    { icon: Globe2, label: 'English · Hindi · Regional Dubs' },
                    { icon: Subtitles, label: 'Captioned & Ready to Run' },
                  ].map((chip) => {
                    const IconComp = chip.icon;
                    return (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/12 text-white/90"
                      >
                        <IconComp className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{chip.label}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 52% (6 cols on lg): Interactive Screening Room Monitor + 3-Track NLE Timeline */}
            <div className="lg:col-span-6">
              <div className="rounded-[26px] bg-[#0b213d] border border-white/15 shadow-2xl overflow-hidden">
                {/* Top Director's Monitor Control Bar */}
                <div className="px-4 sm:px-5 py-3.5 bg-[#051221] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                  {/* Left: REC Indicator + SMPTE Timecode */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/20 border border-primary/40 font-mono text-[11px] font-bold text-primary-100">
                      <span
                        className={`w-2 h-2 rounded-full bg-primary ${
                          isPlaying && !shouldReduceMotion ? 'animate-ping' : ''
                        }`}
                      />
                      <span>NLE MONITOR</span>
                    </span>
                    <span
                      className="font-mono text-[12px] sm:text-[13px] font-extrabold text-white tracking-wider tabular-nums"
                      aria-label="Current timeline timecode"
                    >
                      {formattedTimecode}{' '}
                      <span className="text-white/45 font-normal">/ 00:00:15:00</span>
                    </span>
                  </div>

                  {/* Right: Aspect Ratio Switcher + Language + CC Toggle */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Aspect Ratio Switcher */}
                    <div
                      role="radiogroup"
                      aria-label="Select preview aspect ratio"
                      className="inline-flex items-center rounded-lg bg-white/[0.06] p-0.5 border border-white/10"
                    >
                      {(['9:16', '1:1', '16:9'] as AspectRatioMode[]).map((ratio) => {
                        const active = aspectMode === ratio;
                        return (
                          <button
                            key={ratio}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setAspectMode(ratio)}
                            className={`px-2 py-1 rounded-md font-mono text-[11px] font-bold transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-white/70 hover:text-white'
                            }`}
                          >
                            {ratio}
                          </button>
                        );
                      })}
                    </div>

                    {/* Voiceover Language Switcher */}
                    <div
                      role="radiogroup"
                      aria-label="Select voiceover language"
                      className="inline-flex items-center rounded-lg bg-white/[0.06] p-0.5 border border-white/10"
                    >
                      {(['EN', 'HI'] as VoiceLanguageMode[]).map((lang) => {
                        const active = voiceLang === lang;
                        return (
                          <button
                            key={lang}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => setVoiceLang(lang)}
                            className={`px-2 py-1 rounded-md font-mono text-[11px] font-bold transition-all cursor-pointer ${
                              active
                                ? 'bg-primary text-white shadow-xs'
                                : 'text-white/70 hover:text-white'
                            }`}
                          >
                            {lang}
                          </button>
                        );
                      })}
                    </div>

                    {/* CC Subtitle Toggle */}
                    <button
                      type="button"
                      aria-pressed={showCaptions}
                      onClick={() => setShowCaptions((prev) => !prev)}
                      title="Toggle Burned-In Subtitles"
                      className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold border transition-all cursor-pointer inline-flex items-center gap-1 ${
                        showCaptions
                          ? 'bg-primary/20 border-primary text-white'
                          : 'bg-white/[0.04] border-white/15 text-white/60 hover:text-white'
                      }`}
                    >
                      <Subtitles className="w-3.5 h-3.5 text-primary" />
                      <span>CC</span>
                    </button>
                  </div>
                </div>

                {/* Center Monitor Viewport with Dynamic Aspect Frame */}
                <div className="p-4 sm:p-6 bg-[#040e1a] flex flex-col items-center justify-center min-h-[300px] sm:min-h-[330px] relative">
                  {/* Corner Viewfinder Brackets */}
                  <div
                    aria-hidden="true"
                    className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/50"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/50"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/50"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/50"
                  />

                  {/* Dynamic Aspect Ratio Canvas */}
                  <div
                    className={`relative rounded-2xl overflow-hidden border-2 border-primary/50 bg-gradient-to-br from-[#0e2a4c] via-[#07182c] to-[#040e1a] shadow-2xl transition-all duration-300 flex flex-col justify-between p-4 sm:p-5 ${
                      aspectMode === '9:16'
                        ? 'w-[220px] sm:w-[240px] min-h-[310px]'
                        : aspectMode === '1:1'
                        ? 'w-[270px] sm:w-[295px] min-h-[275px]'
                        : 'w-full max-w-[520px] min-h-[260px]'
                    }`}
                  >
                    {/* Animated Anamorphic Light Sweep inside Frame */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/25 blur-2xl pointer-events-none"
                    />

                    {/* Top HUD Overlay inside Video Frame */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-navy/85 border border-white/15 font-mono text-[10px] font-extrabold text-primary-100 uppercase tracking-wider">
                        {currentScene.badgeText}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-primary text-white font-mono text-[10px] font-extrabold">
                        {aspectMode} MASTER
                      </span>
                    </div>

                    {/* Center Scene Visual Composition */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currentScene.id}-${aspectMode}-${voiceLang}`}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="relative z-10 my-3 text-center px-2"
                      >
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 font-mono text-[10px] font-bold text-primary-100 mb-2">
                          <Camera className="w-3 h-3 text-primary" />
                          <span>{currentScene.shotType}</span>
                        </div>

                        <div className="text-[17px] sm:text-[20px] font-extrabold text-white tracking-tight leading-snug">
                          {currentScene.sceneHeadline}
                        </div>
                        <div className="text-[12px] text-white/75 mt-1">
                          {currentScene.sceneSubline}
                        </div>

                        {/* Dual Craft Pills: AI + Human */}
                        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-md bg-primary/25 border border-primary/50 font-mono text-[10px] font-bold text-white">
                            AI: {currentScene.aiPromptTag}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/20 font-mono text-[10px] font-bold text-primary-100">
                            HUMAN: {currentScene.humanFinishTag}
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Bottom Burned-In Caption Bar & Voice Track Readout */}
                    <div className="relative z-10 space-y-2">
                      {showCaptions && (
                        <div
                          aria-live="polite"
                          className="p-2.5 rounded-xl bg-navy/90 border border-white/15 text-center shadow-md"
                        >
                          <p className="text-[12px] sm:text-[13px] font-bold text-white leading-snug">
                            {voiceLang === 'EN' ? currentScene.captionEN : currentScene.captionHI}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-[10px] font-mono text-white/65 px-1">
                        <span className="truncate">{currentScene.cameraSpec}</span>
                        <span className="text-primary-100 font-bold shrink-0 ml-2">
                          VO: {voiceLang === 'EN' ? currentScene.voiceActorEN : currentScene.voiceActorHI}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scene Tab Selector Bar (4 Clickable Scenes) */}
                <div className="px-4 sm:px-5 py-3 bg-[#07182c] border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">
                      CLICK ANY SCENE OR PRESS PLAY TO SCRUB TIMELINE
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setIsPlaying((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary hover:bg-primary-700 text-white font-mono text-[11px] font-bold transition-all cursor-pointer"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3 h-3" />
                            <span>PAUSE</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3 h-3" />
                            <span>PLAY REEL</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsPlaying(false);
                          handleSelectScene(0);
                        }}
                        title="Reset playhead to Scene 1"
                        className="p-1.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/75 hover:text-white transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 4 Scene Buttons */}
                  <div
                    role="tablist"
                    aria-label="Video storyboard scenes"
                    className="grid grid-cols-2 sm:grid-cols-4 gap-1.5"
                  >
                    {SCREENING_SCENES.map((scene, idx) => {
                      const active = activeSceneIdx === idx;
                      return (
                        <button
                          key={scene.code}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => {
                            setIsPlaying(false);
                            handleSelectScene(idx);
                          }}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white/[0.04] text-white/75 border-white/10 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <div className="font-mono text-[10px] font-extrabold opacity-80">
                            {scene.code}
                          </div>
                          <div className="text-[11px] font-bold truncate mt-0.5">{scene.title}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3-Track Non-Linear Editor (NLE) Timeline Strip */}
                <div className="px-4 sm:px-5 py-3.5 bg-[#051221] border-t border-white/10 relative">
                  {/* Playhead Vertical Line */}
                  <div
                    aria-hidden="true"
                    style={{ left: `calc(${playheadProgress}% * 0.82 + 14%)` }}
                    className="hidden sm:block absolute top-2 bottom-2 w-[2px] bg-primary z-20 pointer-events-none transition-all duration-150"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-primary block -ml-[4px] -mt-0.5 shadow-md" />
                  </div>

                  <div className="space-y-1.5 font-mono text-[10px]">
                    {/* Track V1: AI Video + Human Composite */}
                    <div className="grid grid-cols-12 items-center gap-2">
                      <span className="col-span-3 sm:col-span-2 text-white/60 font-bold truncate">
                        V1 · VIDEO
                      </span>
                      <div className="col-span-9 sm:col-span-10 grid grid-cols-4 gap-1">
                        {SCREENING_SCENES.map((s, idx) => (
                          <button
                            key={s.code}
                            type="button"
                            onClick={() => handleSelectScene(idx)}
                            className={`h-5 rounded px-1.5 truncate text-left font-bold transition-colors cursor-pointer ${
                              activeSceneIdx === idx
                                ? 'bg-primary text-white'
                                : 'bg-primary/25 text-primary-100 hover:bg-primary/40'
                            }`}
                          >
                            {s.code} CLIP
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Track A1: Voiceover & Sound Mix */}
                    <div className="grid grid-cols-12 items-center gap-2">
                      <span className="col-span-3 sm:col-span-2 text-white/60 font-bold truncate">
                        A1 · VOICE
                      </span>
                      <div className="col-span-9 sm:col-span-10 h-5 rounded bg-white/[0.06] border border-white/10 px-2 flex items-center justify-between text-white/80">
                        <span className="truncate">
                          <Volume2 className="w-3 h-3 text-primary inline mr-1" />
                          {voiceLang === 'EN'
                            ? 'EN-IN Neural Master + SFX (-14 LUFS)'
                            : 'HI-IN Neural Dub + Lip-Sync (-14 LUFS)'}
                        </span>
                        <span className="text-primary-100 font-bold hidden sm:inline">48kHz WAV</span>
                      </div>
                    </div>

                    {/* Track C1: Dynamic Captions & Motion Graphics */}
                    <div className="grid grid-cols-12 items-center gap-2">
                      <span className="col-span-3 sm:col-span-2 text-white/60 font-bold truncate">
                        C1 · TYPE
                      </span>
                      <div className="col-span-9 sm:col-span-10 h-5 rounded bg-white/[0.06] border border-white/10 px-2 flex items-center justify-between text-white/80">
                        <span className="truncate">
                          {showCaptions
                            ? 'Burned-In Dynamic Subtitles + Brand Lower-Thirds (ON)'
                            : 'Clean Textless Master Feed (Subtitles Muted)'}
                        </span>
                        <span className="text-primary font-bold">SRT + AE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — WHY AI + HUMAN VIDEO? THE SPEED & SCALE EQUATION (bg: #ffffff)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>WHY AI + HUMAN VIDEO</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
              Raw AI Looks Uncanny. Traditional Shoots Take Weeks.{' '}
              <span className="text-primary">Here Is the Third Way.</span>
            </h2>
            <p className="mt-4 text-[16px] text-navy-70 leading-[1.65]">
              Most brands are stuck between two bad choices: spending lakhs and waiting six weeks for
              a single studio shoot, or posting raw one-prompt AI clips with warped labels and
              robotic voices. Our hybrid pipeline gives you the speed of generative AI with the
              craft of a human post-production house.
            </p>
          </div>

          {/* 3-Column Production Equation Board */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Column 1: Traditional Shoot Only */}
            <div className="lg:col-span-4 rounded-[24px] bg-white border border-navy-15 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-navy-08">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60">
                    OPTION 01 // LEGACY
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-navy-08 text-navy font-mono text-[10px] font-bold">
                    4–8 WEEKS
                  </span>
                </div>

                <h3 className="text-[21px] font-extrabold text-navy">Traditional Shoot Only</h3>
                <p className="mt-1.5 text-[13px] font-semibold text-navy-60">
                  High craft, but slow and rigid for fast-moving digital campaigns.
                </p>

                <ul className="mt-6 space-y-4">
                  {[
                    {
                      label: 'Turnaround Time',
                      val: '4–8 weeks from casting, location permits, and shoot day to final edit.',
                    },
                    {
                      label: 'Cost Structure',
                      val: 'High studio, crew, equipment, talent day-rates, and reshoots.',
                    },
                    {
                      label: 'Creative Testing & Languages',
                      val: 'Hard to test 5 hooks or re-shoot in 4 regional languages without multiplying budget.',
                    },
                    {
                      label: 'When It Still Wins',
                      val: 'Great for flagship brand films, founder documentaries, and physical event coverage.',
                    },
                  ].map((row) => (
                    <li
                      key={row.label}
                      className="p-3.5 rounded-xl bg-primary-50/35 border border-navy-08"
                    >
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50">
                        {row.label}
                      </div>
                      <div className="text-[13px] font-medium text-navy mt-1 leading-snug">
                        {row.val}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-08 flex items-center justify-between text-[12px] font-mono text-navy-60">
                <span>VERDICT:</span>
                <span className="font-bold text-navy">Best for 1×/yr flagship TVCs</span>
              </div>
            </div>

            {/* Column 2: Raw DIY AI Tools */}
            <div className="lg:col-span-4 rounded-[24px] bg-white border border-navy-15 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-navy-08">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60">
                    OPTION 02 // UNFINISHED AI
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-navy-08 text-navy font-mono text-[10px] font-bold">
                    UNCANNY RISK
                  </span>
                </div>

                <h3 className="text-[21px] font-extrabold text-navy">Raw DIY AI Tools</h3>
                <p className="mt-1.5 text-[13px] font-semibold text-navy-60">
                  Fast to generate a 4-second clip, but breaks down on real brand requirements.
                </p>

                <ul className="mt-6 space-y-4">
                  {[
                    {
                      label: 'Visual Artifacts & Physics',
                      val: 'Inconsistent faces between shots, morphing hands, and unnatural physics.',
                    },
                    {
                      label: 'Warped Product Packaging',
                      val: 'AI models scramble printed logos, bottle labels, and UI text into gibberish.',
                    },
                    {
                      label: 'Generic Pacing & Voice',
                      val: 'Flat robotic cadence, no strategic conversion hook, and weak typography.',
                    },
                    {
                      label: 'Brand Trust Impact',
                      val: 'Viewers immediately spot unpolished AI slop and scroll past—hurting ad ROAS.',
                    },
                  ].map((row) => (
                    <li
                      key={row.label}
                      className="p-3.5 rounded-xl bg-primary-50/35 border border-navy-08"
                    >
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50">
                        {row.label}
                      </div>
                      <div className="text-[13px] font-medium text-navy mt-1 leading-snug">
                        {row.val}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-08 flex items-center justify-between text-[12px] font-mono text-navy-60">
                <span>VERDICT:</span>
                <span className="font-bold text-navy">Unsafe for customer-facing ads</span>
              </div>
            </div>

            {/* Column 3: WebXCode Hybrid AI + Human Studio (Highlighted) */}
            <div className="lg:col-span-4 rounded-[24px] bg-navy text-white border-2 border-primary p-6 sm:p-7 shadow-2xl flex flex-col justify-between relative">
              <div>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                    OPTION 03 // RECOMMENDED
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold">
                    5–10 DAYS
                  </span>
                </div>

                <h3 className="text-[22px] font-extrabold text-white">
                  WebXCode Hybrid AI + Human Studio
                </h3>
                <p className="mt-1.5 text-[13px] font-semibold text-primary-100">
                  Generative speed + senior human scriptwriting, compositing &amp; motion craft.
                </p>

                <ul className="mt-6 space-y-4">
                  {[
                    {
                      label: 'Human Script & Storyboard First',
                      val: 'Every video starts with a conversion-focused script and frame-by-frame shot list.',
                    },
                    {
                      label: '100% Accurate Product Labels',
                      val: 'We composite your real product photography and UI screens onto AI studio scenes.',
                    },
                    {
                      label: 'Pro Editing, Color & Sound Design',
                      val: 'Custom After Effects motion graphics, burned-in captions, and -14 LUFS audio mix.',
                    },
                    {
                      label: 'Multi-Hook & Multi-Language Scale',
                      val: '3–5 ad hooks + 9:16, 1:1 & 16:9 exports + English/Hindi/regional dubs in 5–10 days.',
                    },
                  ].map((row) => (
                    <li
                      key={row.label}
                      className="p-3.5 rounded-xl bg-white/[0.06] border border-white/12"
                    >
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{row.label}</span>
                      </div>
                      <div className="text-[13px] font-medium text-white/90 mt-1 leading-snug">
                        {row.val}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-primary-100">
                  4× FASTER · STUDIO QA
                </span>
                <button
                  type="button"
                  onClick={() => triggerQuoteModal('Hybrid AI + Human Video Production')}
                  className="inline-flex items-center gap-1.5 text-[13px] font-extrabold text-white hover:text-primary-100 cursor-pointer"
                >
                  <span>Scope a Batch</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Honest Note Callout */}
          <div className="mt-8 p-5 rounded-2xl bg-primary-50 border border-primary-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-[14px] sm:text-[15px] text-navy leading-snug">
                <strong className="font-extrabold">Honest production counsel:</strong> When a real
                camera shoot is still the better choice (e.g., founder documentary or live customer
                event), we&apos;ll tell you upfront—and can combine real footage with AI B-roll and
                post-production.
              </p>
            </div>
            <span className="font-mono text-[11px] font-bold text-primary uppercase tracking-wider shrink-0">
              ZERO AI SLOP POLICY
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — 6 VIDEO FORMATS WE PRODUCE: VIEWFINDER CARDS (bg: #f0f7fd)
      ====================================================================== */}
      <section
        id="video-formats"
        className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Camera className="w-3.5 h-3.5 text-primary" />
                <span>6 PRODUCTION FORMATS</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
                Six Video Formats We Produce —{' '}
                <span className="text-primary">Framed for Every Channel</span>
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] text-navy-70 max-w-md leading-[1.65]">
              Every format is engineered around a specific conversion goal—whether that is lifting
              product page add-to-cart rates, scaling Meta Reels ROAS, or training regional teams.
            </p>
          </div>

          {/* 6 Camera Viewfinder Cards (3x2 Grid on Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_FORMAT_CARDS.map((fmt) => {
              const isSelected = selectedFormatId === fmt.id;
              return (
                <div
                  key={fmt.id}
                  onClick={() => setSelectedFormatId(fmt.id)}
                  className={`group rounded-[26px] bg-white border-2 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-primary shadow-xl'
                      : 'border-navy-10 hover:border-primary/50 shadow-soft'
                  }`}
                >
                  <div>
                    {/* Camera Viewfinder Top Viewport Box */}
                    <div className="relative bg-navy text-white p-5 border-b border-white/10 overflow-hidden">
                      {/* Viewfinder Corner Reticles */}
                      <span
                        aria-hidden="true"
                        className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-primary"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-primary"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary"
                      />

                      {/* Center Crosshair */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none"
                      >
                        <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                      </div>

                      {/* Top Viewfinder HUD Row */}
                      <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 font-mono text-[10px] font-extrabold text-white">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span>REC // {fmt.code}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-bold">
                            {fmt.aspectBadge}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white/10 text-primary-100 font-mono text-[10px] font-bold">
                            {fmt.durationBadge}
                          </span>
                        </div>
                      </div>

                      {/* Shot Preview Spec Strip */}
                      <div className="relative z-10 py-3 px-3.5 rounded-xl bg-white/[0.06] border border-white/10">
                        <div className="font-mono text-[10px] font-extrabold text-primary-100 uppercase tracking-wider">
                          {fmt.shotPreviewTitle}
                        </div>
                        <div className="font-mono text-[11px] text-white/80 mt-0.5">
                          {fmt.shotPreviewSpecs}
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <h3 className="text-[20px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug">
                        {fmt.title}
                      </h3>

                      <p className="mt-2.5 text-[14px] text-navy-70 leading-[1.6]">
                        {fmt.whatItIs}
                      </p>

                      {/* Best For Chips */}
                      <div className="mt-4">
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50 mb-2">
                          BEST FOR:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {fmt.bestFor.map((bf) => (
                            <span
                              key={bf}
                              className="px-2.5 py-1 rounded-lg bg-primary-50 text-navy text-[12px] font-semibold border border-primary-100"
                            >
                              {bf}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 2 Deliverable Highlights */}
                      <div className="mt-4 pt-4 border-t border-navy-08 space-y-2">
                        {fmt.deliverableHighlights.map((hl) => (
                          <div key={hl} className="flex items-start gap-2 text-[12.5px] text-navy">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="font-medium leading-snug">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Typical Length & Turnaround + CTA */}
                  <div className="px-6 py-4 bg-primary-50/50 border-t border-navy-08 flex items-center justify-between gap-2">
                    <div>
                      <div className="font-mono text-[10px] font-bold uppercase text-navy-50">
                        TURNAROUND: <span className="text-navy">{fmt.turnaround}</span>
                      </div>
                      <div className="font-mono text-[10px] text-primary font-bold mt-0.5">
                        LENGTH: {fmt.typicalLength}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerQuoteModal(`AI Video Format: ${fmt.title}`);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-navy hover:bg-primary text-white text-[11px] font-bold transition-colors cursor-pointer shrink-0"
                    >
                      <span>Quote Format</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — WHERE AI ENDS & HUMAN CRAFT BEGINS: 3-TRACK MIXING CONSOLE (bg: #07182c)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-[#07182c] text-white border-b border-white/10 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots-dark opacity-20 pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header + Console Solo Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Sliders className="w-3.5 h-3.5 text-primary" />
                <span>THE 3-TRACK MIXING CONSOLE</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-white leading-[1.12] tracking-tight">
                Where AI Ends &amp;{' '}
                <span className="text-primary">Human Craft Begins</span>
              </h2>
              <p className="mt-3.5 text-[16px] text-white/75 leading-[1.65]">
                Inspect our three-channel studio desk below. Click <strong className="text-white">SOLO TRACK</strong> on any channel strip to isolate how human creative direction, generative AI models, and human post-production lock together.
              </p>
            </div>

            {/* Master Desk Reset / All Active Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSoloTrackId(null)}
                className={`px-4 py-2 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                  soloTrackId === null
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white/[0.06] text-white/75 border-white/15 hover:text-white'
                }`}
              >
                ALL 3 TRACKS ENGAGED
              </button>
              {MIXING_CONSOLE_TRACKS.map((trk, i) => {
                const isSolo = soloTrackId === trk.id;
                return (
                  <button
                    key={trk.id}
                    type="button"
                    onClick={() => setSoloTrackId(isSolo ? null : trk.id)}
                    className={`px-3.5 py-2 rounded-full font-mono text-[11px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                      isSolo
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white/[0.04] text-white/70 border-white/15 hover:border-white/35 hover:text-white'
                    }`}
                  >
                    SOLO CH 0{i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Track Mixing Console Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {MIXING_CONSOLE_TRACKS.map((track) => {
              const isSoloed = soloTrackId === track.id;
              const isDimmed = soloTrackId !== null && soloTrackId !== track.id;

              return (
                <div
                  key={track.id}
                  className={`rounded-[26px] border transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between ${
                    isSoloed
                      ? 'bg-[#0d2847] border-2 border-primary shadow-2xl scale-[1.01]'
                      : isDimmed
                      ? 'bg-[#051221]/70 border-white/10 opacity-55 hover:opacity-90'
                      : 'bg-[#0b213d] border-white/15 hover:border-primary/60'
                  }`}
                >
                  <div>
                    {/* Channel Strip Top Meter & SOLO Button */}
                    <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/10">
                      <div>
                        <span className="font-mono text-[11px] font-extrabold text-primary-100 block">
                          {track.trackCode}
                        </span>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded bg-white/10 font-mono text-[10px] font-bold text-white">
                          {track.trackRoleBadge}
                        </span>
                      </div>

                      <button
                        type="button"
                        aria-pressed={isSoloed}
                        onClick={() => setSoloTrackId(isSoloed ? null : track.id)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                          isSoloed
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-white/[0.06] text-white/80 border-white/20 hover:border-primary hover:text-white'
                        }`}
                      >
                        {isSoloed ? 'SOLO ON' : 'SOLO'}
                      </button>
                    </div>

                    {/* Visual LED Level Meter Bar */}
                    <div className="mb-5 p-3 rounded-xl bg-[#051221] border border-white/10">
                      <div className="flex items-center justify-between font-mono text-[10px] text-white/60 mb-1.5">
                        <span>CHANNEL GAIN</span>
                        <span className="text-primary-100 font-bold">{track.faderDefault}% ACTIVE</span>
                      </div>
                      <div className="grid grid-cols-12 gap-1">
                        {Array.from({ length: 12 }).map((_, segIdx) => {
                          const lit = (segIdx + 1) * 8 <= track.faderDefault;
                          return (
                            <span
                              key={segIdx}
                              className={`h-2 rounded-xs ${
                                lit ? 'bg-primary' : 'bg-white/10'
                              }`}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Track Title & Summary */}
                    <h3 className="text-[21px] font-extrabold text-white leading-snug">
                      {track.trackTitle}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-white/75 leading-relaxed">
                      {track.soloSummary}
                    </p>

                    {/* 4 Channel Modules */}
                    <div className="mt-6 space-y-3">
                      {track.bullets.map((b, bIdx) => (
                        <div
                          key={b.title}
                          className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] font-extrabold text-primary px-1.5 py-0.5 rounded bg-primary/15">
                              0{bIdx + 1}
                            </span>
                            <span className="text-[14px] font-bold text-white">{b.title}</span>
                          </div>
                          <p className="text-[12.5px] text-white/75 mt-1.5 leading-snug">
                            {b.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Channel Output Bus Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary-100">
                      BUS OUTPUT ARTIFACT:
                    </div>
                    <div className="text-[13px] font-bold text-white mt-1">
                      {track.outputArtifact}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Master Bus Guarantee Bar */}
          <div className="mt-10 p-6 rounded-[24px] bg-white/[0.05] border border-white/15 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                <Scissors className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary-100">
                  MASTER BUS GUARANTEE // HUMAN FINAL CUT
                </div>
                <h3 className="text-[18px] sm:text-[20px] font-extrabold text-white mt-0.5">
                  Every frame is reviewed by a human creative director before it reaches your team.
                </h3>
                <p className="text-[13.5px] text-white/75 mt-1">
                  Need a companion content engine, ad variations, or fashion lookbook? Explore{' '}
                  <Link
                    to="/ai-solutions/ai-content-creation"
                    className="text-primary-100 font-bold underline hover:text-white"
                  >
                    AI Content Creation
                  </Link>
                  ,{' '}
                  <Link
                    to="/ai-solutions/ai-ad-creatives"
                    className="text-primary-100 font-bold underline hover:text-white"
                  >
                    AI Ad Creatives
                  </Link>
                  ,{' '}
                  <Link
                    to="/services/creative-communication"
                    className="text-primary-100 font-bold underline hover:text-white"
                  >
                    Creative &amp; Communication
                  </Link>
                  ,{' '}
                  <Link
                    to="/services/performance-marketing"
                    className="text-primary-100 font-bold underline hover:text-white"
                  >
                    Performance Marketing
                  </Link>
                  , or{' '}
                  <Link
                    to="/industries/fashion-lifestyle"
                    className="text-primary-100 font-bold underline hover:text-white"
                  >
                    Fashion &amp; Lifestyle
                  </Link>
                  .
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => triggerQuoteModal('AI Generated Videos — Custom Production Scope')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[14px] shadow-soft transition-all shrink-0 cursor-pointer"
            >
              <span>Request a Sample Reel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiGeneratedVideos;
