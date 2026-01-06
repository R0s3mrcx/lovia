"use client"

import { useState } from "react"
import { animals, type Animal } from "@/lib/animals"
import { AnimalCard } from "@/components/animal-card"
import { MessageForm } from "@/components/message-form"
import { ShareModal } from "@/components/share-modal"
import { FloatingElements } from "@/components/floating-elements"

export default function HomePage() {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null)
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)

  const handleGenerate = (to: string, from: string, message: string) => {
    if (!selectedAnimal) return

    const params = new URLSearchParams({
      animal: selectedAnimal.id,
      to,
      from,
      message,
    })

    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    const link = `${baseUrl}/card/?${params.toString()}`
    setGeneratedLink(link)
  }

  const handleCloseModal = () => {
    setGeneratedLink(null)
    setSelectedAnimal(null)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <FloatingElements />

      <div className="absolute top-4 left-4 z-20 md:top-6 md:left-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-primary md:text-3xl">Lovia💖</h2>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:py-20">
        {/* Header */}
        <header className="mb-12 text-center md:mb-16">
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            Create magical cards ✨
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Choose an adorable 3D animal and write a special message for someone you love
          </p>
        </header>

        {/* Animal Selection Grid */}
        <section className="mb-12">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Pick your cute companion</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
            {animals.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                selected={selectedAnimal?.id === animal.id}
                onSelect={() => setSelectedAnimal(animal)}
              />
            ))}
          </div>
        </section>

        {/* Message Form */}
        {selectedAnimal && (
          <section className="mx-auto max-w-lg">
            <MessageForm selectedAnimal={selectedAnimal} onGenerate={handleGenerate} />
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center">
          <p className="text-muted-foreground">Made with 💚 to spread love around the world</p>
        </footer>
      </div>

      {/* Share Modal */}
      {generatedLink && <ShareModal link={generatedLink} onClose={handleCloseModal} />}
    </main>
  )
}
