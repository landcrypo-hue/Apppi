import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      status: "healthy",
      timestamp: new Date().toISOString(),
      service: "eservices-pi-app",
      version: "1.0.0",
      environment: process.env.NODE_ENV,
      piSandbox: process.env.PI_SANDBOX_MODE === "true",
    },
    { status: 200 },
  )
}
