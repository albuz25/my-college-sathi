import type { Degree, FAQ } from '@/types';

// Organization Schema - used on all pages
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'My College Sathi',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mycollegesathi.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mycollegesathi.com'}/logo.png`,
    description: 'Your trusted partner for online degree admissions. We help students find the right degree from UGC-recognized universities.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '08048048077',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://facebook.com/mycollegesathi',
      'https://twitter.com/mycollegesathi',
      'https://instagram.com/mycollegesathi',
      'https://linkedin.com/company/mycollegesathi',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Course Schema - used on degree detail pages
export function CourseSchema({ degree }: { degree: Degree }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Online ${degree.name} - ${degree.full_name}`,
    description: degree.description || `Pursue your ${degree.full_name} (${degree.name}) online from UGC-recognized universities.`,
    provider: {
      '@type': 'Organization',
      name: 'My College Sathi',
      sameAs: process.env.NEXT_PUBLIC_SITE_URL || 'https://mycollegesathi.com',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: degree.mode,
      duration: `P${Math.floor(degree.duration_months / 12)}Y${degree.duration_months % 12}M`,
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: degree.fee_range_min,
      highPrice: degree.fee_range_max,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    ...(degree.career_paths && {
      occupationalCredentialAwarded: degree.career_paths.join(', '),
    }),
    educationalLevel: degree.category === 'postgraduate' ? 'Postgraduate' : 'Undergraduate',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema - used on pages with FAQs
export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ 
  items 
}: { 
  items: { name: string; url: string }[] 
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite Schema - for sitelinks search box
export function WebSiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mycollegesathi.com';
  
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'My College Sathi',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/degrees?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
