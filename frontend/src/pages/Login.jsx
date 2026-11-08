import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
    setSuccess('')
  }

const handleSubmit = (e) => {
  e.preventDefault()
  setError('')
  setSuccess('')

  if (!formData.emailOrUsername.trim() || !formData.password) {
    setError('Please enter your details to Log In.')
    return
  }

  if (formData.password.length < 8) {
    setError('Password must contain at least 8 characters.')
    return
  }

  setLoading(true)

  // Temporary mock login for frontend testing.
  setTimeout(() => {
    const userData = {
      emailOrUsername: formData.emailOrUsername,
    }

    login(userData)
    setLoading(false)
    navigate('/dashboard')
  }, 700)
}
  const handleForgotPassword = () => {
    setError('')
    setSuccess('Password recovery will be available once the authentication API is connected.')
  }

  return (
    <AuthLayout
      title="Welcome to Journiq!"
      subtitle="Please enter your details to Log In."
      footer={
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-[#173e62] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#29445e]">
            E-mail / Username
          </label>

          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Enter your e-mail or username"
            disabled={loading}
            className="w-full rounded-lg border border-[#bdcbd7] bg-white/80 px-4 py-3 text-sm outline-none transition focus:border-[#173e62] focus:ring-2 focus:ring-[#173e62]/15"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#29445e]">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              className="w-full rounded-lg border border-[#bdcbd7] bg-white/80 px-4 py-3 pr-16 text-sm outline-none transition focus:border-[#173e62] focus:ring-2 focus:ring-[#173e62]/15"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#315d80] hover:underline"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm font-medium text-[#315d80] hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#102d4e] py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[#1b466d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Please wait...' : 'Log In'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Login

