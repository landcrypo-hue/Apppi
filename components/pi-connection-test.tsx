"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2, RefreshCw } from "lucide-react"

interface TestResult {
  name: string
  status: "pending" | "success" | "error"
  message: string
}

export function PiConnectionTest() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: "Pi SDK Script", status: "pending", message: "Checking..." },
    { name: "window.Pi Object", status: "pending", message: "Checking..." },
    { name: "SDK Initialization", status: "pending", message: "Checking..." },
    { name: "Sandbox Mode", status: "pending", message: "Checking..." },
  ])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    const newTests: TestResult[] = []

    // Test 1: SDK Script
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (typeof window !== "undefined" && document.querySelector('script[src*="sdk.minepi.com"]')) {
      newTests.push({
        name: "Pi SDK Script",
        status: "success",
        message: "✓ Script loaded from https://sdk.minepi.com/pi-sdk.js",
      })
    } else {
      newTests.push({
        name: "Pi SDK Script",
        status: "error",
        message: "✗ Script not found in DOM",
      })
    }
    setTests([...newTests])

    // Test 2: window.Pi
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (typeof window !== "undefined" && typeof window.Pi !== "undefined") {
      newTests.push({
        name: "window.Pi Object",
        status: "success",
        message: `✓ window.Pi available with ${Object.keys(window.Pi || {}).length} methods`,
      })
    } else {
      newTests.push({
        name: "window.Pi Object",
        status: "error",
        message: "✗ window.Pi is undefined",
      })
    }
    setTests([...newTests])

    // Test 3: SDK Init
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (typeof window !== "undefined" && window.piSDKReady === true) {
      newTests.push({
        name: "SDK Initialization",
        status: "success",
        message: "✓ Pi.init() completed successfully",
      })
    } else {
      newTests.push({
        name: "SDK Initialization",
        status: "error",
        message: "✗ Pi.init() not completed or failed",
      })
    }
    setTests([...newTests])

    // Test 4: Sandbox
    await new Promise((resolve) => setTimeout(resolve, 500))
    if (typeof window !== "undefined" && window.piSDKConfig?.sandbox === true) {
      newTests.push({
        name: "Sandbox Mode",
        status: "success",
        message: "✓ Testnet/Sandbox mode ACTIVE",
      })
    } else {
      newTests.push({
        name: "Sandbox Mode",
        status: "error",
        message: "✗ Sandbox mode not enabled",
      })
    }
    setTests([...newTests])

    setIsRunning(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  const allPassed = tests.every((t) => t.status === "success")

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Pi Network Connection Test</CardTitle>
        <Button size="sm" variant="outline" onClick={runTests} disabled={isRunning}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
          Retest
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {tests.map((test, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="shrink-0 mt-0.5">
              {test.status === "pending" && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
              {test.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
              {test.status === "error" && <XCircle className="h-5 w-5 text-red-600" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{test.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{test.message}</p>
            </div>
          </div>
        ))}

        {!isRunning && (
          <div
            className={`p-4 rounded-lg border ${allPassed ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}
          >
            <p className={`text-sm font-medium ${allPassed ? "text-green-800" : "text-orange-800"}`}>
              {allPassed
                ? "✓ All tests passed! Pi Network is ready."
                : "⚠ Some tests failed. Please open this app in Pi Browser."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
