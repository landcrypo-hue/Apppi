import { type NextRequest, NextResponse } from "next/server"

// Backend API to complete Pi payment
// This endpoint should be called from onReadyForServerCompletion callback
export async function POST(request: NextRequest) {
  try {
    const { paymentId, txid } = await request.json()

    // Call Pi Network API to complete payment
    // Headers: { authorization: `Key ${process.env.PI_API_KEY}` }
    const PI_API_KEY = process.env.PI_API_KEY || "your-pi-api-key"
    const completeURL = `https://api.minepi.com/v2/payments/${paymentId}/complete`

    const response = await fetch(completeURL, {
      method: "POST",
      headers: {
        authorization: `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ txid }),
    })

    const paymentDTO = await response.json()
    console.log("[v0] Payment completed:", paymentDTO)

    // Store completed payment in database
    // Update user balance, service access, transaction history, etc.

    return NextResponse.json({ success: true, payment: paymentDTO })
  } catch (error) {
    console.error("[v0] Complete payment error:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
