import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CompareBasketBar } from '@/components/degrees/CompareBasketBar';
import { WhatsAppButton } from '@/components/leads/WhatsAppButton';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20">{children}</main>
      <Footer />
      <CompareBasketBar />
      <WhatsAppButton />
    </div>
  );
}
