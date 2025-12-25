import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { updateUserProfile } from '../../firebase/users.service'
import Button from '../../components/ui/Button'
import { User, Mail, Calendar, Shield } from 'lucide-react'

export default function Account() {
  const { user, userProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(userProfile?.name || '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      await updateUserProfile(user.uid, { name })
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setEditing(false)
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
        <p className="text-gray-600">Manage your profile and account information</p>
      </div>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
        {/* Profile Picture Placeholder */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{userProfile?.name || 'User'}</h3>
            <p className="text-sm text-gray-600">{userProfile?.role || 'user'}</p>
          </div>
        </div>

        {/* Name Field */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4" />
            Name
          </label>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          ) : (
            <p className="text-gray-900">{userProfile?.name || 'Not set'}</p>
          )}
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4" />
            Email
          </label>
          <p className="text-gray-600">{user?.email || 'Not available'}</p>
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
        </div>

        {/* Role (Read-only) */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Shield className="w-4 h-4" />
            Role
          </label>
          <p className="text-gray-900 capitalize">{userProfile?.role || 'user'}</p>
        </div>

        {/* Created At */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4" />
            Member Since
          </label>
          <p className="text-gray-900">
            {userProfile?.createdAt
              ? new Date(userProfile.createdAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : 'N/A'}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-gray-200 flex gap-3">
          {editing ? (
            <>
              <Button onClick={handleSave} loading={saving}>
                Save Changes
              </Button>
              <Button
                onClick={() => {
                  setEditing(false)
                  setName(userProfile?.name || '')
                  setMessage({ type: '', text: '' })
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </div>

      <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
        <p className="text-sm text-gray-600 mb-4">
          For page updates, renewals, or any questions, contact our admin team:
        </p>
        <div className="space-y-2 text-sm text-gray-700">
          <p>📞 Phone: +91-XXXX-XXXX</p>
          <p>💬 WhatsApp: +91-XXXX-XXXX</p>
          <p>📧 Email: admin@kashpages.in</p>
        </div>
      </div>
    </div>
  )
}
