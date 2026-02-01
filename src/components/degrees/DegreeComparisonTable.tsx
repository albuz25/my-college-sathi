'use client';

import { Clock, IndianRupee, GraduationCap, Briefcase, TrendingUp, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDegreeCompareStore } from '@/stores/compareStore';
import type { Degree } from '@/types';

interface DegreeComparisonTableProps {
  degrees: Degree[];
}

export function DegreeComparisonTable({ degrees }: DegreeComparisonTableProps) {
  const { removeFromCompare } = useDegreeCompareStore();

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  if (degrees.length === 0) {
    return (
      <div className="text-center py-12">
        <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-semibold mb-2">No degrees to compare</h3>
        <p className="text-muted-foreground">
          Add at least 2 degrees from the listing page to compare
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header with degree names */}
        <thead>
          <tr>
            <th className="sticky left-0 bg-background p-4 text-left font-semibold border-b w-48">
              Compare
            </th>
            {degrees.map((degree) => (
              <th key={degree.id} className="p-4 border-b min-w-[280px]">
                <div className="text-left">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{degree.name}</h3>
                        <p className="text-sm text-muted-foreground font-normal">
                          {degree.full_name}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCompare(degree.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label={`Remove ${degree.name}`}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Category */}
          <ComparisonRow label="Category" icon={GraduationCap}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                <Badge variant="secondary" className="capitalize">
                  {degree.category}
                </Badge>
              </td>
            ))}
          </ComparisonRow>

          {/* Stream */}
          <ComparisonRow label="Stream" icon={GraduationCap}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                <span className="font-medium">{degree.stream}</span>
              </td>
            ))}
          </ComparisonRow>

          {/* Duration */}
          <ComparisonRow label="Duration" icon={Clock}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                <span className="font-medium">{degree.duration_text}</span>
              </td>
            ))}
          </ComparisonRow>

          {/* Mode */}
          <ComparisonRow label="Mode" icon={GraduationCap}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                <Badge variant="outline" className="capitalize">
                  {degree.mode}
                </Badge>
              </td>
            ))}
          </ComparisonRow>

          {/* Fee Range */}
          <ComparisonRow label="Fee Range" icon={IndianRupee}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                <div>
                  <span className="font-semibold text-lg">
                    {formatCurrency(degree.fee_range_min)} - {formatCurrency(degree.fee_range_max)}
                  </span>
                  <p className="text-xs text-muted-foreground">Varies by university</p>
                </div>
              </td>
            ))}
          </ComparisonRow>

          {/* EMI */}
          <ComparisonRow label="EMI Option" icon={IndianRupee}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                {degree.emi_available && degree.emi_starting ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    From ₹{degree.emi_starting.toLocaleString()}/mo
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">Not available</span>
                )}
              </td>
            ))}
          </ComparisonRow>

          {/* Eligibility */}
          <ComparisonRow label="Eligibility" icon={CheckCircle2}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                <span className="text-sm">{degree.eligibility_criteria}</span>
              </td>
            ))}
          </ComparisonRow>

          {/* Career Paths */}
          <ComparisonRow label="Career Paths" icon={Briefcase}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                {degree.career_paths && degree.career_paths.length > 0 ? (
                  <ul className="space-y-1">
                    {degree.career_paths.slice(0, 4).map((path, index) => (
                      <li key={index} className="text-sm flex items-center gap-1">
                        <span className="w-1 h-1 bg-primary rounded-full" />
                        {path}
                      </li>
                    ))}
                    {degree.career_paths.length > 4 && (
                      <li className="text-xs text-muted-foreground">
                        +{degree.career_paths.length - 4} more
                      </li>
                    )}
                  </ul>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
            ))}
          </ComparisonRow>

          {/* Average Salary */}
          <ComparisonRow label="Avg Salary" icon={TrendingUp}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                {degree.avg_salary_range ? (
                  <span className="font-semibold text-green-600">
                    {degree.avg_salary_range}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
            ))}
          </ComparisonRow>

          {/* Placement Assistance */}
          <ComparisonRow label="Placement Support" icon={CheckCircle2}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                {degree.placement_assistance ? (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Available
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">Not available</span>
                )}
              </td>
            ))}
          </ComparisonRow>

          {/* Highlights */}
          <ComparisonRow label="Highlights" icon={CheckCircle2}>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4 border-b">
                {degree.highlights && degree.highlights.length > 0 ? (
                  <ul className="space-y-1">
                    {degree.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="text-sm flex items-start gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-600 shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
            ))}
          </ComparisonRow>

          {/* CTA Row */}
          <tr>
            <td className="sticky left-0 bg-background p-4"></td>
            {degrees.map((degree) => (
              <td key={degree.id} className="p-4">
                <Button className="w-full">
                  Enquire for {degree.name}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ComparisonRow({ 
  label, 
  icon: Icon, 
  children 
}: { 
  label: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
}) {
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="sticky left-0 bg-background p-4 border-b">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">{label}</span>
        </div>
      </td>
      {children}
    </tr>
  );
}
