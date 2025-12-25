import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import classNames from 'classnames'

const adminNavItems = [
  { label: 'Pages', path: '/admin/pages', icon: '📄' },
  { label: 'Users', path: '/admin/users', icon: '👥' }
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 min-h-screen">
        {/* Admin Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="bg-primary text-white px-3 py-1 rounded text-sm font-medium">ADMIN</span>
          </div>
          <p className="text-gray-600">Manage all landing pages, users, and platform settings</p>
        </div>
        
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="hidden md:flex flex-col gap-2 min-w-[200px]">
            {adminNavItems.map(item => (
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
            {adminNavItems.map(item => (
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
                <span>{item.label}</span>
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
