import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { Link } from 'react-router-dom'
import { ExternalLink, Search, MapPin, TrendingUp } from 'lucide-react'

export default function Explore() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadPublishedPages()
  }, [])

  const loadPublishedPages = async () => {
    try {
      const q = query(
        collection(db, 'pages'),
        where('published', '==', true),
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

  const filteredPages = pages.filter(page =>
    page.title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activePages = filteredPages.filter(page => {
    const isNotExpired = !page.expiryDate || new Date(page.expiryDate) > new Date()
    return page.isPaid && isNotExpired
  })

  return (
    <>
      <Helmet>
        <title>Explore Businesses - KashPages</title>
        <meta name="description" content="Discover local businesses in Kashmir. Browse professional landing pages of Kashmir-based businesses." />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                Explore Kashmir Businesses
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover local businesses with professional digital presence.
              </p>
            </div>

            {/* Search */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <p className="text-3xl font-bold text-gray-900">{activePages.length}</p>
                </div>
                <p className="text-sm text-gray-600">Active Businesses</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <p className="text-3xl font-bold text-gray-900">Kashmir</p>
                </div>
                <p className="text-sm text-gray-600">Local Focus</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pages Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredPages.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {searchTerm ? 'No results found' : 'No businesses yet'}
                  </h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Try a different search term' : 'Published businesses will appear here'}
                  </p>
                </div>
              </div>
            )}

            {/* Pages Grid */}
            {!loading && filteredPages.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPages.map((page) => {
                  const isActive = page.isPaid && (!page.expiryDate || new Date(page.expiryDate) > new Date())
                  
                  return (
                    <Link
                      key={page.id}
                      to={`/${page.slug}`}
                      className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200 overflow-hidden"
                    >
                      {/* Image Placeholder */}
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                        <div className="text-center p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {page.title}
                          </h3>
                          {!isActive && (
                            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                              Payment Pending
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700">
                            {page.title}
                          </h3>
                          <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                        </div>

                        {page.metaDescription && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {page.metaDescription}
                          </p>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            kashpages.in/{page.slug}
                          </span>
                          {page.planName && (
                            <span className="text-xs font-medium text-gray-500">
                              {page.planName}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Want to get listed?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join Kashmir businesses on KashPages. Professional presence, made simple.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-900 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
