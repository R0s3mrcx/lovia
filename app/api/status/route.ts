export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextResponse } from "next/server"

const startTime = Date.now()

export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000)
  const uptimeMinutes = Math.floor(uptimeSeconds / 60)
  const uptimeHours = Math.floor(uptimeMinutes / 60)

  return NextResponse.json({
    status: "ok",
    app: "lovia",
    version: process.env.npm_package_version ?? "1.0.0",
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: uptimeSeconds,
      human: `${uptimeHours}h ${uptimeMinutes % 60}m ${uptimeSeconds % 60}s`,
    },
    environment: process.env.NODE_ENV ?? "unknown",
  })
}
