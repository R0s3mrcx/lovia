import { getAnimalById, animals } from "@/lib/animals"

describe("Animals", () => {
  it("returns an animal when the id exists", () => {
    const animal = getAnimalById("bunny")

    expect(animal).toBeDefined()
    expect(animal?.name).toBe("Bunny")
  })

  it("returns undefined for an invalid id", () => {
    expect(getAnimalById("dragon")).toBeUndefined()
  })

  it("all animals have a name", () => {
    for (const animal of animals) {
      expect(animal.name).toBeTruthy()
    }
  })
})