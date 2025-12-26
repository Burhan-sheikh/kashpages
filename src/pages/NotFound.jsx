import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - KashPages</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <span className="text-5xl">😞</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Sorry, we couldn't find the page you're looking for. It may have been removed, expired, or never existed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 border-2 border-gray-200 rounded-full font-medium hover:border-gray-300 transition-colors"
            >
              <Search className="w-5 h-5" />
              Explore Pages
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
