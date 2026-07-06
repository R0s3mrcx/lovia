import { NextRequest, NextResponse } from "next/server"

const WINDOW_MS = 60_000  // 1 minute
const MAX_CARDS = 5       // max cards per IP per minute

const store = new Map<string, { count: number; resetAt: number }>()

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  )
}

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/api/cards")) {
    return NextResponse.next()
  }

  const ip  = getIp(req)
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return NextResponse.next()
  }

  if (entry.count >= MAX_CARDS) {
    return NextResponse.json(
      { error: "Too many requests — please wait a moment before creating another card." },
      { status: 429 }
    )
  }

  entry.count++
  return NextResponse.next()
}

export const config = {
  matcher: "/api/cards/:path*",
}
