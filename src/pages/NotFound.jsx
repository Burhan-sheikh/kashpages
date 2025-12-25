import { Link } from 'react-router-dom'
import SeoHead from '../components/seo/SeoHead'
import Button from '../components/ui/Button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist"
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Explore Pages
              </Button>
            </Link>
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl shadow-sm">
            <p className="text-sm text-gray-600 mb-3">
              Looking for a specific business?
            </p>
            <Link to="/explore" className="text-primary hover:underline font-medium">
              Browse all Kashmir businesses →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
