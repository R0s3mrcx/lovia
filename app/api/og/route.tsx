import { ImageResponse } from "next/og"

export const runtime = "edge"

const animalEmoji: Record<string, string> = {
  bunny: "🐰",
  cat: "🐱",
  bear: "🐻",
  dog: "🐶",
  fox: "🦊",
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const to = searchParams.get("to") || "Someone Special"
  const animal = searchParams.get("animal") || "bunny"

  const emoji = animalEmoji[animal] ?? "💖"

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #fce7f3, #ede9fe)",
          color: "#111",
          padding: "60px",
          textAlign: "center",
        }}
      >
        {/* Animal Emoji */}
        <div
          style={{
            display: "flex",
            fontSize: 120,
            marginBottom: 20,
          }}
        >
          {emoji}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
          }}
        >
          A card for {to}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 36,
          }}
        >
          Someone sent you something special 💌
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            marginTop: 60,
            fontSize: 22,
            opacity: 0.6,
          }}
        >
          loviaforyou.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}



