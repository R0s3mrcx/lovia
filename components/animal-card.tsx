"use client"

import { cn } from "@/lib/utils"
import type { Animal } from "@/lib/animals"
import { animalThemes } from "@/lib/animalThemes"

interface AnimalCardProps {
  animal: Animal
  selected: boolean
  onSelect: () => void
}

export function AnimalCard({ animal, selected, onSelect }: AnimalCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
      "group relative rounded-2xl p-4 transition-all",
      animalThemes[animal.id],
      "backdrop-blur-md border border-white/40",
      "hover:scale-[1.04] hover:shadow-xl",
      animal.color,
      selected && "ring-2 ring-primary",
      )}
    >
      <div className="relative aspect-square w-full">
        <img
          src={animal.image || "/placeholder.svg"}
          alt={animal.name}
          className="h-full w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <p className="mt-3 text-center text-lg font-bold text-foreground">
        {animal.name} {animal.emoji}
      </p>
      {selected && (
        <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-bold text-primary-foreground shadow-lg">
          Selected
        </div>
      )}
    </button>
  )
}