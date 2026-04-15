"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Animal } from "@/lib/animals"
import { animalThemes } from "@/lib/animalThemes"
import { musicOptions } from "@/lib/music"
import { cn } from "@/lib/utils"

interface MessageFormProps {
  selectedAnimal: Animal
  onGenerate: (to: string, from: string, message: string, photo?: File, music?: string) => void
  loading?: boolean
}

export function MessageForm({ selectedAnimal, onGenerate, loading }: MessageFormProps) {
  const [to, setTo] = useState("")
  const [from, setFrom] = useState("")
  const [message, setMessage] = useState("")
  const [selectedMusic, setSelectedMusic] = useState("none")
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhoto(file)
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setPhoto(null)
    setPhotoPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (to && from && message) {
      onGenerate(to, from, message, photo ?? undefined, selectedMusic)
    }
  }

  return (
    <div
      className={cn(
        "rounded-3xl p-6 shadow-2xl md:p-8",
        animalThemes[selectedAnimal.id],
        "border border-white/40 backdrop-blur-lg"
      )}
    >
      <div className="mb-6 flex items-center gap-4">
        <div
          className={cn(
            "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl p-2",
            animalThemes[selectedAnimal.id],
            "border border-white/40 backdrop-blur-md"
          )}
        >
          {photoPreview ? (
            <img src={photoPreview} alt="Your photo" className="h-full w-full rounded-xl object-cover" />
          ) : (
            <img src={selectedAnimal.image || "/placeholder.svg"} alt={selectedAnimal.name} className="h-full w-full object-contain" />
          )}
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
          <Label htmlFor="to" className="text-base font-semibold">To 💝</Label>
          <Input
            id="to"
            placeholder="Who is this card for?"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-xl border-0 bg-white/70 py-6 text-base backdrop-blur"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-base font-semibold">Your Message 💌</Label>
          <Textarea
            id="message"
            placeholder="Write something special..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] rounded-xl border-0 bg-white/70 text-base backdrop-blur"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="from" className="text-base font-semibold">From ✨</Label>
          <Input
            id="from"
            placeholder="Your name"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-xl border-0 bg-white/70 py-6 text-base backdrop-blur"
            required
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Add a photo 📸{" "}
            <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </Label>

          {photoPreview ? (
            <div className="relative overflow-hidden rounded-2xl bg-white/70">
              <img src={photoPreview} alt="Preview" className="max-h-40 w-full object-cover" />
              <button
                type="button"
                onClick={removePhoto}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/60 bg-white/40 py-5 text-base font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-white/60"
            >
              <span className="text-2xl">📸</span>
              <span>Upload your photo</span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-base font-semibold">
            Background music 🎵{" "}
            <span className="text-xs font-normal text-muted-foreground">(optional)</span>
          </Label>
          <div className="grid grid-cols-4 gap-2">
            {musicOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedMusic(opt.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border-2 py-3 text-xs font-bold transition-all",
                  selectedMusic === opt.id
                    ? "scale-[1.04] border-primary bg-primary/20"
                    : "border-white/50 bg-white/40 hover:bg-white/60"
                )}
              >
                <span className="text-xl">{opt.emoji}</span>
                <span className="text-foreground">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full rounded-2xl bg-primary py-7 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Creating magic... ✨" : "Create magic card ✨"}
        </Button>
      </form>
    </div>
  )
}
