// Re-export all database types
export type {
  Database,
  Degree,
  DegreeInsert,
  PartnerUniversity,
  Lead,
  LeadInsert,
  FAQ,
  Accreditation,
} from '@/lib/supabase/types';

// UI/Component Types
export interface DegreeCardProps {
  degree: Degree;
  showCompare?: boolean;
  onCompareToggle?: (degreeId: string) => void;
  isInCompare?: boolean;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  currentQualification: string;
  workExperience?: number;
}

export interface FilterState {
  category?: string[];
  stream?: string[];
  duration?: string[];
  budget?: string;
  mode?: string[];
}

// Import the Degree type for use in this file
import type { Degree } from '@/lib/supabase/types';
