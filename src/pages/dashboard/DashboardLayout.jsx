import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import classNames from 'classnames'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { label: 'My Pages', path: '/dashboard/pages', icon: '📄' },
  { label: 'Plans', path: '/dashboard/plans', icon: '💳' },
  { label: 'Account', path: '/dashboard/account', icon: '⚙️' }
]

export default function DashboardLayout() {
  const location = useLocation()
  const { userProfile } = useAuth()

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 min-h-screen">
        {/* User Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {userProfile?.name || 'User'}!
          </h1>
          <p className="text-gray-600">Manage your landing pages and account settings</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="hidden md:flex flex-col gap-2 min-w-[200px]">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={classNames(
                  'flex items-center gap-3 px-4 py-3 rounded transition-colors',
                  location.pathname === item.path
                    ? 'bg-primary text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Nav */}
          <nav className="md:hidden flex gap-2 mb-6 overflow-x-auto w-full">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={classNames(
                  'flex items-center gap-2 px-4 py-2 rounded whitespace-nowrap',
                  location.pathname === item.path
                    ? 'bg-primary text-white font-medium'
                    : 'text-gray-600 bg-gray-100'
                )}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
