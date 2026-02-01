'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Share2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DegreeComparisonTable } from '@/components/degrees/DegreeComparisonTable';
import { PartnerUniversitiesSection } from '@/components/partners/PartnerUniversitiesSection';
import { useDegreeCompareStore } from '@/stores/compareStore';
import { getDegrees } from '@/lib/mock-data';
import type { Degree } from '@/types';

function ComparePageContent() {
  const searchParams = useSearchParams();
  const { selectedDegreeIds } = useDegreeCompareStore();
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if degrees are passed in URL or use store
    const urlDegrees = searchParams.get('degrees');
    const idsToUse = urlDegrees ? urlDegrees.split(',') : selectedDegreeIds;

    if (idsToUse.length > 0) {
      const allDegrees = getDegrees();
      const selected = allDegrees.filter(d => idsToUse.includes(d.id));
      setDegrees(selected);
    }
  }, [searchParams, selectedDegreeIds, mounted]);

  const handleShare = async () => {
    const url = `${window.location.origin}/compare?degrees=${degrees.map(d => d.id).join(',')}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Compare Degrees - My College Sathi',
          text: `Compare ${degrees.map(d => d.name).join(' vs ')} online degrees`,
          url,
        });
      } catch {
        // User cancelled or share failed, copy to clipboard instead
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-background py-8 border-b">
        <div className="container mx-auto px-4">
          <Link 
            href="/degrees" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Degrees
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Compare Degrees</h1>
              <p className="text-muted-foreground">
                {degrees.length > 0 
                  ? `Comparing ${degrees.map(d => d.name).join(' vs ')}`
                  : 'Select degrees from the listing page to compare'
                }
              </p>
            </div>

            <div className="flex gap-2">
              {degrees.length >= 2 && (
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Comparison
                </Button>
              )}
              {degrees.length < 3 && (
                <Button asChild variant="outline">
                  <Link href="/degrees">
                    <Plus className="h-4 w-4 mr-2" />
                    Add More
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {degrees.length === 0 ? (
            <EmptyState />
          ) : degrees.length === 1 ? (
            <SingleDegreeState degreeName={degrees[0].name} />
          ) : (
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <DegreeComparisonTable degrees={degrees} />
            </div>
          )}
        </div>
      </section>

      {/* Partner Universities */}
      <PartnerUniversitiesSection />
    </>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">📊</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">No Degrees Selected</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Add at least 2 degrees to your compare list from the degrees page to see a side-by-side comparison.
      </p>
      <Button asChild size="lg">
        <Link href="/degrees">
          Browse Degrees
        </Link>
      </Button>
    </div>
  );
}

function SingleDegreeState({ degreeName }: { degreeName: string }) {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">☝️</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">Add One More Degree</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        You have selected <strong>{degreeName}</strong>. Add at least one more degree to compare them side by side.
      </p>
      <Button asChild size="lg">
        <Link href="/degrees">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Degree
        </Link>
      </Button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
        <div className="h-96 bg-muted rounded"></div>
      </div>
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function ComparePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ComparePageContent />
    </Suspense>
  );
}
