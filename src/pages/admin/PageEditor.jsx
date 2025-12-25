import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPageById, createPage, updatePage, setPaymentStatus, publishPage, unpublishPage, deletePage } from '../../firebase/pages.service'
import { getAllUsers } from '../../firebase/users.service'
import { slugify } from '../../utils/slugify'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Badge from '../../components/ui/Badge'
import { formatDate } from '../../utils/date'

export default function PageEditor() {
  const { pageId } = useParams()
  const navigate = useNavigate()
  const isEditing = !!pageId

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [users, setUsers] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    html: '',
    meta: {
      title: '',
      description: '',
      keywords: '',
      ogImage: '',
      phone: '',
      whatsapp: '',
      instagram: '',
      mapUrl: ''
    },
    plan: 'basic',
    ownerId: '',
    status: 'draft',
    isPaid: false,
    purchaseDate: '',
    expiryDate: ''
  })

  useEffect(() => {
    loadUsers()
    if (isEditing) {
      loadPage()
    }
  }, [pageId])

  const loadUsers = async () => {
    try {
      const allUsers = await getAllUsers()
      setUsers(allUsers)
    } catch (err) {
      console.error('Error loading users:', err)
    }
  }

  const loadPage = async () => {
    try {
      const page = await getPageById(pageId)
      if (!page) {
        setError('Page not found')
        return
      }
      setFormData({
        title: page.title || '',
        slug: page.slug || '',
        html: page.html || '',
        meta: {
          title: page.meta?.title || '',
          description: page.meta?.description || '',
          keywords: Array.isArray(page.meta?.keywords) ? page.meta.keywords.join(', ') : '',
          ogImage: page.meta?.ogImage || '',
          phone: page.meta?.phone || '',
          whatsapp: page.meta?.whatsapp || '',
          instagram: page.meta?.instagram || '',
          mapUrl: page.meta?.mapUrl || ''
        },
        plan: page.plan || 'basic',
        ownerId: page.ownerId || '',
        status: page.status || 'draft',
        isPaid: page.isPaid || false,
        purchaseDate: page.purchaseDate ? formatDate(page.purchaseDate) : '',
        expiryDate: page.expiryDate ? formatDate(page.expiryDate) : ''
      })
    } catch (err) {
      setError('Error loading page: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    if (field.startsWith('meta.')) {
      const metaField = field.split('.')[1]
      setFormData(prev => ({
        ...prev,
        meta: { ...prev.meta, [metaField]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    // Auto-generate slug from title
    if (field === 'title' && !isEditing) {
      setFormData(prev => ({ ...prev, slug: slugify(value) }))
    }
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setSaving(true)

    try {
      // Validate
      if (!formData.title) throw new Error('Title is required')
      if (!formData.slug) throw new Error('Slug is required')
      if (!formData.html) throw new Error('HTML content is required')
      if (!formData.ownerId) throw new Error('Owner is required')

      const pageData = {
        title: formData.title,
        slug: formData.slug,
        html: formData.html,
        meta: {
          title: formData.meta.title,
          description: formData.meta.description,
          keywords: formData.meta.keywords.split(',').map(k => k.trim()).filter(k => k),
          ogImage: formData.meta.ogImage,
          phone: formData.meta.phone,
          whatsapp: formData.meta.whatsapp,
          instagram: formData.meta.instagram,
          mapUrl: formData.meta.mapUrl
        },
        plan: formData.plan,
        ownerId: formData.ownerId
      }

      if (isEditing) {
        await updatePage(pageId, pageData)
        setSuccess('Page updated successfully!')
      } else {
        const newPageId = await createPage(pageData)
        setSuccess('Page created successfully!')
        setTimeout(() => navigate(`/admin/pages/${newPageId}/edit`), 1500)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setSaving(true)
    try {
      await publishPage(pageId, formData.isPaid)
      setSuccess('Page published!')
      loadPage()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleUnpublish = async () => {
    setSaving(true)
    try {
      await unpublishPage(pageId)
      setSuccess('Page unpublished!')
      loadPage()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handlePaymentUpdate = async () => {
    setSaving(true)
    try {
      if (!formData.purchaseDate || !formData.expiryDate) {
        throw new Error('Purchase and expiry dates are required')
      }
      await setPaymentStatus(pageId, formData.isPaid, formData.purchaseDate, formData.expiryDate)
      setSuccess('Payment status updated!')
      loadPage()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setSaving(true)
    try {
      await deletePage(pageId)
      setSuccess('Page deleted!')
      setTimeout(() => navigate('/admin/pages'), 1500)
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  if (loading) return <div className="text-center py-8">Loading...</div>

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Page' : 'Create New Page'}
        </h2>
        {isEditing && (
          <Badge variant={formData.status === 'published' ? 'success' : 'warning'}>
            {formData.status}
          </Badge>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="space-y-6 bg-white border border-gray-200 rounded-lg p-6">
        {/* Basic Info */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="Business Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug *</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="business-name"
              />
              <p className="text-xs text-gray-500 mt-1">kashpages.in/{formData.slug}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Plan</label>
              <select
                value={formData.plan}
                onChange={(e) => handleChange('plan', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
              >
                <option value="basic">Basic - ₹1,999/year</option>
                <option value="standard">Standard - ₹4,999/year</option>
                <option value="custom">Custom - Variable</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Owner *</label>
              <select
                value={formData.ownerId}
                onChange={(e) => handleChange('ownerId', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
              >
                <option value="">Select owner...</option>
                {users.map(user => (
                  <option key={user.uid} value={user.uid}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* HTML Content */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-4">Page Content</h3>
          <div>
            <label className="block text-sm font-medium mb-2">HTML *</label>
            <textarea
              value={formData.html}
              onChange={(e) => handleChange('html', e.target.value)}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary font-mono text-sm"
              rows={12}
              placeholder="<!DOCTYPE html><html>..."
            />
          </div>
        </div>

        {/* SEO Meta */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-4">SEO Metadata</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meta Title</label>
              <input
                type="text"
                value={formData.meta.title}
                onChange={(e) => handleChange('meta.title', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="Business Name - Tagline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                value={formData.meta.description}
                onChange={(e) => handleChange('meta.description', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                rows={2}
                placeholder="Brief description for search engines"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Keywords (comma-separated)</label>
              <input
                type="text"
                value={formData.meta.keywords}
                onChange={(e) => handleChange('meta.keywords', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="business, kashmir, service"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">OG Image URL</label>
              <input
                type="url"
                value={formData.meta.ogImage}
                onChange={(e) => handleChange('meta.ogImage', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-b pb-4">
          <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.meta.phone}
                onChange={(e) => handleChange('meta.phone', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="+919876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">WhatsApp</label>
              <input
                type="tel"
                value={formData.meta.whatsapp}
                onChange={(e) => handleChange('meta.whatsapp', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="919876543210"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram Handle</label>
              <input
                type="text"
                value={formData.meta.instagram}
                onChange={(e) => handleChange('meta.instagram', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="business_handle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Google Maps URL</label>
              <input
                type="url"
                value={formData.meta.mapUrl}
                onChange={(e) => handleChange('meta.mapUrl', e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                placeholder="https://maps.google.com/..."
              />
            </div>
          </div>
        </div>

        {/* Payment Section (Edit only) */}
        {isEditing && (
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-4">Payment & Subscription</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isPaid"
                  checked={formData.isPaid}
                  onChange={(e) => handleChange('isPaid', e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="isPaid" className="font-medium">
                  Payment Received
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Purchase Date</label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => handleChange('purchaseDate', e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleChange('expiryDate', e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <Button onClick={handlePaymentUpdate} loading={saving} size="sm">
                Update Payment Status
              </Button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleSave} loading={saving}>
            {isEditing ? 'Save Changes' : 'Create Page'}
          </Button>
          
          {isEditing && (
            <>
              {formData.status === 'draft' ? (
                <Button onClick={handlePublish} loading={saving} variant="secondary">
                  Publish Page
                </Button>
              ) : (
                <Button onClick={handleUnpublish} loading={saving} variant="secondary">
                  Unpublish
                </Button>
              )}
              
              <Button onClick={() => setShowDeleteModal(true)} variant="danger">
                Delete Page
              </Button>

              <a
                href={`/${formData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-medium"
              >
                Preview →
              </a>
            </>
          )}

          <Button onClick={() => navigate('/admin/pages')} variant="outline">
            Cancel
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Page"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">Are you sure you want to delete this page? This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button onClick={handleDelete} variant="danger" loading={saving}>
              Yes, Delete
            </Button>
            <Button onClick={() => setShowDeleteModal(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
