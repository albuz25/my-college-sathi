export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Accreditation = {
  type: 'NAAC' | 'UGC' | 'AICTE' | 'NIRF' | 'WES' | 'AIU';
  grade?: string;
};

export interface Database {
  public: {
    Tables: {
      degrees: {
        Row: {
          id: string;
          name: string;
          full_name: string;
          slug: string;
          description: string | null;
          icon_url: string | null;
          banner_image: string | null;
          category: 'undergraduate' | 'postgraduate' | 'diploma' | 'certificate';
          stream: string;
          duration_months: number;
          duration_text: string;
          mode: 'online' | 'distance' | 'hybrid';
          fee_range_min: number;
          fee_range_max: number;
          emi_available: boolean;
          emi_starting: number | null;
          eligibility_criteria: string | null;
          min_qualification: string | null;
          work_experience_required: boolean;
          min_work_experience: number | null;
          career_paths: string[] | null;
          avg_salary_range: string | null;
          top_recruiters: string[] | null;
          placement_assistance: boolean;
          highlights: string[] | null;
          syllabus_overview: string | null;
          brochure_url: string | null;
          meta_title: string | null;
          meta_description: string | null;
          is_featured: boolean;
          is_popular: boolean;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          full_name: string;
          slug: string;
          description?: string | null;
          icon_url?: string | null;
          banner_image?: string | null;
          category: 'undergraduate' | 'postgraduate' | 'diploma' | 'certificate';
          stream: string;
          duration_months: number;
          duration_text: string;
          mode?: 'online' | 'distance' | 'hybrid';
          fee_range_min: number;
          fee_range_max: number;
          emi_available?: boolean;
          emi_starting?: number | null;
          eligibility_criteria?: string | null;
          min_qualification?: string | null;
          work_experience_required?: boolean;
          min_work_experience?: number | null;
          career_paths?: string[] | null;
          avg_salary_range?: string | null;
          top_recruiters?: string[] | null;
          placement_assistance?: boolean;
          highlights?: string[] | null;
          syllabus_overview?: string | null;
          brochure_url?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          is_featured?: boolean;
          is_popular?: boolean;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          full_name?: string;
          slug?: string;
          description?: string | null;
          icon_url?: string | null;
          banner_image?: string | null;
          category?: 'undergraduate' | 'postgraduate' | 'diploma' | 'certificate';
          stream?: string;
          duration_months?: number;
          duration_text?: string;
          mode?: 'online' | 'distance' | 'hybrid';
          fee_range_min?: number;
          fee_range_max?: number;
          emi_available?: boolean;
          emi_starting?: number | null;
          eligibility_criteria?: string | null;
          min_qualification?: string | null;
          work_experience_required?: boolean;
          min_work_experience?: number | null;
          career_paths?: string[] | null;
          avg_salary_range?: string | null;
          top_recruiters?: string[] | null;
          placement_assistance?: boolean;
          highlights?: string[] | null;
          syllabus_overview?: string | null;
          brochure_url?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          is_featured?: boolean;
          is_popular?: boolean;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      partner_universities: {
        Row: {
          id: string;
          name: string;
          short_name: string | null;
          logo_url: string;
          website_url: string | null;
          accreditations: Accreditation[];
          established_year: number | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          short_name?: string | null;
          logo_url: string;
          website_url?: string | null;
          accreditations?: Accreditation[];
          established_year?: number | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          short_name?: string | null;
          logo_url?: string;
          website_url?: string | null;
          accreditations?: Accreditation[];
          established_year?: number | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string | null;
          current_city: string | null;
          current_qualification: string | null;
          work_experience: number | null;
          interested_degree_id: string | null;
          interested_degree_name: string | null;
          source: string | null;
          page_url: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          assigned_university_id: string | null;
          counsellor_notes: string | null;
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email?: string | null;
          current_city?: string | null;
          current_qualification?: string | null;
          work_experience?: number | null;
          interested_degree_id?: string | null;
          interested_degree_name?: string | null;
          source?: string | null;
          page_url?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          assigned_university_id?: string | null;
          counsellor_notes?: string | null;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          current_city?: string | null;
          current_qualification?: string | null;
          work_experience?: number | null;
          interested_degree_id?: string | null;
          interested_degree_name?: string | null;
          source?: string | null;
          page_url?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          assigned_university_id?: string | null;
          counsellor_notes?: string | null;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      faqs: {
        Row: {
          id: string;
          degree_id: string | null;
          question: string;
          answer: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          degree_id?: string | null;
          question: string;
          answer: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          degree_id?: string | null;
          question?: string;
          answer?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Helper types for easier usage
export type Degree = Database['public']['Tables']['degrees']['Row'];
export type DegreeInsert = Database['public']['Tables']['degrees']['Insert'];
export type PartnerUniversity = Database['public']['Tables']['partner_universities']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type FAQ = Database['public']['Tables']['faqs']['Row'];
