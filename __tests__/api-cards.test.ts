import { NextRequest } from "next/server"
import { POST } from "@/app/api/cards/route"

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({
      insert: async () => ({ error: null }),
    }),
  }),
}))

function request(body: unknown) {
  return new NextRequest("http://localhost/api/cards", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

describe("POST /api/cards", () => {
  it("creates a card with valid data", async () => {
    const res = await POST(
      request({
        id: "1",
        animal: "bunny",
        to: "Ana",
        from: "Leo",
        message: "Hello",
      })
    )

    expect(res.status).toBe(201)
  })

  it("returns 400 when required fields are missing", async () => {
    const res = await POST(
      request({
        id: "1",
      })
    )

    expect(res.status).toBe(400)
  })

  it("returns 400 when the message is too long", async () => {
    const res = await POST(
      request({
        id: "1",
        animal: "bunny",
        to: "Ana",
        from: "Leo",
        message: "A".repeat(2001),
      })
    )

    expect(res.status).toBe(400)
  })
})