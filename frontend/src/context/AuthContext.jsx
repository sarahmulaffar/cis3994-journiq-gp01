import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

const STORAGE_KEY = 'journiq_session'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const savedSession = sessionStorage.getItem(STORAGE_KEY)
      return savedSession ? JSON.parse(savedSession) : null
    } catch {
      sessionStorage.removeItem(STORAGE_KEY)
      return null
    }
  })

  const [isLoading, setIsLoading] = useState(true)

  // Restore and verify the user's session when the app loads
  useEffect(() => {
    const restoreSession = async () => {
      if (!session?.accessToken) {
        setIsLoading(false)
        return
      }

      try {
        const result = await authApi.getSession(session.accessToken)

        const updatedSession = {
          ...session,
          user: result.data.user,
        }

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSession))
        setSession(updatedSession)
      } catch (error) {
        console.error('Session restoration failed:', error)
        sessionStorage.removeItem(STORAGE_KEY)
        setSession(null)
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  // Save the authenticated user's session
  const login = (authData) => {
    const { user, accessToken, refreshToken } = authData

    if (!user || !accessToken) {
      throw new Error('Invalid login session.')
    }

    const newSession = {
      user,
      accessToken,
      refreshToken,
    }

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSession))
    setSession(newSession)
  }

  // Clear the local session
  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }

  const value = {
    user: session?.user || null,
    accessToken: session?.accessToken || null,
    isAuthenticated: Boolean(session?.user && session?.accessToken),
    isLoading,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }

  return context
}