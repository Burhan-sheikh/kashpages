// Netlify Function to generate dynamic sitemap
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin (only once)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  })
}

const db = getFirestore()

export const handler = async (event, context) => {
  try {
    // Get all published pages from Firestore
    const pagesSnapshot = await db
      .collection('pages')
      .where('status', '==', 'published')
      .get()

    const pages = []
    pagesSnapshot.forEach(doc => {
      const data = doc.data()
      pages.push({
        slug: data.slug,
        updatedAt: data.updatedAt || data.createdAt
      })
    })

    // Generate XML sitemap
    const domain = process.env.VITE_APP_URL || 'https://kashpages.in'
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    // Homepage
    xml += '  <url>\n'
    xml += `    <loc>${domain}/</loc>\n`
    xml += '    <changefreq>weekly</changefreq>\n'
    xml += '    <priority>1.0</priority>\n'
    xml += '  </url>\n'
    
    // Explore page
    xml += '  <url>\n'
    xml += `    <loc>${domain}/explore</loc>\n`
    xml += '    <changefreq>daily</changefreq>\n'
    xml += '    <priority>0.9</priority>\n'
    xml += '  </url>\n'
    
    // Landing pages
    pages.forEach(page => {
      xml += '  <url>\n'
      xml += `    <loc>${domain}/${page.slug}</loc>\n`
      if (page.updatedAt) {
        const date = new Date(page.updatedAt.seconds * 1000)
        xml += `    <lastmod>${date.toISOString().split('T')[0]}</lastmod>\n`
      }
      xml += '    <changefreq>monthly</changefreq>\n'
      xml += '    <priority>0.8</priority>\n'
      xml += '  </url>\n'
    })
    
    xml += '</urlset>'

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: xml
    }
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return {
      statusCode: 500,
      body: 'Error generating sitemap'
    }
  }
}
