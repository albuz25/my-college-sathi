import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Online MBA Eligibility Criteria 2026 - Requirements & Documents',
  description: 'Complete Online MBA eligibility criteria: Bachelor\'s degree any stream, 50% marks, work experience optional. Check documents required, age limit, and admission process for UGC universities.',
  alternates: {
    canonical: '/online-mba-eligibility',
  },
  openGraph: {
    title: 'Online MBA Eligibility | My College Sathi',
    description: 'Check if you\'re eligible for Online MBA. Bachelor\'s degree required, any stream accepted, 50% marks minimum.',
    type: 'website',
  },
};

export default function OnlineMBAEligibilityPage() {
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
                name: 'What is the eligibility for Online MBA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'To be eligible for Online MBA, you need: (1) Bachelor\'s degree from a recognized university in any stream, (2) Minimum 50% marks (45% for reserved categories), (3) Valid ID proof. Work experience is not mandatory but preferred by some universities.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can I do Online MBA after B.Com/B.Sc/BA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, you can pursue Online MBA after completing a Bachelor\'s degree in any stream including B.Com, B.Sc, BA, BCA, BBA, or Engineering. The degree must be from a UGC-recognized university.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is work experience mandatory for Online MBA?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No, work experience is not mandatory for most Online MBA programs. However, having 1-2 years of work experience can be beneficial for better understanding of business concepts and may provide preference in some universities.',
                },
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Online MBA Eligibility', url: '/online-mba-eligibility' }]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Online MBA Eligibility Criteria 2026 - Complete Requirements
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Detailed eligibility criteria, document requirements, and admission process for Online MBA from UGC-recognized universities in India.
          </p>
        </div>
      </section>

      {/* Quick Eligibility Check */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Quick Eligibility Check
            </h2>
            <div className="space-y-3">
              {[
                'Bachelor\'s degree in any stream (any university)',
                'Minimum 50% marks in graduation (45% for SC/ST/OBC)',
                'Final year students can also apply',
                'No age limit',
                'Work experience not mandatory (but preferred)',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Eligibility */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Detailed Eligibility Criteria</h2>
            
            <div className="space-y-6">
              {/* Educational Qualification */}
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">1. Educational Qualification</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Bachelor's Degree (Any Stream)</div>
                      <div className="text-sm text-muted-foreground">
                        B.Com, BBA, BA, B.Sc, BCA, B.Tech, Engineering - All accepted
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">From Recognized University</div>
                      <div className="text-sm text-muted-foreground">
                        UGC/AICTE recognized universities, including distance/online degrees
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Final Year Students</div>
                      <div className="text-sm text-muted-foreground">
                        Can apply provisionally (must submit degree before MBA completion)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimum Marks */}
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">2. Minimum Percentage Requirement</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">50%</div>
                    <div className="text-sm text-muted-foreground">General Category</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">45%</div>
                    <div className="text-sm text-muted-foreground">SC/ST/OBC</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">Pass</div>
                    <div className="text-sm text-muted-foreground">Some Universities</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                  <AlertCircle className="inline h-4 w-4 mr-1" />
                  Note: Some universities have relaxed criteria and accept graduates with pass marks
                </div>
              </div>

              {/* Work Experience */}
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">3. Work Experience</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Not Mandatory</div>
                      <div className="text-sm text-muted-foreground">
                        Most universities don't require work experience for Online MBA
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Preferred (1-2 years)</div>
                      <div className="text-sm text-muted-foreground">
                        Work experience helps in better understanding of management concepts
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Executive MBA Programs</div>
                      <div className="text-sm text-muted-foreground">
                        Executive MBA may require 3-5 years of work experience
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Age Criteria */}
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">4. Age Limit</h3>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">No Age Limit</div>
                    <div className="text-sm text-muted-foreground">
                      Candidates of any age can apply for Online MBA programs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Required */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Documents Required for Admission</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: '10th Mark Sheet',
                  desc: 'Original + photocopy',
                },
                {
                  title: '12th Mark Sheet',
                  desc: 'Original + photocopy',
                },
                {
                  title: 'Bachelor\'s Degree',
                  desc: 'Provisional/final degree certificate',
                },
                {
                  title: 'Bachelor\'s Mark Sheets',
                  desc: 'All semester/year mark sheets',
                },
                {
                  title: 'ID Proof',
                  desc: 'Aadhar/PAN/Passport/Voter ID',
                },
                {
                  title: 'Passport Photos',
                  desc: '4-6 recent passport-size photos',
                },
                {
                  title: 'Category Certificate',
                  desc: 'SC/ST/OBC certificate (if applicable)',
                },
                {
                  title: 'Work Experience',
                  desc: 'Experience letter (if applicable)',
                },
              ].map((doc) => (
                <div key={doc.title} className="flex items-start gap-3 border rounded-lg p-4">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="text-sm text-muted-foreground">{doc.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Process */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Admission Process</h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Check Eligibility',
                  desc: 'Verify you meet the eligibility criteria',
                },
                {
                  step: '2',
                  title: 'Choose University & Specialization',
                  desc: 'Select from MBA specializations: Finance, Marketing, HR, Operations',
                },
                {
                  step: '3',
                  title: 'Fill Online Application',
                  desc: 'Complete application form with accurate details',
                },
                {
                  step: '4',
                  title: 'Upload Documents',
                  desc: 'Scan and upload all required documents',
                },
                {
                  step: '5',
                  title: 'Pay Application Fee',
                  desc: 'Pay nominal application fee (₹500-1000)',
                },
                {
                  step: '6',
                  title: 'Counselling (if required)',
                  desc: 'Attend counselling session (online/phone)',
                },
                {
                  step: '7',
                  title: 'Pay Admission Fee',
                  desc: 'Pay first semester/installment fee',
                },
                {
                  step: '8',
                  title: 'Get Enrollment',
                  desc: 'Receive student ID and LMS access',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start border rounded-lg p-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Who Can Apply */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Who Can Apply for Online MBA?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Eligible Candidates
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• Working professionals from any field</li>
                  <li>• Fresh graduates (any stream)</li>
                  <li>• Homemakers wanting career restart</li>
                  <li>• Entrepreneurs/business owners</li>
                  <li>• Career switchers to management</li>
                  <li>• Graduates with gap years</li>
                  <li>• Final year graduation students</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-red-600 flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  Not Eligible
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>• 12th pass (need Bachelor's degree)</li>
                  <li>• Diploma holders (without degree)</li>
                  <li>• Non-recognized university graduates</li>
                  <li>• Below 45% marks (unless relaxation)</li>
                  <li>• Fake/unverified degree holders</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Can I do MBA after B.Com without work experience?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can pursue Online MBA immediately after B.Com without work experience. 
                  Most universities don't mandate work experience for MBA admission.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Is CAT/GMAT required for Online MBA?</h4>
                <p className="text-sm text-muted-foreground">
                  No, most Online MBA programs don't require CAT, GMAT, or any entrance exam. 
                  Admissions are based on graduation marks and direct application.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Can Arts students do MBA?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, BA (Arts) graduates are eligible for MBA. MBA accepts students from all streams 
                  including Arts, Science, Commerce, and Engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Check Your Eligibility & Apply Today
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Our counselors will verify your eligibility and guide you through the admission process. 
            Get started in 5 minutes!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/degrees/mba">
                View MBA Programs
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white hover:bg-white/90" asChild>
              <Link href="/degrees#enquire">
                Get Eligibility Checked
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
