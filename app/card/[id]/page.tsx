"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { CardContent } from "@/components/card-content"

export default function CardPage() {
  const { id } = useParams()
  const [card, setCard] = useState<any>(null)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("cards")
        .select("*")
        .eq("id", id)
        .single()

      setCard(data)
    }

    load()
  }, [id])

  if (!card) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
        <span className="animate-bounce-soft text-6xl">✨</span>
      </div>
    )
  }

  return (
    <CardContent
      animal={card.animal}
      to={card.to}
      from={card.from}
      message={card.message}
    />
  )
}