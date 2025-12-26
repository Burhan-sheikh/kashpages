import { useParams, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { Helmet } from 'react-helmet-async'
import NoticeModal from '../../components/landing/NoticeModal'
import { Phone, MessageCircle, Instagram, MapPin, ExternalLink } from 'lucide-react'

export default function LandingRenderer() {
  const { businessSlug } = useParams()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showNotice, setShowNotice] = useState(false)

  useEffect(() => {
    loadPage()
  }, [businessSlug])

  const loadPage = async () => {
    try {
      const q = query(
        collection(db, 'pages'),
        where('slug', '==', businessSlug),
        where('published', '==', true)
      )
      const snapshot = await getDocs(q)
      
      if (snapshot.empty) {
        setNotFound(true)
      } else {
        const pageData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() }
        setPage(pageData)
        
        // Show notice if published but not paid
        if (!pageData.isPaid) {
          setShowNotice(true)
        }
      }
    } catch (error) {
      console.error('Error loading page:', error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Not found
  if (notFound || !page) {
    return <Navigate to="/404" replace />
  }

  // Check if expired
  const isExpired = page.expiryDate && new Date(page.expiryDate) < new Date()
  if (isExpired) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Expired</h1>
          <p className="text-gray-600 mb-6">
            This page's subscription has expired. Please contact the business owner to renew.
          </p>
          <a
            href="/explore"
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Explore Other Businesses
          </a>
        </div>
      </div>
    )
  }

  // Render page
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{page.seoTitle || page.title}</title>
        <meta name="description" content={page.metaDescription || `${page.title} - Professional business page on KashPages`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={page.seoTitle || page.title} />
        <meta property="og:description" content={page.metaDescription || `${page.title} - Professional business page on KashPages`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://kashpages.in/${page.slug}`} />
        {page.ogImage && <meta property="og:image" content={page.ogImage} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.seoTitle || page.title} />
        <meta name="twitter:description" content={page.metaDescription || `${page.title} - Professional business page on KashPages`} />
        {page.ogImage && <meta name="twitter:image" content={page.ogImage} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://kashpages.in/${page.slug}`} />
      </Helmet>

      {/* Notice Modal */}
      {showNotice && (
        <NoticeModal onClose={() => setShowNotice(false)} />
      )}

      {/* Page Content */}
      {page.content ? (
        // Custom HTML content
        <div
          className="landing-page-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      ) : (
        // Fallback default template
        <DefaultTemplate page={page} />
      )}

      {/* KashPages Branding Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              Published by{' '}
              <a href="/" className="font-medium text-gray-900 hover:text-gray-700">
                KashPages
              </a>
            </p>
            <a
              href="/contact"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Get your own page
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

// Default template fallback
function DefaultTemplate({ page }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            {page.title}
          </h1>
          {page.metaDescription && (
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {page.metaDescription}
            </p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Get in Touch
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <a
              href="tel:+919999999999"
              className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Call Us</p>
                <p className="text-sm text-gray-600">+91-XXXX-XXXX</p>
              </div>
            </a>
            
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-gray-900" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600">Message us</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
