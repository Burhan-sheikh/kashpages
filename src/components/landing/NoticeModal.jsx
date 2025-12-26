import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { X, Phone, MessageCircle, Mail } from 'lucide-react'

export default function NoticeModal({ onClose }) {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'global')
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setSettings(docSnap.data())
      } else {
        // Fallback settings
        setSettings({
          noticeEnabled: true,
          noticeTitle: 'Page Payment Required',
          noticeMessage: 'This page is published but payment is pending. Contact us to complete your subscription.',
          noticeContactPhone: '+91-9999999999',
          noticeContactWhatsApp: '919999999999',
          platformEmail: 'hello@kashpages.in'
        })
      }
    } catch (error) {
      console.error('Error loading settings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return null
  if (!settings?.noticeEnabled) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">
            {settings.noticeTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="text-gray-700 leading-relaxed">
            {settings.noticeMessage}
          </p>

          {/* Contact Options */}
          <div className="space-y-3">
            {settings.noticeContactPhone && (
              <a
                href={`tel:${settings.noticeContactPhone}`}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Call Us</p>
                  <p className="text-sm text-gray-600">{settings.noticeContactPhone}</p>
                </div>
              </a>
            )}

            {settings.noticeContactWhatsApp && (
              <a
                href={`https://wa.me/${settings.noticeContactWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-600">Message us</p>
                </div>
              </a>
            )}

            {settings.platformEmail && (
              <a
                href={`mailto:${settings.platformEmail}`}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-gray-900" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{settings.platformEmail}</p>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-3xl">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            Continue to Page
          </button>
        </div>
      </div>
    </div>
  )
}
