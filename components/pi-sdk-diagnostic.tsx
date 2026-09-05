"use client"

import { useEffect, useState } from "react"
import { usePiAuth } from "@/contexts/pi-auth-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, RefreshCw, ExternalLink, Check, X } from "lucide-react"

export function PiSDKDiagnostic() {
  const { isAuthenticated, userData, reinitialize } = usePiAuth()

  const [diagnostics, setDiagnostics] = useState({
    scriptLoaded: false,
    sdkInitialized: false,
    isPiBrowser: false,
  })

  const runDiagnostic = () => {
    // SDK script loaded = window.Pi object exists
    const piAvailable =
      typeof window !== "undefined" && typeof window.Pi !== "undefined"

    // SDK initialized = Pi.init was successfully called
    const initialized =
      typeof window !== "undefined" && window.piSDKReady === true

    // Pi Browser detection via user agent
    const ua =
      typeof navigator !== "undefined"
        ? navigator.userAgent.toLowerCase()
        : ""
    const isPiBrowser =
      ua.includes("pibrowser") || ua.includes("pi/") || isInIframe()

    setDiagnostics({
      scriptLoaded: piAvailable,
      sdkInitialized: initialized,
      isPiBrowser,
    })
  }

  // Detect if running in iframe (Pi Browser / App Studio)
  function isInIframe(): boolean {
    try {
      return window.self !== window.top
    } catch {
      return true
    }
  }

  useEffect(() => {
    const t = setTimeout(runDiagnostic, 1200)
    const onReady = () => setTimeout(runDiagnostic, 200)
    window.addEventListener("piSDKReady", onReady)
    return () => {
      clearTimeout(t)
      window.removeEventListener("piSDKReady", onReady)
    }
  }, [isAuthenticated])

  const allGreen =
    diagnostics.scriptLoaded &&
    diagnostics.sdkInitialized &&
    isAuthenticated

  if (allGreen) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 p-4 mb-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              SDK Ready — All Systems Operational
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <DiagItem label="SDK Script Loaded" ok={diagnostics.scriptLoaded} />
              <DiagItem label="SDK Initialized" ok={diagnostics.sdkInitialized} />
              <DiagItem label="User Authenticated" ok={isAuthenticated} />
              <DiagItem label="Pi Browser" ok={diagnostics.isPiBrowser} />
            </div>
            {userData && (
              <p className="text-xs text-green-700 dark:text-green-300 mt-2">
                Logged in as: <strong>{userData.username}</strong>
              </p>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 p-4 mb-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
              Pi Network Connection Diagnostic
            </h3>
            <p className="text-sm text-orange-800 dark:text-orange-200">
              Checking Pi Network integration status...
            </p>
          </div>

          <div className="space-y-2">
            <DiagItem label="SDK Script Loaded" ok={diagnostics.scriptLoaded} />
            <DiagItem label="SDK Initialized" ok={diagnostics.sdkInitialized} />
            <DiagItem label="User Authenticated" ok={isAuthenticated} />
            <DiagItem label="Pi Browser Detected" ok={diagnostics.isPiBrowser} />
          </div>

          {/* Resolution steps */}
          <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-200 rounded p-3 text-sm text-orange-900 dark:text-orange-200 space-y-1">
            {!diagnostics.scriptLoaded && (
              <p>SDK script not loaded — check internet connection</p>
            )}
            {diagnostics.scriptLoaded && !diagnostics.sdkInitialized && (
              <p>Pi.init() not called — SDK loaded but not initialized yet</p>
            )}
            {!isAuthenticated && (
              <p>User not authenticated — open in Pi Browser and accept login</p>
            )}
            {!diagnostics.isPiBrowser && (
              <p>Not in Pi Browser — Pi SDK only works inside Pi Browser</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              size="sm"
              variant="outline"
              onClick={reinitialize}
              className="gap-2 bg-white dark:bg-transparent"
            >
              <RefreshCw className="h-4 w-4" />
              Retry Login
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={runDiagnostic}
              className="gap-2 bg-white dark:bg-transparent"
            >
              <RefreshCw className="h-4 w-4" />
              Re-check
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open("https://minepi.com/pi-browser", "_blank")}
              className="gap-2 bg-white dark:bg-transparent"
            >
              <ExternalLink className="h-4 w-4" />
              Get Pi Browser
            </Button>
          </div>

          <div className="text-xs text-orange-700 dark:text-orange-300 space-y-1 pt-2 border-t border-orange-200">
            <p className="font-medium">Requirements:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>Open this app inside the official Pi Browser</li>
              <li>Accept authentication when prompted</li>
              <li>Ensure stable internet connection</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  )
}

function DiagItem({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-900/50 rounded border border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}:</span>
      <div className="flex items-center gap-1.5">
        <span className={`text-sm font-bold ${ok ? "text-green-600" : "text-orange-600"}`}>
          {ok ? "YES" : "NO"}
        </span>
        {ok ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <X className="h-4 w-4 text-orange-600" />
        )}
      </div>
    </div>
  )
}
