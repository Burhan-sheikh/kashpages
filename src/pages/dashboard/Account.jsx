import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../hooks/useAuth'
import { User, Mail, Calendar, Shield } from 'lucide-react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function Account() {
  const { user, userProfile } = useAuth()

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title>Account - KashPages</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Account</h1>
          <p className="text-lg text-gray-600">
            View and manage your account information.
          </p>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Name */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Full Name</p>
                <p className="text-base font-medium text-gray-900">
                  {userProfile?.name || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Email Address</p>
                <p className="text-base font-medium text-gray-900">
                  {user?.email || 'Not provided'}
                </p>
                {user?.emailVerified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 mt-1">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700 mt-1">
                    ⚠️ Not verified
                  </span>
                )}
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Account Type</p>
                <p className="text-base font-medium text-gray-900">
                  {userProfile?.role === 'admin' ? 'Administrator' : 'User'}
                </p>
              </div>
            </div>

            {/* Created Date */}
            {user?.metadata?.creationTime && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Member Since</p>
                  <p className="text-base font-medium text-gray-900">
                    {formatDate(user.metadata.creationTime)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need to update your information?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact our team to update your account details or request changes.
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
