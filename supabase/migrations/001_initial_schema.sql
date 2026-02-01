-- =============================================
-- MY COLLEGE SATHI - DATABASE SCHEMA
-- =============================================

-- =============================================
-- DEGREES TABLE (PRIMARY ENTITY)
-- =============================================
CREATE TABLE IF NOT EXISTS degrees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Core Identity
  name TEXT NOT NULL,                    -- "MBA"
  full_name TEXT NOT NULL,               -- "Master of Business Administration"
  slug TEXT UNIQUE NOT NULL,             -- "mba", "online-mba"
  description TEXT,                      -- Rich text description
  icon_url TEXT,                         -- Icon for degree card
  banner_image TEXT,                     -- Hero image for detail page
  
  -- Category
  category TEXT NOT NULL CHECK (category IN ('undergraduate', 'postgraduate', 'diploma', 'certificate')),
  stream TEXT NOT NULL,                  -- 'Management', 'Technology', 'Commerce', 'Arts'
  
  -- Duration & Format
  duration_months INTEGER NOT NULL,      -- 24
  duration_text TEXT NOT NULL,           -- "2 Years"
  mode TEXT DEFAULT 'online' CHECK (mode IN ('online', 'distance', 'hybrid')),
  
  -- Fee Range (varies by university)
  fee_range_min INTEGER NOT NULL,        -- 80000
  fee_range_max INTEGER NOT NULL,        -- 250000
  emi_available BOOLEAN DEFAULT true,
  emi_starting INTEGER,                  -- 4999 (per month)
  
  -- Eligibility
  eligibility_criteria TEXT,             -- "Graduation with 50% marks"
  min_qualification TEXT,                -- 'graduate', '12th_pass'
  work_experience_required BOOLEAN DEFAULT false,
  min_work_experience INTEGER,           -- Years (for MBA etc.)
  
  -- Career Outcomes
  career_paths TEXT[],                   -- ["Marketing Manager", "Finance Analyst"]
  avg_salary_range TEXT,                 -- "6-15 LPA"
  top_recruiters TEXT[],                 -- ["TCS", "Infosys", "Wipro"]
  placement_assistance BOOLEAN DEFAULT true,
  
  -- Content
  highlights TEXT[],                     -- Key USPs
  syllabus_overview TEXT,                -- Summary of curriculum
  brochure_url TEXT,                     -- Generic degree brochure PDF
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Display
  is_featured BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- PARTNER UNIVERSITIES TABLE (FOR DISPLAY ONLY)
-- =============================================
CREATE TABLE IF NOT EXISTS partner_universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Core Identity
  name TEXT NOT NULL,                    -- "Manipal University Online"
  short_name TEXT,                       -- "Manipal"
  logo_url TEXT NOT NULL,                -- Logo for display
  website_url TEXT,
  
  -- Accreditations (stored as JSONB for flexibility)
  accreditations JSONB DEFAULT '[]',     -- [{"type": "NAAC", "grade": "A+"}, {"type": "UGC"}]
  established_year INTEGER,
  
  -- Display
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- LEADS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Contact Info
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  current_city TEXT,
  
  -- Educational Background
  current_qualification TEXT,            -- "Graduate", "12th Pass", "Working Professional"
  work_experience INTEGER,               -- Years
  
  -- Interest (DEGREE-BASED)
  interested_degree_id UUID REFERENCES degrees(id) ON DELETE SET NULL,
  interested_degree_name TEXT,           -- Denormalized for quick access
  
  -- Source Tracking
  source TEXT,                           -- "degree_page", "compare_page", "home_enquiry"
  page_url TEXT,                         -- URL where lead was captured
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Counsellor Assignment (filled after initial contact)
  assigned_university_id UUID REFERENCES partner_universities(id) ON DELETE SET NULL,
  counsellor_notes TEXT,
  
  -- Status
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- FAQS TABLE (per degree)
-- =============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree_id UUID REFERENCES degrees(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX IF NOT EXISTS idx_degrees_slug ON degrees(slug);
CREATE INDEX IF NOT EXISTS idx_degrees_category ON degrees(category);
CREATE INDEX IF NOT EXISTS idx_degrees_stream ON degrees(stream);
CREATE INDEX IF NOT EXISTS idx_degrees_active ON degrees(is_active);
CREATE INDEX IF NOT EXISTS idx_degrees_featured ON degrees(is_featured) WHERE is_featured = true;

CREATE INDEX IF NOT EXISTS idx_partner_universities_active ON partner_universities(is_active);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_degree ON leads(interested_degree_id);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_faqs_degree ON faqs(degree_id);

-- =============================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
DROP TRIGGER IF EXISTS update_degrees_updated_at ON degrees;
CREATE TRIGGER update_degrees_updated_at
    BEFORE UPDATE ON degrees
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partner_universities_updated_at ON partner_universities;
CREATE TRIGGER update_partner_universities_updated_at
    BEFORE UPDATE ON partner_universities
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
