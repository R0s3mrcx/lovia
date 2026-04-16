// Integration-style test for the /api/cards POST handler.
// Supabase is mocked so no real DB calls are made.

import { NextRequest } from "next/server"
import { POST } from "@/app/api/cards/route"

jest.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    from: () => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    }),
  }),
}))

function makeRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/cards", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
}

describe("POST /api/cards", () => {
  it("returns 201 for a valid card payload", async () => {
    const req = makeRequest({
      id: "abc123",
      animal: "bunny",
      to: "Ana",
      from: "Leo",
      message: "I love you",
    })
    const res = await POST(req)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.id).toBe("abc123")
  })

  it("returns 400 when required fields are missing", async () => {
    const req = makeRequest({ id: "abc123", animal: "bunny" })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it("returns 400 when a field exceeds max length", async () => {
    const req = makeRequest({
      id: "abc123",
      animal: "bunny",
      to: "A".repeat(101),
      from: "Leo",
      message: "Hi",
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it("returns 400 when message exceeds 2000 characters", async () => {
    const req = makeRequest({
      id: "abc123",
      animal: "bunny",
      to: "Ana",
      from: "Leo",
      message: "x".repeat(2001),
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
