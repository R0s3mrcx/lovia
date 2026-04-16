import { getAnimalById, classicAnimals, seasonalAnimals, animals } from "@/lib/animals"

describe("getAnimalById", () => {
  it("returns the correct animal for a valid id", () => {
    const bunny = getAnimalById("bunny")
    expect(bunny).toBeDefined()
    expect(bunny?.name).toBe("Bunny")
    expect(bunny?.emoji).toBe("🐰")
  })

  it("returns undefined for an unknown id", () => {
    expect(getAnimalById("dragon")).toBeUndefined()
  })

  it("returns undefined for an empty string", () => {
    expect(getAnimalById("")).toBeUndefined()
  })
})

describe("animal lists", () => {
  it("classic + seasonal equals the full list", () => {
    expect(classicAnimals.length + seasonalAnimals.length).toBe(animals.length)
  })

  it("every animal has all required fields", () => {
    for (const animal of animals) {
      expect(animal.id).toBeTruthy()
      expect(animal.name).toBeTruthy()
      expect(animal.emoji).toBeTruthy()
      expect(animal.image).toMatch(/^\/animals\//)
      expect(["classic", "seasonal"]).toContain(animal.tag)
    }
  })

  it("all animal ids are unique", () => {
    const ids = animals.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("classic animals do not appear in seasonal list", () => {
    const classicIds  = new Set(classicAnimals.map((a) => a.id))
    const seasonalIds = new Set(seasonalAnimals.map((a) => a.id))
    for (const id of classicIds) {
      expect(seasonalIds.has(id)).toBe(false)
    }
  })
})
