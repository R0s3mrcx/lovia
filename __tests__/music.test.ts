import { getMusicById } from "@/lib/music"

describe("Music", () => {
  it("returns a music option when the id exists", () => {
    const music = getMusicById("romantic")

    expect(music).toBeDefined()
    expect(music?.id).toBe("romantic")
  })

  it("returns undefined for an invalid id", () => {
    expect(getMusicById("invalid")).toBeUndefined()
  })

  it("returns the 'none' option", () => {
    const music = getMusicById("none")

    expect(music).toBeDefined()
    expect(music?.id).toBe("none")
  })
})