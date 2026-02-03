'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Phone } from 'lucide-react';
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
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {!logoFailed ? (
                <img
                  src="/images/mycollegelogo.png"
                  alt="My College Sathi"
                  className="h-10 w-auto block scale-[1.08] origin-left"
                  loading="eager"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <span className="text-base font-bold text-foreground">
                  My College Sathi
                </span>
              )}
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
              <a href="tel:08048048077" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
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
                  <Link
                    href="/"
                    className="inline-flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {!logoFailed ? (
                      <img
                        src="/images/mycollegelogo.png"
                        alt="My College Sathi"
                        className="h-10 w-auto block scale-[1.08] origin-left"
                        loading="eager"
                        onError={() => setLogoFailed(true)}
                      />
                    ) : (
                      <span className="text-base font-bold text-foreground">
                        My College Sathi
                      </span>
                    )}
                  </Link>
                  {/* Keep these exports in use even when logo replaces text */}
                  <SheetTitle className="sr-only">My College Sathi</SheetTitle>
                  <SheetDescription className="sr-only">
                    Online degrees, counselling and admissions
                  </SheetDescription>
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
                    <a href="tel:08048048077">
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
