import { getMusicById, musicOptions } from "@/lib/music"

describe("music", () => {
  it("getMusicById returns the correct option", () => {
    const romantic = getMusicById("romantic")
    expect(romantic).toBeDefined()
    expect(romantic?.emoji).toBe("💕")
    expect(romantic?.src).toBe("/music/romantic.mp3")
  })

  it("getMusicById returns undefined for unknown id", () => {
    expect(getMusicById("jazz")).toBeUndefined()
  })

  it("the none option has no src", () => {
    const none = getMusicById("none")
    expect(none).toBeDefined()
    expect(none?.src).toBeUndefined()
  })

  it("all non-none options have a src path", () => {
    const withMusic = musicOptions.filter((m) => m.id !== "none")
    for (const opt of withMusic) {
      expect(opt.src).toMatch(/^\/music\/.*\.mp3$/)
    }
  })
})
