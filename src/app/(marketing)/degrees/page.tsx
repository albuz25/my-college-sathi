import { Metadata } from 'next';
import { DegreeCard } from '@/components/degrees/DegreeCard';
import { PartnerUniversitiesSection } from '@/components/partners/PartnerUniversitiesSection';
import { DegreeFilters } from '@/components/degrees/DegreeFilters';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { getDegrees } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'All Online Degrees',
  description: 'Explore all online degree programs - MBA, BBA, MCA, BCA, M.Com, B.Com and more from UGC-recognized universities.',
  alternates: {
    canonical: '/degrees',
  },
};

export default function DegreesPage() {
  const degrees = getDegrees();

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary/10 to-background py-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ name: 'All Degrees', url: '/degrees' }]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            All Online Degree Programs - UGC Recognized Universities
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Find the perfect online degree program from our partner universities. 
            Compare programs, check eligibility, and get expert counselling.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <DegreeFilters />
            </aside>

            {/* Degree Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{degrees.length}</span> degrees
                </p>
                <select className="px-4 py-2 border rounded-lg bg-background">
                  <option value="popular">Sort by: Popular</option>
                  <option value="fee-low">Fee: Low to High</option>
                  <option value="fee-high">Fee: High to Low</option>
                  <option value="duration">Duration</option>
                </select>
              </div>

              {/* Degree Cards Grid */}
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {degrees.map((degree) => (
                  <DegreeCard 
                    key={degree.id} 
                    degree={degree}
                    showCompare={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Universities */}
      <PartnerUniversitiesSection />
    </>
  );
}
