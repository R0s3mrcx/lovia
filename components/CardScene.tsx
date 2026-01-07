"use client"

import { useEffect, useState } from "react"
import { Bunny } from "./Bunny"
import { CardMessage } from "./CardMessage"
import { CardStage } from "@/lib/cardStages"

export function CardScene({ card }: { card: any }) {
  const isNight = new Date().getHours() >= 20
  const [stage, setStage] = useState<CardStage>("sleeping")


  useEffect(() => {
    setTimeout(() => setStage("awakening"), 1200)
  }, [])

  return (
    <div className="scene">
      <Bunny stage={stage} />

      {stage === "awakening" && (
        <p onClick={() => setStage("greeting")}>
          Someone sent you something special…
        </p>
      )}

      {stage === "greeting" && (
        <p onClick={() => setStage("to")}>
          Hi… I was made just for you 💕
        </p>
      )}

      {stage === "to" && (
        <CardMessage
          text={`To: ${card.to}`}
          onDone={() => setStage("message")}
        />
      )}

      {stage === "message" && (
        <CardMessage
          text={card.message}
          typing
          onDone={() => setStage("from")}
        />
      )}

      {stage === "from" && (
        <CardMessage
          text={`From: ${card.from} ✨`}
          onDone={() => setStage("final")}
        />
      )}

      {stage === "final" && (
        <div className="final">
          <p>💖 This moment is yours</p>
          <a href="/">Create one for someone you love</a>
        </div>
      )}
    </div>
  )
}
