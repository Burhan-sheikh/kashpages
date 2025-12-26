import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { FileText, Users, Settings, TrendingUp } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPages: 0,
    publishedPages: 0,
    totalUsers: 0,
    activePages: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Total pages
      const pagesSnapshot = await getDocs(collection(db, 'pages'))
      const totalPages = pagesSnapshot.size
      
      // Published pages
      const publishedQuery = query(collection(db, 'pages'), where('published', '==', true))
      const publishedSnapshot = await getDocs(publishedQuery)
      const publishedPages = publishedSnapshot.size
      
      // Active pages (published + paid + not expired)
      const activePages = publishedSnapshot.docs.filter(doc => {
        const data = doc.data()
        const isNotExpired = !data.expiryDate || new Date(data.expiryDate) > new Date()
        return data.isPaid && isNotExpired
      }).length
      
      // Total users
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const totalUsers = usersSnapshot.size

      setStats({
        totalPages,
        publishedPages,
        totalUsers,
        activePages
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      name: 'Manage Pages',
      description: 'Create, edit, and publish pages',
      icon: FileText,
      path: '/admin/pages',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      name: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      path: '/admin/users',
      color: 'bg-green-50 text-green-600'
    },
    {
      name: 'Settings',
      description: 'Global platform settings',
      icon: Settings,
      path: '/admin/settings',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Dashboard - KashPages</title>
      </Helmet>

      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage pages, users, and platform settings.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Pages</p>
              <FileText className="w-5 h-5 text-gray-400" />
            </div>
            {loading ? (
              <div className="h-8 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{stats.totalPages}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            {loading ? (
              <div className="h-8 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{stats.publishedPages}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Active Pages</p>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            {loading ? (
              <div className="h-8 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{stats.activePages}</p>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            {loading ? (
              <div className="h-8 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            )}
          </div>
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

        {/* Manual Controls Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            👑 Manual Control Philosophy
          </h3>
          <p className="text-gray-700 leading-relaxed">
            KashPages is designed for manual, curated publishing. You have full control over every page.
            There's no automation - every decision is yours. This ensures quality and prevents mistakes.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
