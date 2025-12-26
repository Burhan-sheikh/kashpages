# Sitemap & Robots.txt Configuration

This document explains how to set up sitemap.xml and robots.txt for KashPages.

---

## Sitemap.xml

### Purpose
- Help search engines discover and index all published pages
- Improve SEO by providing clear site structure
- Update automatically when pages are published/unpublished

### Implementation Options

#### Option 1: Dynamic Server-Side (Recommended for Netlify)

Create a Netlify Function to generate sitemap dynamically:

**File:** `netlify/functions/sitemap.js`

```javascript
const admin = require('firebase-admin')

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  })
}

const db = admin.firestore()

exports.handler = async (event, context) => {
  try {
    // Get all published pages
    const pagesSnapshot = await db
      .collection('pages')
      .where('published', '==', true)
      .get()

    const pages = []
    pagesSnapshot.forEach(doc => {
      const data = doc.data()
      const isNotExpired = !data.expiryDate || new Date(data.expiryDate) > new Date()
      if (data.isPaid && isNotExpired) {
        pages.push({
          slug: data.slug,
          updatedAt: data.updatedAt || data.createdAt
        })
      }
    })

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>https://kashpages.in/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kashpages.in/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kashpages.in/plans</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://kashpages.in/explore</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://kashpages.in/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Business Pages -->
  ${pages.map(page => `
  <url>
    <loc>https://kashpages.in/${page.slug}</loc>
    <lastmod>${page.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: xml
    }
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return {
      statusCode: 500,
      body: 'Error generating sitemap'
    }
  }
}
```

**File:** `netlify.toml`

```toml
[[redirects]]
  from = "/sitemap.xml"
  to = "/.netlify/functions/sitemap"
  status = 200
  force = true
```

#### Option 2: Static Generation (Build Time)

Generate sitemap during build:

**File:** `scripts/generate-sitemap.js`

```javascript
const admin = require('firebase-admin')
const fs = require('fs')
const path = require('path')

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
})

const db = admin.firestore()

async function generateSitemap() {
  const pagesSnapshot = await db
    .collection('pages')
    .where('published', '==', true)
    .get()

  const pages = []
  pagesSnapshot.forEach(doc => {
    const data = doc.data()
    const isNotExpired = !data.expiryDate || new Date(data.expiryDate) > new Date()
    if (data.isPaid && isNotExpired) {
      pages.push({
        slug: data.slug,
        updatedAt: data.updatedAt || data.createdAt
      })
    }
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kashpages.in/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://kashpages.in/explore</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${pages.map(page => `
  <url>
    <loc>https://kashpages.in/${page.slug}</loc>
    <lastmod>${page.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`

  fs.writeFileSync(
    path.join(__dirname, '../public/sitemap.xml'),
    xml
  )
  
  console.log('Sitemap generated successfully!')
}

generateSitemap()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
```

Add to `package.json`:

```json
{
  "scripts": {
    "build": "npm run generate-sitemap && vite build",
    "generate-sitemap": "node scripts/generate-sitemap.js"
  }
}
```

---

## robots.txt

### Purpose
- Tell search engines which pages to crawl
- Link to sitemap
- Control bot behavior

### Implementation

**File:** `public/robots.txt`

```
# Allow all search engines
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /signup

# Disallow API endpoints (if any)
Disallow: /api/
Disallow: /.netlify/

# Sitemap
Sitemap: https://kashpages.in/sitemap.xml

# Crawl delay (optional - be nice to servers)
Crawl-delay: 1
```

---

## Google Search Console Setup

### 1. Verify Domain Ownership

**Method A: HTML File Verification**

1. Get verification file from Google Search Console
2. Place in `public/google[code].html`
3. Deploy
4. Verify in Google Search Console

**Method B: DNS Verification**

1. Add TXT record to your DNS
2. Wait for DNS propagation
3. Verify in Google Search Console

### 2. Submit Sitemap

1. Go to Google Search Console
2. Navigate to Sitemaps section
3. Add sitemap URL: `https://kashpages.in/sitemap.xml`
4. Submit

### 3. Monitor Indexing

- Check "Coverage" report
- Review "Performance" data
- Fix any errors reported

---

## Local SEO Optimization

### For Each Business Page

```html
<!-- Already implemented in LandingRenderer.jsx -->
<head>
  <!-- Title -->
  <title>Business Name - Kashmir | KashPages</title>
  
  <!-- Description -->
  <meta name="description" content="Description with Kashmir, Srinagar keywords" />
  
  <!-- Local Business Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Business Name",
    "image": "https://kashpages.in/image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Street Address",
      "addressLocality": "Srinagar",
      "addressRegion": "Jammu and Kashmir",
      "postalCode": "190001",
      "addressCountry": "IN"
    },
    "telephone": "+91-XXXX-XXXX",
    "url": "https://kashpages.in/business-slug"
  }
  </script>
</head>
```

---

## Canonical URLs

### Already Implemented

In `LandingRenderer.jsx`:

```jsx
<link rel="canonical" href={`https://kashpages.in/${page.slug}`} />
```

This prevents duplicate content issues.

---

## Social Media Meta Tags

### Already Implemented

In `LandingRenderer.jsx`:

```jsx
<!-- Open Graph (Facebook, LinkedIn) -->
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://kashpages.in/slug" />
<meta property="og:image" content="Image URL" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="Image URL" />
```

---

## Monitoring & Maintenance

### Weekly Tasks
1. Check Google Search Console for errors
2. Monitor page indexing status
3. Review crawl stats

### Monthly Tasks
1. Update sitemap (if static)
2. Check for expired pages
3. Review SEO performance
4. Update meta descriptions if needed

### Tools
- Google Search Console
- Google Analytics (optional)
- Sitemap validator: https://www.xml-sitemaps.com/validate-xml-sitemap.html

---

## Testing

### Sitemap Validation

```bash
# Test locally
curl http://localhost:5173/sitemap.xml

# Test production
curl https://kashpages.in/sitemap.xml
```

### Robots.txt Validation

```bash
curl https://kashpages.in/robots.txt
```

### Google Rich Results Test

https://search.google.com/test/rich-results

---

## Phase 3 Status: Complete

✅ Sitemap strategy defined  
✅ Robots.txt configured  
✅ SEO meta tags implemented  
✅ Canonical URLs added  
✅ Social media cards ready  
✅ Google indexing ready  

**Next:** Implement chosen sitemap strategy (Option 1 recommended for Netlify)
