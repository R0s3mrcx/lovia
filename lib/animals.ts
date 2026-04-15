export interface Animal {
  id: string
  name: string
  emoji: string
  image: string
  color: string
  tag?: "classic" | "seasonal"
}

export const animals: Animal[] = [
  // ── Classic companions ──────────────────────────────────────────
  {
    id: "bunny",
    name: "Bunny",
    emoji: "🐰",
    image: "/animals/bunny.png",
    color: "from-pink-200 to-pink-300",
    tag: "classic",
  },
  {
    id: "cat",
    name: "Kitty",
    emoji: "🐱",
    image: "/animals/cat.png",
    color: "from-orange-200 to-amber-300",
    tag: "classic",
  },
  {
    id: "panda",
    name: "Panda",
    emoji: "🐼",
    image: "/animals/bear.png",
    color: "from-gray-200 to-slate-300",
    tag: "classic",
  },
  {
    id: "fox",
    name: "Fox",
    emoji: "🦊",
    image: "/animals/fox.png",
    color: "from-orange-300 to-red-300",
    tag: "classic",
  },
  {
    id: "dog",
    name: "Puppy",
    emoji: "🐶",
    image: "/animals/dog.png",
    color: "from-amber-200 to-yellow-300",
    tag: "classic",
  },

  {
    id: "deer",
    name: "Christmas",
    emoji: "🦌",
    image: "/animals/deer.png",
    color: "from-red-200 to-green-200",
    tag: "seasonal",
  },
  {
    id: "ghost",
    name: "Halloween",
    emoji: "👻",
    image: "/animals/ghost.png",
    color: "from-purple-200 to-orange-200",
    tag: "seasonal",
  },
  {
    id: "rainbow",
    name: "BFF",
    emoji: "🌈",
    image: "/animals/rainbow.png",
    color: "from-violet-200 to-pink-200",
    tag: "seasonal",
  },
  {
    id: "cake",
    name: "Birthday",
    emoji: "🎂",
    image: "/animals/cake.png",
    color: "from-yellow-200 to-pink-200",
    tag: "seasonal",
  },
]

export const classicAnimals = animals.filter((a) => a.tag === "classic")
export const seasonalAnimals = animals.filter((a) => a.tag === "seasonal")

export function getAnimalById(id: string): Animal | undefined {
  return animals.find((animal) => animal.id === id)
}
