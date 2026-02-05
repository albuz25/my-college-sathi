import { MetadataRoute } from 'next';
import { getDegrees } from '@/lib/mock-data';
import { getAllBlogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mycollegesathi.com';
  
  // Get all active degrees
  const degrees = getDegrees();

  // Generate degree URLs
  const degreeUrls: MetadataRoute.Sitemap = degrees.map((degree) => ({
    url: `${baseUrl}/degrees/${degree.slug}`,
    lastModified: new Date(degree.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Get all blog posts
  const blogPosts = getAllBlogPosts();

  // Generate blog URLs
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/degrees`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  return [...staticPages, ...degreeUrls, ...blogUrls];
}
