import { ImageResponse } from "next/og"

export const runtime = "edge"

const animalEmoji: Record<string, string> = {
  bunny:   "🐰",
  cat:     "🐱",
  bear:    "🐻",
  panda:   "🐼",
  dog:     "🐶",
  fox:     "🦊",
  deer:    "🦌",
  ghost:   "👻",
  rainbow: "🌈",
  cake:    "🎂",
}

const gradients: Record<string, [string, string]> = {
  bunny:   ["#fce7f3", "#ede9fe"],
  cat:     ["#fff7ed", "#fef3c7"],
  panda:   ["#ecfdf5", "#cffafe"],
  dog:     ["#fffbeb", "#fef9c3"],
  fox:     ["#fff7ed", "#ffe4e6"],
  deer:    ["#fef2f2", "#dcfce7"],
  ghost:   ["#f5f3ff", "#ffe4d6"],
  rainbow: ["#f5f3ff", "#fce7f3"],
  cake:    ["#fefce8", "#fce7f3"],
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const to     = searchParams.get("to")     || "Someone Special"
  const from   = searchParams.get("from")   || ""
  const animal = searchParams.get("animal") || "bunny"

  const emoji = animalEmoji[animal] ?? "💖"
  const [bg1, bg2] = gradients[animal] ?? ["#fce7f3", "#ede9fe"]

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
          background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
          color: "#111",
          padding: "60px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Floating hearts decoration */}
        <div style={{ position: "absolute", top: 40, left: 60, fontSize: 40, opacity: 0.3 }}>💕</div>
        <div style={{ position: "absolute", top: 80, right: 80, fontSize: 50, opacity: 0.3 }}>✨</div>
        <div style={{ position: "absolute", bottom: 60, left: 100, fontSize: 35, opacity: 0.3 }}>⭐</div>
        <div style={{ position: "absolute", bottom: 80, right: 60, fontSize: 45, opacity: 0.3 }}>💖</div>

        {/* Card container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(255,255,255,0.75)",
            borderRadius: "40px",
            padding: "50px 80px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          }}
        >
          {/* Emoji */}
          <div style={{ fontSize: 110, lineHeight: 1, marginBottom: 20 }}>{emoji}</div>

          {/* Title */}
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.2 }}>
            A card for {to} 💖
          </div>

          {/* Subtitle */}
          {from && (
            <div style={{ marginTop: 16, fontSize: 30, opacity: 0.7 }}>
              From {from} ✨
            </div>
          )}

          <div style={{ marginTop: from ? 14 : 24, fontSize: 26, opacity: 0.6 }}>
            A special gift waiting for you 💌
          </div>
        </div>

        {/* Branding */}
        <div style={{ position: "absolute", bottom: 28, fontSize: 22, opacity: 0.45 }}>
          loviaforyou.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
