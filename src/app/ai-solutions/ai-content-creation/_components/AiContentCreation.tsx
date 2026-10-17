'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Check,
  FileText,
  Sparkles,
  Play,
  RotateCcw,
  ShieldCheck,
  Search,
  Globe2,
  BookOpen,
  Tag,
  Image as ImageIcon,
  HelpCircle,
  Mail,
  Layers,
  PenTool,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Database,
} from 'lucide-react';
import { aiSolutions } from '@/app/ai-solutions/_components/AISolutions';

/* ============================================================================
   SECTION 1 — HERO: ONE BRIEF, A THOUSAND PIECES (11x11 X-MOSAIC GRID)
============================================================================ */

const MOSAIC_GRID_SIZE = 11; // 11x11 = 121 tiles forming the WebXCode "X" mark

interface MosaicTile {
  index: number;
  row: number;
  col: number;
  isXMark: boolean;
}

const HERO_MOSAIC_TILES: MosaicTile[] = Array.from(
  { length: MOSAIC_GRID_SIZE * MOSAIC_GRID_SIZE },
  (_, index) => {
    const row = Math.floor(index / MOSAIC_GRID_SIZE);
    const col = index % MOSAIC_GRID_SIZE;
    // Form a bold crisp "X" across the 11x11 grid (primary diagonal + anti-diagonal thickness 2)
    const onMainDiag = Math.abs(row - col) <= 1;
    const onAntiDiag = Math.abs(row + col - (MOSAIC_GRID_SIZE - 1)) <= 1;
    const withinBounds = row >= 1 && row <= 9 && col >= 1 && col <= 9;
    return {
      index,
      row,
      col,
      isXMark: withinBounds && (onMainDiag || onAntiDiag),
    };
  }
);

/* ============================================================================
   SECTION 2 — BRAND VOICE DNA DATA (NOVA & CO. SAMPLES + 6 DNA RUNGS)
============================================================================ */

interface ExistingContentSample {
  id: string;
  sourceType: string;
  docCode: string;
  title: string;
  excerpt: string;
  highlightedSignals: [string, string];
}

const EXISTING_CONTENT_SAMPLES: ExistingContentSample[] = [
  {
    id: 'sample-pdp',
    sourceType: 'Existing Product Description',
    docCode: 'SRC-01 // NOVA & CO. PDP',
    title: 'Stonewashed Belgian Linen Duvet Set',
    excerpt:
      '“Crafted for everyday slow mornings. Pre-washed with natural enzymes so it feels like your favorite lived-in shirt from night one—breathable in summer, cozy in winter, and easy care in any home washer.”',
    highlightedSignals: ['“crafted for everyday”', '“easy care”'],
  },
  {
    id: 'sample-email',
    sourceType: 'Customer Welcome Email',
    docCode: 'SRC-02 // LIFECYCLE EMAIL',
    title: 'Welcome to Thoughtful Home Living',
    excerpt:
      '“We don’t believe in ‘cheap’ throwaway decor or ‘best ever’ hype. Every ceramic mug, woven throw, and solid oak tray in our catalog is designed to age gracefully on your table.”',
    highlightedSignals: ['No hype words', 'Warm & reassuring'],
  },
  {
    id: 'sample-about',
    sourceType: 'Brand Story & Care Guide',
    docCode: 'SRC-03 // ABOUT PAGE',
    title: 'Our Material Standard',
    excerpt:
      '“Good materials speak for themselves. We keep our sentences short, tell you the exact GSM weight and dimensions upfront, and give you honest care instructions that actually work.”',
    highlightedSignals: ['Short sentences', 'Exact specs upfront'],
  },
];

interface VoiceDnaRung {
  id: number;
  rungCode: string;
  traitLabel: string;
  traitValue: string;
  editorRule: string;
  leftNodeOffset: number; // % for visual double-helix curve
  rightNodeOffset: number;
}

const VOICE_DNA_RUNGS: VoiceDnaRung[] = [
  {
    id: 0,
    rungCode: 'DNA-01',
    traitLabel: 'Tone',
    traitValue: 'Warm & reassuring',
    editorRule: 'Calm, welcoming home-expert voice; never pushy or alarmist.',
    leftNodeOffset: 18,
    rightNodeOffset: 82,
  },
  {
    id: 1,
    rungCode: 'DNA-02',
    traitLabel: 'Formality',
    traitValue: 'Friendly-professional',
    editorRule: 'Uses conversational contractions ("it’s", "you’ll") with precise material specs.',
    leftNodeOffset: 34,
    rightNodeOffset: 66,
  },
  {
    id: 2,
    rungCode: 'DNA-03',
    traitLabel: 'Sentence length',
    traitValue: 'Short',
    editorRule: 'Average 12–16 words per sentence; scannable bullets for dimensions & care.',
    leftNodeOffset: 66,
    rightNodeOffset: 34,
  },
  {
    id: 3,
    rungCode: 'DNA-04',
    traitLabel: 'Signature words',
    traitValue: '"crafted", "everyday", "easy care"',
    editorRule: 'Weave tactile, practical vocabulary naturally into opening lines.',
    leftNodeOffset: 82,
    rightNodeOffset: 18,
  },
  {
    id: 4,
    rungCode: 'DNA-05',
    traitLabel: 'Words to avoid',
    traitValue: '"cheap", "best ever"',
    editorRule: 'Hard-blocked in prompt guardrails along with "revolutionary" & exclamation spam.',
    leftNodeOffset: 34,
    rightNodeOffset: 66,
  },
  {
    id: 5,
    rungCode: 'DNA-06',
    traitLabel: 'Reading level',
    traitValue: 'Easy',
    editorRule: 'Grade 6–7 clarity—effortless for busy shoppers comparing sizes on mobile.',
    leftNodeOffset: 18,
    rightNodeOffset: 82,
  },
];

/* ============================================================================
   SECTION 3 — WATCH A BATCH GENERATE: SELF-FILLING SPREADSHEET (8 NOVA & CO. SKUS)
============================================================================ */

interface NovaSpreadsheetRow {
  rowNum: number;
  sku: string;
  product: string;
  material: string;
  size: string;
  descriptionShort: string;
  descriptionFull: string;
  metaTitle: string;
  altText: string;
  finalStatus: 'Approved' | 'Needs review';
  reviewFlagNote?: string;
  wordCount: number;
}

