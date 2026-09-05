"use client"

import { usePiAuth } from "@/contexts/pi-auth-context"

export function PiStatusDisplay() {
  const { isAuthenticated, userData } = usePiAuth()

  if (!isAuthenticated || !userData) return null

  return (
    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-2 flex items-center justify-between text-sm mb-2">
      <span className="text-green-700 dark:text-green-300 font-medium">Pi SDK: Connected</span>
      <span className="text-green-600 dark:text-green-400">{userData.username}</span>
    </div>
  )
}
