import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from '../../firebase/auth'
import { useState } from 'react'

export default function Header() {
  const navigate = useNavigate()
  const { user, userProfile, isAdmin } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/')
      setIsMenuOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  console.log('Header render:', { user, userProfile, isAdmin }) // Debug log

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            KashPages
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-gray-600 hover:text-gray-900">
              Explore
            </Link>
            {user && userProfile ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="text-primary hover:text-primary/80 font-medium">
                    Admin Panel
                  </Link>
                )}
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">
                    {userProfile.name}
                    {isAdmin && <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded">ADMIN</span>}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <Link
              to="/explore"
              className="block py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            {user && userProfile ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block py-2 text-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="block py-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="py-2 text-sm text-gray-600">
                  {userProfile.name}
                  {isAdmin && <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded">ADMIN</span>}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-gray-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
