import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background decorative ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary-100 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Error 404 • Lost in Cyberspace
        </div>

        {/* 404 Visual Heading */}
        <div className="relative select-none my-2">
          <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tight text-navy/10 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy">
              Page Not Found
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-base sm:text-lg text-navy-70 max-w-lg mx-auto leading-relaxed">
          The link you clicked might be broken, outdated, or the page may have shifted into another dimension. Let&apos;s get you back on track.
        </p>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary-700 transition-all duration-200 shadow-soft hover:shadow-soft-hover"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Return to Homepage
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-navy-15 text-navy font-semibold text-sm hover:border-primary hover:text-primary transition-all duration-200 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Explore Services
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-8 text-navy font-semibold text-sm hover:bg-navy-15 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Contact Support
          </Link>
        </div>

        {/* Helpful navigation suggestions */}
        <div className="mt-12 pt-8 border-t border-navy-8">
          <p className="text-xs uppercase tracking-wider font-semibold text-navy-50 mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-navy-70">
            <Link href="/ai-solutions" className="hover:text-primary transition-colors">
              AI Solutions
            </Link>
            <span className="text-navy-15">•</span>
            <Link href="/our-work" className="hover:text-primary transition-colors">
              Case Studies
            </Link>
            <span className="text-navy-15">•</span>
            <Link href="/industries" className="hover:text-primary transition-colors">
              Industries
            </Link>
            <span className="text-navy-15">•</span>
            <Link href="/blog" className="hover:text-primary transition-colors">
              Insights & Blog
            </Link>
            <span className="text-navy-15">•</span>
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
