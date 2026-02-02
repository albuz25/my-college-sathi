import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

const degrees = [
  { name: 'MBA', href: '/degrees/mba' },
  { name: 'BBA', href: '/degrees/bba' },
  { name: 'MCA', href: '/degrees/mca' },
  { name: 'BCA', href: '/degrees/bca' },
  { name: 'M.Com', href: '/degrees/mcom' },
  { name: 'B.Com', href: '/degrees/bcom' },
];

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'All Degrees', href: '/degrees' },
  { name: 'Compare Degrees', href: '/compare' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/images/mycollegelogo.png"
                alt="My College Sathi"
                className="h-10 w-auto block scale-[1.06] origin-left"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-slate-400">
              Your trusted partner for online degree admissions. We help students find the right degree 
              from UGC-recognized universities with expert counselling support.
            </p>
          </div>

          {/* Popular Degrees */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Degrees</h3>
            <ul className="space-y-2">
              {degrees.map((degree) => (
                <li key={degree.name}>
                  <Link 
                    href={degree.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    Online {degree.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+918048048077" className="hover:text-primary">
                  080 4804 8077
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@adveducare.in" className="hover:text-primary">
                  info@adveducare.in
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} My College Sathi. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
