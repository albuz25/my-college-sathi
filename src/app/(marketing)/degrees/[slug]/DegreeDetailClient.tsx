'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  IndianRupee, 
  GraduationCap, 
  CheckCircle2, 
  Briefcase, 
  TrendingUp,
  Download,
  Phone,
  ArrowLeft,
  BookOpen,
  Users,
  Award,
  Calendar,
  Target,
  Laptop,
  FileText,
  MessageCircle,
  Star,
  Building2,
  Shield,
  Zap,
  Globe,
  HeartHandshake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PartnerUniversitiesSection } from '@/components/partners/PartnerUniversitiesSection';
import { DegreeCard } from '@/components/degrees/DegreeCard';
import { LeadMagnetForm } from '@/components/leads/LeadMagnetForm';
import { CourseSchema, BreadcrumbSchema, FAQSchema } from '@/components/seo/JsonLd';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import type { Degree, FAQ } from '@/types';

interface DegreeDetailClientProps {
  degree: Degree;
  similarDegrees: Degree[];
  faqs: FAQ[];
}

export function DegreeDetailClient({ degree, similarDegrees, faqs }: DegreeDetailClientProps) {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showBrochureForm, setShowBrochureForm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatShortCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mycollegesathi.com';
  const breadcrumbItems = [
    { name: 'Home', url: siteUrl },
    { name: 'Degrees', url: `${siteUrl}/degrees` },
    { name: degree.name, url: `${siteUrl}/degrees/${degree.slug}` },
  ];

  // Generate degree-specific FAQs
  const degreeFaqs = [
    {
      id: 'faq-1',
      degree_id: degree.id,
      question: `Is online ${degree.name} valid for government jobs?`,
      answer: `Yes, online ${degree.name} from UGC-recognized universities is completely valid and accepted for all government and private sector jobs. The degree has the same legal recognition as a regular on-campus degree. UGC has officially approved online education, making these degrees acceptable for UPSC, banking, PSU, and all competitive exams.`,
      display_order: 1,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'faq-2',
      degree_id: degree.id,
      question: `What is the fee structure for online ${degree.name}?`,
      answer: `The fee for online ${degree.name} ranges from ${formatCurrency(degree.fee_range_min)} to ${formatCurrency(degree.fee_range_max)} depending on the university you choose. ${degree.emi_available ? `Easy EMI options are available starting from ₹${degree.emi_starting?.toLocaleString()}/month.` : ''} The fee can be paid semester-wise or yearly, and many universities offer scholarships for meritorious students.`,
      display_order: 2,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'faq-3',
      degree_id: degree.id,
      question: `How long does it take to complete online ${degree.name}?`,
      answer: `The online ${degree.name} program takes ${degree.duration_text} to complete. The program follows a semester-based structure with regular assignments, projects, and examinations. You can study at your own pace while meeting the semester deadlines. The curriculum is designed to provide comprehensive knowledge while accommodating working professionals.`,
      display_order: 3,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'faq-4',
      degree_id: degree.id,
      question: `What are the eligibility criteria for online ${degree.name}?`,
      answer: `${degree.eligibility_criteria}${degree.work_experience_required ? ` Additionally, ${degree.min_work_experience} years of work experience is preferred for executive programs.` : ''} Documents required include mark sheets, ID proof, passport-size photographs, and address proof. Foreign nationals can also apply with equivalent qualifications.`,
      display_order: 4,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'faq-5',
      degree_id: degree.id,
      question: `How are online ${degree.name} exams conducted?`,
      answer: `Examinations are conducted through AI-proctored online examination systems. You can take exams from the comfort of your home using a computer/laptop with a webcam and stable internet connection. The exam schedule is typically shared in advance, and multiple time slots are often available. Some universities also offer offline exam centers in major cities.`,
      display_order: 5,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    {
      id: 'faq-6',
      degree_id: degree.id,
      question: `What career opportunities are available after ${degree.name}?`,
      answer: `After completing ${degree.name}, you can pursue careers as ${degree.career_paths?.slice(0, 4).join(', ')}${degree.career_paths && degree.career_paths.length > 4 ? ', and more' : ''}. The average salary range is ${degree.avg_salary_range}. Our placement assistance team helps with resume building, interview preparation, and connecting you with top recruiters${degree.top_recruiters ? ` like ${degree.top_recruiters.slice(0, 3).join(', ')}` : ''}.`,
      display_order: 6,
      is_active: true,
      created_at: new Date().toISOString(),
    },
    ...faqs,
  ];

  // Admission process steps
  const admissionSteps = [
    { step: 1, title: 'Fill Enquiry Form', description: 'Submit your basic details through our online form', icon: FileText },
    { step: 2, title: 'Counsellor Call', description: 'Our expert will call to understand your requirements', icon: Phone },
    { step: 3, title: 'University Selection', description: 'Choose the best university based on your preferences', icon: Building2 },
    { step: 4, title: 'Document Submission', description: 'Upload required documents online', icon: FileText },
    { step: 5, title: 'Fee Payment', description: 'Pay the admission fee via secure payment gateway', icon: IndianRupee },
    { step: 6, title: 'Get Enrolled', description: 'Receive enrollment confirmation and start learning', icon: GraduationCap },
  ];

  // Sample curriculum modules (would be degree-specific in production)
  const curriculumModules = getCurriculumForDegree(degree.slug);

  // Learning outcomes
  const learningOutcomes = getLearningOutcomes(degree.slug);

  return (
    <>
      {/* Schema Markup */}
      <CourseSchema degree={degree} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FAQSchema faqs={degreeFaqs} />

      {/* Breadcrumb */}
      <div className="bg-muted/30 py-3 border-b">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/degrees" className="text-muted-foreground hover:text-primary">Degrees</Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">{degree.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/degrees" 
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Degrees
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Degree Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="capitalize">{degree.category}</Badge>
                <Badge variant="outline">{degree.stream}</Badge>
                <Badge variant="outline" className="capitalize">{degree.mode}</Badge>
                {degree.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                  Online {degree.name}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground">
                  {degree.full_name}
                </p>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {degree.description}
              </p>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard 
                  icon={Clock} 
                  label="Duration" 
                  value={degree.duration_text}
                  color="blue"
                />
                <StatCard 
                  icon={IndianRupee} 
                  label="Fee Range" 
                  value={`${formatShortCurrency(degree.fee_range_min)} - ${formatShortCurrency(degree.fee_range_max)}`}
                  color="green"
                />
                <StatCard 
                  icon={GraduationCap} 
                  label="Eligibility" 
                  value={degree.min_qualification === 'graduate' ? 'Graduate' : '12th Pass'}
                  color="purple"
                />
                <StatCard 
                  icon={Laptop} 
                  label="Mode" 
                  value="100% Online"
                  color="orange"
                />
              </div>

              {/* EMI Badge */}
              {degree.emi_available && degree.emi_starting && (
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-sm py-2 px-4">
                    <Zap className="h-4 w-4 mr-1" />
                    EMI from ₹{degree.emi_starting.toLocaleString()}/month
                  </Badge>
                  <Badge variant="outline" className="text-sm py-2 px-4">
                    <Shield className="h-4 w-4 mr-1" />
                    UGC Recognized
                  </Badge>
                  {degree.placement_assistance && (
                    <Badge variant="outline" className="text-sm py-2 px-4">
                      <HeartHandshake className="h-4 w-4 mr-1" />
                      Placement Assistance
                    </Badge>
                  )}
                </div>
              )}

              {/* Mobile CTA Buttons */}
              <div className="flex gap-3 lg:hidden">
                <Button 
                  className="flex-1" 
                  size="lg"
                  onClick={() => setShowEnquiryForm(true)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Get Free Counselling
                </Button>
                <a
                  href={generateWhatsAppLink(degree.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Sticky CTA Card */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                  {/* Header with gradient background */}
                  <div className="relative px-6 py-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h20v20H0z%22 fill=%22%23fff%22 fill-opacity=%22.05%22/%3E%3C/svg%3E')]" />
                    <div className="relative text-center">
                      <h3 className="text-xl font-bold text-white mb-1">
                        Start Your {degree.name} Journey
                      </h3>
                      <p className="text-blue-100 text-sm">
                        Get expert guidance from our counsellors
                      </p>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="p-6 space-y-3">
                    <button 
                      onClick={() => setShowEnquiryForm(true)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Phone className="h-5 w-5" />
                      Get Free Counselling
                    </button>
                    
                    <button 
                      onClick={() => setShowBrochureForm(true)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-xl border-2 border-gray-200 transition-all hover:border-gray-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Download className="h-5 w-5" />
                      Download Brochure
                    </button>
                    
                    <a
                      href={generateWhatsAppLink(degree.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/25"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Chat on WhatsApp
                    </a>
                  </div>
                  
                  {/* Footer note */}
                  <div className="px-6 pb-5">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg py-2.5 px-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Our counsellor will contact you within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights Strip */}
      <section className="py-4 bg-muted/50 border-y">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <QuickHighlight icon={Users} text="10,000+ Enrolled" />
            <QuickHighlight icon={Star} text="4.8/5 Rating" />
            <QuickHighlight icon={Award} text="NAAC Accredited" />
            <QuickHighlight icon={Globe} text="Learn from Anywhere" />
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="!grid w-full h-auto grid-cols-3 md:grid-cols-6 gap-2 rounded-2xl border border-border/60 bg-muted/20 p-2">
              <TabsTrigger
                value="overview"
                className="!flex-none w-full min-w-0 rounded-xl px-2 py-2 text-xs sm:text-sm leading-tight justify-center truncate data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="!flex-none w-full min-w-0 rounded-xl px-2 py-2 text-xs sm:text-sm leading-tight justify-center truncate data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="eligibility"
                className="!flex-none w-full min-w-0 rounded-xl px-2 py-2 text-xs sm:text-sm leading-tight justify-center truncate data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Eligibility
              </TabsTrigger>
              <TabsTrigger
                value="career"
                className="!flex-none w-full min-w-0 rounded-xl px-2 py-2 text-xs sm:text-sm leading-tight justify-center truncate data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                title="Career & Placement"
              >
                <span className="md:hidden">Career</span>
                <span className="hidden md:inline">Career & Placement</span>
              </TabsTrigger>
              <TabsTrigger
                value="admission"
                className="!flex-none w-full min-w-0 rounded-xl px-2 py-2 text-xs sm:text-sm leading-tight justify-center truncate data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                title="Admission Process"
              >
                <span className="md:hidden">Admission</span>
                <span className="hidden md:inline">Admission Process</span>
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="!flex-none w-full min-w-0 rounded-xl px-2 py-2 text-xs sm:text-sm leading-tight justify-center truncate data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                FAQs
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* About Program */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        About Online {degree.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-slate max-w-none">
                      <p className="text-muted-foreground leading-relaxed">
                        {degree.description}
                      </p>
                      <p className="text-muted-foreground leading-relaxed mt-4">
                        The online {degree.name} program is designed to provide comprehensive knowledge 
                        and practical skills required for success in {degree.stream.toLowerCase()}. 
                        With flexible learning schedules, you can balance your education with work 
                        and personal commitments. The program follows UGC guidelines ensuring your 
                        degree is valid and recognized across all sectors.
                      </p>
                    </CardContent>
                  </Card>

                  {/* Program Highlights */}
                  {degree.highlights && degree.highlights.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-primary" />
                          Program Highlights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {degree.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                              <span className="text-sm font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Learning Outcomes */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        What You&apos;ll Learn
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {learningOutcomes.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="p-1 rounded-full bg-primary/10">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-sm text-muted-foreground">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Facts */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Facts</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <QuickFact label="Program" value={degree.name} />
                      <QuickFact label="Full Name" value={degree.full_name} />
                      <QuickFact label="Duration" value={degree.duration_text} />
                      <QuickFact label="Mode" value={degree.mode} className="capitalize" />
                      <QuickFact label="Category" value={degree.category} className="capitalize" />
                      <QuickFact label="Stream" value={degree.stream} />
                      <div className="pt-4 border-t">
                        <QuickFact 
                          label="Fee Range" 
                          value={`${formatCurrency(degree.fee_range_min)} - ${formatCurrency(degree.fee_range_max)}`} 
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          *Varies by university
                        </p>
                      </div>
                      {degree.emi_available && degree.emi_starting && (
                        <div className="pt-4 border-t">
                          <Badge className="w-full justify-center bg-green-100 text-green-800 hover:bg-green-100">
                            EMI from ₹{degree.emi_starting.toLocaleString()}/mo
                          </Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* CTA Card */}
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                      <h3 className="font-semibold mb-2">Still have questions?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Talk to our expert counsellors
                      </p>
                      <Button 
                        className="w-full"
                        onClick={() => setShowEnquiryForm(true)}
                      >
                        Get Free Guidance
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {degree.name} Curriculum & Syllabus
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Comprehensive curriculum designed by industry experts
                  </p>
                </CardHeader>
                <CardContent>
                  {degree.syllabus_overview && (
                    <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Syllabus Overview</h4>
                      <p className="text-muted-foreground">{degree.syllabus_overview}</p>
                    </div>
                  )}
                  
                  <Accordion type="single" collapsible className="w-full">
                    {curriculumModules.map((module, index) => (
                      <AccordionItem key={index} value={`module-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-semibold">{module.title}</p>
                              <p className="text-sm text-muted-foreground font-normal">{module.subjects.length} subjects</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-11 space-y-2">
                            {module.subjects.map((subject, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                {subject}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button 
                  size="lg"
                  onClick={() => setShowBrochureForm(true)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Detailed Syllabus
                </Button>
              </div>
            </TabsContent>

            {/* Eligibility Tab */}
            <TabsContent value="eligibility" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Eligibility Criteria
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">Educational Qualification</p>
                        <p className="text-sm text-muted-foreground">{degree.eligibility_criteria}</p>
                      </div>
                    </div>
                    
                    {degree.work_experience_required && degree.min_work_experience && (
                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <Briefcase className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Work Experience</p>
                          <p className="text-sm text-muted-foreground">
                            Minimum {degree.min_work_experience} years of work experience (preferred for executive programs)
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-100">
                      <Globe className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">For International Students</p>
                        <p className="text-sm text-muted-foreground">
                          Equivalent qualification from a recognized foreign university
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Required Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        '10th & 12th Mark Sheets',
                        'Graduation Mark Sheets & Degree Certificate',
                        'Aadhaar Card / Passport',
                        'Passport Size Photographs',
                        'Address Proof',
                        'Category Certificate (if applicable)',
                        'Work Experience Certificate (if applicable)',
                      ].map((doc, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">Not sure if you&apos;re eligible?</h3>
                      <p className="text-muted-foreground">Our counsellors can help verify your eligibility</p>
                    </div>
                    <Button 
                      size="lg"
                      onClick={() => setShowEnquiryForm(true)}
                    >
                      Check My Eligibility
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Career Tab */}
            <TabsContent value="career" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Career Paths */}
                  {degree.career_paths && degree.career_paths.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                          Career Opportunities After {degree.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {degree.career_paths.map((career, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                              <div className="p-2 rounded-full bg-primary/10">
                                <Briefcase className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">{career}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Top Recruiters */}
                  {degree.top_recruiters && degree.top_recruiters.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          Top Recruiters
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                          Companies that actively hire {degree.name} graduates
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-3">
                          {degree.top_recruiters.map((recruiter, index) => (
                            <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                              {recruiter}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Placement Assistance */}
                  {degree.placement_assistance && (
                    <Card className="border-green-200 bg-green-50/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-800">
                          <HeartHandshake className="h-5 w-5" />
                          Placement Assistance Included
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { title: 'Resume Building', desc: 'Professional resume crafting support' },
                            { title: 'Interview Preparation', desc: 'Mock interviews and tips' },
                            { title: 'Job Portal Access', desc: 'Exclusive job listings' },
                            { title: 'Career Counselling', desc: 'One-on-one guidance sessions' },
                          ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                              <div>
                                <p className="font-medium text-green-800">{item.title}</p>
                                <p className="text-sm text-green-700">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Salary Info */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Salary Prospects
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {degree.avg_salary_range && (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground mb-1">Average Salary Range</p>
                          <p className="text-3xl font-bold text-primary">{degree.avg_salary_range}</p>
                          <p className="text-xs text-muted-foreground mt-1">per annum (India)</p>
                        </div>
                      )}
                      <div className="space-y-3 pt-4 border-t">
                        <SalaryRange level="Entry Level" range="₹3-6 LPA" />
                        <SalaryRange level="Mid Level" range="₹6-12 LPA" />
                        <SalaryRange level="Senior Level" range="₹12-25 LPA" />
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setShowEnquiryForm(true)}
                  >
                    Get Career Guidance
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Admission Tab */}
            <TabsContent value="admission" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Simple 6-Step Admission Process
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Get enrolled in just a few days with our hassle-free process
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {admissionSteps.map((step) => (
                      <div key={step.step} className="relative">
                        <div className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <step.icon className="h-6 w-6 text-primary" />
                          </div>
                          <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                            {step.step}
                          </span>
                          <h4 className="font-semibold mb-2">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Fee Structure */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    Fee Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-4">Total Program Fee</h4>
                      <p className="text-3xl font-bold text-primary mb-2">
                        {formatCurrency(degree.fee_range_min)} - {formatCurrency(degree.fee_range_max)}
                      </p>
                      <p className="text-sm text-muted-foreground">*Varies by university selection</p>
                    </div>
                    {degree.emi_available && degree.emi_starting && (
                      <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                        <h4 className="font-semibold mb-4 text-green-800">EMI Option Available</h4>
                        <p className="text-3xl font-bold text-green-700 mb-2">
                          ₹{degree.emi_starting.toLocaleString()}/month
                        </p>
                        <p className="text-sm text-green-600">Starting EMI with no-cost options</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="text-center bg-primary/5 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>
                <p className="text-muted-foreground mb-6">
                  Fill the form below and our counsellor will guide you through the entire process
                </p>
                <Button 
                  size="lg"
                  onClick={() => setShowEnquiryForm(true)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Start Admission Process
                </Button>
              </div>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions about {degree.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {degreeFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
                  <p className="text-muted-foreground mb-4">
                    Our expert counsellors are here to help you with any queries
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button onClick={() => setShowEnquiryForm(true)}>
                      <Phone className="h-4 w-4 mr-2" />
                      Talk to Counsellor
                    </Button>
                    <a
                      href={generateWhatsAppLink(degree.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp Us
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Similar Degrees */}
      {similarDegrees.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Similar Degrees You May Like</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarDegrees.map((deg) => (
                <DegreeCard key={deg.id} degree={deg} showCompare={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partner Universities */}
      <PartnerUniversitiesSection />

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your {degree.name} Journey Today
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with our online {degree.name} program
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowEnquiryForm(true)}
            >
              Get Free Counselling
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white hover:bg-white/10"
              onClick={() => setShowBrochureForm(true)}
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Forms */}
      <LeadMagnetForm
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        degreeName={degree.name}
        degreeId={degree.id}
        source="degree_page"
        variant="enquiry"
      />

      <LeadMagnetForm
        isOpen={showBrochureForm}
        onClose={() => setShowBrochureForm(false)}
        degreeName={degree.name}
        degreeId={degree.id}
        source="brochure_download"
        variant="brochure"
        onSuccess={(data) => {
          if (data.brochureUrl) {
            // Trigger download
            window.open(data.brochureUrl, '_blank');
          }
        }}
      />
    </>
  );
}

// Helper Components
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}) {
  const colors = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    green: 'bg-green-50 border-green-100 text-green-600',
    purple: 'bg-purple-50 border-purple-100 text-purple-600',
    orange: 'bg-orange-50 border-orange-100 text-orange-600',
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4" />
        <span className="text-xs font-medium uppercase tracking-wide opacity-80">{label}</span>
      </div>
      <p className="font-bold text-lg text-foreground">{value}</p>
    </div>
  );
}

function QuickHighlight({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function QuickFact({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={`font-medium text-sm ${className || ''}`}>{value}</span>
    </div>
  );
}

function SalaryRange({ level, range }: { level: string; range: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm">{level}</span>
      <span className="font-semibold text-primary">{range}</span>
    </div>
  );
}

// Helper functions for curriculum data
function getCurriculumForDegree(slug: string) {
  const curriculumData: Record<string, { title: string; subjects: string[] }[]> = {
    mba: [
      { title: 'Semester 1: Management Fundamentals', subjects: ['Principles of Management', 'Organizational Behavior', 'Managerial Economics', 'Business Communication', 'Financial Accounting'] },
      { title: 'Semester 2: Core Business Concepts', subjects: ['Marketing Management', 'Financial Management', 'Human Resource Management', 'Operations Management', 'Business Statistics'] },
      { title: 'Semester 3: Specialization & Advanced Topics', subjects: ['Strategic Management', 'Business Research Methods', 'Specialization Elective 1', 'Specialization Elective 2', 'Management Information Systems'] },
      { title: 'Semester 4: Capstone & Project', subjects: ['Business Ethics & Corporate Governance', 'International Business', 'Specialization Elective 3', 'Dissertation/Project Work', 'Industry Internship'] },
    ],
    bba: [
      { title: 'Year 1: Foundation', subjects: ['Principles of Management', 'Business Economics', 'Financial Accounting', 'Business Communication', 'Computer Applications'] },
      { title: 'Year 2: Core Subjects', subjects: ['Marketing Management', 'Human Resource Management', 'Cost Accounting', 'Business Law', 'Organizational Behavior'] },
      { title: 'Year 3: Advanced Topics', subjects: ['Strategic Management', 'Entrepreneurship', 'Business Analytics', 'Project Management', 'Summer Internship'] },
    ],
    mca: [
      { title: 'Semester 1: Programming Fundamentals', subjects: ['Mathematical Foundations', 'C Programming', 'Computer Organization', 'Data Structures', 'Discrete Mathematics'] },
      { title: 'Semester 2: Core Computing', subjects: ['Object Oriented Programming (Java)', 'Database Management Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering'] },
      { title: 'Semester 3: Advanced Topics', subjects: ['Web Technologies', 'Data Science & Analytics', 'Cloud Computing', 'Machine Learning Basics', 'Elective 1'] },
      { title: 'Semester 4: Specialization', subjects: ['Artificial Intelligence', 'Cybersecurity', 'Mobile Application Development', 'Elective 2', 'Major Project'] },
    ],
    bca: [
      { title: 'Year 1: Basics', subjects: ['Computer Fundamentals', 'Programming in C', 'Mathematics for Computing', 'Digital Electronics', 'Communication Skills'] },
      { title: 'Year 2: Core Subjects', subjects: ['Data Structures', 'Database Management', 'Java Programming', 'Web Development', 'Software Engineering'] },
      { title: 'Year 3: Advanced Topics', subjects: ['Python Programming', 'Computer Networks', 'Operating Systems', 'Minor Project', 'Major Project'] },
    ],
    mcom: [
      { title: 'Semester 1', subjects: ['Advanced Accounting', 'Business Economics', 'Research Methodology', 'Corporate Laws', 'Business Statistics'] },
      { title: 'Semester 2', subjects: ['Cost & Management Accounting', 'Financial Management', 'E-Commerce', 'Taxation', 'Organizational Behavior'] },
      { title: 'Semester 3', subjects: ['Strategic Management', 'International Finance', 'Specialization Paper 1', 'Specialization Paper 2', 'Project Work'] },
      { title: 'Semester 4', subjects: ['Business Ethics', 'Investment Management', 'Specialization Paper 3', 'Dissertation', 'Viva Voce'] },
    ],
    bcom: [
      { title: 'Year 1', subjects: ['Financial Accounting', 'Business Economics', 'Business Communication', 'Commercial Laws', 'Environmental Studies'] },
      { title: 'Year 2', subjects: ['Corporate Accounting', 'Cost Accounting', 'Business Statistics', 'Income Tax', 'Company Law'] },
      { title: 'Year 3', subjects: ['Auditing', 'Management Accounting', 'Financial Management', 'GST & Indirect Taxes', 'Project Work'] },
    ],
  };

  return curriculumData[slug] || [
    { title: 'Semester 1: Foundation', subjects: ['Core Subject 1', 'Core Subject 2', 'Core Subject 3', 'Foundation Paper', 'Communication Skills'] },
    { title: 'Semester 2: Intermediate', subjects: ['Subject 4', 'Subject 5', 'Subject 6', 'Elective 1', 'Practical Training'] },
    { title: 'Semester 3: Advanced', subjects: ['Subject 7', 'Subject 8', 'Elective 2', 'Elective 3', 'Research Project'] },
    { title: 'Semester 4: Specialization', subjects: ['Specialization 1', 'Specialization 2', 'Industry Project', 'Dissertation', 'Viva'] },
  ];
}

function getLearningOutcomes(slug: string) {
  const outcomes: Record<string, string[]> = {
    mba: [
      'Develop strategic thinking and leadership abilities',
      'Master financial analysis and decision-making',
      'Learn effective marketing and brand management',
      'Understand global business environments',
      'Build strong communication and negotiation skills',
      'Apply data-driven approaches to problem-solving',
      'Lead and manage diverse teams effectively',
      'Navigate ethical challenges in business',
    ],
    bba: [
      'Understand fundamental business concepts',
      'Develop basic financial literacy',
      'Learn marketing principles and strategies',
      'Build communication and presentation skills',
      'Gain exposure to various business functions',
      'Develop analytical thinking abilities',
    ],
    mca: [
      'Master advanced programming languages',
      'Design and develop software applications',
      'Understand database management and optimization',
      'Learn cloud computing and deployment',
      'Apply machine learning and AI concepts',
      'Develop cybersecurity awareness',
      'Build scalable web applications',
      'Manage software development projects',
    ],
    bca: [
      'Learn programming fundamentals',
      'Understand computer systems and networks',
      'Develop web and mobile applications',
      'Work with databases effectively',
      'Apply software development methodologies',
      'Build problem-solving skills',
    ],
    mcom: [
      'Master advanced accounting principles',
      'Understand financial markets and instruments',
      'Learn tax planning and compliance',
      'Develop research and analytical skills',
      'Apply management accounting techniques',
      'Navigate corporate governance frameworks',
    ],
    bcom: [
      'Understand accounting fundamentals',
      'Learn business laws and compliance',
      'Develop financial literacy',
      'Build analytical and numerical skills',
      'Prepare for professional certifications (CA, CMA)',
      'Gain knowledge of taxation systems',
    ],
  };

  return outcomes[slug] || [
    'Develop core domain knowledge',
    'Build analytical and problem-solving skills',
    'Learn industry-relevant tools and techniques',
    'Enhance communication abilities',
    'Gain practical project experience',
    'Prepare for professional certifications',
  ];
}
