import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'

// Layout
import Layout from './components/layout/Layout'

// Public Pages (Phase 1)
import Home from './pages/Home'
import About from './pages/About'
import Plans from './pages/Plans'
import Contact from './pages/Contact'
import Terms from './pages/legal/Terms'
import Privacy from './pages/legal/Privacy'

// Auth Pages
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

// Protected Pages
import Dashboard from './pages/dashboard/Dashboard'
import MyPages from './pages/dashboard/MyPages'
import PlanDetails from './pages/dashboard/PlanDetails'
import Account from './pages/dashboard/Account'

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard'
import PagesList from './pages/admin/PagesList'
import PageEditor from './pages/admin/PageEditor'
import Users from './pages/admin/Users'

// Landing Pages
import Explore from './pages/Explore'
import LandingRenderer from './pages/landing/LandingRenderer'

// 404
import NotFound from './pages/NotFound'

// Protected Route Component
function ProtectedRoute({ children, adminOnly = false }) {
  const { user, userProfile, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

// Public Route (redirect if logged in)
function PublicRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (user) {
    return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages (Phase 1) */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/plans" element={<Layout><Plans /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/terms" element={<Layout><Terms /></Layout>} />
      <Route path="/privacy" element={<Layout><Privacy /></Layout>} />

      {/* Auth Pages */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

      {/* User Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/pages" element={<ProtectedRoute><MyPages /></ProtectedRoute>} />
      <Route path="/dashboard/plans" element={<ProtectedRoute><PlanDetails /></ProtectedRoute>} />
      <Route path="/dashboard/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />

      {/* Admin Pages */}
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/pages" element={<ProtectedRoute adminOnly><PagesList /></ProtectedRoute>} />
      <Route path="/admin/pages/new" element={<ProtectedRoute adminOnly><PageEditor /></ProtectedRoute>} />
      <Route path="/admin/pages/:pageId" element={<ProtectedRoute adminOnly><PageEditor /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute adminOnly><Users /></ProtectedRoute>} />

      {/* Landing Pages */}
      <Route path="/explore" element={<Layout><Explore /></Layout>} />
      <Route path="/:businessSlug" element={<LandingRenderer />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  )
}
