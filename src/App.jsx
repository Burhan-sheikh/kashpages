import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useEffect } from 'react'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Plans from './pages/Plans'
import Contact from './pages/Contact'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Explore from './pages/Explore'
import NotFound from './pages/NotFound'

// User dashboard
import Dashboard from './pages/dashboard/Dashboard'
import MyPages from './pages/dashboard/MyPages'
import PlanDetails from './pages/dashboard/PlanDetails'
import Account from './pages/dashboard/Account'

// Admin dashboard
import AdminDashboard from './pages/admin/Dashboard'
import Users from './pages/admin/Users'
import PagesList from './pages/admin/PagesList'
import PageEditor from './pages/admin/PageEditor'
import PaymentTracking from './pages/admin/PaymentTracking'
import Settings from './pages/admin/Settings'

// Landing page renderer
import LandingRenderer from './pages/landing/LandingRenderer'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/explore" element={<Explore />} />
      
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* User dashboard - Protected */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/pages" element={<ProtectedRoute><MyPages /></ProtectedRoute>} />
      <Route path="/dashboard/plans" element={<ProtectedRoute><PlanDetails /></ProtectedRoute>} />
      <Route path="/dashboard/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      
      {/* Admin dashboard - Admin only */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><Users /></AdminRoute>} />
      <Route path="/admin/pages" element={<AdminRoute><PagesList /></AdminRoute>} />
      <Route path="/admin/pages/new" element={<AdminRoute><PageEditor /></AdminRoute>} />
      <Route path="/admin/pages/:pageId" element={<AdminRoute><PageEditor /></AdminRoute>} />
      <Route path="/admin/payments" element={<AdminRoute><PaymentTracking /></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><Settings /></AdminRoute>} />
      
      {/* 404 */}
      <Route path="/404" element={<NotFound />} />
      
      {/* Dynamic business page - Must be last */}
      <Route path="/:businessSlug" element={<LandingRenderer />} />
      
      {/* Catch all - redirect to 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Admin route wrapper
function AdminRoute({ children }) {
  const { user, userProfile, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (userProfile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default App
