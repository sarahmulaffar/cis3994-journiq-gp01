
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { authApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    username: '',
    nic: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'E-mail', type: 'email' },
    { name: 'contactNo', label: 'Contact No', type: 'tel' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'nic', label: 'NIC', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (Object.values(formData).some((value) => !value.trim())) {
      setError('Please enter all required details.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }

    const cleanedContactNo = formData.contactNo.replace(/[\s-]/g, '')

    if (!/^(?:\+94|0)?7\d{8}$/.test(cleanedContactNo)) {
      setError('Please enter a valid Sri Lankan mobile number.')
      return
    }

    if (!/^(?:\d{9}[vVxX]|\d{12})$/.test(formData.nic)) {
      setError('Please enter a valid NIC number.')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const result = await authApi.register({
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      })

      if (result.data?.accessToken && result.data?.user) {
        login(result.data)
        navigate('/dashboard')
      } else {
        setSuccess(
          result.message ||
          'Registration successful! Please check your email to verify your account, then log in.'
        )
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome to Journiq!"
      subtitle="Enter your details to create your account."
      footer={
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-[#173e62] hover:underline"
          >
            Log In
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {fields.map((field) => {
          const isPassword =
            field.name === 'password' ||
            field.name === 'confirmPassword'

          return (
            <div key={field.name}>
              <label className="mb-1.5 block text-sm font-medium text-[#29445e]">
                {field.label}
              </label>

              <div className="relative">
                <input
                  type={
                    isPassword && showPassword
                      ? 'text'
                      : field.type
                  }
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  disabled={loading}
                  className="w-full rounded-lg border border-[#bdcbd7] bg-white/80 px-4 py-2.5 pr-16 text-sm outline-none transition focus:border-[#173e62] focus:ring-2 focus:ring-[#173e62]/15"
                />

                {isPassword && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#315d80] hover:underline"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                )}
              </div>
            </div>
          )
        })}

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
          {loading ? 'Please wait...' : 'Sign Up'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default Signup
