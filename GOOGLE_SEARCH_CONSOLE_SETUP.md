# Google Search Console Setup Guide

This guide will help you set up Google Search Console (GSC) for My College Sathi website and complete the remaining SEO tasks.

## Prerequisites

- Access to your website's hosting/server
- Google account
- Admin access to your domain registrar

## Part 1: Setting Up Google Search Console

### Step 1: Verify Your Domain

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console
   - Sign in with your Google account

2. **Add Property**
   - Click "Add Property"
   - Choose "Domain" (not URL prefix)
   - Enter: `mycollegesathi.com`
   - Click "Continue"

3. **Verify Ownership**
   
   **Method A: DNS Verification (Recommended)**
   - Copy the TXT record provided by Google
   - Log in to your domain registrar (GoDaddy, Namecheap, etc.)
   - Add the TXT record to your DNS settings
   - Wait 24-48 hours for DNS propagation
   - Return to GSC and click "Verify"

   **Method B: HTML File Upload**
   - Download the HTML verification file
   - Upload to: `/public/` directory in your project
   - Deploy your website
   - Return to GSC and click "Verify"

   **Method C: HTML Tag**
   - Copy the meta tag provided
   - Add to `src/app/layout.tsx` in the `<head>` section:
   ```tsx
   <meta name="google-site-verification" content="YOUR_CODE_HERE" />
   ```
   - Deploy your website
   - Return to GSC and click "Verify"

### Step 2: Submit Sitemaps

Once verified:

1. **In GSC Dashboard**
   - Go to "Sitemaps" in the left sidebar
   - Click "Add a new sitemap"

2. **Submit Main Sitemap**
   - Enter: `sitemap.xml`
   - Click "Submit"

3. **Submit Image Sitemap**
   - Click "Add a new sitemap" again
   - Enter: `image-sitemap.xml`
   - Click "Submit"

4. **Verify Submission**
   - Wait 24-48 hours
   - Check that status shows "Success"
   - View submitted URLs count

## Part 2: Configure URL Parameters

### Step 1: Identify URL Parameters

Your website currently uses these URL parameters:
- `utm_source`, `utm_medium`, `utm_campaign` - Tracking parameters
- None for filtering (good!)

### Step 2: Configure in GSC

1. **In GSC Dashboard**
   - Go to "Settings" > "URL Parameters" (Legacy tools)
   - Note: This feature is being deprecated by Google

2. **Alternative: Use robots.txt**
   - These parameters don't affect SEO since they're tracking-only
   - Already handled in your implementation

## Part 3: Core Web Vitals Monitoring

### Step 1: Enable in GSC

1. **View Core Web Vitals Report**
   - In GSC Dashboard
   - Go to "Experience" > "Core Web Vitals"
   - Initially will show "No data available"
   - Data appears after 28 days of traffic

2. **Key Metrics to Monitor**
   - **LCP (Largest Contentful Paint)**: Should be < 2.5s
   - **FID (First Input Delay)**: Should be < 100ms
   - **CLS (Cumulative Layout Shift)**: Should be < 0.1

### Step 2: Set Up Weekly Monitoring

**Option A: Manual Monitoring**
- Visit GSC Core Web Vitals weekly
- Check for any "Poor" or "Needs Improvement" URLs
- Export reports for comparison

**Option B: Automated Monitoring (Recommended)**

1. **Use PageSpeed Insights API**
   - Get API key: https://developers.google.com/speed/docs/insights/v5/get-started
   - Set up weekly automated tests

2. **Use Lighthouse CI**
   ```bash
   npm install -g @lhci/cli
   lhci autorun --collect.url=https://mycollegesathi.com
   ```

3. **Set Up Alerts**
   - Use Google Analytics 4 to set up custom alerts
   - Configure email notifications for performance drops

### Step 3: Performance Optimization Checklist

