import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { ExternalLink, Calendar, AlertCircle } from 'lucide-react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function MyPages() {
  const { user } = useAuth()
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadPages()
    }
  }, [user])

  const loadPages = async () => {
    try {
      const q = query(
        collection(db, 'pages'),
        where('ownerId', '==', user.uid),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const pagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setPages(pagesData)
    } catch (error) {
      console.error('Error loading pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (page) => {
    if (!page.published) {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Draft</span>
    }
    
    if (page.expiryDate && new Date(page.expiryDate) < new Date()) {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Expired</span>
    }
    
    if (!page.isPaid) {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Unpaid</span>
    }
    
    return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>My Pages - KashPages</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Pages</h1>
          <p className="text-lg text-gray-600">
            View and manage your published pages.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && pages.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No pages yet
              </h3>
              <p className="text-gray-600 mb-6">
                You don't have any pages yet. Contact us to get started with your first page.
              </p>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                💬 Contact on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Pages List */}
        {!loading && pages.length > 0 && (
          <div className="space-y-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {page.title || 'Untitled Page'}
                      </h3>
                      {getStatusBadge(page)}
                    </div>
                    
                    {page.slug && (
                      <a
                        href={`https://kashpages.in/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-3"
                      >
                        kashpages.in/{page.slug}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      {page.planName && (
                        <div>
                          <span className="font-medium">Plan:</span> {page.planName}
                        </div>
                      )}
                      {page.purchaseDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">Purchased:</span> {formatDate(page.purchaseDate)}
                        </div>
                      )}
                      {page.expiryDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-medium">Expires:</span> {formatDate(page.expiryDate)}
                        </div>
                      )}
                    </div>
                  </div>

                  {page.published && page.isPaid && (
                    <a
                      href={`https://kashpages.in/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      View Page
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need to update your page?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact our team to request changes or updates to your page.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors"
            >
              💬 WhatsApp
            </a>
            <a
              href="mailto:hello@kashpages.in"
              className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors"
            >
              📧 Email
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
