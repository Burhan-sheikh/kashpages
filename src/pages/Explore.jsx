import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublishedPages } from '../firebase/pages.service'
import SeoHead from '../components/seo/SeoHead'
import Button from '../components/ui/Button'

export default function Explore() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const publishedPages = await getPublishedPages()
        console.log('Published pages:', publishedPages) // Debug log
        setPages(publishedPages)
        setError(null)
      } catch (err) {
        console.error('Firestore error:', err)
        
        // Extract index URL if available
        let errorMessage = 'Failed to load pages. '
        if (err.message && err.message.includes('index')) {
          errorMessage += 'Missing Firestore index. '
          
          // Try to extract index URL from error
          const urlMatch = err.message.match(/(https:\/\/[^\s]+)/)
          if (urlMatch) {
            setError({ message: errorMessage, indexUrl: urlMatch[1] })
            return
          }
        }
        setError({ message: errorMessage + err.message })
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [])

  return (
    <>
      <SeoHead
        title="Explore"
        description="Browse all published Kashmir business pages on KashPages"
        ogUrl="https://kashpages.in/explore"
      />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Businesses</h1>
        <p className="text-gray-600 text-lg mb-12">
          Discover amazing businesses and services from Kashmir.
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading pages...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Pages</h3>
            <p className="text-red-700 mb-4">{error.message}</p>
            {error.indexUrl && (
              <div className="bg-white rounded p-4 mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Action Required:</strong> Create the missing Firestore index
                </p>
                <a
                  href={error.indexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
                >
                  Create Index in Firebase Console
                </a>
              </div>
            )}
            <details className="text-sm text-gray-600 mt-4">
              <summary className="cursor-pointer font-medium">Manual Fix Instructions</summary>
              <div className="mt-2 space-y-2">
                <p>1. Go to Firebase Console → Firestore Database → Indexes</p>
                <p>2. Or run: <code className="bg-gray-200 px-2 py-1 rounded">firebase deploy --only firestore:indexes</code></p>
                <p>3. Wait 2-3 minutes for index to build</p>
                <p>4. Refresh this page</p>
              </div>
            </details>
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No published pages yet.</p>
            <p className="text-gray-500 text-sm">Pages will appear here once admin publishes them.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map(page => (
              <Link key={page.id} to={`/${page.slug}`}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="bg-gradient-to-r from-primary/20 to-blue-100 h-32 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-gray-800 text-center px-4">
                      {page.title}
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4">
                      {page.meta?.description || 'View this business page'}
                    </p>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium">
                      {page.plan}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
