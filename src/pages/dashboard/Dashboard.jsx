import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FileText, CreditCard, User, Mail } from 'lucide-react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'

export default function Dashboard() {
  const { userProfile } = useAuth()

  const quickActions = [
    {
      name: 'My Pages',
      description: 'View your published pages',
      icon: FileText,
      path: '/dashboard/pages',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'Plan Details',
      description: 'View your subscription',
      icon: CreditCard,
      path: '/dashboard/plans',
      color: 'bg-green-50 text-green-600'
    },
    {
      name: 'Account',
      description: 'Manage your account',
      icon: User,
      path: '/dashboard/account',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard - KashPages</title>
      </Helmet>

      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back{userProfile?.name ? `, ${userProfile.name}` : ''}!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your pages and account from here.
          </p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${action.color}`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gray-700">
                  {action.name}
                </h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Need Help */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-gray-900" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Need help?
              </h3>
              <p className="text-gray-600 mb-4">
                Contact our team for any questions or page updates.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:+919999999999"
                  className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-medium border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  📞 Call Us
                </a>
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
        </div>
      </div>
    </DashboardLayout>
  )
}
