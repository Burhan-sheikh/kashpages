import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPageBySlug } from '../../firebase/pages.service'
import SeoHead from '../../components/seo/SeoHead'
import DOMPurify from 'dompurify'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { AlertCircle } from 'lucide-react'

export default function LandingRenderer() {
  const { businessSlug } = useParams()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showUnpaidNotice, setShowUnpaidNotice] = useState(false)
  const [useIframe, setUseIframe] = useState(false)
  const iframeRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    loadPage()
  }, [businessSlug])

  useEffect(() => {
    // Check if page HTML is a complete HTML document
    if (page?.html) {
      const hasHtmlTag = page.html.toLowerCase().includes('<html')
      const hasDoctype = page.html.toLowerCase().includes('<!doctype')
      setUseIframe(hasHtmlTag || hasDoctype)
    }
  }, [page])

  useEffect(() => {
    // Execute scripts in content after rendering
    if (!useIframe && contentRef.current && page?.html) {
      const scripts = contentRef.current.querySelectorAll('script')
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script')
        
        // Copy attributes
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value)
        })
        
        // Copy content or src
        if (oldScript.src) {
          newScript.src = oldScript.src
        } else {
          newScript.textContent = oldScript.textContent
        }
        
        // Replace old script with new one to execute it
        oldScript.parentNode.replaceChild(newScript, oldScript)
      })
    }
  }, [page, useIframe])

  const loadPage = async () => {
    try {
      const pageData = await getPageBySlug(businessSlug)
      
      if (!pageData) {
        setError('Page not found')
        return
      }

      // Only show published pages to public
      if (pageData.status !== 'published') {
        setError('This page is not published yet.')
        return
      }

      // Check if page should show unpaid notice
      if (pageData.status === 'published' && !pageData.isPaid) {
        setShowUnpaidNotice(true)
      }

      setPage(pageData)
    } catch (err) {
      console.error('Error loading page:', err)
      if (err.code === 'permission-denied') {
        setError('This page is not available.')
      } else {
        setError('Failed to load page. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page...</p>
        </div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md px-4">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error === 'Page not found' ? 'Page Not Found' : 'Page Unavailable'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The page you're looking for doesn't exist or has been removed."}
          </p>
          <Link to="/explore">
            <Button>Explore Other Pages</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Prepare HTML - allow scripts, styles, and external resources
  const sanitizedHTML = DOMPurify.sanitize(page.html, {
    ADD_TAGS: ['iframe', 'style', 'script', 'link'],
    ADD_ATTR: [
      'allow', 'allowfullscreen', 'frameborder', 'scrolling', 
      'target', 'rel', 'href', 'src', 'type', 'async', 'defer',
      'crossorigin', 'integrity', 'referrerpolicy', 'charset'
    ],
    ALLOW_UNKNOWN_PROTOCOLS: true
  })

  return (
    <>
      <SeoHead
        title={page.meta?.title || page.title}
        description={page.meta?.description || `Visit ${page.title} on KashPages`}
        keywords={page.meta?.keywords || []}
        ogImage={page.meta?.ogImage}
        ogUrl={`https://kashpages.in/${page.slug}`}
      />

      {/* Unpaid Notice Modal */}
      <Modal
        isOpen={showUnpaidNotice}
        onClose={() => setShowUnpaidNotice(false)}
        title="Temporary Preview"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-700 mb-3">
                This page is temporarily published for review and will be unpublished within 24 hours if payment is not received.
              </p>
              <p className="text-sm text-gray-600">
                If you are the business owner, please contact us to complete your payment and keep this page live.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-sm">
            <p className="font-medium text-gray-900 mb-2">Contact Admin:</p>
            <div className="space-y-1 text-gray-700">
              <p>📞 Phone: +91-XXXX-XXXX</p>
              <p>💬 WhatsApp: +91-XXXX-XXXX</p>
              <p>📧 Email: admin@kashpages.in</p>
            </div>
          </div>
          <Button onClick={() => setShowUnpaidNotice(false)} className="w-full">
            Continue to Page
          </Button>
        </div>
      </Modal>

      {/* Render Landing Page */}
      {useIframe ? (
        // Full HTML document - use iframe WITHOUT same-origin to fix sandbox warning
        <iframe
          ref={iframeRef}
          srcDoc={sanitizedHTML}
          className="w-full border-0"
          style={{ minHeight: '100vh' }}
          title={page.title}
          // Safe sandbox: allow scripts but NOT same-origin (prevents escape)
          sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
        />
      ) : (
        // HTML snippet - render directly with full script support
        <>
          <div
            ref={contentRef}
            className="landing-page-content"
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          />
          
          {/* KashPages Branding Footer (only for snippets) */}
          <div className="bg-gray-900 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm opacity-75">
                Powered by{' '}
                <Link to="/" className="font-medium hover:underline">
                  KashPages
                </Link>
                {' '}- Professional Landing Pages for Kashmir Businesses
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