const NOVA_SPREADSHEET_ROWS: NovaSpreadsheetRow[] = [
  {
    rowNum: 1,
    sku: 'NV-LIN-101',
    product: 'Washed Linen Duvet Set',
    material: '100% Flax Linen (175 GSM)',
    size: 'Queen · 228 × 228 cm',
    descriptionShort: 'Crafted from 175 GSM European flax for breathable everyday comfort...',
    descriptionFull:
      'Crafted from 100% European flax linen (175 GSM), the Nova & Co. Washed Linen Duvet Set brings relaxed, breathable comfort to your everyday bedroom. Enzyme-washed for a soft drape from night one and finished with hidden coconut-shell buttons and interior corner ties. Easy care: machine wash cold on gentle cycle, line dry or tumble low.',
    metaTitle: 'Washed Flax Linen Duvet Set (Queen) | Nova & Co. Home',
    altText: 'Queen size oatmeal washed flax linen duvet cover and two pillow shams on an oak bed',
    finalStatus: 'Approved',
    wordCount: 54,
  },
  {
    rowNum: 2,
    sku: 'NV-CER-104',
    product: 'Speckled Stoneware Mug (Set of 4)',
    material: 'High-Fired Stoneware Clay',
    size: '340 ml · H 9.5 cm',
    descriptionShort: 'Hand-glazed stoneware mugs with a warm thumb-rest handle for morning coffee...',
    descriptionFull:
      'Crafted from high-fired speckled stoneware clay, this set of four 340 ml mugs is built for everyday morning rituals. Each piece features a satin reactive glaze rim, an ergonomic three-finger handle, and an unglazed raw clay base that keeps filter coffee or masala chai warm longer. Dishwasher and microwave safe for easy care.',
    metaTitle: 'Speckled Stoneware Coffee Mugs — Set of 4 (340 ml) | Nova & Co.',
    altText: 'Set of four speckled cream stoneware mugs stacked beside a pour-over coffee carafe',
    finalStatus: 'Approved',
    wordCount: 55,
  },
  {
    rowNum: 3,
    sku: 'NV-OAK-208',
    product: 'Fluted Solid Oak Entry Bench',
    material: 'FSC White Oak + Beeswax',
    size: '120 × 38 × 45 cm',
    descriptionShort: 'Solid white oak hallway bench with fluted legs and lower shoe slat shelf...',
    descriptionFull:
      'Crafted from solid FSC-certified white oak with traditional mortise-and-tenon joinery, our 120 cm Fluted Entry Bench brings calm order to busy hallways. Features softly rounded edges, a slatted lower rack that holds four pairs of everyday shoes, and a natural beeswax finish. Wipe clean with a dry cotton cloth for easy care.',
    metaTitle: 'Fluted Solid White Oak Entryway Bench (120 cm) | Nova & Co.',
    altText: 'Natural white oak entryway bench with fluted legs and slatted shoe shelf in a bright hallway',
    finalStatus: 'Approved',
    wordCount: 54,
  },
  {
    rowNum: 4,
    sku: 'NV-WOO-312',
    product: 'Handloomed Merino Throw Blanket',
    material: '100% Fine Merino Wool',
    size: '130 × 180 cm',
    descriptionShort: 'Lightweight herringbone merino throw for sofa evenings and reading corners...',
    descriptionFull:
      'Crafted on shuttle looms from 100% fine merino wool, this 130 × 180 cm throw adds warmth without heavy bulk. Finished with hand-twisted fringe ends in a timeless oat-and-slate herringbone weave. [EDITOR FLAG: Source sheet missing wash/dry-clean care code—held for human fact check before publishing.]',
    metaTitle: 'Handloomed Merino Wool Throw Blanket (130 × 180 cm) | Nova & Co.',
    altText: 'Draped herringbone merino wool throw blanket over the arm of a linen sofa',
    finalStatus: 'Needs review',
    reviewFlagNote: 'Missing care instructions in source CSV',
    wordCount: 49,
  },
  {
    rowNum: 5,
    sku: 'NV-BRS-405',
    product: 'Brushed Brass Table Lamp',
    material: 'Solid Brass + Cotton Shade',
    size: 'Ø 28 cm · H 42 cm',
    descriptionShort: 'Warm ambient table lamp with a weighted brass base and natural cotton drum...',
    descriptionFull:
      'Crafted with a weighted brushed-brass column and a textured 100% cotton drum shade, this 42 cm table lamp casts a warm, glare-free glow across bedside tables and study desks. Includes a braided fabric cord, tactile rotary brass dimmer switch, and E27 warm-white LED bulb compatibility for everyday reading.',
    metaTitle: 'Brushed Brass Bedside & Desk Table Lamp (42 cm) | Nova & Co.',
    altText: 'Brushed brass table lamp with natural cotton drum shade lit on a walnut nightstand',
    finalStatus: 'Approved',
    wordCount: 51,
  },
  {
    rowNum: 6,
    sku: 'NV-COT-509',
    product: 'Waffle Weave Bath Towel Bundle',
    material: '100% Long-Staple Organic Cotton',
    size: '2 Bath (75 × 145 cm) + 2 Hand',
    descriptionShort: 'Quick-drying honeycomb waffle towels that stay fresh in humid bathrooms...',
    descriptionFull:
      'Crafted from 100% GOTS-certified organic long-staple cotton, our Waffle Weave Bundle includes two generous bath towels (75 × 145 cm) and two hand towels. The deep honeycomb pockets absorb water on contact and dry 40% faster than heavy terry—making them ideal for everyday use and easy care in humid climates.',
    metaTitle: 'Organic Cotton Waffle Bath Towel Bundle (4-Piece) | Nova & Co.',
    altText: 'Folded sage and ivory waffle-weave cotton bath towels on a teak bathroom stool',
    finalStatus: 'Approved',
    wordCount: 53,
  },
  {
    rowNum: 7,
    sku: 'NV-GLS-615',
    product: 'Ribbed Borosilicate Carafe & Glass',
    material: 'Hand-Blown Borosilicate Glass',
    size: '950 ml Carafe + 250 ml Tumbler',
    descriptionShort: 'Bedside water carafe with a matching tumbler that doubles as a dust lid...',
    descriptionFull:
      'Crafted from thermal-shock-resistant borosilicate glass, this fluted bedside carafe holds 950 ml of water while the matching 250 ml tumbler rests neatly on top as a lid. [EDITOR FLAG: Verify whether thermal limit is 100°C or 150°C with supplier spec sheet before live sync.]',
    metaTitle: 'Ribbed Glass Bedside Water Carafe & Tumbler Set | Nova & Co.',
    altText: 'Clear ribbed borosilicate glass bedside water carafe with inverted tumbler lid',
    finalStatus: 'Needs review',
    reviewFlagNote: 'Verify max heat °C spec with supplier',
    wordCount: 46,
  },
  {
    rowNum: 8,
    sku: 'NV-JUT-720',
    product: 'Braided Jute & Cotton Area Rug',
    material: '70% Natural Jute · 30% Cotton',
    size: '160 × 230 cm · Flatweave',
    descriptionShort: 'Softened jute-cotton flatweave rug crafted for high-traffic living rooms...',
    descriptionFull:
      'Crafted by weaving golden Bengal jute with 30% soft unbleached cotton yarn, this 160 × 230 cm flatweave rug delivers organic texture that feels gentle underfoot. Reversible for twice the lifespan and low-profile enough for dining chairs and doorways. Easy care: vacuum weekly without beater bar and blot spills immediately.',
    metaTitle: 'Braided Jute & Cotton Flatweave Area Rug (160 × 230 cm) | Nova & Co.',
    altText: 'Natural braided jute and cotton area rug under a solid oak coffee table',
    finalStatus: 'Approved',
    wordCount: 54,
  },
];

/* ============================================================================
   SECTION 4 — WHAT WE CREATE: THE SWISS-ARMY KNIFE (9 CONTENT TOOLS)
============================================================================ */

interface SwissKnifeTool {
  id: string;
  toolNumber: string;
  name: string;
  shortBladeLabel: string;
  bladeAngleDeg: number; // Fan-out angle for the SVG/visual Swiss-Army blade
  whatItIs: string;
  typicalVolume: string;
  novaSampleLabel: string;
  novaSampleOutput: string;
  qaCheckNote: string;
}

