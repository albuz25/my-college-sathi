# Meta Pixel Setup Guide

## ✅ Installation Complete!

Your Meta Pixel (ID: 1629997088358557) has been successfully installed on your website.

## 📊 Events Being Tracked

### Automatic Events

1. **PageView** - Tracked on every page automatically
   - Initial page load
   - Every route change (navigation)

2. **ViewContent** - When users view degree pages
   - Tracks: degree name, category, average value
   - Helps optimize ads for people interested in specific degrees

### Conversion Events

3. **Lead** - When users submit forms
   - Hero form on homepage
   - Enquiry forms on degree cards
   - Enquiry forms on degree detail pages
   - Tracks: degree interested, form type, value

4. **Download** - When users download brochures
   - Tracks: brochure name

## 🎯 How to Use This Data

### In Facebook Ads Manager

1. **View Events**
   - Go to Events Manager (business.facebook.com/events_manager)
   - Click on your Pixel (1629997088358557)
   - View real-time events in the "Test Events" tab

2. **Create Custom Audiences**
   - People who viewed specific degrees (ViewContent)
   - People who submitted lead forms (Lead)
   - People who downloaded brochures (Download)

3. **Create Conversion Campaigns**
   - Optimize for "Lead" event
   - Set up conversion tracking
   - Measure cost per lead (CPL)

4. **Retargeting Campaigns**
   - Target people who viewed degrees but didn't submit
   - Target people who viewed multiple degrees
   - Exclude people who already submitted leads

### Creating a Custom Conversion

1. Go to Events Manager → Custom Conversions
2. Click "Create Custom Conversion"
3. Set up rules:
   - Event: Lead
   - Where content_category equals "Hero Form"
   - Name it: "Homepage Lead Submission"

## 📈 Expected Data Points

### You'll See in Facebook:

**Event Parameters**:
- `content_name` - Degree name (MBA, BBA, etc.)
- `content_category` - Form type (Hero Form, Enquiry Form, etc.)
- `content_type` - "degree"
- `value` - Estimated value (average fee)
- `currency` - INR

## 🔍 Testing the Installation

### Method 1: Meta Pixel Helper (Chrome Extension)

1. Install "Meta Pixel Helper" from Chrome Web Store
2. Visit your website
3. Click the extension icon
4. You should see:
   - ✅ PageView event firing
   - ✅ Pixel ID: 1629997088358557

### Method 2: Events Manager Test Events

1. Go to Events Manager → Test Events
2. Enter your website URL
3. Click "Open Website"
4. Interact with forms
5. See events appear in real-time

### Method 3: Browser Console

1. Open your website
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Type: `fbq('track', 'Test')`
5. Check Events Manager to see if it logged

## 🎨 Advanced: Adding More Events

If you want to track additional actions, you can add more events:

```typescript
import { trackMetaEvent } from '@/components/analytics/MetaPixel';

// Track button clicks
trackMetaEvent('InitiateCheckout', {
  content_name: 'Application Started',
  value: 100,
  currency: 'INR',
});

// Track specific actions
trackMetaEvent('AddToCart', {
  content_name: 'Degree Added to Compare',
});

// Track search
trackMetaEvent('Search', {
  search_string: 'MBA online',
});
```

## 📱 What's Tracked

✅ **Currently Tracking:**
- All page views (automatic)
- Degree page views (ViewContent)
- Lead form submissions (Lead)
- Brochure downloads (Download)

❌ **Not Yet Tracked (you can add):**
- Compare degree clicks
- Phone call button clicks
- WhatsApp button clicks
- Video plays (if you add videos)
- Scroll depth

## 🚀 Next Steps

1. **Wait 24-48 hours** for data to accumulate
2. **Verify events** in Events Manager
3. **Create audiences** based on behaviors
4. **Set up campaigns** targeting these audiences
5. **Optimize** based on which degrees get most engagement

## 💡 Pro Tips

### Audience Ideas

1. **Hot Leads**
   - Viewed 3+ degree pages
   - Spent 3+ minutes on site
   - Didn't submit form

2. **Degree-Specific**
   - Viewed MBA pages only
   - Create MBA-specific ads

3. **Comparison Shoppers**
   - Used compare feature
   - Show social proof ads

### Campaign Types

1. **Awareness** → Optimize for PageView
2. **Consideration** → Optimize for ViewContent
3. **Conversion** → Optimize for Lead

## 🔧 Troubleshooting

### Pixel Not Showing Events?

1. Check if ad blockers are on (they block pixels)
2. Clear cache and reload
3. Check browser console for errors
4. Verify Pixel ID is correct: 1629997088358557

### Events Not in Events Manager?

1. Wait 15-20 minutes (delay is normal)
2. Check if you're in Test Mode
3. Verify domain ownership
4. Check for browser extensions blocking

## 📞 Support

If you need help:
1. Meta Business Help Center: business.facebook.com/help
2. Events Manager: business.facebook.com/events_manager
3. Test Events: Very helpful for debugging

---

## 🎉 You're All Set!

Your Meta Pixel is now tracking user behavior and conversions. This data will help you:
- Understand which degrees are most popular
- Optimize your ad spending
- Retarget interested users
- Measure true ROI on ads
- Build lookalike audiences

Start running Facebook/Instagram ads and watch the data flow in!
