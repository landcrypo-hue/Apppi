import { type NextRequest, NextResponse } from "next/server"

// Backend API to get Pi payment information
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get("paymentId")

    if (!paymentId) {
      return NextResponse.json({ success: false, error: "Payment ID required" }, { status: 400 })
    }

    // Call Pi Network API to get payment info
    const PI_API_KEY = process.env.PI_API_KEY || "your-pi-api-key"
    const paymentURL = `https://api.minepi.com/v2/payments/${paymentId}`

    const response = await fetch(paymentURL, {
      headers: {
        authorization: `Key ${PI_API_KEY}`,
      },
    })

    const paymentDTO = await response.json()

    return NextResponse.json({ success: true, payment: paymentDTO })
  } catch (error) {
    console.error("[v0] Get payment info error:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
