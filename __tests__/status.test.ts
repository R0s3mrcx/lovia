// Unit test for the timeAgo helper used in the status page.
// Extracted and tested in isolation.

function timeAgo(date: string): string {
  const diff  = Date.now() - new Date(date).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins < 1)   return "just now"
  if (mins < 60)  return `${mins} minute${mins === 1 ? "" : "s"} ago`
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  return `${days} day${days === 1 ? "" : "s"} ago`
}

describe("timeAgo", () => {
  it("returns 'just now' for dates less than a minute ago", () => {
    const date = new Date(Date.now() - 30_000).toISOString()
    expect(timeAgo(date)).toBe("just now")
  })

  it("returns singular minute correctly", () => {
    const date = new Date(Date.now() - 60_000).toISOString()
    expect(timeAgo(date)).toBe("1 minute ago")
  })

  it("returns plural minutes correctly", () => {
    const date = new Date(Date.now() - 5 * 60_000).toISOString()
    expect(timeAgo(date)).toBe("5 minutes ago")
  })

  it("returns hours for dates within the same day", () => {
    const date = new Date(Date.now() - 3 * 3_600_000).toISOString()
    expect(timeAgo(date)).toBe("3 hours ago")
  })

  it("returns days for older dates", () => {
    const date = new Date(Date.now() - 2 * 86_400_000).toISOString()
    expect(timeAgo(date)).toBe("2 days ago")
  })
})
