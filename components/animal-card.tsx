"use client"

import { cn } from "@/lib/utils"
import type { Animal } from "@/lib/animals"

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
        "group relative overflow-hidden rounded-3xl border-4 p-4 transition-all duration-300 hover:scale-105",
        "bg-gradient-to-br shadow-lg hover:shadow-2xl",
        animal.color,
        selected ? "scale-105 border-primary ring-4 ring-primary/30" : "border-card hover:border-primary/50",
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
        <div className="absolute -top-2 -right-2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
          ✓ Selected
        </div>
      )}
    </button>
  )
}
