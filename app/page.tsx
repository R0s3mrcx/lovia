"use client"

import { useState, useEffect, useRef } from "react"
import { classicAnimals, seasonalAnimals, type Animal } from "@/lib/animals"
import { AnimalCard } from "@/components/animal-card"
import { MessageForm } from "@/components/message-form"
import { ShareModal } from "@/components/share-modal"
import { FloatingElements } from "@/components/floating-elements"
import { supabase } from "@/lib/supabase"
import { uploadCustomImage } from "@/lib/uploadImage"
import Link from "next/link"

type CardInsert = {
  id: string
  animal: string
  to: string
  from: string
  message: string
  image_url?: string
  music?: string
}

export default function HomePage() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)
  const [generatedId, setGeneratedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardCount, setCardCount] = useState<number | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    supabase
      .from("cards")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => { if (count !== null) setCardCount(count) })
  }, [])

  useEffect(() => {
    if (selectedAnimal && formRef.current) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [selectedAnimal])

  const handleGenerate = async (
    to: string,
    from: string,
    message: string,
    photo?: File,
    music?: string
  ) => {
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

      const payload: CardInsert = { id, animal: selectedAnimal.id, to, from, message }
      if (image_url) payload.image_url = image_url
      if (music && music !== "none") payload.music = music

      const { error: insertError } = await supabase.from("cards").insert(payload)
      if (insertError) throw new Error(insertError.message)

      setGeneratedId(id)
      setGeneratedLink(`${window.location.origin}/card/${id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCloseModal = () => {
    setGeneratedLink(null)
    setGeneratedId(null)
    setSelectedAnimal(null)
    setError(null)
  }

  const handleSelectAnimal = (animal: Animal) => {
    setSelectedAnimal(animal)
    setError(null)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <FloatingElements />

      <nav className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 pt-5 md:pt-7">
        <span className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
          Lovia💖
        </span>
        <Link
          href="/ideas"
          className="rounded-full border border-primary/30 bg-white/60 px-4 py-2 text-sm font-semibold text-primary backdrop-blur transition-all hover:bg-white/90"
        >
          Message ideas 💝
        </Link>
      </nav>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20">

        <section className="pt-10 pb-12 text-center md:pt-14 md:pb-16">
          <div className="mx-auto mb-4 w-fit rounded-full border border-white/60 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary backdrop-blur">
            Free · No signup · Instant
          </div>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Send a card that <span className="text-primary">actually feels</span> like something 💖
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">
            Pick a cute companion, write your message, share the link.
            They tap — and a little magic happens.
          </p>

          {cardCount !== null && cardCount > 0 && (
            <div className="mx-auto mt-5 w-fit rounded-full border border-white/50 bg-white/60 px-5 py-2 text-sm font-semibold text-muted-foreground backdrop-blur">
              💖 {cardCount.toLocaleString()} cards sent around the world
            </div>
          )}

          <div className="mt-8 flex animate-bounce justify-center text-3xl text-primary/60">↓</div>
        </section>

        <section className="mb-14">
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            {[
              { n: "1", emoji: "🐾", title: "Pick a companion", desc: "An animal that matches the feeling" },
              { n: "2", emoji: "💌", title: "Write your message", desc: "Add music & a photo if you want" },
              { n: "3", emoji: "🫶", title: "Share the link", desc: "They tap it — magic happens" },
            ].map((s) => (
              <div
                key={s.n}
                className="flex flex-col items-center rounded-2xl border border-white/50 bg-white/50 px-3 py-5 text-center backdrop-blur md:py-6"
              >
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-extrabold text-primary">
                  {s.n}
                </div>
                <div className="text-2xl">{s.emoji}</div>
                <p className="mt-2 text-xs font-bold text-foreground md:text-sm">{s.title}</p>
                <p className="mt-0.5 hidden text-xs text-muted-foreground md:block">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-4 text-center text-xl font-bold text-foreground md:text-2xl">
            Pick your cute companion
          </h2>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 md:gap-5">
            {classicAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                selected={selectedAnimal?.id === animal.id}
                onSelect={() => handleSelectAnimal(animal)}
              />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/20" />
            <span className="rounded-full border border-primary/30 bg-white/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur">
              Special editions
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/20" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-5">
            {seasonalAnimals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                selected={selectedAnimal?.id === animal.id}
                onSelect={() => handleSelectAnimal(animal)}
              />
            ))}
          </div>
        </section>

        {error && (
          <div className="mx-auto mb-6 max-w-lg rounded-2xl border border-red-200 bg-red-50/80 p-4 text-center text-sm font-medium text-red-600 backdrop-blur">
            {error}
          </div>
        )}

        {selectedAnimal && (
          <section ref={formRef} className="mx-auto max-w-lg scroll-mt-8 pt-2">
            <MessageForm
              selectedAnimal={selectedAnimal}
              onGenerate={handleGenerate}
              loading={loading}
            />
          </section>
        )}

        <footer className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">Made with 💚 to spread love around the world</p>
          <Link href="/ideas" className="mt-1 inline-block text-xs text-muted-foreground underline-offset-4 hover:underline hover:text-primary">
            Need message ideas?
          </Link>
        </footer>
      </div>

      {generatedLink && (
        <ShareModal
          link={generatedLink}
          cardId={generatedId ?? ""}
          onClose={handleCloseModal}
        />
      )}
    </main>
  )
}
