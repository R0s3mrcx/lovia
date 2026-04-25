export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { register } from "@/lib/metrics"

export async function GET() {
  try {
    const metrics = await register.metrics()
    return new NextResponse(metrics, {
      status: 200,
      headers: {
        "Content-Type": register.contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch {
    return NextResponse.json({ error: "Error generating metrics" }, { status: 500 })
  }
}
