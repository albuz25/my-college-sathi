'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbSchema } from './JsonLd';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: 'Home', url: '/' }, ...items];
  
  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          {allItems.map((item, idx) => (
            <li key={item.url} className="flex items-center gap-2">
              {idx > 0 && <ChevronRight className="h-4 w-4" />}
              {idx === allItems.length - 1 ? (
                <span className="font-medium text-foreground">{item.name}</span>
              ) : (
                <Link href={item.url} className="hover:text-primary">
                  {idx === 0 ? <Home className="h-4 w-4" /> : item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
