// Pi Network SDK Integration - Real SDK Only
// Works exclusively with Pi Browser and Testnet/Sandbox mode

export interface PiUser {
  uid: string
  username: string
  accessToken: string
  scopes: string[]
}

export interface PiPayment {
  identifier: string
  amount: number
  memo: string
  metadata: Record<string, any>
  status: "pending" | "approved" | "completed" | "cancelled" | "error"
  txid?: string
}

declare global {
  interface Window {
    Pi: {
      init: (config: { version: string; sandbox: boolean }) => void
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (payment: any) => void,
      ) => Promise<{ accessToken: string; user: { uid: string; username: string } }>
      createPayment: (
        paymentData: { amount: number; memo: string; metadata: Record<string, any> },
        callbacks: {
          onReadyForServerApproval: (paymentId: string) => void
          onReadyForServerCompletion: (paymentId: string, txid: string) => void
          onCancel: (paymentId: string) => void
          onError: (error: Error, payment?: any) => void
        },
      ) => Promise<PiPayment>
      openShareDialog: (title: string, message: string) => void
    }
    piSDKReady?: boolean
    piSDKConfig?: { version: string; sandbox: boolean }
  }
}

const isDevelopmentMode =
  process.env.NODE_ENV === "development" || (typeof window !== "undefined" && window.location.hostname === "localhost")

export function isPiSDKAvailable(): boolean {
  if (typeof window === "undefined") return false
  return !!(window.Pi && typeof window.Pi.init === "function" && window.piSDKReady === true)
}

export function waitForPiSDK(timeout = 10000): Promise<boolean> {
  return new Promise((resolve) => {
    if (isPiSDKAvailable()) {
      console.log("[Pi SDK] ✓ Already available and initialized")
      resolve(true)
      return
    }

    let resolved = false

    const handleReady = () => {
      if (!resolved) {
        resolved = true
        console.log("[Pi SDK] ✓ Ready event received")
        resolve(true)
      }
    }

    window.addEventListener("piSDKReady", handleReady, { once: true })

    const checkInterval = setInterval(() => {
      if (isPiSDKAvailable() && !resolved) {
        resolved = true
        clearInterval(checkInterval)
        window.removeEventListener("piSDKReady", handleReady)
        console.log("[Pi SDK] ✓ Detected via polling")
        resolve(true)
      }
    }, 200)

    setTimeout(() => {
      clearInterval(checkInterval)
      window.removeEventListener("piSDKReady", handleReady)
      if (!resolved) {
        resolved = true
        const available = isPiSDKAvailable()
        console.warn(`[Pi SDK] Timeout after ${timeout}ms - SDK ${available ? "available" : "unavailable"}`)
        resolve(available)
      }
    }, timeout)
  })
}

export async function authenticateWithPi(): Promise<PiUser | null> {
  if (typeof window === "undefined") {
    throw new Error("Window not available")
  }

  console.log("[Pi SDK] Starting authentication...")
  const sdkReady = await waitForPiSDK(10000)

  if (!sdkReady || !window.Pi) {
    throw new Error(
      "Pi Network SDK not available. Please:\n" +
        "1. Open this app in Pi Browser\n" +
        "2. Ensure you have an active internet connection\n" +
        "3. Try refreshing the page",
    )
  }

  try {
    const scopes = ["username", "payments"]
    const onIncompletePaymentFound = (payment: any) => {
      console.log("[Pi SDK] Incomplete payment found:", payment.identifier)
    }

    console.log("[Pi SDK] Requesting authentication with scopes:", scopes)
    const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound)

    console.log("[Pi SDK] Authentication successful for user:", auth.user.username)

    return {
      uid: auth.user.uid,
      username: auth.user.username,
      accessToken: auth.accessToken,
      scopes: scopes,
    }
  } catch (error: any) {
    console.error("[Pi SDK] Authentication error:", error)

    if (error?.message?.includes("user_cancelled") || error?.message?.includes("denied")) {
      throw new Error("Authentication cancelled. Please approve the permissions to continue.")
    } else if (error?.message?.includes("network") || error?.message?.includes("timeout")) {
      throw new Error("Network error. Please check your connection and try again.")
    } else {
      throw new Error(`Authentication failed: ${error?.message || "Unknown error"}`)
    }
  }
}

export async function createPiPayment(
  serviceType: string,
  amount = 0.25,
  metadata: Record<string, any> = {},
): Promise<PiPayment> {
  if (typeof window === "undefined") {
    throw new Error("Window not available")
  }

  const sdkReady = await waitForPiSDK()
  if (!sdkReady || !window.Pi) {
    throw new Error("Pi SDK not available for payment")
  }

  console.log(`[Pi SDK] Creating payment: ${amount} Pi for ${serviceType}`)

  const paymentData = {
    amount,
    memo: `Eservices: ${serviceType}`,
    metadata: {
      serviceType,
      ...metadata,
      timestamp: new Date().toISOString(),
      app: "Eservices",
    },
  }

  return new Promise((resolve, reject) => {
    const callbacks = {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("[Pi SDK] Payment ready for approval:", paymentId)
        try {
          const response = await fetch("/api/pi/approve-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId }),
          })

          if (!response.ok) {
            throw new Error(`Approval failed: ${response.statusText}`)
          }

          console.log("[Pi SDK] Payment approved successfully")
        } catch (error) {
          console.error("[Pi SDK] Payment approval error:", error)
          reject(error)
        }
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("[Pi SDK] Payment ready for completion:", paymentId, "TX:", txid)
        try {
          const response = await fetch("/api/pi/complete-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paymentId, txid }),
          })

          if (!response.ok) {
            throw new Error(`Completion failed: ${response.statusText}`)
          }

          console.log("[Pi SDK] Payment completed successfully")
          resolve({
            identifier: paymentId,
            amount,
            memo: paymentData.memo,
            metadata: paymentData.metadata,
            status: "completed",
            txid,
          })
        } catch (error) {
          console.error("[Pi SDK] Payment completion error:", error)
          reject(error)
        }
      },
      onCancel: (paymentId: string) => {
        console.log("[Pi SDK] Payment cancelled:", paymentId)
        resolve({
          identifier: paymentId,
          amount,
          memo: paymentData.memo,
          metadata: paymentData.metadata,
          status: "cancelled",
        })
      },
      onError: (error: Error, payment?: any) => {
        console.error("[Pi SDK] Payment error:", error)
        reject(error)
      },
    }

    window.Pi.createPayment(paymentData, callbacks)
  })
}
