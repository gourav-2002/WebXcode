import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '../[slug]/_components/BlogPost';
import { blogPosts, blogAuthors } from '@/app/blog/_components/blogData';

const SLUG = 'how-much-does-a-website-cost-in-india-2026';

export async function generateMetadata(): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === SLUG);
  if (!post) {
    return {
      title: 'Article Not Found | WebXCode',
    };
  }

  const author = blogAuthors.find((a) => a.id === post.authorId);

  return {
    title: `${post.title} | WebXCode Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://webxcode.in/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | WebXCode Blog`,
      description: post.excerpt,
      url: `https://webxcode.in/blog/${post.slug}`,
      siteName: 'WebXCode',
      type: 'article',
      publishedTime: post.publishedIso,
      authors: author ? [author.name] : ['WebXCode'],
      images: [
        {
          url: post.coverImage || '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: post.coverAlt || post.title,
        },
      ],
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | WebXCode Blog`,
      description: post.excerpt,
      images: [post.coverImage || '/og-image.jpg'],
    },
  };
}

export default async function BlogPostPage() {
  const post = blogPosts.find((p) => p.slug === SLUG);
  if (!post) {
    notFound();
  }

  const author = blogAuthors.find((a) => a.id === post.authorId);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://webxcode.in/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    url: `https://webxcode.in/blog/${post.slug}`,
    datePublished: post.publishedIso,
    dateModified: post.updatedIso || post.publishedIso,
    inLanguage: 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://webxcode.in/blog/${post.slug}`,
    },
    image: {
      '@type': 'ImageObject',
      url: post.coverImage.startsWith('http')
        ? post.coverImage
        : `https://webxcode.in${post.coverImage}`,
    },
    author: {
      '@type': 'Person',
      name: author?.name || 'WebXCode Team',
      jobTitle: author?.role || 'Digital Specialist',
    },
    publisher: {
      '@type': 'Organization',
      name: 'WebXCode',
      url: 'https://webxcode.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://webxcode.in/icon.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPost slug={SLUG} />
    </>
  );
}
