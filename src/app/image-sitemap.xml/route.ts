import { getDegrees } from '@/lib/mock-data';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mycollegesathi.com';
  const degrees = getDegrees();

  const images = [
    { loc: '/opengraph-image', title: 'My College Sathi - Online Degree Admissions' },
    { loc: '/twitter-image', title: 'My College Sathi Twitter Card' },
    { loc: '/images/mycollegelogo.png', title: 'My College Sathi Logo' },
    ...degrees.map(d => ({
      loc: `/degrees/${d.slug}/opengraph-image`,
      title: `Online ${d.name} - ${d.full_name}`,
      caption: d.description || `Pursue ${d.full_name} online from UGC-recognized universities`,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${images.map(img => `
  <url>
    <loc>${baseUrl}${img.loc}</loc>
    <image:image>
      <image:loc>${baseUrl}${img.loc}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      ${img.caption ? `<image:caption>${escapeXml(img.caption)}</image:caption>` : ''}
    </image:image>
  </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
