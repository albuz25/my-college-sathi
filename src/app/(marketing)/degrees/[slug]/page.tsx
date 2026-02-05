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

  return {
    title: `Online ${degree.name} - ${degree.full_name}`,
    description: degree.meta_description || `Pursue your ${degree.full_name} (${degree.name}) online from UGC-recognized universities. ${degree.duration_text} duration, EMI options available.`,
    alternates: {
      canonical: `/degrees/${slug}`,
    },
    openGraph: {
      title: `Online ${degree.name} Program | My College Sathi`,
      description: `Get ${degree.full_name} from top UGC-recognized universities. Fee: ₹${(degree.fee_range_min/1000).toFixed(0)}K - ₹${(degree.fee_range_max/100000).toFixed(1)}L | Duration: ${degree.duration_text}`,
      type: 'website',
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