const SWISS_ARMY_TOOLS: SwissKnifeTool[] = [
  {
    id: 'product-descriptions',
    toolNumber: '01',
    name: 'Product Descriptions',
    shortBladeLabel: '01 · Product Descriptions',
    bladeAngleDeg: -68,
    whatItIs:
      'Turn raw SKU spreadsheets, supplier spec sheets, and bullet fragments into persuasive, accurate product descriptions with clear benefits, dimensions, materials, and care instructions.',
    typicalVolume: '200 to 25,000+ SKUs per catalog sprint',
    novaSampleLabel: 'Nova & Co. SKU NV-LIN-101 · 55-Word PDP Copy + 4 Spec Bullets',
    novaSampleOutput:
      '“Crafted from 100% European flax linen (175 GSM), our Washed Linen Duvet Set brings breathable comfort to everyday bedrooms. Pre-washed for a soft drape from night one, with coconut-shell buttons and interior corner ties. Easy care: cold gentle wash.”',
    qaCheckNote: 'Human editors verify dimensions, GSM/material claims, and care codes against your PIM/CSV.',
  },
  {
    id: 'category-landing-copy',
    toolNumber: '02',
    name: 'Category & Landing Page Copy',
    shortBladeLabel: '02 · Category & Landing Copy',
    bladeAngleDeg: -51,
    whatItIs:
      'SEO-structured above-the-fold intros and below-the-grid buying guides for e-commerce collection pages, city/location service pages, and marketplace filter hubs—written to help shoppers choose, not stuff keywords.',
    typicalVolume: '25 to 500+ collection or location hubs',
    novaSampleLabel: 'Nova & Co. Collection Hub: /collections/linen-bedding',
    novaSampleOutput:
      '“How to Choose Between Percale Cotton and Washed Flax Linen: If you sleep warm or live in a humid coastal city, 175 GSM flax linen wicks moisture and softens with every wash—without needing an iron.”',
    qaCheckNote: 'Checked for internal links, genuine buyer utility, and zero duplicate boilerplate across categories.',
  },
  {
    id: 'meta-titles-descriptions',
    toolNumber: '03',
    name: 'Meta Titles & Descriptions',
    shortBladeLabel: '03 · Meta Titles & Descriptions',
    bladeAngleDeg: -34,
    whatItIs:
      'Pixel-width-checked SEO title tags (≤ 60 chars) and click-worthy meta descriptions (≤ 155 chars) generated across thousands of URLs—eliminating missing, truncated, or duplicate metadata site-wide.',
    typicalVolume: '500 to 50,000+ URLs per audit batch',
    novaSampleLabel: 'Nova & Co. Meta Pack · Title (54 chars) + Description (148 chars)',
    novaSampleOutput:
      'Title: Washed Flax Linen Duvet Set (Queen) | Nova & Co. Home\nMeta: Breathable 175 GSM European flax linen duvet cover & 2 shams. Pre-washed for day-one softness, easy-care machine washable. Free shipping over ₹2,999.',
    qaCheckNote: 'Validated for SERP pixel width, primary keyword placement, and unique per-URL value proposition.',
  },
  {
    id: 'image-alt-text',
    toolNumber: '04',
    name: 'Image Alt Text',
    shortBladeLabel: '04 · Image Alt Text',
    bladeAngleDeg: -17,
    whatItIs:
      'Vision-AI + brand-context alt attributes for every product angle, lifestyle room shot, and diagram—improving WCAG screen-reader accessibility and Google Images product discovery at the same time.',
    typicalVolume: '1,000 to 100,000+ catalog & blog images',
    novaSampleLabel: 'Nova & Co. Gallery Image #3 · Accessibility + Image SEO Alt',
    novaSampleOutput:
      'alt="Close-up of oatmeal stonewashed flax linen duvet cover showing coconut-shell button closure and textured weave"',
    qaCheckNote: 'No spammy keyword lists; natural 10–16 word visual descriptions verified for color and angle accuracy.',
  },
  {
    id: 'faqs-qa-content',
    toolNumber: '05',
    name: 'FAQs & Q&A Content',
    shortBladeLabel: '05 · FAQs & Q&A Content',
    bladeAngleDeg: 0,
    whatItIs:
      'Product-specific and category-specific FAQ blocks grounded in your actual customer support tickets, sizing charts, shipping policies, and warranty rules—delivered with valid FAQPage JSON-LD schema.',
    typicalVolume: '100 to 2,500+ page-specific FAQ sets',
    novaSampleLabel: 'Nova & Co. Stoneware Mug PDP FAQ #2',
    novaSampleOutput:
      'Q: Will the unglazed raw clay base scratch wooden dining tables?\nA: No. Each Nova & Co. stoneware mug is triple-sanded on the foot ring before firing so it sits smoothly on solid oak, walnut, or glass surfaces.',
    qaCheckNote: 'Cross-checked against your real support macro docs so AI never invents return or warranty promises.',
  },
  {
    id: 'email-ad-variations',
    toolNumber: '06',
    name: 'Email & Ad Copy Variations',
    shortBladeLabel: '06 · Email & Ad Copy Variants',
    bladeAngleDeg: 17,
    whatItIs:
      'Structured A/B testing matrices of email subject lines, preview text, lifecycle body copy, Google RSA headlines (30 chars), and paid ad primary text—giving growth teams 10× more on-brand angles to test.',
    typicalVolume: '20 to 200+ structured copy variants per campaign',
    novaSampleLabel: 'Nova & Co. Restock Email Subject Line Matrix (3 Angles)',
    novaSampleOutput:
      'Variant A (Direct): Back in stock: The Stoneware Mug Set (340 ml)\nVariant B (Tactile): Your morning coffee’s favorite mug is back on the shelf\nVariant C (Scarcity): Small batch #04: Speckled Stoneware Mugs just landed',
    qaCheckNote: 'Strict adherence to your "words to avoid" list and character limits for Google/email platforms.',
  },
  {
    id: 'help-center-articles',
    toolNumber: '07',
    name: 'Help-Center & Knowledge-Base Articles',
    shortBladeLabel: '07 · Help-Center Articles',
    bladeAngleDeg: 34,
    whatItIs:
      'Turn messy internal SOPs, product release notes, and Loom transcripts into clear, step-by-step customer help articles, troubleshooting guides, and onboarding docs—structured for both humans and RAG chatbots.',
    typicalVolume: '30 to 500+ help-center & documentation articles',
    novaSampleLabel: 'Nova & Co. Help Article: Care & Stain Guide for Natural Jute Rugs',
    novaSampleOutput:
      '“Step 1: Blot—never rub—liquid spills within 60 seconds using a dry white cotton towel.\nStep 2: Mix 1 tsp mild pH-neutral soap with 250 ml lukewarm water and dab gently along the braid direction.”',
    qaCheckNote: 'Every step tested and reviewed by a technical/editorial specialist before Zendesk/Intercom/CMS import.',
  },
  {
    id: 'translations-localization',
    toolNumber: '08',
    name: 'Translations & Localization',
    shortBladeLabel: '08 · Translations & Localization',
    bladeAngleDeg: 51,
    whatItIs:
      'Adapt product catalogs, help centers, and landing pages into Hindi, Tamil, Marathi, Telugu, Bengali, Spanish, Arabic (RTL), French, and more—combining neural translation with native-speaker cultural and unit review.',
    typicalVolume: '500 to 20,000+ strings or product pages per language',
    novaSampleLabel: 'Nova & Co. Hindi (HI-IN) Localized PDP Snippet',
    novaSampleOutput:
      '“रोज़मर्रा के सुकून भरे पलों के लिए तैयार — 100% यूरोपियन फ़्लैक्स लिनेन से बना यह डुवेट सेट हर धुलाई के साथ और भी मुलायम होता जाता है।”',
    qaCheckNote: 'Native-speaking editors adapt idioms, measurements, and currency—localization, not literal translation.',
  },
  {
    id: 'blog-drafts-human-finished',
    toolNumber: '09',
    name: 'Blog Drafts (Human-Finished)',
    shortBladeLabel: '09 · Blog Drafts (Human-Finished)',
    bladeAngleDeg: 68,
    whatItIs:
      'Research-backed outlines and first drafts built from your subject-matter briefs and proprietary data, then heavily edited, fact-checked, and polished by senior human editors so they read like an industry authority.',
    typicalVolume: '8 to 40+ human-finished long-form guides per month',
    novaSampleLabel: 'Nova & Co. Buying Guide: GSM Weight in Linen Bedding Explained',
    novaSampleOutput:
      '“Why 175 GSM Is the Sweet Spot for Year-Round Bedding: Below 150 GSM, linen feels sheer and wears thin at the seams; above 210 GSM, it traps too much heat during Indian summers...”',
    qaCheckNote: '100% human-edited, plagiarism-scanned, and verified for original insight before delivery.',
  },
];

