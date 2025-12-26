import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { Search, DollarSign, Calendar, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

export default function PaymentTracking() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all') // all, paid, unpaid, expiring-soon, expired

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const q = query(collection(db, 'pages'), orderBy('expiryDate', 'asc'))
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

  const handleMarkPaid = async (pageId) => {
    try {
      await updateDoc(doc(db, 'pages', pageId), {
        isPaid: true,
        lastPaymentUpdatedAt: new Date().toISOString()
      })
      
      setPages(pages.map(p => 
        p.id === pageId ? { ...p, isPaid: true } : p
      ))
      
      alert('Payment status updated successfully')
    } catch (error) {
      console.error('Error updating payment:', error)
      alert('Error updating payment status')
    }
  }

  const handleMarkUnpaid = async (pageId) => {
    try {
      await updateDoc(doc(db, 'pages', pageId), {
        isPaid: false,
        lastPaymentUpdatedAt: new Date().toISOString()
      })
      
      setPages(pages.map(p => 
        p.id === pageId ? { ...p, isPaid: false } : p
      ))
      
      alert('Payment status updated successfully')
    } catch (error) {
      console.error('Error updating payment:', error)
      alert('Error updating payment status')
    }
  }

  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null
    const days = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24))
    return days
  }

  const getStatusInfo = (page) => {
    const daysRemaining = getDaysRemaining(page.expiryDate)
    
    if (!page.published) {
      return { status: 'draft', color: 'gray', icon: Clock }
    }
    
    if (daysRemaining !== null && daysRemaining < 0) {
      return { status: 'expired', color: 'red', icon: AlertTriangle }
    }
    
    if (!page.isPaid) {
      return { status: 'unpaid', color: 'yellow', icon: DollarSign }
    }
    
    if (daysRemaining !== null && daysRemaining <= 30) {
      return { status: 'expiring-soon', color: 'orange', icon: AlertTriangle }
    }
    
    return { status: 'active', color: 'green', icon: CheckCircle2 }
  }

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.ownerEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    
    const statusInfo = getStatusInfo(page)
    
    if (filter === 'paid') return page.isPaid
    if (filter === 'unpaid') return !page.isPaid && page.published
    if (filter === 'expiring-soon') return statusInfo.status === 'expiring-soon'
    if (filter === 'expired') return statusInfo.status === 'expired'
    
    return true
  })

  const stats = {
    total: pages.length,
    paid: pages.filter(p => p.isPaid).length,
    unpaid: pages.filter(p => !p.isPaid && p.published).length,
    expiringSoon: pages.filter(p => {
      const days = getDaysRemaining(p.expiryDate)
      return days !== null && days <= 30 && days >= 0
    }).length,
    expired: pages.filter(p => {
      const days = getDaysRemaining(p.expiryDate)
      return days !== null && days < 0
    }).length
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>Payment Tracking - Admin - KashPages</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Tracking</h1>
          <p className="text-lg text-gray-600">Monitor payments and expiry dates</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Total Pages</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Paid</p>
            <p className="text-3xl font-bold text-green-600">{stats.paid}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Unpaid</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.unpaid}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Expiring Soon</p>
            <p className="text-3xl font-bold text-orange-600">{stats.expiringSoon}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 mb-1">Expired</p>
            <p className="text-3xl font-bold text-red-600">{stats.expired}</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'paid'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Paid ({stats.paid})
            </button>
            <button
              onClick={() => setFilter('unpaid')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'unpaid'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Unpaid ({stats.unpaid})
            </button>
            <button
              onClick={() => setFilter('expiring-soon')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'expiring-soon'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expiring Soon ({stats.expiringSoon})
            </button>
            <button
              onClick={() => setFilter('expired')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'expired'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expired ({stats.expired})
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or owner email..."
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
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your filters or search term</p>
          </div>
        )}

        {/* Pages Table */}
        {!loading && filteredPages.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPages.map((page) => {
                    const statusInfo = getStatusInfo(page)
                    const StatusIcon = statusInfo.icon
                    const daysRemaining = getDaysRemaining(page.expiryDate)
                    
                    return (
                      <tr key={page.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{page.title}</p>
                            <p className="text-xs text-gray-500">/{page.slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{page.ownerEmail}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{page.planName}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-900">{formatDate(page.expiryDate)}</p>
                              {daysRemaining !== null && daysRemaining >= 0 && (
                                <p className={`text-xs ${
                                  daysRemaining <= 7 ? 'text-red-600' :
                                  daysRemaining <= 30 ? 'text-orange-600' :
                                  'text-gray-500'
                                }`}>
                                  {daysRemaining} days left
                                </p>
                              )}
                              {daysRemaining !== null && daysRemaining < 0 && (
                                <p className="text-xs text-red-600">
                                  Expired {Math.abs(daysRemaining)} days ago
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`w-4 h-4 text-${statusInfo.color}-600`} />
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
                              {statusInfo.status === 'draft' && 'Draft'}
                              {statusInfo.status === 'active' && 'Active'}
                              {statusInfo.status === 'unpaid' && 'Unpaid'}
                              {statusInfo.status === 'expiring-soon' && 'Expiring Soon'}
                              {statusInfo.status === 'expired' && 'Expired'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {!page.isPaid ? (
                              <button
                                onClick={() => handleMarkPaid(page.id)}
                                className="px-3 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                              >
                                Mark Paid
                              </button>
                            ) : (
                              <button
                                onClick={() => handleMarkUnpaid(page.id)}
                                className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                Mark Unpaid
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
