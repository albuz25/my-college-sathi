import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calendar, Tag, User, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogPostBySlug, getAllBlogPosts, getRecentBlogPosts } from '@/lib/blog-data';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/blog/ShareButton';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentBlogPosts(3).filter(p => p.slug !== slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            author: {
              '@type': 'Organization',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'My College Sathi',
              logo: {
                '@type': 'ImageObject',
                url: 'https://mycollegesathi.com/images/mycollegelogo.png',
              },
            },
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://mycollegesathi.com/blog/${slug}`,
            },
            keywords: post.tags.join(', '),
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-background py-8 border-b">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { name: 'Blog', url: '/blog' },
              { name: post.title, url: `/blog/${slug}` },
            ]}
          />

          {/* Back Button */}
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTimeMinutes} min read
            </div>
            <ShareButton title={post.title} text={post.excerpt} />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-muted px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
              prose-p:mb-4 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
              prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg
              prose-table:border prose-table:border-border prose-table:my-6
              prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2
              prose-td:border prose-td:border-border prose-td:p-2"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map((relatedPost) => (
                <article
                  key={relatedPost.slug}
                  className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold mt-3 mb-2 line-clamp-2">
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="hover:text-primary"
                    >
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {relatedPost.readTimeMinutes} min read
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Help Choosing the Right Degree?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Our education counselors are here to guide you. Get personalized recommendations based on your career goals and budget.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/degrees">
                Explore All Degrees
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
