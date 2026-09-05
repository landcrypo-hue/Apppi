"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

export function PiSDKInitializer() {
  const [scriptStatus, setScriptStatus] = useState<"loading" | "loaded" | "error">("loading")

  useEffect(() => {
    // Listen for SDK ready events
    const handleSDKReady = () => {
      console.log("[v0] Pi SDK initialization complete ✓")
      setScriptStatus("loaded")
      window.dispatchEvent(new Event("piSDKReady"))
    }

    const handleSDKError = () => {
      console.error("[v0] Pi SDK failed to initialize ✗")
      setScriptStatus("error")
      window.dispatchEvent(new Event("piSDKFailed"))
    }

    // Check if SDK is already loaded
    if (typeof window !== "undefined" && window.Pi && window.piSDKReady) {
      console.log("[v0] Pi SDK already initialized")
      setScriptStatus("loaded")
    }

    window.addEventListener("piSDKReady", handleSDKReady)
    window.addEventListener("piSDKFailed", handleSDKError)

    return () => {
      window.removeEventListener("piSDKReady", handleSDKReady)
      window.removeEventListener("piSDKFailed", handleSDKError)
    }
  }, [])

  const handleScriptLoad = () => {
    console.log("[v0] Pi SDK script loaded from CDN")
    
    // Initialize the SDK immediately
    if (typeof window !== "undefined" && window.Pi) {
      try {
        console.log("[v0] Initializing Pi SDK with config: { version: '2.0', sandbox: true }")
        window.Pi.init({ version: "2.0", sandbox: true })
        
        // Set global flags
        window.piSDKReady = true
        window.piSDKConfig = { version: "2.0", sandbox: true }
        
        console.log("[v0] Pi SDK initialized successfully ✓")
        console.log("[v0] Mode: SANDBOX (Testnet)")
        console.log("[v0] window.Pi is available:", typeof window.Pi === "object")
        console.log("[v0] window.piSDKReady:", window.piSDKReady)
        
        setScriptStatus("loaded")
        
        // Dispatch custom event
        window.dispatchEvent(new Event("piSDKReady"))
      } catch (error) {
        console.error("[v0] Failed to initialize Pi SDK:", error)
        setScriptStatus("error")
        window.dispatchEvent(new Event("piSDKFailed"))
      }
    } else {
      console.error("[v0] window.Pi not available after script load")
      setScriptStatus("error")
      window.dispatchEvent(new Event("piSDKFailed"))
    }
  }

  const handleScriptError = (error: any) => {
    console.error("[v0] Failed to load Pi SDK script from CDN:", error)
    setScriptStatus("error")
    window.dispatchEvent(new Event("piSDKFailed"))
  }

  return (
    <>
      <Script
        id="pi-sdk"
        src="https://sdk.minepi.com/pi-sdk.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === "development" && scriptStatus === "loaded" && (
        <div 
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            background: "rgba(34, 197, 94, 0.9)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "bold",
            zIndex: 9999,
          }}
        >
          ✓ Pi SDK Ready
        </div>
      )}
    </>
  )
}
