// Pi Network SDK v2.0+ Loader and Initializer
// This file loads the Pi SDK from the official CDN and initializes it
// Must be loaded before any attempt to use the Pi SDK

;(() => {
  console.log("[Pi SDK Loader] Starting Pi Network SDK initialization...")

  // Check if SDK is already loaded
  if (window.Pi) {
    console.log("[Pi SDK Loader] SDK already loaded, initializing...")
    initializePiSDK()
    return
  }

  // Load the official Pi SDK script
  const script = document.createElement("script")
  script.src = "https://sdk.minepi.com/pi-sdk.js"
  script.async = false
  script.defer = false

  script.onload = () => {
    console.log("[Pi SDK Loader] ✓ SDK script loaded successfully from CDN")

    // Wait a brief moment for the script to fully initialize
    setTimeout(() => {
      if (window.Pi) {
        initializePiSDK()
      } else {
        console.error("[Pi SDK Loader] ✗ window.Pi not available after script load")
        window.dispatchEvent(
          new CustomEvent("piSDKFailed", {
            detail: { message: "SDK script loaded but window.Pi is undefined" },
          }),
        )
      }
    }, 100)
  }

  script.onerror = () => {
    console.error("[Pi SDK Loader] ✗ Failed to load Pi SDK from CDN")
    console.error("[Pi SDK Loader] Check: 1) Internet connection 2) CDN accessibility 3) CORS settings")
    window.dispatchEvent(
      new CustomEvent("piSDKFailed", {
        detail: { message: "Failed to load SDK script from CDN" },
      }),
    )
  }

  // Append script to head
  document.head.appendChild(script)

  // Initialize the Pi SDK
  function initializePiSDK() {
    try {
      console.log("[Pi SDK Loader] Calling Pi.init()...")

      window.Pi.init({
        version: "2.0",
        sandbox: true, // Enable Testnet/Sandbox mode for development
      })

      // Set global flags
      window.piSDKReady = true
      window.piSDKConfig = { version: "2.0", sandbox: true }

      console.log("[Pi SDK Loader] ═══════════════════════════════════")
      console.log("[Pi SDK Loader] ✓✓✓ Pi SDK READY ✓✓✓")
      console.log("[Pi SDK Loader] Version: 2.0")
      console.log("[Pi SDK Loader] Mode: SANDBOX (Testnet)")
      console.log("[Pi SDK Loader] Status: INITIALIZED")
      console.log("[Pi SDK Loader] ═══════════════════════════════════")

      // Dispatch success event
      window.dispatchEvent(
        new CustomEvent("piSDKReady", {
          detail: {
            sandbox: true,
            version: "2.0",
            timestamp: Date.now(),
          },
        }),
      )
    } catch (error) {
      console.error("[Pi SDK Loader] ✗ Pi.init() failed:", error)
      window.piSDKReady = false
      window.dispatchEvent(new CustomEvent("piSDKError", { detail: error }))
    }
  }

  // Auto-detect Pi Browser
  if (typeof navigator !== "undefined" && navigator.userAgent) {
    const isPiBrowser =
      navigator.userAgent.toLowerCase().includes("pibrowser") || navigator.userAgent.toLowerCase().includes("pi/")

    if (isPiBrowser) {
      console.log("[Pi SDK Loader] ✓ Running inside Pi Browser")
    } else {
      console.warn("[Pi SDK Loader] ⚠ Not detected as Pi Browser - some features may not work")
      console.warn("[Pi SDK Loader] Please open this app in the official Pi Browser for full functionality")
    }
  }
})()
