import { type NextRequest, NextResponse } from "next/server"

// Backend API to approve Pi payment
// This endpoint should be called from onReadyForServerApproval callback
export async function POST(request: NextRequest) {
  try {
    const { paymentId } = await request.json()

    // Call Pi Network API to approve payment
    // Headers: { authorization: `Key ${process.env.PI_API_KEY}` }
    const PI_API_KEY = process.env.PI_API_KEY || "your-pi-api-key"
    const approveURL = `https://api.minepi.com/v2/payments/${paymentId}/approve`

    const response = await fetch(approveURL, {
      method: "POST",
      headers: {
        authorization: `Key ${PI_API_KEY}`,
        "Content-Type": "application/json",
      },
    })

    const paymentDTO = await response.json()
    console.log("[v0] Payment approved:", paymentDTO)

    return NextResponse.json({ success: true, payment: paymentDTO })
  } catch (error) {
    console.error("[v0] Approve payment error:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
