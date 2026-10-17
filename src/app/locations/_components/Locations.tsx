'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  MapPin,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  Building2,
  Clock,
  CheckCircle2,
  Globe,
  ArrowUpRight,
} from 'lucide-react';
import { useQuoteModal } from '@/app/_context/QuoteModalProvider';

export interface LocationItem {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  keyHubs: string[];
  stats: { label: string; value: string }[];
}

export const LOCATIONS: LocationItem[] = [
  {
    slug: 'delhi',
    name: 'Delhi NCR',
    state: 'Delhi / National Capital Region',
    tagline: 'Leading Digital Marketing & AI Agency in Delhi NCR',
    description:
      'Powering high-growth startups, corporate headquarters, and D2C brands across Connaught Place, Nehru Place, Okhla, Gurugram, and Noida with bespoke web engineering, technical SEO, and AI automation.',
    address: 'Plot C-24, Sector 62, Noida, Delhi NCR 201309',
    phone: '+91 98765 43210',
    email: 'delhi@webxcode.in',
    keyHubs: ['Connaught Place', 'Nehru Place', 'Okhla', 'South Delhi', 'Aerocity', 'Gurugram', 'Noida'],
    stats: [
      { label: 'Delhi NCR Clients', value: '45+' },
      { label: 'Avg ROI', value: '3.8x' },
      { label: 'On-Ground Support', value: '24/7' },
    ],
  },
  {
    slug: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    tagline: 'Enterprise Web & AI Growth Partner in Mumbai',
    description:
      'Serving BFSI, luxury D2C, entertainment, and modern enterprises in BKC, Lower Parel, Andheri, and South Mumbai with conversion-first web apps and AI workflows.',
    address: 'BKC Financial District, Bandra East, Mumbai, Maharashtra 400051',
    phone: '+91 98765 43210',
    email: 'mumbai@webxcode.in',
    keyHubs: ['BKC', 'Lower Parel', 'Andheri East', 'Nariman Point', 'Powai'],
    stats: [
      { label: 'Enterprises Scaled', value: '30+' },
      { label: 'Pipeline Generated', value: '₹50Cr+' },
      { label: 'Response Time', value: '< 2 hrs' },
    ],
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    tagline: 'Silicon Valley of India Tech & AI Growth Partner',
    description:
      'Architecting hyper-scalable web apps, automated LLM systems, and compounding technical SEO for SaaS founders and tech giants in Koramangala, Indiranagar, and Whitefield.',
    address: 'Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103',
    phone: '+91 98765 43210',
    email: 'bengaluru@webxcode.in',
    keyHubs: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Electronic City'],
    stats: [
      { label: 'Tech & SaaS Builds', value: '60+' },
      { label: 'Sub-2s Web Apps', value: '100%' },
      { label: 'Global Reach', value: '15+ Nations' },
    ],
  },
];

export default function Locations() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="min-h-screen bg-slate-50 text-navy">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-primary-light border border-primary/30 text-xs font-bold uppercase tracking-widest mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Regional Hubs & Local Delivery</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Our Locations Across <span className="text-primary">India & Beyond</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Delivering global-standard web engineering, technical SEO, and AI automation with responsive, local on-ground presence.
          </p>
        </div>
      </section>

      {/* Locations Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.slug}
              className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.state}
                  </span>
                </div>
                <h2 className="text-2xl font-extrabold text-navy mb-2">{loc.name}</h2>
                <p className="text-sm font-semibold text-primary mb-4">{loc.tagline}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{loc.description}</p>

                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100 mb-6 bg-slate-50/70 rounded-xl px-2 text-center">
                  {loc.stats.map((s, idx) => (
                    <div key={idx}>
                      <div className="text-lg font-extrabold text-navy">{s.value}</div>
                      <div className="text-[11px] text-slate-500 font-medium">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span>{loc.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  <span>Explore {loc.name} Hub</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => openQuoteModal(`${loc.name} Office Inquiry`)}
                  className="px-4 py-2 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold transition-all shadow-sm"
                >
                  Consult
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-navy rounded-3xl p-10 sm:p-14 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Need Dedicated On-Ground Support in Your City?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-base sm:text-lg">
            We partner with businesses across tier-1 and tier-2 metros, delivering enterprise SLA guarantees and local account managers.
          </p>
          <button
            type="button"
            onClick={() => openQuoteModal('General Locations Inquiry')}
            className="px-8 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-base transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Request a Local Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
