import type { Metadata } from 'next';
import { ComparePageClient } from './ComparePageClient';

export const metadata: Metadata = {
  title: 'Compare Online Degrees - MBA, BBA, MCA, BCA',
  description: 'Compare online degree programs side-by-side. Check fees, duration, eligibility, and placement rates from UGC-recognized universities.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Compare Online Degrees | My College Sathi',
    description: 'Make informed decisions by comparing fees, duration, and career outcomes of online degrees.',
    type: 'website',
  },
};

export default function ComparePage() {
  return <ComparePageClient />;
}
