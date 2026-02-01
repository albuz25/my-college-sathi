'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { getPartnerUniversities } from '@/lib/mock-data';
import type { PartnerUniversity, Accreditation } from '@/types';

interface PartnerUniversitiesSectionProps {
  universities?: PartnerUniversity[];
  title?: string;
  showCount?: boolean;
}

export function PartnerUniversitiesSection({ 
  universities,
  title = "Our Partner Universities",
  showCount = true 
}: PartnerUniversitiesSectionProps) {
  const unis = universities || getPartnerUniversities();
  const looped = [...unis, ...unis];

  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {showCount && (
            <p className="text-muted-foreground">
              {unis.length}+ UGC-Recognized Universities
            </p>
          )}
        </div>

        {/* Auto-scrolling marquee (right-to-left loop) */}
        <div className="relative overflow-hidden">
          {/* Soft edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10" />

          <div className="flex w-max gap-6 animate-mcs-marquee">
            {looped.map((university, index) => (
              <div
                key={`${university.id}-${index}`}
                className="shrink-0 w-[160px] sm:w-[180px] md:w-[200px]"
              >
                <UniversityCard university={university} />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Badge variant="outline" className="text-sm py-1.5 px-3">
            UGC Recognized
          </Badge>
          <Badge variant="outline" className="text-sm py-1.5 px-3">
            NAAC Accredited
          </Badge>
          <Badge variant="outline" className="text-sm py-1.5 px-3">
            AICTE Approved
          </Badge>
          <Badge variant="outline" className="text-sm py-1.5 px-3">
            100% Valid Degrees
          </Badge>
        </div>
      </div>
    </section>
  );
}

function UniversityCard({ university }: { university: PartnerUniversity }) {
  const accreditations = university.accreditations as Accreditation[];
  const [logoFailed, setLogoFailed] = useState(false);
  const showLogo = Boolean(university.logo_url) && !logoFailed;
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-center">
      {/* Logo */}
      <div
        className={`w-20 h-20 mx-auto mb-3 rounded-lg flex items-center justify-center overflow-hidden ${
          showLogo ? 'bg-transparent' : 'bg-gradient-to-br from-primary/20 to-primary/5'
        }`}
      >
        {showLogo ? (
          // Use <img> so we can reliably fallback on load error
          <img
            src={university.logo_url}
            alt={university.short_name || university.name}
            className="w-full h-full object-contain p-1"
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="text-xl font-bold text-primary">
            {university.short_name?.slice(0, 2) || university.name.slice(0, 2)}
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-sm mb-2 line-clamp-2">
        {university.short_name || university.name}
      </h3>
      
      {/* Accreditation Badges */}
      <div className="flex flex-wrap justify-center gap-1">
        {accreditations.slice(0, 2).map((acc, index) => (
          <Badge 
            key={index} 
            variant="secondary" 
            className="text-xs px-1.5 py-0"
          >
            {acc.type}{acc.grade ? ` ${acc.grade}` : ''}
          </Badge>
        ))}
      </div>
      
      {university.established_year && (
        <p className="text-xs text-muted-foreground mt-2">
          Est. {university.established_year}
        </p>
      )}
    </div>
  );
}
