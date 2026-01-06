export interface Animal {
  id: string
  name: string
  emoji: string
  image: string
  color: string
}

export const animals: Animal[] = [
  {
    id: "bunny",
    name: "Bunny",
    emoji: "🐰",
    image: "/animals/bunny.png",
    color: "from-pink-200 to-pink-300",
  },
  {
    id: "cat",
    name: "Kitty",
    emoji: "🐱",
    image: "/animals/cat.png",
    color: "from-orange-200 to-amber-300",
  },
  {
    id: "panda",
    name: "Panda",
    emoji: "🐼",
    image: "/animals/panda.png",
    color: "from-gray-200 to-slate-300",
  },
  {
    id: "fox",
    name: "Fox",
    emoji: "🦊",
    image: "/animals/fox.png",
    color: "from-orange-300 to-red-300",
  },
  {
    id: "dog",
    name: "Puppy",
    emoji: "🐶",
    image: "/animals/dog.png",
    color: "from-amber-200 to-yellow-300",
  },
]

export function getAnimalById(id: string): Animal | undefined {
  return animals.find((animal) => animal.id === id)
}
