import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, TrendingDown, CreditCard, Award, CheckCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { DegreeCard } from '@/components/degrees/DegreeCard';
import { getDegrees } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Online MBA Fees in India 2026 - Complete Fee Structure & EMI Options',
  description: 'Online MBA fees range from ₹80,000 to ₹2.5L. Check detailed fee structure, semester-wise costs, EMI options, scholarships, and compare fees across UGC-recognized universities.',
  alternates: {
    canonical: '/online-mba-fees',
  },
  openGraph: {
    title: 'Online MBA Fees in India | My College Sathi',
    description: 'Complete guide to Online MBA fees with EMI options starting from ₹3,499/month. Compare fees across top universities.',
    type: 'website',
  },
};

export default function OnlineMBAFeesPage() {
  const mbaDegrees = getDegrees().filter(d => d.slug === 'mba');
  const mba = mbaDegrees[0];

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the average fee for Online MBA in India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The average fee for Online MBA in India ranges from ₹80,000 to ₹2,50,000 for the complete 2-year program. The fees vary based on the university reputation, specialization, and additional services offered.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are EMI options available for Online MBA fees?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, most universities offer EMI options starting from ₹3,499/month. You can pay semester-wise or opt for 0% interest EMI plans ranging from 6-24 months.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Online MBA cheaper than regular MBA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Online MBA is significantly cheaper. While regular MBA costs ₹5-25 lakhs, Online MBA costs only ₹80K-2.5L. You also save on hostel, transportation, and relocation costs.',
                },
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Online MBA Fees', url: '/online-mba-fees' }]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Online MBA Fees in India 2026 - Complete Fee Structure
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Comprehensive guide to Online MBA fees from UGC-recognized universities. Compare costs, 
            EMI options, scholarships, and find the most affordable Online MBA programs.
          </p>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="border rounded-lg p-6 text-center">
            <Calculator className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">₹80K - ₹2.5L</div>
            <div className="text-sm text-muted-foreground">Total Fee Range</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <TrendingDown className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">60-70% Lower</div>
            <div className="text-sm text-muted-foreground">vs Regular MBA</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <CreditCard className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">₹3,499/mo</div>
            <div className="text-sm text-muted-foreground">EMI Starting From</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-bold mb-1">10-50%</div>
            <div className="text-sm text-muted-foreground">Scholarship Available</div>
          </div>
        </div>

        {/* Detailed Fee Structure */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Online MBA Fee Structure 2026</h2>
          
          <div className="border rounded-lg overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">University Tier</th>
                  <th className="text-left p-4 font-semibold">Fee Range (Total)</th>
                  <th className="text-left p-4 font-semibold">Per Semester</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-4">Budget-Friendly</td>
                  <td className="p-4 font-semibold">₹80,000 - ₹1,20,000</td>
                  <td className="p-4">₹20,000 - ₹30,000</td>
                </tr>
                <tr className="border-t bg-muted/50">
                  <td className="p-4">Mid-Range</td>
                  <td className="p-4 font-semibold">₹1,20,000 - ₹1,80,000</td>
                  <td className="p-4">₹30,000 - ₹45,000</td>
                </tr>
                <tr className="border-t">
                  <td className="p-4">Premium</td>
                  <td className="p-4 font-semibold">₹1,80,000 - ₹2,50,000</td>
                  <td className="p-4">₹45,000 - ₹62,500</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* What's Included */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">What's Included in the Fees?</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Complete study material (digital)',
                'Access to learning management system',
                'Live online classes',
                'Recorded lecture library',
                'Assignment and project submission',
                'Online proctored examinations',
                'Student support services',
                'Degree certificate on completion',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Costs */}
          <div className="border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Additional Costs to Consider</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>• Admission/Registration Fee:</span>
                <span className="font-semibold">₹5,000 - ₹10,000 (one-time)</span>
              </li>
              <li className="flex justify-between">
                <span>• Books & Study Material:</span>
                <span className="font-semibold">Usually included</span>
              </li>
              <li className="flex justify-between">
                <span>• Examination Fee:</span>
                <span className="font-semibold">Usually included</span>
              </li>
              <li className="flex justify-between">
                <span>• Internet & Computer:</span>
                <span className="font-semibold">Your own arrangement</span>
              </li>
            </ul>
          </div>

          {/* Payment Options */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Payment Options</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-6">
                <h4 className="font-semibold mb-2">Semester-wise Payment</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Pay per semester (4 installments over 2 years)
                </p>
                <div className="text-2xl font-bold text-primary">₹20K - ₹63K</div>
                <div className="text-sm text-muted-foreground">per semester</div>
              </div>
              <div className="border rounded-lg p-6">
                <h4 className="font-semibold mb-2">EMI Options</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  0% interest EMI for 6-24 months
                </p>
                <div className="text-2xl font-bold text-primary">₹3,499/mo</div>
                <div className="text-sm text-muted-foreground">starting from</div>
              </div>
            </div>
          </div>

          {/* Scholarships */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Scholarships & Discounts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Merit-Based Scholarship</div>
                  <div className="text-sm text-muted-foreground">10-50% fee waiver based on graduation marks</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Early Bird Discount</div>
                  <div className="text-sm text-muted-foreground">5-15% off for early admissions</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Category-Based Scholarships</div>
                  <div className="text-sm text-muted-foreground">Special discounts for SC/ST/OBC/Women candidates</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Is Online MBA cheaper than regular MBA?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, Online MBA costs 60-70% less than regular MBA. Regular MBA fees range from ₹5-25 lakhs, 
                  while Online MBA costs only ₹80K-2.5L. You also save on hostel, food, and transportation costs.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Are there hidden costs in Online MBA?</h4>
                <p className="text-sm text-muted-foreground">
                  Most universities include all costs in the fee structure. Only one-time registration fees (₹5K-10K) 
                  may be additional. Always ask for complete fee breakdown before admission.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Can I get education loan for Online MBA?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, most banks offer education loans for Online MBA from UGC-recognized universities. 
                  Interest rates range from 9.5-12% p.a. You can get loans up to ₹10 lakhs without collateral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Program */}
      {mba && (
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Online MBA Program</h2>
            <div className="max-w-md mx-auto">
              <DegreeCard degree={mba} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Get Personalized Fee Quote & Counselling
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Talk to our counselors to understand exact fees, EMI options, and available scholarships for your chosen university.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/degrees/mba">
                View MBA Programs
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
