import { getMusicById, musicOptions } from "@/lib/music"

describe("getMusicById", () => {
  it("returns the correct option for a valid id", () => {
    const romantic = getMusicById("romantic")
    expect(romantic).toBeDefined()
    expect(romantic?.emoji).toBe("💕")
    expect(romantic?.src).toBe("/music/romantic.mp3")
  })

  it("returns undefined for an unknown id", () => {
    expect(getMusicById("jazz")).toBeUndefined()
  })

  it("the none option exists and has no src", () => {
    const none = getMusicById("none")
    expect(none).toBeDefined()
    expect(none?.src).toBeUndefined()
  })
})

describe("musicOptions", () => {
  it("always includes a none option", () => {
    expect(musicOptions.find((m) => m.id === "none")).toBeDefined()
  })

  it("all non-none options have a valid mp3 src path", () => {
    const withMusic = musicOptions.filter((m) => m.id !== "none")
    expect(withMusic.length).toBeGreaterThan(0)
    for (const opt of withMusic) {
      expect(opt.src).toMatch(/^\/music\/.+\.mp3$/)
    }
  })

  it("all options have an emoji and label", () => {
    for (const opt of musicOptions) {
      expect(opt.emoji).toBeTruthy()
      expect(opt.label).toBeTruthy()
    }
  })

  it("all ids are unique", () => {
    const ids = musicOptions.map((m) => m.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