/* ============================================================================
   MAIN PAGE COMPONENT
============================================================================ */

interface AiContentCreationProps {
  onOpenQuoteModal?: (defaultService?: string) => void;
}

const AiContentCreation: React.FC<AiContentCreationProps> = ({ onOpenQuoteModal }) => {
  const shouldReduceMotion = useReducedMotion();

  /* Single Source of Truth from AISolutions.tsx */
  const solutionData = useMemo(() => {
    return (
      aiSolutions.find((s: any) => s.slug === 'ai-content-creation') || {
        slug: 'ai-content-creation',
        name: 'AI Content Creation',
        category: 'AI Marketing' as const,
        badge: null,
        icon: 'FileText' as const,
        tagline: 'Brand-trained content pipelines with human editorial review',
        description:
          'Scale your blog articles, e-commerce product descriptions, landing page variants, and email sequences without generic AI slop. We build custom brand-voice workflows grounded in your subject-matter expertise—and every piece is edited and fact-checked by senior human writers.',
        deliverables: [
          'Custom Brand Voice & Style Guide prompt library trained on your best writing',
          'Research-backed long-form blog posts, pillar guides & comparison pages',
          'Bulk SKU product descriptions & collection copy for 500+ item catalogs',
          'Landing page & email sequence copy variants for rapid A/B testing',
          'Mandatory human editorial review, fact-checking & originality verification',
          'CMS-ready formatting with meta tags, internal links & FAQ schema blocks',
        ] as [string, string, string, string, string, string],
        bestFor: [
          'Large-Catalog E-commerce',
          'B2B SaaS Content Engines',
          'Multi-Location Service Brands',
        ] as [string, string, string],
        typicalTimeline: '1–2 weeks setup + ongoing monthly content sprints',
        keyMetric: '3.5× content publishing velocity with 100% human-reviewed quality (placeholder)',
        relatedIndustries: ['ecommerce', 'skincare-beauty', 'b2b-saas', 'home-decor-furniture'],
        relatedServices: ['content-marketing', 'copywriting', 'email-marketing'],
        futurePagePath: '/ai-solutions/ai-content-creation',
      }
    );
  }, []);

  /* Section 1 — Hero Mosaic Fill Progress (0..121 tiles, maps to 0..1,000 pieces) */
  const [filledTileCount, setFilledTileCount] = useState<number>(
    shouldReduceMotion ? HERO_MOSAIC_TILES.length : 0
  );
  const [mosaicReplayTrigger, setMosaicReplayTrigger] = useState<number>(0);

  /* Section 2 — Active Brand Voice DNA Rung (0..5) */
  const [activeDnaRung, setActiveDnaRung] = useState<number>(0);
  const [dnaPaused, setDnaPaused] = useState<boolean>(false);

  /* Section 3 — Self-Filling Spreadsheet Batch State */
  // rowProgress: -1 = idle (pre-filled with 3 generated rows on initial view so visitors immediately see value, or 0 when animating)
  const [generatedRowCount, setGeneratedRowCount] = useState<number>(8);
  const [reviewCompleted, setReviewCompleted] = useState<boolean>(true);
  const [isBatchGenerating, setIsBatchGenerating] = useState<boolean>(false);
  const [expandedRowSku, setExpandedRowSku] = useState<string>('NV-LIN-101');
  const [batchLiveAnnouncement, setBatchLiveAnnouncement] = useState<string>(
    'Batch ready: 8 Nova & Co. products generated and checked by human editors.'
  );

  /* Section 4 — Swiss-Army Knife Active Tool State */
  const [activeToolId, setActiveToolId] = useState<string>('product-descriptions');

  /* SEO Title & Meta Description */
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'AI Content Creation Services | Product Descriptions, SEO Content & Translations at Scale | WebXCode';

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Scale product descriptions, category copy, SEO metadata, image alt text, FAQs, help-center articles and translations with AI trained on your brand voice and 100% human editorial review.'
      );
    }

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  /* Section 1 — Progressive Mosaic Fill Effect */
  useEffect(() => {
    if (shouldReduceMotion) {
      setFilledTileCount(HERO_MOSAIC_TILES.length);
      return;
    }
    setFilledTileCount(0);
    const interval = setInterval(() => {
      setFilledTileCount((prev) => {
        if (prev >= HERO_MOSAIC_TILES.length) {
          clearInterval(interval);
          return HERO_MOSAIC_TILES.length;
        }
        return prev + 4;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, mosaicReplayTrigger]);

  const displayedPiecesCount = Math.min(
    1000,
    Math.round((filledTileCount / HERO_MOSAIC_TILES.length) * 1000)
  );

  /* Section 2 — Rotate Highlighted DNA Rung Every 3.2s unless paused */
  useEffect(() => {
    if (shouldReduceMotion || dnaPaused) return;
    const timer = setInterval(() => {
      setActiveDnaRung((prev) => (prev + 1) % VOICE_DNA_RUNGS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, dnaPaused]);

  /* Section 3 — Trigger "Generate Batch" Row-by-Row Animation */
  const handleRunBatchGeneration = () => {
    if (shouldReduceMotion) {
      setGeneratedRowCount(NOVA_SPREADSHEET_ROWS.length);
      setReviewCompleted(true);
      setBatchLiveAnnouncement(
        'Generated all 8 Nova & Co. rows. 6 approved, 2 flagged for human editor review.'
      );
      return;
    }

    setIsBatchGenerating(true);
    setReviewCompleted(false);
    setGeneratedRowCount(0);
    setBatchLiveAnnouncement('Generating batch of 8 Nova & Co. product descriptions...');

    let current = 0;
    const rowInterval = setInterval(() => {
      current += 1;
      setGeneratedRowCount(current);

      if (current >= NOVA_SPREADSHEET_ROWS.length) {
        clearInterval(rowInterval);
        setTimeout(() => {
          setReviewCompleted(true);
          setIsBatchGenerating(false);
          setBatchLiveAnnouncement(
            'Batch complete: 8 products drafted, 6 approved by editors, 2 flagged for missing source specs.'
          );
        }, 450);
      }
    }, 220);
  };

  const handleResetBatch = () => {
    setIsBatchGenerating(false);
    setReviewCompleted(false);
    setGeneratedRowCount(0);
    setBatchLiveAnnouncement('Spreadsheet cleared to raw SKU inputs. Click Generate Batch to fill.');
  };

  const activeSwissTool =
    SWISS_ARMY_TOOLS.find((t) => t.id === activeToolId) || SWISS_ARMY_TOOLS[0];

  const triggerQuoteModal = (customService?: string) => {
    const label = customService || solutionData.name;
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
        name: 'AI Content Creation Services — Product Descriptions, SEO Metadata & Localization',
        serviceType:
          'Brand-Voice Trained AI Content Operations, E-commerce Product Descriptions, SEO Meta Tags, Alt Text, FAQs, Help-Center Articles & Localization with Human Editorial Review',
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
            name: 'AI Content Creation',
            item: 'https://webxcode.com/ai-solutions/ai-content-creation',
          },
        ],
      },
    ],
    [solutionData.description]
  );

  return (
    <main className="flex-1 bg-white text-navy overflow-x-hidden">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* ======================================================================
          SECTION 1 — HERO: ONE BRIEF, A THOUSAND PIECES (bg: #1e242e navy)
      ====================================================================== */}
      <section className="relative bg-navy text-white pt-10 pb-20 lg:pt-14 lg:pb-28 overflow-hidden border-b border-white/10">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dots-dark opacity-30 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-20 w-[580px] h-[580px] blue-glow-strong pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-28 bottom-0 w-[440px] h-[440px] blue-glow pointer-events-none"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/70 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <Link href="/ai-solutions" className="hover:text-white transition-colors">
              AI Solutions
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
            <span className="text-white font-semibold" aria-current="page">
              {solutionData.name}
            </span>
          </nav>

          {/* 50/50 Split Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 50% (6 cols): Positioning, H1, Paragraph, CTAs & Quality Row */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/40 text-white text-[12px] font-bold uppercase tracking-[0.12em] mb-5">
                <FileText className="w-3.5 h-3.5 text-primary" />
                <span>AI CONTENT CREATION</span>
              </div>

              <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white leading-[1.07] tracking-[-0.02em]">
                Content at Scale.{' '}
                <span className="text-primary">Quality You Can Trust.</span>
              </h1>

              <p className="mt-5 text-[16px] sm:text-[18px] text-white/80 leading-[1.65] max-w-xl">
                Product descriptions, SEO metadata, FAQs, translations and help articles — created
                with AI trained on your brand voice and checked by human editors before anything
                goes live.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#free-sample"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-primary hover:bg-primary-700 text-white font-semibold text-[16px] shadow-soft transition-all"
                >
                  <span>Get 5 Free Sample Descriptions</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#batch"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/35 hover:border-white hover:bg-white/10 text-white font-semibold text-[16px] transition-all"
                >
                  <span>Watch a Batch Generate</span>
                </a>
              </div>

              {/* Small Trust Row */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-semibold text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>Brand-voice trained</span>
                </span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>Human-reviewed</span>
                </span>
                <span className="text-white/30">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span>Plagiarism-checked</span>
                </span>
              </div>
            </div>

            {/* Right 50% (6 cols): Single Brief Card + 1,000-Piece WebXCode "X" Mosaic */}
            <div className="lg:col-span-6">
              <div className="rounded-[24px] bg-white/[0.05] border border-white/15 backdrop-blur-md p-5 sm:p-6 shadow-2xl">
                {/* Single Brief Card at the Top */}
                <div className="p-4 rounded-2xl bg-navy/90 border border-primary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary-100">
                      INPUT CONTENT BRIEF // MASTER SPEC
                    </div>
                    <div className="text-[14px] sm:text-[15px] font-extrabold text-white mt-0.5">
                      Brief: 1,000 Nova &amp; Co. product descriptions · Tone: warm &amp; clear
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMosaicReplayTrigger((prev) => prev + 1)}
                    className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-primary text-white font-mono text-[11px] font-bold transition-colors shrink-0 cursor-pointer"
                    title="Replay 1,000-piece mosaic fill"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Replay</span>
                  </button>
                </div>

                {/* Mosaic Grid Forming the WebXCode "X" Mark (Decorative, aria-hidden) */}
                <div
                  aria-hidden="true"
                  className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#131820] border border-white/10"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/60 mb-3">
                    <span>CONTENT OPERATIONS MOSAIC (NOVA &amp; CO. CATALOG)</span>
                    <span className="text-primary-100 font-bold">
                      BATCH ID: NC-1000-PDP
                    </span>
                  </div>

                  <div className="grid grid-cols-11 gap-1.5 sm:gap-2 max-w-[380px] mx-auto py-2">
                    {HERO_MOSAIC_TILES.map((tile) => {
                      const isFilled = tile.index < filledTileCount;
                      return (
                        <div
                          key={tile.index}
                          className={`aspect-square rounded-[4px] transition-all duration-200 ${
                            !isFilled
                              ? 'bg-white/[0.05] border border-white/5 scale-90'
                              : tile.isXMark
                              ? 'bg-primary shadow-[0_0_10px_rgba(5,113,194,0.55)] scale-100'
                              : 'bg-primary-100/25 border border-primary/30 scale-100'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Mosaic Legend Row */}
                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-white/65">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-[3px] bg-primary inline-block" />
                        <span>Hero SKU Descriptions</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-[3px] bg-primary-100/30 border border-primary/40 inline-block" />
                        <span>Meta + Alt + FAQs</span>
                      </span>
                    </div>
                    <span>VOICE LOCK: 99.4%</span>
                  </div>
                </div>

                {/* Bottom Counter ("0 -> 1,000 pieces") + Human-Reviewed Chip */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/60">
                      BATCH OUTPUT:
                    </span>
                    <span className="font-mono text-[22px] sm:text-[26px] font-extrabold text-white tabular-nums">
                      0 → {displayedPiecesCount.toLocaleString('en-IN')} pieces
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-[12px] font-extrabold shadow-sm">
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    <span>100% human-reviewed ✓</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 2 — BRAND VOICE DNA (bg: #ffffff white)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>BRAND VOICE CALIBRATION</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
              First, We Learn <span className="text-primary">How You Sound</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Generic AI sounds like everyone else because it starts from a blank prompt. Before we
              generate a single row, we ingest your best existing pages, extract your linguistic DNA,
              and codify a strict Brand Voice Profile for both our models and human editors.
            </p>
          </div>

          {/* Split Layout: Left = 3 Existing Content Cards | Right = Double Helix + 6 Extracted Voice Traits */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left (5 cols): 3 Sample "Your Existing Content" Cards Sliding Toward Center */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy-60">
                  01. YOUR EXISTING CONTENT SAMPLES (NOVA &amp; CO.)
                </span>
                <span className="font-mono text-[11px] font-bold text-primary">3 SOURCES FED →</span>
              </div>

              {EXISTING_CONTENT_SAMPLES.map((sample, idx) => (
                <motion.div
                  key={sample.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className={`p-5 rounded-[20px] bg-primary-50/45 border border-navy-10 shadow-xs transition-transform ${
                    idx === 1 ? 'lg:translate-x-3 border-primary/40 bg-primary-50/80' : ''
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-primary-100 text-primary font-mono text-[10px] font-extrabold uppercase">
                      {sample.sourceType}
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-navy-50">
                      {sample.docCode}
                    </span>
                  </div>

                  <h3 className="text-[16px] font-extrabold text-navy">{sample.title}</h3>
                  <p className="mt-1.5 text-[13.5px] text-navy-70 leading-relaxed italic">
                    {sample.excerpt}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-navy-08 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {sample.highlightedSignals.map((sig) => (
                        <span
                          key={sig}
                          className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-bold"
                        >
                          Signal: {sig}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right (7 cols): Double Helix + 6 Extracted Voice Trait Rungs */}
            <div
              className="lg:col-span-7 rounded-[24px] bg-navy text-white p-6 sm:p-8 shadow-xl relative overflow-hidden"
              onMouseEnter={() => setDnaPaused(true)}
              onMouseLeave={() => setDnaPaused(false)}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-primary-100">
                    02. BRAND VOICE DNA HELIX // NOVA &amp; CO. EXTRACTION
                  </span>
                </div>
                <span className="font-mono text-[11px] text-white/65">
                  Click any rung to inspect rule
                </span>
              </div>

              {/* 6 Helix Rungs */}
              <div className="space-y-3">
                {VOICE_DNA_RUNGS.map((rung, idx) => {
                  const isLit = activeDnaRung === idx;
                  return (
                    <button
                      key={rung.rungCode}
                      type="button"
                      onClick={() => setActiveDnaRung(idx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer grid grid-cols-1 sm:grid-cols-12 items-center gap-4 ${
                        isLit
                          ? 'bg-primary/20 border-primary shadow-md'
                          : 'bg-white/[0.04] border-white/10 hover:border-white/25'
                      }`}
                    >
                      {/* Left Visual Double-Helix Strand & Rung Connector (Decorative, aria-hidden) */}
                      <div
                        aria-hidden="true"
                        className="sm:col-span-4 relative h-8 bg-[#12171f] rounded-xl border border-white/10 flex items-center px-3 overflow-hidden"
                      >
                        {/* Rung Connecting Line */}
                        <div
                          style={{
                            left: `${Math.min(rung.leftNodeOffset, rung.rightNodeOffset)}%`,
                            width: `${Math.abs(rung.rightNodeOffset - rung.leftNodeOffset)}%`,
                          }}
                          className={`absolute h-[3px] rounded-full transition-colors ${
                            isLit ? 'bg-primary' : 'bg-primary-100/35'
                          }`}
                        />
                        {/* Strand A Node */}
                        <span
                          style={{ left: `${rung.leftNodeOffset}%` }}
                          className={`absolute w-3.5 h-3.5 -ml-1.5 rounded-full border-2 transition-all ${
                            isLit
                              ? 'bg-primary border-white scale-110 shadow-[0_0_8px_#0571c2]'
                              : 'bg-navy border-primary'
                          }`}
                        />
                        {/* Strand B Node */}
                        <span
                          style={{ left: `${rung.rightNodeOffset}%` }}
                          className={`absolute w-3.5 h-3.5 -ml-1.5 rounded-full border-2 transition-all ${
                            isLit
                              ? 'bg-white border-primary scale-110'
                              : 'bg-primary-100/70 border-navy'
                          }`}
                        />
                        <span className="relative z-10 font-mono text-[10px] font-bold text-white/50 ml-auto">
                          {rung.rungCode}
                        </span>
                      </div>

                      {/* Right Extracted Trait Label + Value */}
                      <div className="sm:col-span-8">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary-100">
                            {rung.traitLabel}:
                          </span>
                          <span className="text-[15px] sm:text-[16px] font-extrabold text-white italic">
                            {rung.traitValue}
                          </span>
                        </div>
                        <p className="text-[12px] text-white/75 mt-1 leading-snug">
                          {rung.editorRule}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Below: "Your Brand Voice Profile" Summary Card */}
          <div className="mt-10 rounded-[24px] bg-primary-50 border border-primary-100 p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-primary-100">
              <div>
                <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-primary">
                  CODIFIED STYLE &amp; GUARDRAIL ARTIFACT
                </span>
                <h3 className="text-[20px] sm:text-[24px] font-extrabold text-navy mt-0.5">
                  Your Brand Voice Profile — Nova &amp; Co. Home &amp; Lifestyle
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-primary-100 text-navy font-mono text-[12px] font-bold self-start lg:self-center">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Locked before batch generation</span>
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {VOICE_DNA_RUNGS.map((r) => (
                <div
                  key={r.rungCode}
                  className="p-3.5 rounded-xl bg-white border border-navy-08 flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50">
                    {r.traitLabel}
                  </span>
                  <span className="text-[13px] font-extrabold text-navy mt-1 leading-snug">
                    {r.traitValue}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[14px] text-navy-70 font-medium">
              <p>
                <strong className="font-extrabold text-navy">Note:</strong> Every AI draft follows
                this profile — and editors check it.
              </p>
              <span className="font-caveat text-[20px] text-primary font-bold">
                “Sounds like Nova &amp; Co., never like a generic template.”
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 3 — WATCH A BATCH GENERATE: THE SELF-FILLING SPREADSHEET (bg: #f0f7fd, id="batch")
      ====================================================================== */}
      <section
        id="batch"
        className="py-[72px] lg:py-[112px] bg-primary-50 border-b border-primary-100 scroll-mt-20"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header & Generate Batch Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-primary border border-primary-100 text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
                <Database className="w-3.5 h-3.5 text-primary" />
                <span>LIVE BATCH SIMULATOR</span>
              </span>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
                From a Spreadsheet of Products to{' '}
                <span className="text-primary">Ready-to-Publish Content</span>
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] text-navy-70 leading-[1.65]">
                Click <strong className="text-navy">Generate Batch</strong> below to watch 8 Nova
                &amp; Co. SKUs fill in with brand-voice descriptions, SEO meta titles, and accessible
                alt text—then see how human QA flags missing source specs before publishing.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleRunBatchGeneration}
                disabled={isBatchGenerating}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-700 disabled:opacity-60 text-white font-semibold text-[15px] shadow-soft transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isBatchGenerating ? 'Generating Batch...' : 'Generate Batch'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetBatch}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full bg-white hover:bg-navy hover:text-white text-navy border border-navy-15 font-semibold text-[13px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Output Columns</span>
              </button>
            </div>
          </div>

          {/* Screen-reader live region for batch state */}
          <div className="sr-only" aria-live="polite">
            {batchLiveAnnouncement}
          </div>

          {/* Spreadsheet Card */}
          <div className="rounded-[24px] bg-white border-2 border-navy-15 shadow-xl overflow-hidden">
            {/* Top Spreadsheet Formula/Toolbar Bar */}
            <div className="px-4 sm:px-6 py-3 bg-navy text-white flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] font-extrabold text-primary-100">
                  nova_co_catalog_q4.csv
                </span>
                <span className="px-2.5 py-0.5 rounded bg-white/10 font-mono text-[10px] font-bold text-white/85">
                  VOICE PROFILE: NOVA-WARM-V2
                </span>
              </div>
              <div className="font-mono text-[11px] text-white/75">
                Click any row to inspect full description below
              </div>
            </div>

            {/* Real Accessible Table with Column Letters & Sticky Header */}
            <div className="overflow-x-auto max-h-[520px]">
              <table className="w-full text-left border-collapse min-w-[980px]">
                <thead className="sticky top-0 z-20 bg-[#f4f8fc] border-b-2 border-navy-15">
                  {/* Spreadsheet Column Letters Row */}
                  <tr className="border-b border-navy-08 font-mono text-[10px] font-bold text-navy-50 bg-primary-50/70">
                    <th scope="col" className="py-1.5 px-3 w-10 text-center border-r border-navy-08">
                      #
                    </th>
                    <th scope="col" className="py-1.5 px-3 border-r border-navy-08">
                      A · INPUT
                    </th>
                    <th scope="col" className="py-1.5 px-3 border-r border-navy-08">
                      B · INPUT
                    </th>
                    <th scope="col" className="py-1.5 px-3 border-r border-navy-08">
                      C · INPUT
                    </th>
                    <th scope="col" className="py-1.5 px-3 border-r border-navy-08">
                      D · INPUT
                    </th>
                    <th scope="col" className="py-1.5 px-3 border-r border-navy-08 text-primary">
                      E · AI + EDITOR OUTPUT
                    </th>
                    <th scope="col" className="py-1.5 px-3 border-r border-navy-08 text-primary">
                      F · AI + EDITOR OUTPUT
                    </th>
                    <th scope="col" className="py-1.5 px-3 border-r border-navy-08 text-primary">
                      G · AI + EDITOR OUTPUT
                    </th>
                    <th scope="col" className="py-1.5 px-3 text-primary">
                      H · QA STATUS
                    </th>
                  </tr>
                  {/* Column Titles Row */}
                  <tr className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-navy">
                    <th scope="col" className="py-3 px-3 text-center border-r border-navy-08">
                      ROW
                    </th>
                    <th scope="col" className="py-3 px-3 border-r border-navy-08">
                      SKU
                    </th>
                    <th scope="col" className="py-3 px-3 border-r border-navy-08">
                      Product
                    </th>
                    <th scope="col" className="py-3 px-3 border-r border-navy-08">
                      Material
                    </th>
                    <th scope="col" className="py-3 px-3 border-r border-navy-08">
                      Size
                    </th>
                    <th scope="col" className="py-3 px-3 border-r border-navy-08">
                      Description
                    </th>
                    <th scope="col" className="py-3 px-3 border-r border-navy-08">
                      Meta Title
                    </th>
                    <th scope="col" className="py-3 px-3 border-r border-navy-08">
                      Alt Text
                    </th>
                    <th scope="col" className="py-3 px-3">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-navy-08 text-[12.5px]">
                  {NOVA_SPREADSHEET_ROWS.map((row, idx) => {
                    const isFilled = idx < generatedRowCount;
                    const isSelected = expandedRowSku === row.sku;

                    return (
                      <tr
                        key={row.sku}
                        onClick={() => setExpandedRowSku(row.sku)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-primary-50/90'
                            : 'hover:bg-primary-50/40 bg-white'
                        }`}
                      >
                        {/* Row Number */}
                        <td className="py-3 px-3 font-mono text-[11px] font-bold text-navy-50 text-center border-r border-navy-08">
                          {row.rowNum}
                        </td>

                        {/* Col A: SKU */}
                        <td className="py-3 px-3 font-mono text-[11.5px] font-extrabold text-navy border-r border-navy-08 whitespace-nowrap">
                          {row.sku}
                        </td>

                        {/* Col B: Product */}
                        <td className="py-3 px-3 font-bold text-navy border-r border-navy-08">
                          {row.product}
                        </td>

                        {/* Col C: Material */}
                        <td className="py-3 px-3 text-navy-70 border-r border-navy-08">
                          {row.material}
                        </td>

                        {/* Col D: Size */}
                        <td className="py-3 px-3 font-mono text-[11.5px] text-navy-70 border-r border-navy-08 whitespace-nowrap">
                          {row.size}
                        </td>

                        {/* Col E: Description */}
                        <td className="py-3 px-3 border-r border-navy-08 max-w-[230px]">
                          {isFilled ? (
                            <span className="text-navy font-medium line-clamp-2">
                              {row.descriptionShort}
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-navy-40 italic">
                              — awaiting batch —
                            </span>
                          )}
                        </td>

                        {/* Col F: Meta Title */}
                        <td className="py-3 px-3 border-r border-navy-08 max-w-[200px]">
                          {isFilled ? (
                            <span className="font-mono text-[11px] text-navy font-semibold line-clamp-2">
                              {row.metaTitle}
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-navy-40 italic">—</span>
                          )}
                        </td>

                        {/* Col G: Alt Text */}
                        <td className="py-3 px-3 border-r border-navy-08 max-w-[200px]">
                          {isFilled ? (
                            <span className="text-[12px] text-navy-70 line-clamp-2">
                              {row.altText}
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-navy-40 italic">—</span>
                          )}
                        </td>

                        {/* Col H: Status */}
                        <td className="py-3 px-3 whitespace-nowrap">
                          {!isFilled ? (
                            <span className="px-2.5 py-1 rounded-full bg-navy-08 text-navy-60 font-mono text-[10px] font-bold">
                              Queued
                            </span>
                          ) : !reviewCompleted ? (
                            <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary border border-primary-100 font-mono text-[10px] font-bold">
                              Draft
                            </span>
                          ) : row.finalStatus === 'Approved' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white font-mono text-[10px] font-extrabold">
                              <Check className="w-3 h-3" strokeWidth={2.5} />
                              <span>Approved ✓</span>
                            </span>
                          ) : (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy text-white font-mono text-[10px] font-extrabold">
                                <AlertCircle className="w-3 h-3 text-primary" />
                                <span>Needs review</span>
                              </span>
                              {row.reviewFlagNote && (
                                <div className="font-mono text-[10px] text-navy-70 font-bold mt-1">
                                  {row.reviewFlagNote}
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Expanded Row Inspector Panel */}
            {(() => {
              const selectedRow =
                NOVA_SPREADSHEET_ROWS.find((r) => r.sku === expandedRowSku) ||
                NOVA_SPREADSHEET_ROWS[0];
              const isSelectedRowGenerated =
                selectedRow.rowNum - 1 < generatedRowCount;

              return (
                <div className="p-5 sm:p-6 bg-primary-50/70 border-t-2 border-navy-15">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2.5 py-1 rounded-md bg-navy text-white font-mono text-[11px] font-extrabold">
                        INSPECTING ROW {selectedRow.rowNum} {'//'} {selectedRow.sku}
                      </span>
                      <span className="text-[15px] font-extrabold text-navy">
                        {selectedRow.product}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-primary">
                      {selectedRow.wordCount} WORDS · GRADE 6 READABILITY
                    </span>
                  </div>

                  {isSelectedRowGenerated ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      <div className="lg:col-span-7 p-4 rounded-xl bg-white border border-navy-10">
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary mb-1">
                          FULL PRODUCT DESCRIPTION PREVIEW
                        </div>
                        <p className="text-[13.5px] text-navy leading-relaxed">
                          {selectedRow.descriptionFull}
                        </p>
                      </div>
                      <div className="lg:col-span-5 space-y-2.5">
                        <div className="p-3 rounded-xl bg-white border border-navy-10">
                          <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50">
                            META TITLE ({selectedRow.metaTitle.length} CHARS)
                          </div>
                          <div className="font-mono text-[12px] font-bold text-navy mt-0.5">
                            {selectedRow.metaTitle}
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white border border-navy-10">
                          <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-navy-50">
                            ACCESSIBLE IMAGE ALT TEXT
                          </div>
                          <div className="text-[12.5px] font-medium text-navy mt-0.5">
                            {selectedRow.altText}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[13px] text-navy-60 italic">
                      Click &ldquo;Generate Batch&rdquo; above to populate this row&apos;s
                      description, meta title, and alt text.
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Spreadsheet Footer Bar */}
            <div className="px-5 sm:px-6 py-3.5 bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px]">
              <div className="font-bold text-white">
                8 products · 3 fields each · drafted in seconds · reviewed by editors
              </div>
              <div className="text-primary-100">Illustrative demo.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          SECTION 4 — WHAT WE CREATE: THE SWISS-ARMY KNIFE (bg: #ffffff white)
      ====================================================================== */}
      <section className="py-[72px] lg:py-[112px] bg-white border-b border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3.5">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>9-IN-1 CONTENT OPERATIONS TOOLKIT</span>
            </span>
            <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-navy leading-[1.12] tracking-tight">
              One Toolkit. <span className="text-primary">Every Kind of Content.</span>
            </h2>
            <p className="mt-3.5 text-[16px] text-navy-70 leading-[1.65]">
              Select any blade on the WebXCode Swiss-Army toolkit below to inspect typical batch
              volumes, sample Nova &amp; Co. outputs, and how our human editorial team verifies each
              format.
            </p>
          </div>

          {/* Desktop & Tablet Split: Left = Stylized Swiss-Army Knife with 9 Fan-Out Blades | Right = Active Tool Detail Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left (6 cols): Stylized Swiss-Army Knife Illustration + Interactive Blade Selector */}
            <div className="lg:col-span-6">
              <div className="rounded-[26px] bg-primary-50/55 border border-primary-100 p-5 sm:p-7">
                {/* Stylized Navy Handle with WebXCode "X" Emblem */}
                <div className="relative mx-auto max-w-[440px] mb-6">
                  <div className="rounded-full bg-navy text-white px-6 py-4 border-2 border-primary shadow-xl flex items-center justify-between">
                    {/* Left Pivot Rivet */}
                    <span className="w-4 h-4 rounded-full bg-primary-100/30 border-2 border-primary inline-block" />

                    {/* Center WebXCode "X" Shield Emblem */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-mono font-extrabold text-[18px] shadow-md border border-white/25">
                        X
                      </div>
                      <div>
                        <div className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary-100">
                          WEBXCODE CONTENT OPS
                        </div>
                        <div className="text-[14px] font-extrabold text-white">
                          9-Blade Editorial Multi-Tool
                        </div>
                      </div>
                    </div>

                    {/* Right Pivot Rivet */}
                    <span className="w-4 h-4 rounded-full bg-primary-100/30 border-2 border-primary inline-block" />
                  </div>
                </div>

                {/* 9 Fan-Out Tool Blades (Keyboard Accessible Buttons, Responsive on Desktop & Mobile) */}
                <div
                  role="tablist"
                  aria-label="Nine AI content creation formats"
                  className="space-y-2"
                >
                  {SWISS_ARMY_TOOLS.map((tool, idx) => {
                    const isSelected = tool.id === activeToolId;
                    // Subtle fan-out indentation on desktop to evoke fanned blades
                    const indentSpread = Math.abs(idx - 4) * 6;

                    return (
                      <div key={tool.id}>
                        <button
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => setActiveToolId(tool.id)}
                          style={{ marginLeft: `${indentSpread}px` }}
                          className={`w-full text-left px-4 py-3 rounded-r-full rounded-l-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-white text-navy border-navy-12 hover:border-primary hover:bg-primary-50/60'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`w-6 h-6 rounded-full font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? 'bg-white text-primary'
                                  : 'bg-primary-50 text-primary'
                              }`}
                            >
                              {tool.toolNumber}
                            </span>
                            <span className="text-[14px] sm:text-[15px] font-extrabold truncate">
                              {tool.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span
                              className={`hidden sm:inline font-mono text-[10px] font-bold uppercase ${
                                isSelected ? 'text-white/85' : 'text-navy-50'
                              }`}
                            >
                              BLADE {tool.toolNumber}
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                isSelected
                                  ? 'text-white translate-x-0.5 rotate-90 lg:rotate-0'
                                  : 'text-navy-40'
                              }`}
                            />
                          </div>
                        </button>

                        {/* Mobile Accordion Inline Preview */}
                        {isSelected && (
                          <div className="lg:hidden mt-2 mb-3 p-4 rounded-2xl bg-white border-2 border-primary shadow-md">
                            <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                              TYPICAL VOLUME: {tool.typicalVolume}
                            </div>
                            <p className="text-[13.5px] text-navy-70 mt-1.5 leading-relaxed">
                              {tool.whatItIs}
                            </p>
                            <div className="mt-3 p-3 rounded-xl bg-primary-50/70 border border-primary-100">
                              <div className="font-mono text-[10px] font-bold text-navy-60">
                                {tool.novaSampleLabel}
                              </div>
                              <p className="text-[12.5px] font-medium text-navy mt-1 whitespace-pre-line">
                                {tool.novaSampleOutput}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                triggerQuoteModal(`AI Content Creation — ${tool.name}`)
                              }
                              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-[12px] font-bold cursor-pointer"
                            >
                              <span>Get a Quote →</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right (6 cols on Desktop): Active Blade Inspection Panel */}
            <div className="lg:col-span-6 hidden lg:block sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSwissTool.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-[26px] bg-white border-2 border-navy-15 shadow-xl p-7 sm:p-8"
                >
                  {/* Top Blade Meta Bar */}
                  <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-navy-08">
                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary font-mono text-[11px] font-extrabold uppercase tracking-wider">
                      TOOL BLADE {activeSwissTool.toolNumber} OF 09
                    </span>
                    <span className="font-mono text-[11px] font-bold text-navy-60">
                      100% HUMAN-REVIEWED
                    </span>
                  </div>

                  <h3 className="text-[24px] sm:text-[28px] font-extrabold text-navy leading-tight">
                    {activeSwissTool.name}
                  </h3>

                  <p className="mt-3 text-[15px] text-navy-70 leading-[1.65]">
                    {activeSwissTool.whatItIs}
                  </p>

                  {/* Typical Volume Box */}
                  <div className="mt-5 p-4 rounded-2xl bg-primary-50/60 border border-primary-100 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary">
                        TYPICAL BATCH VOLUME
                      </div>
                      <div className="text-[15px] font-extrabold text-navy mt-0.5">
                        {activeSwissTool.typicalVolume}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white border border-primary-100 font-mono text-[11px] font-bold text-navy">
                      CSV / JSON / CMS Ready
                    </span>
                  </div>

                  {/* Example Output Card (Nova & Co.) */}
                  <div className="mt-5 p-5 rounded-2xl bg-navy text-white">
                    <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-white/10">
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-primary-100">
                        EXAMPLE OUTPUT // {activeSwissTool.novaSampleLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary text-white font-mono text-[10px] font-bold">
                        Verified ✓
                      </span>
                    </div>
                    <p className="text-[13.5px] text-white/90 leading-relaxed whitespace-pre-line font-mono">
                      {activeSwissTool.novaSampleOutput}
                    </p>
                  </div>

                  {/* Editorial QA Note */}
                  <div className="mt-5 flex items-start gap-2.5 text-[13px] text-navy-70">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-bold text-navy">Editorial QA:</strong>{' '}
                      {activeSwissTool.qaCheckNote}
                    </span>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-7 pt-5 border-t border-navy-08 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        triggerQuoteModal(`AI Content Creation — ${activeSwissTool.name}`)
                      }
                      className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-700 text-white text-[14px] font-semibold shadow-soft transition-all cursor-pointer"
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-caveat text-[19px] text-primary font-bold">
                        Zero unreviewed AI output
                      </span>
                      <span className="text-navy-30">·</span>
                      <Link
                        href="/ai-solutions/ai-powered-seo"
                        className="text-[12.5px] font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>AI-Powered SEO</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-navy-30">·</span>
                      <Link
                        href="/ai-solutions/ai-ad-creatives"
                        className="text-[12.5px] font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>AI Ad Creatives</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiContentCreation;
