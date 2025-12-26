import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../hooks/useAuth'
import { Save, Eye, ArrowLeft, AlertCircle } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

export default function PageEditor() {
  const { pageId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const isNew = pageId === 'new'

  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    ownerId: '',
    ownerEmail: '',
    content: '',
    metaDescription: '',
    seoTitle: '',
    ogImage: '',
    planName: 'Basic',
    isPaid: false,
    published: false,
    purchaseDate: '',
    expiryDate: ''
  })

  useEffect(() => {
    if (!isNew) {
      loadPage()
    }
  }, [pageId])

  const loadPage = async () => {
    try {
      const docRef = doc(db, 'pages', pageId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setFormData({ ...formData, ...docSnap.data() })
      } else {
        alert('Page not found')
        navigate('/admin/pages')
      }
    } catch (error) {
      console.error('Error loading page:', error)
      alert('Error loading page')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .slice(0, 50)
  }

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setFormData({
      ...formData,
      title: newTitle,
      slug: isNew ? generateSlug(newTitle) : formData.slug
    })
  }

  const validateForm = async () => {
    const newErrors = {}

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.slug?.trim()) {
      newErrors.slug = 'Slug is required'
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens'
    } else {
      // Check slug uniqueness
      const q = query(collection(db, 'pages'), where('slug', '==', formData.slug))
      const snapshot = await getDocs(q)
      if (!snapshot.empty && (isNew || snapshot.docs[0].id !== pageId)) {
        newErrors.slug = 'This slug is already taken'
      }
    }

    if (!formData.ownerId?.trim() || !formData.ownerEmail?.trim()) {
      newErrors.owner = 'Owner information is required'
    }

    if (!formData.planName) {
      newErrors.planName = 'Plan selection is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!(await validateForm())) {
      alert('Please fix the errors before saving')
      return
    }

    setSaving(true)

    try {
      const timestamp = new Date().toISOString()
      const pageData = {
        ...formData,
        updatedAt: timestamp,
        lastEditedBy: user.uid,
        status: formData.published ? (formData.isPaid ? 'active' : 'unpaid') : 'draft'
      }

      if (isNew) {
        pageData.createdAt = timestamp
        pageData.createdBy = user.uid
        const newDocRef = doc(collection(db, 'pages'))
        await setDoc(newDocRef, pageData)
        alert('Page created successfully!')
        navigate('/admin/pages')
      } else {
        await updateDoc(doc(db, 'pages', pageId), pageData)
        alert('Page updated successfully!')
      }
    } catch (error) {
      console.error('Error saving page:', error)
      alert('Error saving page. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>{isNew ? 'Create Page' : 'Edit Page'} - Admin - KashPages</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/pages"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {isNew ? 'Create Page' : 'Edit Page'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isNew ? 'Fill in the details below' : formData.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isNew && formData.published && (
              <a
                href={`/${formData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </a>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Page'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g., Kashmir Electronics"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug *
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">kashpages.in/</span>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="kashmir-electronics"
                    className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                      errors.slug ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Lowercase letters, numbers, and hyphens only
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Brief description for search engines and social media"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {formData.metaDescription.length}/160 characters
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Page Content</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HTML Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Paste full HTML document here or leave empty for default template"
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent font-mono text-sm"
                />
                <p className="mt-2 text-sm text-gray-600">
                  <AlertCircle className="inline w-4 h-4 mr-1" />
                  Supports full HTML documents. Leave empty to use the default template.
                </p>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">SEO Settings</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title (Optional)
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Custom title for search engines"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OG Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Owner</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner User ID *
                </label>
                <input
                  type="text"
                  value={formData.ownerId}
                  onChange={(e) => setFormData({ ...formData, ownerId: e.target.value })}
                  placeholder="Firebase Auth UID"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                    errors.owner ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Email *
                </label>
                <input
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                  placeholder="owner@example.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent ${
                    errors.owner ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>

              {errors.owner && (
                <p className="text-sm text-red-600">{errors.owner}</p>
              )}
            </div>

            {/* Plan & Payment */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Plan & Payment</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan *
                </label>
                <select
                  value={formData.planName}
                  onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPaid}
                    onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <span className="text-sm font-medium text-gray-700">Payment Received</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  value={formData.purchaseDate?.split('T')[0] || ''}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate?.split('T')[0] || ''}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Publishing */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Publishing</h2>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                  />
                  <span className="text-sm font-medium text-gray-700">Publish Page</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Page will be visible at kashpages.in/{formData.slug}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
