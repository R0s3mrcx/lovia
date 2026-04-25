export const dynamic = "force-dynamic"
export const runtime = "nodejs"

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { cardsCreatedTotal, httpRequestsTotal } from "@/lib/metrics"

type CardInsert = {
  id: string
  animal: string
  to: string
  from: string
  message: string
  image_url?: string
  music?: string
}

export async function POST(req: NextRequest) {
  const path = "/api/cards"

  try {
    const body: CardInsert = await req.json()
    const { id, animal, to, from, message, image_url, music } = body

    if (!id || !animal || !to || !from || !message) {
      httpRequestsTotal.inc({ method: "POST", path, status_code: "400" })
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
    }

    if (to.length > 100 || from.length > 100 || message.length > 2000) {
      httpRequestsTotal.inc({ method: "POST", path, status_code: "400" })
      return NextResponse.json({ error: "Input too long." }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const payload: CardInsert = { id, animal, to, from, message }
    if (image_url) payload.image_url = image_url
    if (music && music !== "none") payload.music = music

    const { error } = await supabase.from("cards").insert(payload)
    if (error) throw new Error(error.message)

    cardsCreatedTotal.inc({ animal_theme: animal ?? "none" })
    httpRequestsTotal.inc({ method: "POST", path, status_code: "201" })

    return NextResponse.json({ id }, { status: 201 })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error"
    httpRequestsTotal.inc({ method: "POST", path, status_code: "500" })
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
