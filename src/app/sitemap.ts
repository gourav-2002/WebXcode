import type { MetadataRoute } from 'next';
import { blogPosts } from './blog/_components/blogData';

const BASE_URL = 'https://webxcode.in';

const LOCATION_SLUGS = ['delhi', 'mumbai', 'bengaluru'];

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'daily' },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/our-work', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'daily' },

  { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/services/website-development', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/ecommerce-development', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/mobile-app-development', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/wordpress-shopify-development', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/website-maintenance-support', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/seo-services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/local-seo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/aeo-services', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/geo-generative-engine-optimization', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/google-ads-sem', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/performance-marketing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/conversion-rate-optimization', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/email-marketing', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/analytics-tracking-setup', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/branding-logo-design', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/copywriting', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/creative-communication', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/services/managed-it-services', priority: 0.7, changeFrequency: 'monthly' },

  { path: '/ai-solutions', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/ai-solutions/ai-chatbot-development', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/whatsapp-ai-chatbot', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/ai-voice-agents', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/ai-agents-for-business', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/ai-workflow-automation', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/crm-lead-automation', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/custom-ai-llm-integration', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/ai-powered-seo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/ai-content-creation', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/ai-ad-creatives', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/ai-generated-videos', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ai-solutions/ai-analytics-reporting', priority: 0.8, changeFrequency: 'monthly' },

  { path: '/industries', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/industries/b2b-saas', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/ecommerce', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/healthcare', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/finance-fintech', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/education-edtech', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/travel-hospitality', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/manufacturing-industrial', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/fashion-lifestyle', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/skincare-beauty', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/home-decor-furniture', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/industries/interior-design-architecture', priority: 0.7, changeFrequency: 'monthly' },

  { path: '/locations', priority: 0.8, changeFrequency: 'monthly' },

  { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms-conditions', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedIso ?? post.publishedIso),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const locationEntries: MetadataRoute.Sitemap = LOCATION_SLUGS.map((slug) => ({
    url: `${BASE_URL}/locations/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries, ...locationEntries];
}
