"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Animal } from "@/lib/animals"

interface MessageFormProps {
  selectedAnimal: Animal
  onGenerate: (to: string, from: string, message: string) => void
}

export function MessageForm({ selectedAnimal, onGenerate }: MessageFormProps) {
  const [to, setTo] = useState("")
  const [from, setFrom] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (to && from && message) {
      onGenerate(to, from, message)
    }
  }

  return (
    <div className="rounded-3xl border-4 border-primary/20 bg-card p-6 shadow-xl md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br p-2 ${selectedAnimal.color}`}>
          <img
            src={selectedAnimal.image || "/placeholder.svg"}
            alt={selectedAnimal.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            Your {selectedAnimal.name} Card {selectedAnimal.emoji}
          </h3>
          <p className="text-muted-foreground">Fill in the details below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="to" className="text-base font-semibold">
            To 💝
          </Label>
          <Input
            id="to"
            placeholder="Who is this card for?"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-xl border-2 border-border bg-input py-6 text-base focus:border-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-base font-semibold">
            Your Message 💌
          </Label>
          <Textarea
            id="message"
            placeholder="Write something special..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] rounded-xl border-2 border-border bg-input text-base focus:border-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="from" className="text-base font-semibold">
            From ✨
          </Label>
          <Input
            id="from"
            placeholder="Your name"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-xl border-2 border-border bg-input py-6 text-base focus:border-primary"
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full rounded-2xl bg-primary py-7 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] hover:bg-primary/90 hover:shadow-xl"
        >
          Create magic card ✨
        </Button>
      </form>
    </div>
  )
}
