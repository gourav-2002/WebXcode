'use client';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Zap,
  Check,
  Copy,
  Linkedin,
  Twitter,
  MessageCircle,
  Mail,
  Lightbulb,
  Info,
  AlertTriangle,
  Clock,
  Calendar,
  BookOpen,
  Share2,
  Plus,
  Minus,
} from 'lucide-react';
import {
  blogPosts,
  blogCategories,
  blogAuthors,
  BlogContentBlock,
  BlogPostItem,
} from '@/app/blog/_components/Blog';

interface BlogPostProps {
  onOpenQuoteModal?: (service?: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ onOpenQuoteModal: propOpenQuoteModal }) => {
  const quoteModalCtx = useQuoteModal();
  const onOpenQuoteModal = (service?: string) => {
    if (propOpenQuoteModal) propOpenQuoteModal(service);
    else quoteModalCtx.openQuoteModal(service);
  };
  const rawParams = useParams();
  const slug = Array.isArray(rawParams?.slug) ? rawParams.slug[0] : (rawParams?.slug as string);
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const post: BlogPostItem | undefined =
    postIndex !== -1 ? blogPosts[postIndex] : undefined;

  const [readingProgress, setReadingProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const articleBodyRef = useRef<HTMLElement | null>(null);

  // Extract H2 and H3 headings from content blocks for Table of Contents
  const tocItems = React.useMemo(() => {
    if (!post) return [];
    return post.content.filter(
      (block): block is Extract<BlogContentBlock, { type: 'heading' }> =>
        block.type === 'heading'
    );
  }, [post]);

  // Set active heading default and reset states on slug change
  useEffect(() => {
    setReadingProgress(0);
    setMobileTocOpen(false);
    setOpenFaqIdx(0);
    if (tocItems.length > 0) {
      setActiveHeadingId(tocItems[0].id);
    } else {
      setActiveHeadingId('');
    }
  }, [slug, tocItems]);

  // SEO Meta, OpenGraph, Twitter & Canonical update on route change
  useEffect(() => {
    if (!post) {
      document.title = 'Article Not Found | WebXCode Blog';
      return;
    }

    const pageTitle = `${post.title} | WebXCode Blog`;
    document.title = pageTitle;

    const setOrCreateMeta = (
      selector: string,
      attrName: 'name' | 'property',
      attrValue: string,
      content: string
    ) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setOrCreateMeta('meta[name="description"]', 'name', 'description', post.excerpt);
    setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle);
    setOrCreateMeta(
      'meta[property="og:description"]',
      'property',
      'og:description',
      post.excerpt
    );
    setOrCreateMeta(
      'meta[property="og:image"]',
      'property',
      'og:image',
      post.coverImage
    );
    setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
    setOrCreateMeta(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      post.excerpt
    );
    setOrCreateMeta(
      'meta[name="twitter:image"]',
      'name',
      'twitter:image',
      post.coverImage
    );

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}/blog/${post.slug}`);
  }, [post]);

  // Reading progress bar & TOC scroll-spy listener
  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      if (articleBodyRef.current) {
        const rect = articleBodyRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = rect.height - windowHeight * 0.5;
        const scrolled = -rect.top + windowHeight * 0.25;
        if (totalScrollable <= 0) {
          setReadingProgress(rect.top < 0 ? 100 : 0);
        } else {
          const pct = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
          setReadingProgress(pct);
        }
      }

      // Scroll-spy for H2/H3 headings
      if (tocItems.length > 0) {
        let currentId = tocItems[0].id;
        for (const item of tocItems) {
          const headingEl = document.getElementById(item.id);
          if (headingEl) {
            const top = headingEl.getBoundingClientRect().top;
            if (top <= 160) {
              currentId = item.id;
            }
          }
        }
        setActiveHeadingId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, tocItems]);

  /* ==========================================================================
     FRIENDLY "ARTICLE NOT FOUND" STATE
  ========================================================================== */
  if (!post) {
    return (
      <main className="flex-1 bg-white text-navy py-24 lg:py-32">
        <div className="max-w-[640px] mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-primary-50 text-primary text-[12px] font-bold uppercase tracking-wider mb-3">
            404 · ARTICLE NOT FOUND
          </span>
          <h1 className="text-[32px] sm:text-[42px] font-extrabold text-navy leading-tight mb-4">
            We Couldn&apos;t Find That <span className="text-primary">Article</span>
          </h1>
          <p className="text-[17px] text-navy-70 leading-relaxed mb-8">
            The article you are looking for may have been moved, updated, or does not
            exist. Explore our latest engineering, SEO, and AI guides on the blog.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blog"
              className="px-7 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[15px] transition-colors inline-flex items-center gap-2 shadow-soft"
            >
              <span>Back to Blog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-full border border-navy-15 hover:border-primary text-navy hover:text-primary font-bold text-[15px] transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const author =
    blogAuthors.find((a) => a.id === post.authorId) || blogAuthors[0];

  // Previous / Next posts
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : blogPosts[blogPosts.length - 1];
  const nextPost =
    postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : blogPosts[0];

  // Related articles: same category first, then latest (excluding current post)
  const relatedPosts = [
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/blog/${post.slug}`
      : `https://webxcode.com/blog/${post.slug}`;

  const handleCopyShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = (code: string, idx: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveHeadingId(id);
      setMobileTocOpen(false);
    }
  };

  const handleArticleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    // TODO: Connect newsletter subscription endpoint
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  // JSON-LD Structured Data: BlogPosting + BreadcrumbList + FAQPage (when FAQs exist)
  const jsonLdGraph: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.coverImage,
      datePublished: post.publishedIso,
      dateModified: post.updatedIso || post.publishedIso,
      author: {
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'WebXCode',
        url: 'https://webxcode.com',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': shareUrl,
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
          name: 'Blog',
          item: 'https://webxcode.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.category,
          item: `https://webxcode.com/blog?category=${encodeURIComponent(post.category)}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: post.title,
          item: shareUrl,
        },
      ],
    },
  ];

  if (post.faqs && post.faqs.length > 0) {
    jsonLdGraph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  return (
    <main className="flex-1 bg-white text-navy">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      {/* ====================================================================
          1. READING PROGRESS BAR (3px #0571c2 fixed under sticky header)
      ==================================================================== */}
      <div
        aria-hidden="true"
        className="fixed top-[68px] lg:top-[72px] left-0 right-0 h-[3px] bg-navy-08 z-40 pointer-events-none"
      >
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* ====================================================================
          2. ARTICLE HERO (white — centered header, then wide cover image)
      ==================================================================== */}
      <header className="bg-white pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-navy-08">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="text-center flex flex-col items-center">
            {/* Breadcrumb: Home › Blog › [Category] */}
            <nav
              aria-label="Breadcrumb"
              className="inline-flex flex-wrap items-center justify-center gap-2 text-[13px] font-medium text-navy-50 mb-5"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-primary" />
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-primary" />
              <Link
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="text-navy font-semibold hover:text-primary transition-colors"
              >
                {post.category}
              </Link>
            </nav>

            {/* Category Pill (links to /blog with category filter applied) */}
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 hover:bg-primary hover:text-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] transition-colors mb-5"
            >
              {post.category}
            </Link>

            {/* H1 Article Title (44–52px desktop, weight 800, max ~900px wide) */}
            <h1 className="text-[32px] sm:text-[42px] lg:text-[50px] font-extrabold text-navy leading-[1.12] tracking-tight max-w-[900px] mb-5">
              {post.title}
            </h1>

            {/* Excerpt (20px, navy 70%) */}
            <p className="text-[18px] sm:text-[20px] text-navy-70 leading-relaxed max-w-[780px] mb-8">
              {post.excerpt}
            </p>

            {/* Meta Row: Author Avatar + Name + Role · Published Date · Updated Date · Read Time */}
            <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-5 text-[14px] text-navy-70 pb-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary text-white font-bold text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                  {author.initials}
                </div>
                <div className="text-left">
                  <div className="font-extrabold text-navy leading-tight">
                    {author.name}
                  </div>
                  <div className="text-[12px] text-navy-50 font-medium">
                    {author.role}
                  </div>
                </div>
              </div>

              <span className="hidden sm:inline text-navy-15">|</span>

              <div className="inline-flex items-center gap-1.5 text-[13px] font-medium text-navy-70">
                <Calendar className="w-4 h-4 text-primary" />
                <time dateTime={post.publishedIso}>{post.publishedDate}</time>
              </div>

              {post.updatedDate && (
                <>
                  <span className="text-navy-30">·</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary text-[12px] font-bold">
                    Updated{' '}
                    <time dateTime={post.updatedIso}>{post.updatedDate}</time>
                  </span>
                </>
              )}

              <span className="text-navy-30">·</span>

              <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy-70">
                <Clock className="w-4 h-4 text-primary" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Mobile Horizontal Share Bar (under meta on mobile) */}
            <div className="flex lg:hidden items-center justify-center gap-2.5 mb-8">
              <span className="text-[12px] font-bold text-navy-50 mr-1 inline-flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5 text-primary" />
                Share:
              </span>
              <button
                type="button"
                onClick={handleCopyShareLink}
                aria-label="Copy article link"
                className="w-9 h-9 rounded-full border border-navy-15 flex items-center justify-center text-navy-70 hover:border-primary hover:text-primary transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="w-9 h-9 rounded-full border border-navy-15 flex items-center justify-center text-navy-70 hover:border-primary hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className="w-9 h-9 rounded-full border border-navy-15 flex items-center justify-center text-navy-70 hover:border-primary hover:text-primary transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${post.title} - ${shareUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="w-9 h-9 rounded-full border border-navy-15 flex items-center justify-center text-navy-70 hover:border-primary hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(
                  post.title
                )}&body=${encodeURIComponent(
                  `Check out this guide from WebXCode: ${shareUrl}`
                )}`}
                aria-label="Share via Email"
                className="w-9 h-9 rounded-full border border-navy-15 flex items-center justify-center text-navy-70 hover:border-primary hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              {copiedLink && (
                <span className="text-[12px] font-bold text-primary">Copied!</span>
              )}
            </div>
          </div>

          {/* Full-Width Rounded (24px) Cover Image (max ~1100px) with Soft Shadow */}
          <div className="relative rounded-[24px] overflow-hidden border border-navy-08 shadow-soft bg-navy aspect-[16/9]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt}
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* ====================================================================
          3. ARTICLE BODY — 3-COLUMN READING LAYOUT
      ==================================================================== */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Mobile Collapsible "On this page ▾" Dropdown above Body */}
          {tocItems.length > 0 && (
            <div className="lg:hidden mb-8 bg-primary-50 rounded-[18px] border border-primary-100 overflow-hidden">
              <button
                type="button"
                aria-expanded={mobileTocOpen}
                onClick={() => setMobileTocOpen((o) => !o)}
                className="w-full px-5 py-4 flex items-center justify-between text-[15px] font-extrabold text-navy cursor-pointer"
              >
                <span>On this page</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform ${
                    mobileTocOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileTocOpen && (
                <nav
                  aria-label="Mobile table of contents"
                  className="px-5 pb-4 pt-1 border-t border-primary-100 space-y-2"
                >
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left py-1.5 text-[14px] font-semibold transition-colors ${
                        item.level === 3 ? 'pl-4' : ''
                      } ${
                        activeHeadingId === item.id
                          ? 'text-primary font-bold'
                          : 'text-navy-70 hover:text-primary'
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          )}

          {/* 3-Column Grid: Left Share Bar (1 col) + Center Reading Column (~720px, 7 cols) + Right TOC & CTA (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN (Sticky Vertical Share Bar on Desktop) */}
            <aside
              aria-label="Share article"
              className="hidden lg:flex lg:col-span-1 lg:sticky lg:top-[140px] flex-col items-center gap-3"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-navy-50 mb-1">
                Share
              </span>

              <div className="relative">
                <button
                  type="button"
                  onClick={handleCopyShareLink}
                  aria-label="Copy link"
                  title="Copy link"
                  className="w-11 h-11 rounded-full border border-navy-15 bg-white text-navy-70 hover:border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                {copiedLink && (
                  <span
                    role="status"
                    className="absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-navy text-white text-[11px] font-bold whitespace-nowrap shadow-md"
                  >
                    Copied!
                  </span>
                )}
              </div>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                title="Share on LinkedIn"
                className="w-11 h-11 rounded-full border border-navy-15 bg-white text-navy-70 hover:border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X (Twitter)"
                title="Share on X"
                className="w-11 h-11 rounded-full border border-navy-15 bg-white text-navy-70 hover:border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${post.title} - ${shareUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                title="Share on WhatsApp"
                className="w-11 h-11 rounded-full border border-navy-15 bg-white text-navy-70 hover:border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={`mailto:?subject=${encodeURIComponent(
                  post.title
                )}&body=${encodeURIComponent(
                  `Read this article on the WebXCode Blog: ${shareUrl}`
                )}`}
                aria-label="Share via Email"
                title="Share via Email"
                className="w-11 h-11 rounded-full border border-navy-15 bg-white text-navy-70 hover:border-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-sm"
              >
                <Mail className="w-4 h-4" />
              </a>
            </aside>

            {/* CENTER COLUMN (~720px max reading width) */}
            <article
              ref={articleBodyRef}
              className="lg:col-span-7 max-w-[720px] w-full mx-auto"
            >
              {/* Key Takeaways Box at the Top */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <div className="bg-primary-50 rounded-[20px] p-6 sm:p-8 border border-primary-100 mb-10">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h2 className="text-[20px] font-extrabold text-navy">
                      Key Takeaways
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {post.keyTakeaways.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[16px] text-navy/85 leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-1">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rich Content Blocks (Body 18px, line-height 1.85, navy 85%) */}
              <div className="space-y-7">
                {post.content.map((block, idx) => {
                  switch (block.type) {
                    case 'paragraph':
                      return (
                        <p
                          key={idx}
                          className="text-[18px] leading-[1.85] text-navy/85"
                        >
                          {block.text}
                        </p>
                      );

                    case 'heading':
                      if (block.level === 2) {
                        return (
                          <h2
                            key={idx}
                            id={block.id}
                            className="scroll-mt-28 text-[26px] sm:text-[30px] font-extrabold text-navy leading-[1.22] tracking-tight pt-6"
                          >
                            {block.text}
                          </h2>
                        );
                      }
                      return (
                        <h3
                          key={idx}
                          id={block.id}
                          className="scroll-mt-28 text-[20px] sm:text-[22px] font-bold text-navy leading-[1.3] pt-3"
                        >
                          {block.text}
                        </h3>
                      );

                    case 'list':
                      if (block.ordered) {
                        return (
                          <ol
                            key={idx}
                            className="space-y-3 pl-1 text-[18px] leading-[1.85] text-navy/85"
                          >
                            {block.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-3.5">
                                <span className="w-6 h-6 rounded-full bg-primary text-white text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-1.5">
                                  {i + 1}
                                </span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ol>
                        );
                      }
                      return (
                        <ul
                          key={idx}
                          className="space-y-3 pl-1 text-[18px] leading-[1.85] text-navy/85"
                        >
                          {block.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3.5">
                              <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-3" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      );

                    case 'image':
                      return (
                        <figure key={idx} className="my-8">
                          <div className="rounded-[20px] overflow-hidden border border-navy-08 shadow-soft bg-navy">
                            <Image
                              src={block.src}
                              alt={block.alt}
                              loading="lazy"
                              width={1200}
                              height={675}
                              sizes="(max-width: 800px) 100vw, 800px"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          {block.caption && (
                            <figcaption className="text-center text-[13px] text-navy-50 font-medium mt-3">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      );

                    case 'quote':
                      return (
                        <blockquote
                          key={idx}
                          className="relative my-8 bg-primary-50/70 rounded-r-[20px] border-l-4 border-primary p-6 sm:p-8 overflow-hidden"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute right-6 -top-4 text-[96px] font-extrabold text-primary/10 leading-none select-none pointer-events-none"
                          >
                            &ldquo;
                          </span>
                          <p className="relative z-10 text-[19px] sm:text-[20px] font-semibold italic text-navy leading-[1.65] mb-3">
                            &ldquo;{block.text}&rdquo;
                          </p>
                          <footer className="relative z-10 text-[14px] font-bold text-primary">
                            — {block.author}
                          </footer>
                        </blockquote>
                      );

                    case 'callout': {
                      const isWarning = block.variant === 'warning';
                      const CalloutIcon =
                        block.variant === 'tip'
                          ? Lightbulb
                          : block.variant === 'info'
                          ? Info
                          : AlertTriangle;
                      return (
                        <div
                          key={idx}
                          className={`rounded-[20px] p-6 border ${
                            isWarning
                              ? 'bg-navy/[0.04] border-navy-15 text-navy'
                              : 'bg-primary-50 border-primary-100 text-navy'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                                isWarning
                                  ? 'bg-navy text-white'
                                  : 'bg-primary text-white'
                              }`}
                            >
                              <CalloutIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-[16px] font-extrabold text-navy mb-1">
                                {block.title}
                              </h4>
                              <p className="text-[15px] text-navy-70 leading-relaxed">
                                {block.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    case 'code':
                      return (
                        <div
                          key={idx}
                          className="rounded-[20px] overflow-hidden bg-navy text-white border border-navy-15 shadow-soft my-6"
                        >
                          <div className="px-5 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-primary">
                              {block.language}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopyCode(block.code, idx)}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-primary text-white text-[12px] font-semibold transition-colors cursor-pointer"
                            >
                              {copiedCodeIdx === idx ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy code</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-5 overflow-x-auto text-[13px] sm:text-[14px] font-mono leading-relaxed text-white/90">
                            <code>{block.code}</code>
                          </pre>
                        </div>
                      );

                    case 'table':
                      return (
                        <div
                          key={idx}
                          className="my-6 rounded-[20px] border border-navy-08 overflow-hidden shadow-soft"
                        >
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[540px]">
                              <thead>
                                <tr className="bg-navy text-white text-[13px] font-bold uppercase tracking-wider">
                                  {block.headers.map((h, i) => (
                                    <th key={i} className="py-3.5 px-4">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-navy-08 text-[14px] text-navy/85">
                                {block.rows.map((row, rIdx) => (
                                  <tr
                                    key={rIdx}
                                    className="bg-white hover:bg-primary-50/70 transition-colors"
                                  >
                                    {row.map((cell, cIdx) => (
                                      <td
                                        key={cIdx}
                                        className={`py-3.5 px-4 ${
                                          cIdx === 0 ? 'font-bold text-navy' : ''
                                        }`}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );

                    case 'cta':
                      return (
                        <div
                          key={idx}
                          className="my-8 rounded-[20px] bg-navy text-white p-6 sm:p-8 relative overflow-hidden shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                        >
                          <div className="absolute -right-12 -top-12 w-48 h-48 blue-glow pointer-events-none" />
                          <div className="relative z-10">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-1">
                              WORK WITH WEBXCODE
                            </span>
                            <h4 className="text-[20px] font-extrabold text-white leading-snug">
                              Need help with this? Our team can build it for you.
                            </h4>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenQuoteModal(`Article Inline CTA: ${post.title}`)
                            }
                            className="relative z-10 px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                          >
                            <span>Get a Free Quote</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>

              {/* FAQ Accordion at the end of the article (if faqs exist) */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-14 pt-10 border-t border-navy-08">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary text-[11px] font-bold uppercase tracking-wider mb-2.5">
                    ARTICLE FAQS
                  </span>
                  <h2 className="text-[24px] sm:text-[28px] font-extrabold text-navy mb-6">
                    Frequently Asked <span className="text-primary">Questions</span>
                  </h2>

                  <div className="space-y-3.5">
                    {post.faqs.map((faq, idx) => {
                      const isOpen = openFaqIdx === idx;
                      return (
                        <div
                          key={faq.question}
                          className={`rounded-[20px] border transition-all overflow-hidden ${
                            isOpen
                              ? 'border-navy-15 border-l-4 border-l-primary bg-white shadow-soft'
                              : 'border-navy-08 bg-white hover:border-primary-100'
                          }`}
                        >
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                          >
                            <h3
                              className={`text-[16px] sm:text-[17px] font-bold ${
                                isOpen ? 'text-primary' : 'text-navy'
                              }`}
                            >
                              {faq.question}
                            </h3>
                            <span
                              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
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
                            <div className="px-6 pb-5 pt-1 text-[15px] text-navy-70 leading-relaxed border-t border-navy-08/60">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tags Row (outline pills) */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-navy-08 flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-bold text-navy-50 mr-1">
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?q=${encodeURIComponent(tag)}`}
                      className="px-3.5 py-1.5 rounded-full border border-navy-15 text-[12px] font-semibold text-navy-70 hover:border-primary hover:text-primary transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Author Box: White card with large avatar, name, role, bio and LinkedIn icon */}
              <div className="mt-10 bg-white rounded-[20px] p-6 sm:p-8 border border-navy-08 shadow-soft flex flex-col sm:flex-row items-start gap-5">
                <div className="w-16 h-16 rounded-full bg-primary text-white font-extrabold text-[20px] flex items-center justify-center shrink-0 shadow-md">
                  {author.initials}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                        WRITTEN BY
                      </span>
                      <h3 className="text-[20px] font-extrabold text-navy">
                        {author.name}
                      </h3>
                      <p className="text-[13px] font-semibold text-navy-50">
                        {author.role}
                      </p>
                    </div>
                    <a
                      href={author.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${author.name} LinkedIn profile`}
                      className="w-10 h-10 rounded-full border border-navy-15 flex items-center justify-center text-navy-70 hover:border-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-[14px] text-navy-70 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>

              {/* Mobile Compact CTA Card (moves to the end of the article on mobile) */}
              <div className="lg:hidden mt-8 bg-primary text-white rounded-[20px] p-6 shadow-soft">
                <h3 className="text-[20px] font-extrabold mb-2">
                  Have a project in mind?
                </h3>
                <p className="text-[14px] text-white/85 leading-relaxed mb-4">
                  Partner with WebXCode for custom websites, technical SEO &amp; AI
                  automation.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(`Article CTA: ${post.title}`)}
                  className="w-full py-3 px-5 rounded-full bg-white text-navy font-bold text-[14px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* RIGHT COLUMN (Sticky TOC + Compact CTA Card on Desktop) */}
            <aside
              aria-label="Table of contents and consultation"
              className="hidden lg:block lg:col-span-4 lg:sticky lg:top-[140px] space-y-6"
            >
              {/* "On this page" Table of Contents */}
              {tocItems.length > 0 && (
                <nav
                  aria-label="Table of contents"
                  className="bg-white rounded-[20px] p-6 border border-navy-08 shadow-soft"
                >
                  <h3 className="text-[14px] font-extrabold uppercase tracking-wider text-navy mb-4">
                    On this page
                  </h3>
                  <ul className="space-y-1">
                    {tocItems.map((item) => {
                      const isActive = activeHeadingId === item.id;
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => scrollToHeading(item.id)}
                            className={`w-full text-left py-2 pr-3 text-[13px] leading-snug transition-all border-l-2 cursor-pointer ${
                              item.level === 3 ? 'pl-6' : 'pl-3.5'
                            } ${
                              isActive
                                ? 'border-primary text-primary font-bold bg-primary-50/60 rounded-r-lg'
                                : 'border-navy-08 text-navy-70 hover:text-primary hover:border-primary/40 font-medium'
                            }`}
                          >
                            {item.text}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}

              {/* Compact CTA Card (solid #0571c2) */}
              <div className="bg-primary text-white rounded-[20px] p-6 shadow-soft">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[11px] font-bold uppercase tracking-wider mb-3">
                  EXPERT ENGINEERING
                </span>
                <h3 className="text-[20px] font-extrabold leading-snug mb-2">
                  Have a project in mind?
                </h3>
                <p className="text-[13px] text-white/85 leading-relaxed mb-5">
                  Get a custom roadmap and transparent quote from our senior web, SEO
                  &amp; AI architects.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(`Article Sidebar CTA: ${post.title}`)}
                  className="w-full py-3 px-5 rounded-full bg-white text-navy hover:bg-navy hover:text-white font-bold text-[14px] transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Get a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. PREVIOUS / NEXT ARTICLE (white — 2 wide cards side by side)
      ==================================================================== */}
      <section className="bg-white py-12 lg:py-16 border-t border-navy-08">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Previous Article */}
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group bg-white rounded-[20px] p-5 sm:p-6 border border-navy-08 hover:border-primary shadow-soft transition-all flex items-center gap-4"
            >
              <div className="relative w-24 h-20 rounded-[14px] overflow-hidden bg-navy shrink-0">
                <Image
                  src={prevPost.coverImage}
                  alt={prevPost.coverAlt}
                  loading="lazy"
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary mb-1">
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Previous article</span>
                </div>
                <div className="text-[11px] font-semibold text-navy-50 mb-0.5">
                  {prevPost.category}
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-extrabold text-navy group-hover:text-primary transition-colors truncate">
                  {prevPost.title}
                </h3>
              </div>
            </Link>

            {/* Next Article */}
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group bg-white rounded-[20px] p-5 sm:p-6 border border-navy-08 hover:border-primary shadow-soft transition-all flex items-center justify-between gap-4 text-right"
            >
              <div className="min-w-0 flex-1">
                <div className="inline-flex items-center justify-end gap-1.5 text-[12px] font-bold text-primary mb-1">
                  <span>Next article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="text-[11px] font-semibold text-navy-50 mb-0.5">
                  {nextPost.category}
                </div>
                <h3 className="text-[16px] sm:text-[17px] font-extrabold text-navy group-hover:text-primary transition-colors truncate">
                  {nextPost.title}
                </h3>
              </div>
              <div className="relative w-24 h-20 rounded-[14px] overflow-hidden bg-navy shrink-0">
                <Image
                  src={nextPost.coverImage}
                  alt={nextPost.coverAlt}
                  loading="lazy"
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. RELATED ARTICLES (light blue tint — 3 cards)
      ==================================================================== */}
      <section className="bg-primary-50 py-[72px] lg:py-[96px]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white text-primary text-[12px] font-bold uppercase tracking-[0.12em] mb-3 shadow-sm">
                KEEP READING
              </span>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold text-navy leading-[1.14] tracking-tight">
                Related <span className="text-primary">Articles</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary hover:underline"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {relatedPosts.map((rel) => {
              const relAuthor =
                blogAuthors.find((a) => a.id === rel.authorId) || blogAuthors[0];
              return (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group bg-white rounded-[20px] border border-navy-08 shadow-soft hover:shadow-soft-hover hover:border-primary-100 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                      <Image
                        src={rel.coverImage}
                        alt={rel.coverAlt}
                        loading="lazy"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-primary text-[11px] font-bold uppercase tracking-wider shadow-sm">
                        {rel.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-[19px] font-extrabold text-navy group-hover:text-primary transition-colors leading-snug mb-2.5">
                        {rel.title}
                      </h3>
                      <p className="text-[14px] text-navy-70 leading-relaxed line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-navy-08/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[12px] text-navy-50 font-medium">
                      <span className="font-bold text-navy">{relAuthor.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[13px] font-bold text-primary group-hover:translate-x-1 transition-transform">
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. ARTICLE NEWSLETTER + CTA (navy, rounded container — two halves divided by vertical line)
      ==================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="relative rounded-[28px] bg-navy text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
            <div className="absolute -right-20 -top-20 w-[440px] h-[440px] blue-glow-strong pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center relative z-10">
              {/* Left Half: Newsletter */}
              <div className="lg:col-span-6 lg:pr-12">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/35 text-[11px] font-bold uppercase tracking-wider mb-3">
                  MONTHLY INSIGHTS
                </span>
                <h2 className="text-[26px] sm:text-[32px] font-extrabold text-white leading-tight mb-2.5">
                  Enjoyed this <span className="text-primary">article?</span>
                </h2>
                <p className="text-[15px] text-white/75 leading-relaxed mb-6">
                  Get our best web development, SEO, AEO &amp; AI guides delivered
                  straight to your inbox once a month.
                </p>

                {newsletterSubscribed ? (
                  <div className="p-4 rounded-2xl bg-primary/20 border border-primary/40 flex items-center gap-2.5 text-[14px] font-semibold text-white">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>Subscribed! Thank you for joining our readers.</span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleArticleNewsletter}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your work email"
                      aria-label="Email address for article newsletter"
                      className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/50 text-[14px] focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>

              {/* Right Half: Expert Help CTA (divided by vertical line on desktop) */}
              <div className="lg:col-span-6 lg:pl-12 pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/15">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/35 text-[11px] font-bold uppercase tracking-wider mb-3">
                  LET&apos;S COLLABORATE
                </span>
                <h2 className="text-[26px] sm:text-[32px] font-extrabold text-white leading-tight mb-2.5">
                  Need <span className="text-primary">expert help?</span>
                </h2>
                <p className="text-[15px] text-white/75 leading-relaxed mb-6">
                  Talk to the senior engineers and strategists behind this guide to plan
                  your next website, SEO campaign, or AI solution.
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(`Article Footer CTA: ${post.title}`)}
                    className="px-6 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-[14px] transition-colors inline-flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Get a Free Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    href="/contact"
                    className="px-6 py-3.5 rounded-full border border-white/25 hover:border-white hover:bg-white/10 text-white font-bold text-[14px] transition-colors inline-flex items-center gap-2"
                  >
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogPost;
