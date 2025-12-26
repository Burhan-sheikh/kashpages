import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { CheckCircle, Calendar, CreditCard, AlertCircle } from 'lucide-react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function PlanDetails() {
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
        where('ownerId', '==', user.uid)
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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null
    const now = new Date()
    const expiry = new Date(expiryDate)
    const diff = expiry - now
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Plan Details - KashPages</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Plan Details</h1>
          <p className="text-lg text-gray-600">
            View your subscription details and renewal information.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* No Plans */}
        {!loading && pages.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No active plans
              </h3>
              <p className="text-gray-600 mb-6">
                You don't have any active subscriptions. Contact us to get started.
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

        {/* Plan Cards */}
        {!loading && pages.length > 0 && (
          <div className="space-y-4">
            {pages.map((page) => {
              const daysRemaining = getDaysRemaining(page.expiryDate)
              const isExpiringSoon = daysRemaining !== null && daysRemaining <= 30 && daysRemaining > 0
              const isExpired = daysRemaining !== null && daysRemaining <= 0

              return (
                <div
                  key={page.id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {page.title || 'Untitled Page'}
                      </h3>
                      {page.isPaid ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          <AlertCircle className="w-3 h-3" />
                          Unpaid
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Plan Info */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Plan Name</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {page.planName || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Status</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {page.published ? 'Published' : 'Draft'}
                        </p>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {page.purchaseDate && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Purchase Date
                          </p>
                          <p className="text-base text-gray-900">
                            {formatDate(page.purchaseDate)}
                          </p>
                        </div>
                      )}
                      {page.expiryDate && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Expiry Date
                          </p>
                          <p className="text-base text-gray-900">
                            {formatDate(page.expiryDate)}
                          </p>
                          {daysRemaining !== null && (
                            <p className={`text-sm mt-1 ${
                              isExpired ? 'text-red-600' :
                              isExpiringSoon ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {isExpired ? 'Expired' :
                               daysRemaining === 1 ? '1 day remaining' :
                               `${daysRemaining} days remaining`}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Renewal Notice */}
                    {isExpiringSoon && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <p className="text-sm text-yellow-800">
                          ⚠️ Your plan is expiring soon. Contact us to renew and keep your page active.
                        </p>
                      </div>
                    )}

                    {isExpired && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <p className="text-sm text-red-800">
                          ❌ Your plan has expired. Contact us to renew your subscription.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Renewal Info */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need to renew?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact us before your plan expires to ensure uninterrupted service.
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
              href="tel:+919999999999"
              className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors"
            >
              📞 Call
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
