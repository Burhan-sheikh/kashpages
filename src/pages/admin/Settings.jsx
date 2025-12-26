import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useAuth } from '../../hooks/useAuth'
import { Save, AlertCircle } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'

export default function Settings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    // Notice Modal
    noticeEnabled: true,
    noticeTitle: 'Page Payment Required',
    noticeMessage: 'This page is published but payment is pending. Contact us to complete your subscription.',
    noticeContactPhone: '',
    noticeContactWhatsApp: '',
    
    // Platform Info
    platformName: 'KashPages',
    platformEmail: '',
    platformPhone: '',
    platformWhatsApp: '',
    
    // Defaults
    defaultOgImage: '',
    
    // Expiry Settings
    expiryWarningDays: 30,
    enableExpiryEmails: false
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'global')
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setSettings({ ...settings, ...docSnap.data() })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    try {
      const docRef = doc(db, 'settings', 'global')
      await setDoc(docRef, {
        ...settings,
        updatedAt: new Date().toISOString(),
        updatedBy: user.uid
      })
      
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Error saving settings. Please try again.')
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
        <title>Settings - Admin - KashPages</title>
      </Helmet>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-lg text-gray-600">Configure platform-wide settings</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>

        {/* Notice Modal Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Notice Modal</h2>
            <p className="text-gray-600">Configure the payment reminder modal shown on unpaid pages</p>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.noticeEnabled}
                onChange={(e) => setSettings({ ...settings, noticeEnabled: e.target.checked })}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span className="text-sm font-medium text-gray-700">Enable Notice Modal</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Show payment reminder on published pages that haven't been paid for
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modal Title
            </label>
            <input
              type="text"
              value={settings.noticeTitle}
              onChange={(e) => setSettings({ ...settings, noticeTitle: e.target.value })}
              placeholder="Page Payment Required"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modal Message
            </label>
            <textarea
              value={settings.noticeMessage}
              onChange={(e) => setSettings({ ...settings, noticeMessage: e.target.value })}
              placeholder="This page is published but payment is pending..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                value={settings.noticeContactPhone}
                onChange={(e) => setSettings({ ...settings, noticeContactPhone: e.target.value })}
                placeholder="+91-9999999999"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={settings.noticeContactWhatsApp}
                onChange={(e) => setSettings({ ...settings, noticeContactWhatsApp: e.target.value })}
                placeholder="919999999999"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Format: Country code + number (no +)</p>
            </div>
          </div>
        </div>

        {/* Platform Information */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Information</h2>
            <p className="text-gray-600">Contact details displayed across the platform</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform Name
            </label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
              placeholder="KashPages"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Email
              </label>
              <input
                type="email"
                value={settings.platformEmail}
                onChange={(e) => setSettings({ ...settings, platformEmail: e.target.value })}
                placeholder="hello@kashpages.in"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Phone
              </label>
              <input
                type="tel"
                value={settings.platformPhone}
                onChange={(e) => setSettings({ ...settings, platformPhone: e.target.value })}
                placeholder="+91-9999999999"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform WhatsApp
            </label>
            <input
              type="text"
              value={settings.platformWhatsApp}
              onChange={(e) => setSettings({ ...settings, platformWhatsApp: e.target.value })}
              placeholder="919999999999"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Format: Country code + number (no +)</p>
          </div>
        </div>

        {/* Defaults */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Defaults</h2>
            <p className="text-gray-600">Default values for new pages</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default OG Image URL
            </label>
            <input
              type="url"
              value={settings.defaultOgImage}
              onChange={(e) => setSettings({ ...settings, defaultOgImage: e.target.value })}
              placeholder="https://kashpages.in/og-default.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Used when a page doesn't have a custom OG image
            </p>
          </div>
        </div>

        {/* Expiry Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Expiry Management</h2>
            <p className="text-gray-600">Configure expiry warnings and notifications</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Warning Period (Days)
            </label>
            <input
              type="number"
              min="1"
              max="90"
              value={settings.expiryWarningDays}
              onChange={(e) => setSettings({ ...settings, expiryWarningDays: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Show expiry warnings in dashboard when this many days remain
            </p>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.enableExpiryEmails}
                onChange={(e) => setSettings({ ...settings, enableExpiryEmails: e.target.checked })}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
              />
              <span className="text-sm font-medium text-gray-700">Enable Expiry Email Notifications</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Automatically email page owners when their subscription is about to expire (requires email service setup)
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-900 mb-1">Email Service Required</p>
                <p className="text-sm text-yellow-700">
                  To enable automated expiry emails, you need to set up an email service (SendGrid, AWS SES, or similar).
                  See Phase 4 documentation for implementation details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button (Bottom) */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All Settings'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
