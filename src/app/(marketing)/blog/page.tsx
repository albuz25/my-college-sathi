import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import { getAllBlogPosts, getBlogCategories } from '@/lib/blog-data';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Education Blog - Online Degree Guides & Career Tips',
  description: 'Expert guides on online degrees, career opportunities, MBA vs regular degrees, financing education, and UGC recognition. Free career counselling tips and education resources.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Education Blog | My College Sathi',
    description: 'Expert guides on online degrees, career planning, and higher education in India.',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getBlogCategories();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Education Blog - Online Degree Guides
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Expert insights on online education, career planning, degree comparisons, and financial planning. 
            Everything you need to make informed decisions about your higher education.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground">Categories:</span>
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}>
                {category}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card"
            >
              {/* Category Badge */}
              <div className="p-4 pb-0">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTimeMinutes} min read
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <Button variant="ghost" size="sm" asChild className="w-full">
                  <Link href={`/blog/${post.slug}`}>
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Start Your Online Degree Journey?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get personalized guidance from our education counselors. We'll help you choose the right degree program for your career goals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/degrees">
                Explore Degrees
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white hover:bg-white/90" asChild>
              <Link href="/degrees#enquire">
                Get Free Counselling
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
