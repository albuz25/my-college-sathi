import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, DollarSign, Briefcase, TrendingUp } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { DegreeCard } from '@/components/degrees/DegreeCard';
import { getDegrees } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'BBA After 12th 2026 - Eligibility, Fees, Career Options & Admission',
  description: 'Complete guide to BBA after 12th: eligibility (50% in 12th any stream), fees (₹60K-1.8L), career opportunities, salary expectations, and online/regular options. Get admission now.',
  alternates: {
    canonical: '/bba-after-12th',
  },
  openGraph: {
    title: 'BBA After 12th | My College Sathi',
    description: 'Your complete guide to pursuing BBA after 12th - eligibility, fees, careers, and admission process.',
    type: 'website',
  },
};

export default function BBAAfter12thPage() {
  const bbaDegrees = getDegrees().filter(d => d.slug === 'bba');
  const bba = bbaDegrees[0];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'BBA After 12th', url: '/bba-after-12th' }]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            BBA After 12th - Complete Guide 2026
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Everything you need to know about pursuing BBA after 12th standard - eligibility, fees, 
            career opportunities, admission process, and why BBA is a smart choice for management careers.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="border rounded-lg p-6 text-center">
            <GraduationCap className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">3 Years</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">₹60K-1.8L</div>
            <div className="text-sm text-muted-foreground">Total Fees (Online)</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <Briefcase className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">₹3-5 LPA</div>
            <div className="text-sm text-muted-foreground">Starting Salary</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">High</div>
            <div className="text-sm text-muted-foreground">Career Growth</div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* What is BBA */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">What is BBA?</h2>
            <div className="prose max-w-none text-muted-foreground mb-6">
              <p>
                BBA (Bachelor of Business Administration) is a 3-year undergraduate degree in business management. 
                It's perfect for 12th pass students who want to build a career in management, business, or entrepreneurship.
              </p>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3">What You'll Learn:</h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm">
                <div>• Business Management Fundamentals</div>
                <div>• Marketing Strategies</div>
                <div>• Financial Management</div>
                <div>• Human Resource Management</div>
                <div>• Organizational Behavior</div>
                <div>• Business Communication</div>
                <div>• Entrepreneurship Skills</div>
                <div>• Business Analytics</div>
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">BBA Eligibility After 12th</h2>
            <div className="border rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-2">Academic Qualification:</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Passed 12th/Intermediate from recognized board</li>
                    <li>• Any stream accepted: Commerce, Science, or Arts</li>
                    <li>• Minimum 50% marks (45% for SC/ST/OBC)</li>
                    <li>• Some universities accept pass marks</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-2">Age Criteria:</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Minimum age: 17 years</li>
                    <li>• No maximum age limit for online BBA</li>
                    <li>• Gap years accepted</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-2">Entrance Exam:</div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Not required for most online/distance BBA</li>
                    <li>• Direct admission based on 12th marks</li>
                    <li>• Some top colleges may have entrance tests</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Structure */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">BBA Fee Structure</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Online BBA</h3>
                <div className="text-3xl font-bold text-primary mb-2">₹60K - ₹1.8L</div>
                <div className="text-sm text-muted-foreground mb-4">Total 3 Years</div>
                <ul className="space-y-2 text-sm">
                  <li>• ₹20K - ₹60K per year</li>
                  <li>• EMI from ₹3,499/month</li>
                  <li>• No hostel/travel costs</li>
                  <li>• Study while earning</li>
                </ul>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold mb-3">Regular BBA</h3>
                <div className="text-3xl font-bold text-primary mb-2">₹3L - ₹10L</div>
                <div className="text-sm text-muted-foreground mb-4">Total 3 Years</div>
                <ul className="space-y-2 text-sm">
                  <li>• ₹1L - ₹3.3L per year</li>
                  <li>• Additional hostel costs</li>
                  <li>• Transportation expenses</li>
                  <li>• Full-time commitment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Career Opportunities */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Career Opportunities After BBA</h2>
            <div className="space-y-4">
              {[
                {
                  role: 'Marketing Executive',
                  salary: '₹3-5 LPA',
                  desc: 'Brand management, digital marketing, market research',
                },
                {
                  role: 'Sales Manager',
                  salary: '₹4-6 LPA',
                  desc: 'Sales strategy, team management, client relations',
                },
                {
                  role: 'HR Executive',
                  salary: '₹3-5 LPA',
                  desc: 'Recruitment, employee relations, training & development',
                },
                {
                  role: 'Business Development Associate',
                  salary: '₹4-7 LPA',
                  desc: 'Client acquisition, business strategy, partnerships',
                },
                {
                  role: 'Operations Manager',
                  salary: '₹4-6 LPA',
                  desc: 'Process optimization, logistics, quality management',
                },
                {
                  role: 'Financial Analyst',
                  salary: '₹3-6 LPA',
                  desc: 'Financial planning, investment analysis, reporting',
                },
              ].map((career) => (
                <div key={career.role} className="border rounded-lg p-4 flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold">{career.role}</div>
                    <div className="text-sm text-muted-foreground">{career.desc}</div>
                  </div>
                  <div className="text-primary font-semibold text-sm whitespace-nowrap ml-4">
                    {career.salary}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold mb-2">Higher Education Options:</div>
              <div className="text-sm">
                After BBA, you can pursue MBA, PGDM, specialized certifications, or foreign MBA programs for even better career prospects.
              </div>
            </div>
          </div>

          {/* Why Choose BBA */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Why Choose BBA After 12th?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Strong Foundation',
                  desc: 'Build management and business skills from day one',
                },
                {
                  title: 'Quick Career Start',
                  desc: 'Get job-ready in 3 years with practical knowledge',
                },
                {
                  title: 'MBA Pathway',
                  desc: 'Perfect preparation for MBA with waived entrance tests',
                },
                {
                  title: 'Entrepreneurship',
                  desc: 'Learn to start and manage your own business',
                },
                {
                  title: 'Versatile Career',
                  desc: 'Work in any industry - IT, finance, retail, healthcare',
                },
                {
                  title: 'Networking',
                  desc: 'Build industry connections early in your career',
                },
              ].map((reason) => (
                <div key={reason.title} className="border rounded-lg p-4">
                  <div className="font-semibold mb-1">{reason.title}</div>
                  <div className="text-sm text-muted-foreground">{reason.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* BBA Specializations */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">BBA Specializations</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                'Marketing Management',
                'Finance & Accounting',
                'Human Resource Management',
                'International Business',
                'Operations Management',
                'Digital Marketing',
                'Event Management',
                'Hospitality Management',
                'Retail Management',
              ].map((spec) => (
                <div key={spec} className="border rounded-lg p-3 text-center text-sm font-medium">
                  {spec}
                </div>
              ))}
            </div>
          </div>

          {/* Online vs Regular BBA */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Online BBA vs Regular BBA</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Factor</th>
                    <th className="text-left p-3 font-semibold">Online BBA</th>
                    <th className="text-left p-3 font-semibold">Regular BBA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">Fees</td>
                    <td className="p-3 text-green-600">₹60K-1.8L</td>
                    <td className="p-3">₹3L-10L</td>
                  </tr>
                  <tr className="border-t bg-muted/50">
                    <td className="p-3">Flexibility</td>
                    <td className="p-3 text-green-600">High</td>
                    <td className="p-3">Low</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Work While Study</td>
                    <td className="p-3 text-green-600">Yes</td>
                    <td className="p-3">No</td>
                  </tr>
                  <tr className="border-t bg-muted/50">
                    <td className="p-3">Campus Experience</td>
                    <td className="p-3">Virtual</td>
                    <td className="p-3 text-green-600">Full Campus</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Degree Value</td>
                    <td className="p-3 text-green-600">Same (UGC)</td>
                    <td className="p-3 text-green-600">Same (UGC)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Can I do BBA after 12th Science/Arts?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, BBA accepts students from all streams - Commerce, Science, and Arts. 
                  Stream doesn't matter, only minimum marks criteria needs to be met.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Is BBA degree valuable?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolutely! BBA graduates are in high demand across industries. You can get entry-level 
                  management roles or pursue MBA for senior positions. Average starting salary is ₹3-5 LPA.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Which is better: BBA or B.Com?</h4>
                <p className="text-sm text-muted-foreground">
                  BBA focuses on management and leadership skills, while B.Com focuses on commerce and accounts. 
                  Choose BBA if you want management careers, B.Com if you prefer finance/accounting specialization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Program */}
      {bba && (
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Online BBA Program</h2>
            <div className="max-w-md mx-auto">
              <DegreeCard degree={bba} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Start Your BBA Journey Today!
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get expert guidance on BBA admissions, university selection, and career planning. 
            Our counselors are here to help you make the right choice!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/degrees/bba">
                View BBA Programs
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white hover:bg-white/90" asChild>
              <Link href="/degrees#enquire">
                Get Free Counselling
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
