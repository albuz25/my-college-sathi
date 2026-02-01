'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ArrowRight, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDegreeCompareStore } from '@/stores/compareStore';
import { getDegrees } from '@/lib/mock-data';
import type { Degree } from '@/types';

export function CompareBasketBar() {
  const { selectedDegreeIds, removeFromCompare, clearCompare } = useDegreeCompareStore();
  const [mounted, setMounted] = useState(false);
  const [degrees, setDegrees] = useState<Degree[]>([]);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch degrees when selectedDegreeIds changes
  useEffect(() => {
    if (mounted && selectedDegreeIds.length > 0) {
      const allDegrees = getDegrees();
      const selected = allDegrees.filter(d => selectedDegreeIds.includes(d.id));
      setDegrees(selected);
    } else {
      setDegrees([]);
    }
  }, [selectedDegreeIds, mounted]);

  // Don't render anything during SSR or if no degrees selected
  if (!mounted || selectedDegreeIds.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 transform transition-transform duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Selected Degrees */}
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="text-sm font-medium text-muted-foreground shrink-0">
              Compare ({selectedDegreeIds.length}/3):
            </span>
            
            <div className="flex gap-2">
              {degrees.map((degree) => (
                <div 
                  key={degree.id}
                  className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-full shrink-0"
                >
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{degree.name}</span>
                  <button
                    onClick={() => removeFromCompare(degree.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label={`Remove ${degree.name} from compare`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: 3 - selectedDegreeIds.length }).map((_, index) => (
                <div 
                  key={`empty-${index}`}
                  className="flex items-center gap-2 border-2 border-dashed border-muted-foreground/30 px-3 py-1.5 rounded-full shrink-0"
                >
                  <span className="text-sm text-muted-foreground">Add degree</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearCompare}
            >
              Clear All
            </Button>
            <Button 
              asChild 
              disabled={selectedDegreeIds.length < 2}
              className={selectedDegreeIds.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}
            >
              <Link href={`/compare?degrees=${selectedDegreeIds.join(',')}`}>
                Compare Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
