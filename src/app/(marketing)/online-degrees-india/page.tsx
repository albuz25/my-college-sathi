import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, TrendingUp, Clock, Shield } from 'lucide-react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { DegreeCard } from '@/components/degrees/DegreeCard';
import { getDegrees } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Online Degrees in India 2026 - UGC Approved Distance Education',
  description: 'Pursue UGC-approved online degrees from top universities. MBA, BBA, MCA, BCA, M.Com, B.Com available. Study while working, EMI options, 100% valid degrees, placement support.',
  alternates: {
    canonical: '/online-degrees-india',
  },
  openGraph: {
    title: 'Online Degrees in India | My College Sathi',
    description: 'UGC-approved online degrees from top Indian universities. Flexible learning, affordable fees, career growth.',
    type: 'website',
  },
};

export default function OnlineDegreesIndiaPage() {
  const degrees = getDegrees().slice(0, 6);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'Online Degrees in India', url: '/online-degrees-india' }]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Online Degrees in India - UGC Approved Distance Education 2026
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Pursue quality higher education from UGC-recognized universities. Study while you work, 
            affordable fees, EMI options, and 100% valid degrees accepted across India.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="border rounded-lg p-6 text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="font-bold mb-1">UGC Approved</div>
            <div className="text-sm text-muted-foreground">100% Valid Degrees</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="font-bold mb-1">Flexible Learning</div>
            <div className="text-sm text-muted-foreground">Study Anytime, Anywhere</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="font-bold mb-1">Career Growth</div>
            <div className="text-sm text-muted-foreground">40-60% Salary Hike</div>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <div className="font-bold mb-1">Placement Support</div>
            <div className="text-sm text-muted-foreground">100% Assistance</div>
          </div>
        </div>

        {/* What are Online Degrees */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">What are Online Degrees?</h2>
          <div className="prose max-w-none text-muted-foreground">
            <p className="mb-4">
              Online degrees are academic programs delivered entirely through digital platforms by UGC-recognized universities. 
              These degrees are equivalent to regular on-campus degrees and are accepted by employers and government bodies across India.
            </p>
            <p className="mb-4">
              Students access live classes, recorded lectures, study materials, and exams through online learning management systems. 
              This flexible learning model is perfect for working professionals, homemakers, and anyone unable to attend regular classes.
            </p>
          </div>
        </div>

        {/* Popular Online Degrees */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Online Degree Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {degrees.map((degree) => (
              <DegreeCard key={degree.id} degree={degree} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/degrees">View All Degrees</Link>
            </Button>
          </div>
        </div>

        {/* Why Choose Online Degrees */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Choose Online Degrees?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Flexibility',
                desc: 'Study at your own pace and schedule. No need to quit your job or relocate.',
              },
              {
                title: 'Affordability',
                desc: 'Save 50-70% on fees compared to regular programs. EMI options available.',
              },
              {
                title: 'Quality Education',
                desc: 'Same curriculum and faculty as regular programs from top universities.',
              },
              {
                title: 'Career Advancement',
                desc: 'Boost your career with recognized qualifications while working.',
              },
              {
                title: 'No Age Limit',
                desc: 'Perfect for career restarters, homemakers, and lifelong learners.',
              },
              {
                title: 'Digital Skills',
                desc: 'Gain technology skills highly valued by modern employers.',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="border rounded-lg p-6">
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* UGC Recognition */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">UGC Recognition - Why It Matters</h2>
          <p className="text-muted-foreground mb-4">
            The University Grants Commission (UGC) has officially recognized online and distance education, 
            making these degrees equal to regular degrees for all purposes including:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Government and private sector employment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Higher education and PhD admission</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Competitive exams (UPSC, Banking, SSC)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Professional licenses and certifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              <span>Visa and immigration purposes</span>
            </li>
          </ul>
        </div>

        {/* Who Should Pursue */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Who Should Pursue Online Degrees?</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Working Professionals',
                desc: 'Upskill without career breaks. Study during evenings and weekends.',
              },
              {
                title: 'Fresh Graduates',
                desc: 'Continue education while gaining work experience and earning.',
              },
              {
                title: 'Homemakers',
                desc: 'Restart your career with flexible learning from home.',
              },
              {
                title: 'Entrepreneurs',
                desc: 'Gain business knowledge while managing your ventures.',
              },
              {
                title: 'Career Switchers',
                desc: 'Get qualified for new career paths without full-time commitment.',
              },
              {
                title: 'Remote Location Residents',
                desc: 'Access quality education without relocating to cities.',
              },
            ].map((who) => (
              <div key={who.title} className="flex gap-4 border rounded-lg p-4">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <div className="font-semibold">{who.title}</div>
                  <div className="text-sm text-muted-foreground">{who.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Universities */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Top Universities for Online Degrees</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: 'Amity University Online', grade: 'NAAC A+', fee: '₹60K-2L' },
              { name: 'NMIMS Global Access', grade: 'NAAC A+', fee: '₹80K-2.5L' },
              { name: 'Manipal University Online', grade: 'NAAC A+', fee: '₹70K-2L' },
              { name: 'Jain University Online', grade: 'NAAC A++', fee: '₹60K-1.8L' },
              { name: 'Chandigarh University', grade: 'NAAC A+', fee: '₹60K-1.8L' },
              { name: 'LPU Distance Education', grade: 'NAAC A+', fee: '₹50K-1.5L' },
            ].map((uni) => (
              <div key={uni.name} className="border rounded-lg p-4">
                <div className="font-semibold">{uni.name}</div>
                <div className="text-sm text-muted-foreground flex justify-between mt-1">
                  <span>{uni.grade}</span>
                  <span>{uni.fee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Process */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6">Simple Admission Process</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Choose Program', desc: 'Select degree and specialization' },
              { step: '2', title: 'Check Eligibility', desc: 'Verify requirements' },
              { step: '3', title: 'Apply Online', desc: 'Fill application form' },
              { step: '4', title: 'Start Learning', desc: 'Get instant access' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {item.step}
                </div>
                <div className="font-semibold mb-1">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Are online degrees valid in India?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, online degrees from UGC-recognized universities are 100% valid and equivalent to regular degrees for all purposes including jobs, higher education, and competitive exams.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">How much do online degrees cost?</h4>
              <p className="text-sm text-muted-foreground">
                Online degree fees range from ₹45,000 to ₹2,50,000 depending on the program and university. This is 50-70% cheaper than regular programs. EMI options available from ₹2,499/month.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Can I work while pursuing an online degree?</h4>
              <p className="text-sm text-muted-foreground">
                Absolutely! Online degrees are designed for working professionals. You can study at your own pace, attend classes in evenings or weekends, and balance work and education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Start Your Online Degree Journey Today
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get personalized guidance on choosing the right degree, university, and specialization. 
            Our counselors are here to help!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/degrees">
                Explore All Degrees
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
