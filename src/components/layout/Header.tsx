'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, GraduationCap, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LeadMagnetForm } from '@/components/leads/LeadMagnetForm';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'All Degrees', href: '/degrees' },
  { name: 'Compare', href: '/compare' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">
                My College <span className="text-primary">Sathi</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
              <Button onClick={() => setShowEnquiryForm(true)}>
                Get Free Counselling
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] p-0">
                <SheetHeader className="border-b">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="leading-tight">
                      <SheetTitle className="text-base">My College Sathi</SheetTitle>
                      <SheetDescription className="text-xs">
                        Online degrees • Counselling • Admissions
                      </SheetDescription>
                    </div>
                  </div>
                </SheetHeader>

                <div className="px-4 py-4">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Menu</p>
                  <nav className="flex flex-col gap-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <SheetFooter className="border-t">
                  <Button asChild variant="outline" className="w-full justify-center gap-2">
                    <a href="tel:+91XXXXXXXXXX">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsOpen(false);
                      setShowEnquiryForm(true);
                    }}
                  >
                    Get Free Counselling
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    We typically respond within 24 hours
                  </p>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Enquiry Form Modal */}
      <LeadMagnetForm
        isOpen={showEnquiryForm}
        onClose={() => setShowEnquiryForm(false)}
        source="header_cta"
        variant="enquiry"
      />
    </>
  );
}
