'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, GraduationCap, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
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
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-6">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold">My College Sathi</span>
                  </Link>
                  
                  <nav className="flex flex-col gap-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg font-medium hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="flex flex-col gap-3 mt-4">
                    <a 
                      href="tel:+91XXXXXXXXXX" 
                      className="flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-muted"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call Now</span>
                    </a>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        setShowEnquiryForm(true);
                      }}
                    >
                      Get Free Counselling
                    </Button>
                  </div>
                </div>
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
