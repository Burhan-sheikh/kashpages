import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getPagesByOwner } from '../../firebase/pages.service'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { formatDate, isPageExpired } from '../../utils/date'
import { ExternalLink, AlertCircle, CheckCircle, Clock } from 'lucide-react'

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
      const userPages = await getPagesByOwner(user.uid)
      setPages(userPages)
    } catch (error) {
      console.error('Error loading pages:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading your pages...</div>
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Pages</h2>
        <p className="text-gray-600">View and monitor your published landing pages</p>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pages Yet</h3>
          <p className="text-gray-600 mb-6">
            You don't have any landing pages yet.
            Contact admin to create your first page.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>📞 Phone: +91-XXXX-XXXX</p>
            <p>💬 WhatsApp: +91-XXXX-XXXX</p>
            <p>📧 Email: admin@kashpages.in</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {pages.map(page => {
            const expired = isPageExpired(page.expiryDate)
            const needsPayment = !page.isPaid && page.status === 'published'

            return (
              <div
                key={page.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{page.title}</h3>
                      <Badge
                        variant={
                          expired
                            ? 'danger'
                            : page.status === 'published'
                            ? 'success'
                            : 'warning'
                        }
                      >
                        {expired ? 'Expired' : page.status}
                      </Badge>
                    </div>
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-2 mb-4"
                    >
                      kashpages.in/{page.slug}
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 block mb-1">Plan</span>
                        <span className="font-medium text-gray-900 capitalize">{page.plan}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-1">Payment Status</span>
                        <div className="flex items-center gap-2">
                          {page.isPaid ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-orange-600" />
                          )}
                          <span className={page.isPaid ? 'text-green-600' : 'text-orange-600'}>
                            {page.isPaid ? 'Paid' : 'Pending Payment'}
                          </span>
                        </div>
                      </div>
                      {page.purchaseDate && (
                        <div>
                          <span className="text-gray-500 block mb-1">Purchase Date</span>
                          <span className="font-medium text-gray-900">
                            {formatDate(page.purchaseDate)}
                          </span>
                        </div>
                      )}
                      {page.expiryDate && (
                        <div>
                          <span className="text-gray-500 block mb-1">Expiry Date</span>
                          <span
                            className={`font-medium ${
                              expired ? 'text-red-600' : 'text-gray-900'
                            }`}
                          >
                            {formatDate(page.expiryDate)}
                            {expired && ' (Expired)'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <a
                      href={`/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        View Page
                      </Button>
                    </a>
                  </div>
                </div>

                {needsPayment && (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm text-orange-800">
                      ⚠️ <strong>Payment Pending:</strong> This page is temporarily published.
                      Please complete payment to keep it live.
                    </p>
                  </div>
                )}

                {expired && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">
                      ❌ <strong>Expired:</strong> This page has expired. Contact admin to renew.
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
