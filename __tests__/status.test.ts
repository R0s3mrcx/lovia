// Tests for the timeAgo helper — extracted and tested in isolation
// to verify edge cases (singular/plural, boundary conditions).

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
  it("returns 'just now' for less than a minute ago", () => {
    expect(timeAgo(new Date(Date.now() - 30_000).toISOString())).toBe("just now")
  })

  it("returns 'just now' for 0 seconds ago", () => {
    expect(timeAgo(new Date(Date.now()).toISOString())).toBe("just now")
  })

  it("uses singular for exactly 1 minute", () => {
    expect(timeAgo(new Date(Date.now() - 60_000).toISOString())).toBe("1 minute ago")
  })

  it("uses plural for multiple minutes", () => {
    expect(timeAgo(new Date(Date.now() - 5 * 60_000).toISOString())).toBe("5 minutes ago")
  })

  it("switches to hours at 60 minutes", () => {
    expect(timeAgo(new Date(Date.now() - 60 * 60_000).toISOString())).toBe("1 hour ago")
  })

  it("uses plural for multiple hours", () => {
    expect(timeAgo(new Date(Date.now() - 3 * 3_600_000).toISOString())).toBe("3 hours ago")
  })

  it("switches to days at 24 hours", () => {
    expect(timeAgo(new Date(Date.now() - 24 * 3_600_000).toISOString())).toBe("1 day ago")
  })

  it("uses plural for multiple days", () => {
    expect(timeAgo(new Date(Date.now() - 2 * 86_400_000).toISOString())).toBe("2 days ago")
  })
})
