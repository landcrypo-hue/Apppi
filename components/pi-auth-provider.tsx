"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { waitForPiSDK, authenticateWithPi, type PiUser } from "@/lib/pi-sdk"

interface PiAuthContextType {
  user: PiUser | null
  isAuthenticated: boolean
  isLoading: boolean
  sdkAvailable: boolean
  error: string | null
  login: () => Promise<void>
  logout: () => void
  clearError: () => void
}

const PiAuthContext = createContext<PiAuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  sdkAvailable: false,
  error: null,
  login: async () => {},
  logout: () => {},
  clearError: () => {},
})

export function PiAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PiUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sdkAvailable, setSdkAvailable] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      console.log("[Pi Auth] Starting initialization...")

      const storedUser = localStorage.getItem("pi_user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          console.log("[Pi Auth] ✓ Session restored:", parsedUser.username)
        } catch (e) {
          console.error("[Pi Auth] Failed to parse stored user")
          localStorage.removeItem("pi_user")
        }
      }

      try {
        const ready = await waitForPiSDK(15000)
        setSdkAvailable(ready)

        if (ready) {
          console.log("[Pi Auth] ✓ SDK ready and available")
          setError(null)
        } else {
          console.warn("[Pi Auth] ✗ SDK not available - Pi Browser required")
          setError("Please open this app in Pi Browser to access all features")
        }
      } catch (error: any) {
        console.error("[Pi Auth] Initialization error:", error)
        setSdkAvailable(false)
        setError("Unable to connect to Pi Network")
      }
    }

    initializeAuth()

    const handleSDKReady = () => {
      console.log("[Pi Auth] ✓ SDK Ready event received")
      setSdkAvailable(true)
      setError(null)
    }

    const handleSDKFailed = () => {
      console.error("[Pi Auth] ✗ SDK Failed event received")
      setSdkAvailable(false)
      setError("Pi Network connection failed. Please use Pi Browser with stable internet connection")
    }

    window.addEventListener("piSDKReady", handleSDKReady)
    window.addEventListener("piSDKFailed", handleSDKFailed)

    return () => {
      window.removeEventListener("piSDKReady", handleSDKReady)
      window.removeEventListener("piSDKFailed", handleSDKFailed)
    }
  }, [])

  const login = async () => {
    if (!sdkAvailable) {
      setError("Pi Network SDK is not available. Please open this app in the Pi Browser.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("[Pi Auth] Starting authentication...")
      const piUser = await authenticateWithPi()

      if (piUser) {
        setUser(piUser)
        localStorage.setItem("pi_user", JSON.stringify(piUser))
        console.log("[Pi Auth] ✓ Authenticated:", piUser.username, "| Scopes:", piUser.scopes.join(", "))
      }
    } catch (error: any) {
      console.error("[Pi Auth] ✗ Authentication failed:", error)
      setError(error?.message || "Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pi_user")
    setError(null)
    console.log("[Pi Auth] User logged out")
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <PiAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        sdkAvailable,
        error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </PiAuthContext.Provider>
  )
}

export function usePiAuth() {
  return useContext(PiAuthContext)
}
