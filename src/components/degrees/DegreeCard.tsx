'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, IndianRupee, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useDegreeCompareStore } from '@/stores/compareStore';
import { LeadMagnetForm } from '@/components/leads/LeadMagnetForm';
import type { Degree } from '@/types';

interface DegreeCardProps {
  degree: Degree;
  showCompare?: boolean;
}

export function DegreeCard({ degree, showCompare = true }: DegreeCardProps) {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useDegreeCompareStore();
  
  const inCompare = isInCompare(degree.id);
  
  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(degree.id);
    } else if (canAddMore()) {
      addToCompare(degree.id);
    }
  };
  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {degree.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {degree.full_name}
              </p>
            </div>
          </div>
          {degree.is_featured && (
            <Badge variant="secondary" className="shrink-0">Featured</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Key Info */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {degree.duration_text}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {degree.category}
          </Badge>
          <Badge variant="outline">
            {degree.stream}
          </Badge>
        </div>

        {/* Fee Range */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-lg font-semibold">
            <IndianRupee className="h-4 w-4" />
            <span>{formatCurrency(degree.fee_range_min)} - {formatCurrency(degree.fee_range_max)}</span>
          </div>
          <p className="text-xs text-muted-foreground">Varies by university</p>
          {degree.emi_available && degree.emi_starting && (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              EMI from ₹{degree.emi_starting.toLocaleString()}/mo
            </Badge>
          )}
        </div>

        {/* Eligibility */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
          <span className="line-clamp-2">{degree.eligibility_criteria}</span>
        </div>

        {/* Highlights */}
        {degree.highlights && degree.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {degree.highlights.slice(0, 2).map((highlight, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-muted rounded-full"
              >
                {highlight}
              </span>
            ))}
            {degree.highlights.length > 2 && (
              <span className="text-xs px-2 py-1 text-muted-foreground">
                +{degree.highlights.length - 2} more
              </span>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-4 border-t">
        {showCompare && (
          <div className="flex items-center gap-2 w-full">
            <Checkbox 
              id={`compare-${degree.id}`}
              checked={inCompare}
              onCheckedChange={handleCompareToggle}
              disabled={!inCompare && !canAddMore()}
            />
            <label 
              htmlFor={`compare-${degree.id}`} 
              className={`text-sm cursor-pointer ${!inCompare && !canAddMore() ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}
            >
              {inCompare ? 'Added to compare' : 'Add to compare'}
            </label>
          </div>
        )}
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/degrees/${degree.slug}`}>Know More</Link>
          </Button>
          <Button 
            className="flex-1"
            onClick={() => setShowEnquiryForm(true)}
          >
            Enquire Now
          </Button>
        </div>
      </CardFooter>

      {/* Enquiry Form Modal */}
      <LeadMagnetForm
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        degreeName={degree.name}
        degreeId={degree.id}
        source="degree_card"
        variant="enquiry"
      />
    </Card>
  );
}
