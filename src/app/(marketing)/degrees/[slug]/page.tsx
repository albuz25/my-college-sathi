import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDegreeBySlug, getDegrees, getGeneralFAQs } from '@/lib/mock-data';
import { DegreeDetailClient } from './DegreeDetailClient';

interface DegreePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DegreePageProps): Promise<Metadata> {
  const { slug } = await params;
  const degree = getDegreeBySlug(slug);
  
  if (!degree) {
    return {
      title: 'Degree Not Found',
    };
  }

  const fallbackTitle = `${degree.full_name} | My College Sathi`;
  const metaTitle = degree.meta_title || fallbackTitle;
  const metaDescription =
    degree.meta_description ||
    `Pursue your ${degree.full_name} (${degree.name}) online from UGC-recognized universities. ${degree.duration_text} duration, EMI options available.`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/degrees/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'website',
      url: `/degrees/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export async function generateStaticParams() {
  const degrees = getDegrees();
  return degrees.map((degree) => ({
    slug: degree.slug,
  }));
}

export default async function DegreePage({ params }: DegreePageProps) {
  const { slug } = await params;
  const degree = getDegreeBySlug(slug);

  if (!degree) {
    notFound();
  }

  // Get similar degrees (same category or stream)
  const allDegrees = getDegrees();
  const similarDegrees = allDegrees
    .filter(d => d.id !== degree.id && (d.category === degree.category || d.stream === degree.stream))
    .slice(0, 3);

  // Get FAQs (general + would be degree-specific in production)
  const faqs = getGeneralFAQs();

  return (
    <DegreeDetailClient 
      degree={degree} 
      similarDegrees={similarDegrees}
      faqs={faqs}
    />
  );
}