Monitor these pages weekly:
- ✅ Homepage (/)
- ✅ Degrees listing (/degrees)
- ✅ Individual degree pages (/degrees/[slug])
- ✅ Compare page (/compare)
- ✅ Blog listing (/blog)
- ✅ Blog posts (/blog/[slug])

## Part 4: Additional GSC Features to Set Up

### 1. URL Inspection

- Use to test individual URLs
- Check indexing status
- Request indexing for new pages

### 2. Coverage Report

- Monitor indexing errors
- Fix "Excluded" pages
- Ensure important pages are indexed

### 3. Mobile Usability

- Check for mobile-friendly issues
- Fix any reported problems

### 4. Rich Results

- Monitor your structured data
- Check for errors in:
  - BreadcrumbList
  - Article (blog posts)
  - Course (degree pages)
  - FAQPage
  - Organization
  - LocalBusiness

### 5. Manual Actions

- Check weekly for any penalties
- Should always show "No issues detected"

## Part 5: Weekly Monitoring Checklist

Create a weekly routine:

**Every Monday:**
- [ ] Check Core Web Vitals status
- [ ] Review Coverage Report for errors
- [ ] Check Manual Actions
- [ ] Review Performance Report (clicks, impressions)
- [ ] Inspect top 5 pages for issues

**Monthly:**
- [ ] Export and compare Core Web Vitals data
- [ ] Review rich results status
- [ ] Check mobile usability report
- [ ] Analyze search queries and optimize content

**Quarterly:**
- [ ] Comprehensive SEO audit
- [ ] Review and update meta descriptions
- [ ] Check for broken links
- [ ] Update structured data as needed

## Part 6: Expected Timelines

- **Domain Verification**: 24-48 hours (DNS propagation)
- **First GSC Data**: 2-3 days after verification
- **Core Web Vitals Data**: 28 days of traffic needed
- **Full Indexing**: 1-2 weeks for all pages
- **Search Rankings**: 2-4 weeks to see improvements

## Part 7: Troubleshooting

### Sitemap Not Being Read

**Solution:**
1. Check sitemap URL is accessible: `https://mycollegesathi.com/sitemap.xml`
2. Validate sitemap at: https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. Resubmit in GSC

### Pages Not Indexed

**Solution:**
1. Check robots.txt: `https://mycollegesathi.com/robots.txt`
2. Verify no `noindex` meta tags
3. Request indexing via URL Inspection tool
4. Check for crawl errors in Coverage Report

### Poor Core Web Vitals

**Solution:**
1. Run Lighthouse audit
2. Optimize images (already implemented with next/image)
3. Reduce JavaScript bundle size
4. Implement lazy loading for below-fold content
5. Use CDN for static assets

## Part 8: Success Metrics

Track these KPIs:

**Traffic Metrics:**
- Organic search traffic (target: 30% month-over-month growth)
- Impressions (target: 50% increase in 3 months)
- Average position (target: < 10 for primary keywords)

**Technical Metrics:**
- Core Web Vitals: All "Good" (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Mobile usability: 0 errors
- Coverage: 95%+ valid pages

**Content Metrics:**
- Blog posts indexed: 100%
- Degree pages indexed: 100%
- Rich results appearing in search

## Support Resources

- Google Search Console Help: https://support.google.com/webmasters
- Core Web Vitals Guide: https://web.dev/vitals/
- PageSpeed Insights: https://pagespeed.web.dev/

---

## Quick Start Commands

After domain verification, run these checks:

```bash
# Check if sitemaps are accessible
curl https://mycollegesathi.com/sitemap.xml
curl https://mycollegesathi.com/image-sitemap.xml
curl https://mycollegesathi.com/robots.txt

# Run Lighthouse audit
npx lighthouse https://mycollegesathi.com --view

# Test mobile-friendliness
# Visit: https://search.google.com/test/mobile-friendly
```

---

**Note:** All technical implementations (sitemaps, structured data, performance optimizations) are already completed in your codebase. This guide covers only the manual Google Search Console setup and monitoring procedures.
