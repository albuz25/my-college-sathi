-- =============================================
-- SEED DATA FOR MY COLLEGE SATHI
-- =============================================

-- Clear existing data (for development)
TRUNCATE degrees, partner_universities, leads, faqs CASCADE;

-- =============================================
-- DEGREES
-- =============================================
INSERT INTO degrees (name, full_name, slug, category, stream, duration_months, duration_text, mode, fee_range_min, fee_range_max, emi_available, emi_starting, eligibility_criteria, min_qualification, work_experience_required, career_paths, avg_salary_range, top_recruiters, placement_assistance, highlights, is_featured, is_popular, display_order, is_active) VALUES

-- Postgraduate - Management
('MBA', 'Master of Business Administration', 'mba', 'postgraduate', 'Management', 24, '2 Years', 'online', 80000, 250000, true, 4999, 'Graduation with 50% marks from a recognized university', 'graduate', false, 
 ARRAY['Marketing Manager', 'Finance Analyst', 'HR Manager', 'Operations Manager', 'Business Consultant', 'Product Manager'],
 '6-15 LPA', 
 ARRAY['TCS', 'Infosys', 'Wipro', 'Accenture', 'Deloitte', 'Amazon', 'Flipkart'],
 true,
 ARRAY['UGC-Recognized Universities', 'Industry-Relevant Curriculum', '100% Online Learning', 'Placement Assistance', 'EMI Options Available'],
 true, true, 1, true),

('PGDM', 'Post Graduate Diploma in Management', 'pgdm', 'postgraduate', 'Management', 24, '2 Years', 'online', 100000, 300000, true, 5999, 'Graduation with 50% marks from a recognized university', 'graduate', false,
 ARRAY['Business Manager', 'Strategy Consultant', 'Operations Head', 'Marketing Director'],
 '8-18 LPA',
 ARRAY['McKinsey', 'BCG', 'Bain', 'KPMG', 'EY', 'PwC'],
 true,
 ARRAY['AICTE Approved', 'Global Recognition', 'Case Study Based Learning', 'Industry Connect Programs'],
 true, false, 2, true),

