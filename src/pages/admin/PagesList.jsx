import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { Plus, Search, ExternalLink, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

export default function PagesList() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, published, draft, unpaid

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const q = query(collection(db, 'pages'), orderBy('createdAt', 'desc'))
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

  const handleDelete = async (pageId, pageTitle) => {
    if (!confirm(`Are you sure you want to delete "${pageTitle}"? This cannot be undone.`)) {
      return
    }

    try {
      await deleteDoc(doc(db, 'pages', pageId))
      setPages(pages.filter(p => p.id !== pageId))
      alert('Page deleted successfully')
    } catch (error) {
      console.error('Error deleting page:', error)
      alert('Error deleting page. Please try again.')
    }
  }

  const filteredPages = pages
    .filter(page => {
      const matchesSearch = page.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           page.slug?.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (filter === 'published') return matchesSearch && page.published
      if (filter === 'draft') return matchesSearch && !page.published
      if (filter === 'unpaid') return matchesSearch && page.published && !page.isPaid
      
      return matchesSearch
    })

  const getStatusBadge = (page) => {
    if (!page.published) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">Draft</span>
    }
    
    const isExpired = page.expiryDate && new Date(page.expiryDate) < new Date()
    if (isExpired) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Expired</span>
    }
    
    if (!page.isPaid) {
      return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Unpaid</span>
    }
    
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>Pages - Admin - KashPages</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Pages</h1>
            <p className="text-lg text-gray-600">
              {pages.length} total page{pages.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            to="/admin/pages/new"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Page
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({pages.length})
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'published'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Published ({pages.filter(p => p.published).length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'draft'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Draft ({pages.filter(p => !p.published).length})
            </button>
            <button
              onClick={() => setFilter('unpaid')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'unpaid'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unpaid ({pages.filter(p => p.published && !p.isPaid).length})
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPages.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm || filter !== 'all' ? 'No results found' : 'No pages yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filter !== 'all'
                ? 'Try adjusting your filters or search term'
                : 'Create your first page to get started'}
            </p>
            {!searchTerm && filter === 'all' && (
              <Link
                to="/admin/pages/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Page
              </Link>
            )}
          </div>
        )}

        {/* Pages List */}
        {!loading && filteredPages.length > 0 && (
          <div className="space-y-3">
            {filteredPages.map((page) => (
              <div
                key={page.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {page.title || 'Untitled'}
                      </h3>
                      {getStatusBadge(page)}
                      {page.published ? (
                        <Eye className="w-4 h-4 text-green-600" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>/{page.slug}</span>
                      {page.planName && <span>Plan: {page.planName}</span>}
                      {page.ownerEmail && <span>Owner: {page.ownerEmail}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {page.published && (
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View page"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <Link
                      to={`/admin/pages/${page.id}`}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit page"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(page.id, page.title)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete page"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
