import { getAnimalById, classicAnimals, seasonalAnimals, animals } from "@/lib/animals"

describe("animals", () => {
  it("getAnimalById returns the correct animal", () => {
    const bunny = getAnimalById("bunny")
    expect(bunny).toBeDefined()
    expect(bunny?.name).toBe("Bunny")
    expect(bunny?.emoji).toBe("🐰")
  })

  it("getAnimalById returns undefined for unknown id", () => {
    expect(getAnimalById("dragon")).toBeUndefined()
  })

  it("classicAnimals and seasonalAnimals together equal the full list", () => {
    expect(classicAnimals.length + seasonalAnimals.length).toBe(animals.length)
  })

  it("every animal has the required fields", () => {
    for (const animal of animals) {
      expect(animal.id).toBeTruthy()
      expect(animal.name).toBeTruthy()
      expect(animal.emoji).toBeTruthy()
      expect(animal.image).toMatch(/^\/animals\//)
    }
  })
})
