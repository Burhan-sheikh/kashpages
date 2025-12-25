import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmail, signInWithGoogle, signUpWithEmail } from '../firebase/auth'
import { getUserById } from '../firebase/users.service'
import SeoHead from '../components/seo/SeoHead'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      redirectBasedOnRole(user.uid)
    }
  }, [user])

  const redirectBasedOnRole = async (uid) => {
    try {
      const userProfile = await getUserById(uid)
      if (userProfile?.role === 'admin') {
        navigate('/admin', { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    } catch (error) {
      console.error('Error checking user role:', error)
      navigate('/dashboard', { replace: true })
    }
  }

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let user
      if (isSignUp) {
        user = await signUpWithEmail(email, password)
      } else {
        user = await signInWithEmail(email, password)
      }
      await redirectBasedOnRole(user.uid)
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      const user = await signInWithGoogle()
      await redirectBasedOnRole(user.uid)
    } catch (err) {
      setError(err.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SeoHead
        title="Login"
        description="Login to KashPages dashboard"
        ogUrl="https://kashpages.in/login"
      />

      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            {isSignUp ? 'Create Account' : 'Login'}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <Button
            variant="outline"
            size="lg"
            className="w-full mb-6"
            onClick={handleGoogleSignIn}
            loading={loading}
          >
            Continue with Google
          </Button>

          <p className="text-center text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
              className="ml-2 text-primary hover:underline font-medium"
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </main>
    </>
  )
}
