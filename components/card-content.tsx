"use client"

import { useSearchParams } from "next/navigation"
import { getAnimalById } from "@/lib/animals"
import { FloatingElements } from "@/components/floating-elements"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CardContent() {
  const searchParams = useSearchParams()

  const animalId = searchParams.get("animal") || "bunny"
  const to = searchParams.get("to") || "Someone Special"
  const from = searchParams.get("from") || "A Friend"
  const message = searchParams.get("message") || "You are amazing!"

  const animal = getAnimalById(animalId) || getAnimalById("bunny")!

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 p-4">
      <FloatingElements />

      <div className="relative z-10 w-full max-w-lg">
        {/* Card */}
        <div className="overflow-hidden rounded-[2rem] border-4 border-primary/30 bg-card shadow-2xl">
          {/* Animal Image Section */}
          <div className={`bg-gradient-to-br ${animal.color} relative p-8 pb-16`}>
            <div className="mx-auto w-48 md:w-64">
              <img
                src={animal.image || "/placeholder.svg"}
                alt={animal.name}
                className="animate-bounce-soft h-full w-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Decorative elements */}
            <span className="absolute top-4 left-4 text-3xl">✨</span>
            <span className="absolute top-8 right-6 text-2xl">💖</span>
            <span className="absolute bottom-8 left-8 text-2xl">⭐</span>
            <span className="absolute bottom-4 right-4 text-3xl">✨</span>
          </div>

          {/* Message Section */}
          <div className="relative -mt-8 rounded-t-[2rem] bg-card px-6 py-8 md:px-10">
            {/* To */}
            <div className="mb-6 text-center">
              <p className="text-lg text-muted-foreground">To</p>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">{to} 💖</h2>
            </div>

            {/* Message Bubble */}
            <div className="mb-6 rounded-2xl border-2 border-border bg-muted p-6">
              <p className="text-center text-lg leading-relaxed text-foreground md:text-xl">{message}</p>
            </div>

            {/* From */}
            <div className="text-center">
              <p className="text-lg text-muted-foreground">From</p>
              <h3 className="text-2xl font-bold text-foreground md:text-3xl">{from} ✨</h3>
            </div>
          </div>
        </div>

        {/* Create Your Own Button */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button
              size="lg"
              className="rounded-2xl bg-primary px-8 py-6 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90"
            >
              Create your own card ✨
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-muted-foreground">Made with 💚 to spread love around the world</p>
        </footer>
      </div>
    </main>
  )
}