-- Postgraduate - Technology
('MCA', 'Master of Computer Applications', 'mca', 'postgraduate', 'Technology', 24, '2 Years', 'online', 70000, 200000, true, 4499, 'BCA/B.Sc (CS/IT) with 50% marks or equivalent', 'graduate', false,
 ARRAY['Software Developer', 'System Analyst', 'Database Administrator', 'Cloud Engineer', 'DevOps Engineer'],
 '5-12 LPA',
 ARRAY['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'HCL'],
 true,
 ARRAY['Latest Technology Stack', 'Hands-on Projects', 'Industry Certifications', 'Virtual Labs'],
 true, true, 3, true),

('M.Sc IT', 'Master of Science in Information Technology', 'msc-it', 'postgraduate', 'Technology', 24, '2 Years', 'online', 60000, 180000, true, 3999, 'Graduation in relevant field with 50% marks', 'graduate', false,
 ARRAY['IT Manager', 'Data Scientist', 'Cybersecurity Analyst', 'AI/ML Engineer'],
 '5-14 LPA',
 ARRAY['IBM', 'Cisco', 'Oracle', 'SAP', 'Capgemini'],
 true,
 ARRAY['Research-Oriented', 'Specialization Options', 'Industry Partnerships'],
 false, false, 4, true),

-- Postgraduate - Commerce
('M.Com', 'Master of Commerce', 'mcom', 'postgraduate', 'Commerce', 24, '2 Years', 'online', 40000, 120000, true, 2999, 'B.Com or equivalent with 50% marks', 'graduate', false,
 ARRAY['Accountant', 'Financial Analyst', 'Tax Consultant', 'Auditor', 'Banking Professional'],
 '4-10 LPA',
 ARRAY['Deloitte', 'EY', 'KPMG', 'PwC', 'HDFC Bank', 'ICICI Bank'],
 true,
 ARRAY['CA/CMA Foundation', 'Practical Accounting', 'GST & Taxation'],
 false, true, 5, true),

-- Undergraduate - Management
('BBA', 'Bachelor of Business Administration', 'bba', 'undergraduate', 'Management', 36, '3 Years', 'online', 60000, 180000, true, 3499, '12th Pass with 50% marks from any stream', '12th_pass', false,
 ARRAY['Business Analyst', 'Marketing Executive', 'Sales Manager', 'HR Executive', 'Operations Trainee'],
 '3-8 LPA',
 ARRAY['Reliance', 'Tata', 'Aditya Birla', 'Mahindra', 'L&T'],
 true,
 ARRAY['Foundation for MBA', 'Industry Exposure', 'Internship Opportunities', 'Soft Skills Development'],
 true, true, 6, true),

-- Undergraduate - Technology
('BCA', 'Bachelor of Computer Applications', 'bca', 'undergraduate', 'Technology', 36, '3 Years', 'online', 50000, 150000, true, 2999, '12th Pass with Mathematics', '12th_pass', false,
 ARRAY['Junior Developer', 'IT Support Engineer', 'Web Developer', 'QA Tester'],
 '3-6 LPA',
 ARRAY['Cognizant', 'Tech Mahindra', 'Mindtree', 'Mphasis', 'Hexaware'],
 true,
 ARRAY['Programming Fundamentals', 'Web Technologies', 'Database Management', 'Gateway to MCA'],
 true, true, 7, true),

('B.Sc IT', 'Bachelor of Science in Information Technology', 'bsc-it', 'undergraduate', 'Technology', 36, '3 Years', 'online', 45000, 130000, true, 2799, '12th Pass with Science/Mathematics', '12th_pass', false,
 ARRAY['System Administrator', 'Network Engineer', 'Technical Support', 'Junior Programmer'],
 '3-5 LPA',
 ARRAY['Wipro', 'HCL', 'LTI', 'Persistent'],
 true,
 ARRAY['Science + Technology Blend', 'Practical Labs', 'Industry Relevant'],
 false, false, 8, true),

-- Undergraduate - Commerce
('B.Com', 'Bachelor of Commerce', 'bcom', 'undergraduate', 'Commerce', 36, '3 Years', 'online', 30000, 90000, true, 1999, '12th Pass with 50% marks (Commerce preferred)', '12th_pass', false,
 ARRAY['Accountant', 'Bank Clerk', 'Tax Assistant', 'Audit Trainee'],
 '2.5-5 LPA',
 ARRAY['SBI', 'Bank of Baroda', 'Axis Bank', 'Yes Bank'],
 true,
 ARRAY['Foundation for CA/CMA', 'Accounts & Finance Focus', 'Banking Sector Ready'],
 false, true, 9, true),

-- Undergraduate - Arts
('BA', 'Bachelor of Arts', 'ba', 'undergraduate', 'Arts', 36, '3 Years', 'online', 25000, 80000, true, 1599, '12th Pass with 45% marks from any stream', '12th_pass', false,
 ARRAY['Content Writer', 'Social Worker', 'Government Jobs', 'Teaching'],
 '2-4 LPA',
 ARRAY['NGOs', 'Media Houses', 'Publishing Companies'],
 true,
 ARRAY['Flexible Subjects', 'Foundation for Civil Services', 'Low Fees'],
 false, false, 10, true),

-- Postgraduate - Arts
('MA', 'Master of Arts', 'ma', 'postgraduate', 'Arts', 24, '2 Years', 'online', 35000, 100000, true, 2499, 'Graduation in relevant field with 50% marks', 'graduate', false,
 ARRAY['Professor', 'Research Analyst', 'Policy Maker', 'Journalist'],
 '3-8 LPA',
 ARRAY['Universities', 'Think Tanks', 'Media Organizations'],
 true,
 ARRAY['Specializations Available', 'Research Focused', 'Academic Career Path'],
 false, false, 11, true);

-- =============================================
-- PARTNER UNIVERSITIES
-- =============================================
INSERT INTO partner_universities (name, short_name, logo_url, website_url, accreditations, established_year, display_order, is_active) VALUES
('Manipal University Online', 'Manipal', '/images/universities/manipal.png', 'https://www.manipal.edu', '[{"type": "NAAC", "grade": "A+"}, {"type": "UGC"}, {"type": "NIRF"}]'::jsonb, 1953, 1, true),
('Amity University Online', 'Amity', '/images/universities/amity.png', 'https://www.amity.edu', '[{"type": "NAAC", "grade": "A+"}, {"type": "UGC"}, {"type": "AICTE"}]'::jsonb, 2005, 2, true),
('Jain University Online', 'Jain', '/images/universities/jain.png', 'https://www.jainuniversity.ac.in', '[{"type": "NAAC", "grade": "A"}, {"type": "UGC"}]'::jsonb, 1990, 3, true),
('Chandigarh University Online', 'CU', '/images/universities/chandigarh.png', 'https://www.cuchd.in', '[{"type": "NAAC", "grade": "A+"}, {"type": "UGC"}, {"type": "NIRF"}]'::jsonb, 2012, 4, true),
('LPU Online', 'LPU', '/images/universities/lpu.png', 'https://www.lpu.in', '[{"type": "NAAC", "grade": "A++"}, {"type": "UGC"}]'::jsonb, 2005, 5, true),
('NMIMS Online', 'NMIMS', '/images/universities/nmims.png', 'https://www.nmims.edu', '[{"type": "NAAC", "grade": "A+"}, {"type": "UGC"}, {"type": "AACSB"}]'::jsonb, 1981, 6, true),
('Symbiosis Online', 'Symbiosis', '/images/universities/symbiosis.png', 'https://www.symbiosis.ac.in', '[{"type": "NAAC", "grade": "A"}, {"type": "UGC"}, {"type": "AICTE"}]'::jsonb, 1971, 7, true),
('DY Patil Online', 'DY Patil', '/images/universities/dypatil.png', 'https://www.dypatil.edu', '[{"type": "NAAC", "grade": "A"}, {"type": "UGC"}]'::jsonb, 2003, 8, true),
('Shoolini University Online', 'Shoolini', '/images/universities/shoolini.png', 'https://www.shooliniuniversity.com', '[{"type": "NAAC", "grade": "A+"}, {"type": "UGC"}]'::jsonb, 2009, 9, true),
('Vignan University Online', 'Vignan', '/images/universities/vignan.png', 'https://www.vignan.ac.in', '[{"type": "NAAC", "grade": "A+"}, {"type": "UGC"}]'::jsonb, 2008, 10, true);

-- =============================================
-- FAQS (General + Degree-Specific)
-- =============================================
-- General FAQs (no degree_id)
INSERT INTO faqs (degree_id, question, answer, display_order, is_active) VALUES
(NULL, 'Are online degrees valid in India?', 'Yes, online degrees from UGC-recognized universities are completely valid and have the same recognition as regular degrees. UGC has approved online education, and degrees awarded by UGC-entitled universities are accepted for all government and private sector jobs.', 1, true),
(NULL, 'Can I get a job after completing an online degree?', 'Absolutely! Online degrees from recognized universities are accepted by all major companies. Many top recruiters like TCS, Infosys, Wipro, and multinational corporations actively hire candidates with online degrees. We also provide placement assistance to help you secure the right opportunity.', 2, true),
(NULL, 'Is there any age limit for online courses?', 'No, there is no upper age limit for pursuing online degrees. Whether you are a working professional looking to upskill, a homemaker wanting to complete your education, or a fresh graduate seeking higher studies - online education is open for everyone.', 3, true),
(NULL, 'How are online exams conducted?', 'Online exams are typically conducted through proctored online examination systems. You can take exams from the comfort of your home using a computer with a webcam. Some universities also offer offline exam centers in major cities.', 4, true),
(NULL, 'What is the admission process?', 'The admission process is simple: Fill the enquiry form, our counsellor will guide you through university selection, submit required documents online, pay the fee, and get enrolled. The entire process can be completed within 2-3 working days.', 5, true);

-- MBA specific FAQs
INSERT INTO faqs (degree_id, question, answer, display_order, is_active)
SELECT id, 'What are the specializations available in Online MBA?', 'Online MBA programs offer various specializations including Finance, Marketing, Human Resource Management, Operations Management, Business Analytics, International Business, Healthcare Management, and IT Management. You can choose based on your career goals.', 1, true
FROM degrees WHERE slug = 'mba';

INSERT INTO faqs (degree_id, question, answer, display_order, is_active)
SELECT id, 'Is work experience required for Online MBA?', 'Work experience is not mandatory for most online MBA programs. However, having 1-2 years of work experience can enhance your learning as you can relate concepts to real-world scenarios. Some executive MBA programs may require minimum work experience.', 2, true
FROM degrees WHERE slug = 'mba';

-- BBA specific FAQs
INSERT INTO faqs (degree_id, question, answer, display_order, is_active)
SELECT id, 'Can I pursue MBA after Online BBA?', 'Yes, absolutely! Online BBA from a UGC-recognized university makes you eligible for MBA programs. In fact, BBA provides an excellent foundation for MBA as you already have basic knowledge of management concepts.', 1, true
FROM degrees WHERE slug = 'bba';

-- MCA specific FAQs
INSERT INTO faqs (degree_id, question, answer, display_order, is_active)
SELECT id, 'What programming languages are covered in Online MCA?', 'Online MCA curriculum typically covers C, C++, Java, Python, JavaScript, SQL, and web technologies. You will also learn about data structures, algorithms, database management, cloud computing, and software engineering.', 1, true
FROM degrees WHERE slug = 'mca';

INSERT INTO faqs (degree_id, question, answer, display_order, is_active)
SELECT id, 'Is BCA mandatory for MCA admission?', 'BCA is not mandatory. You can pursue MCA after completing any graduate degree with Mathematics at 10+2 level or as a subject in graduation. B.Sc (CS/IT), B.Sc (Mathematics), or any equivalent degree is also accepted.', 2, true
FROM degrees WHERE slug = 'mca';
