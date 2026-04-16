"use client"

import { useState } from "react"
import { uploadCustomImage } from "@/lib/uploadImage"
import { track } from "@/lib/analytics"
import type { Animal } from "@/lib/animals"

type UseCardOptions = {
  selectedAnimal: Animal | null
}

type GenerateParams = {
  to: string
  from: string
  message: string
  photo?: File
  music?: string
}

export function useCard({ selectedAnimal }: UseCardOptions) {
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState<string | null>(null)
  const [generatedId, setGeneratedId]   = useState<string | null>(null)
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)

  const generate = async ({ to, from, message, photo, music }: GenerateParams) => {
    if (!selectedAnimal) return
    setLoading(true)
    setError(null)

    try {
      const id = Math.random().toString(36).substring(2, 8)
      let image_url: string | undefined

      if (photo) {
        try {
          image_url = await uploadCustomImage(photo)
        } catch {
          setError("Photo upload failed — the card was created without it.")
        }
      }

      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          animal: selectedAnimal.id,
          to,
          from,
          message,
          image_url,
          music,
        }),
      })

      if (res.status === 429) {
        throw new Error("Too many cards — wait a moment and try again.")
      }

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Something went wrong.")
      }

      track("card_created", { animal: selectedAnimal.id, hasPhoto: !!image_url, music: music ?? "none" })

      setGeneratedId(id)
      setGeneratedLink(`${window.location.origin}/card/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setGeneratedId(null)
    setGeneratedLink(null)
    setError(null)
  }

  return { loading, error, generatedId, generatedLink, generate, reset }
}
