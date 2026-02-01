'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users, Building2, Award, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DegreeCard } from '@/components/degrees/DegreeCard';
import { PartnerUniversitiesSection } from '@/components/partners/PartnerUniversitiesSection';
import { LeadMagnetForm } from '@/components/leads/LeadMagnetForm';
import { getFeaturedDegrees, getDegreesByCategory, getGeneralFAQs } from '@/lib/mock-data';

export default function HomePage() {
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [heroFormData, setHeroFormData] = useState({
    name: '',
    phone: '',
    degree: '',
  });
  const [heroFormSubmitting, setHeroFormSubmitting] = useState(false);
  const [heroFormSuccess, setHeroFormSuccess] = useState(false);
  const [heroFormError, setHeroFormError] = useState('');

  const featuredDegrees = getFeaturedDegrees();
  const undergraduateDegrees = getDegreesByCategory('undergraduate');
  const postgraduateDegrees = getDegreesByCategory('postgraduate');
  const faqs = getGeneralFAQs();

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroFormError('');
    setHeroFormSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: heroFormData.name,
          phone: heroFormData.phone,
          interestedDegreeName: heroFormData.degree,
          source: 'home_hero_form',
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setHeroFormSuccess(true);
      setHeroFormData({ name: '', phone: '', degree: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setHeroFormSuccess(false);
      }, 5000);
    } catch (err) {
      setHeroFormError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setHeroFormSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[32rem] py-16 md:py-24 overflow-hidden">
        {/* Modern bluish gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100" />
        
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm">
                Admissions Open for 2025-26
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Path to a{' '}
                <span className="text-primary">Brighter Future</span>{' '}
                Starts Here
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore online degree programs from 15+ UGC-recognized universities. 
                Get expert counselling, flexible learning, and 100% valid degrees.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/degrees">
                    Explore Degrees <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setShowEnquiryForm(true)}
                >
                  Get Free Counselling
                </Button>
              </div>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">UGC Recognized</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">NAAC Accredited</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Placement Assistance</span>
                </div>
              </div>
            </div>

            {/* Lead Capture Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-2">Get Free Counselling</h2>
              <p className="text-muted-foreground mb-6">
                Our experts will help you choose the right degree
              </p>

              {heroFormSuccess ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    Our counsellor will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHeroFormSubmit} className="space-y-4">
                  {heroFormError && (
                    <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                      {heroFormError}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="hero-name">Full Name</Label>
                    <Input 
                      id="hero-name"
                      type="text" 
                      placeholder="Enter your name"
                      value={heroFormData.name}
                      onChange={(e) => setHeroFormData({ ...heroFormData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-phone">Phone Number</Label>
                    <Input 
                      id="hero-phone"
                      type="tel" 
                      placeholder="Enter 10-digit mobile number"
                      value={heroFormData.phone}
                      onChange={(e) => setHeroFormData({ ...heroFormData, phone: e.target.value })}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-degree">Interested Degree</Label>
                    <Select
                      value={heroFormData.degree}
                      onValueChange={(value) => setHeroFormData({ ...heroFormData, degree: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MBA">MBA</SelectItem>
                        <SelectItem value="BBA">BBA</SelectItem>
                        <SelectItem value="MCA">MCA</SelectItem>
                        <SelectItem value="BCA">BCA</SelectItem>
                        <SelectItem value="M.Com">M.Com</SelectItem>
                        <SelectItem value="B.Com">B.Com</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" size="lg" disabled={heroFormSubmitting}>
                    {heroFormSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting, you agree to our Terms & Privacy Policy
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TrustStat icon={Users} value="10,000+" label="Students Enrolled" />
            <TrustStat icon={Building2} value="15+" label="Partner Universities" />
            <TrustStat icon={Award} value="100%" label="Valid Degrees" />
            <TrustStat icon={TrendingUp} value="85%" label="Placement Rate" />
          </div>
        </div>
      </section>

      {/* Featured Degrees */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-3">Featured Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Online Degrees
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our most sought-after programs designed for working professionals and students
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex justify-center mb-8">
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
              <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredDegrees.map((degree) => (
                  <DegreeCard key={degree.id} degree={degree} showCompare={false} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="postgraduate">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postgraduateDegrees.slice(0, 3).map((degree) => (
                  <DegreeCard key={degree.id} degree={degree} showCompare={false} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="undergraduate">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {undergraduateDegrees.slice(0, 3).map((degree) => (
                  <DegreeCard key={degree.id} degree={degree} showCompare={false} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/degrees">
                View All Degrees <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose My College Sathi?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make your online education journey simple, transparent, and successful
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Universities */}
      <PartnerUniversitiesSection />

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Find answers to common questions about online degrees
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from our expert counsellors and find the perfect degree for your career goals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setShowEnquiryForm(true)}
            >
              Get Free Counselling
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
              <Link href="/degrees">Browse Degrees</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      <LeadMagnetForm
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        source="home_page_cta"
        variant="enquiry"
      />
    </>
  );
}

function TrustStat({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

const benefits = [
  {
    icon: Award,
    title: 'UGC Recognized',
    description: 'All degrees are from UGC-entitled universities with full validity',
  },
  {
    icon: Users,
    title: 'Expert Counselling',
    description: 'Free guidance from experienced education counsellors',
  },
  {
    icon: TrendingUp,
    title: 'Placement Support',
    description: 'Career assistance and job placement support for students',
  },
  {
    icon: Building2,
    title: 'Top Universities',
    description: '15+ partner universities with NAAC accreditation',
  },
];
