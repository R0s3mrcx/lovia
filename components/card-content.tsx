"use client"

import { useSearchParams } from "next/navigation"
import { getAnimalById } from "@/lib/animals"
import { getMusicById } from "@/lib/music"
import { cardGradients } from "@/lib/animalThemes"
import { FloatingElements } from "@/components/floating-elements"
import { track } from "@/lib/analytics"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { toPng } from "html-to-image"

type CardData = {
  animal?: string
  imageUrl?: string
  to: string
  from: string
  message: string
  openedAt?: string
  music?: string
}

export function CardContent(props?: Partial<CardData>) {
  const searchParams = useSearchParams()
  const cardRef      = useRef<HTMLDivElement>(null)
  const audioRef     = useRef<HTMLAudioElement | null>(null)

  const animalId    = props?.animal    ?? searchParams.get("animal")  ?? undefined
  const imageUrl    = props?.imageUrl  ?? searchParams.get("image")   ?? undefined
  const to          = props?.to        ?? searchParams.get("to")      ?? "Someone Special"
  const from        = props?.from      ?? searchParams.get("from")    ?? "A Friend"
  const fullMessage = props?.message   ?? searchParams.get("message") ?? "You are amazing!"
  const musicId     = props?.music     ?? searchParams.get("music")   ?? "none"

  const animal     = animalId ? (getAnimalById(animalId) ?? getAnimalById("bunny")) : null
  const musicOpt   = getMusicById(musicId)
  const musicSrc   = musicOpt?.src
  const gradient   = (animalId && cardGradients[animalId]) ?? "from-pink-300 via-purple-200 to-rose-200"

  const [stage, setStage]               = useState<"sleep" | "awake">("sleep")
  const [typedMessage, setTypedMessage] = useState("")
  const [index, setIndex]               = useState(0)

  const isNight = typeof window !== "undefined" ? new Date().getHours() >= 20 : false

  useEffect(() => {
    if (stage !== "awake" || index >= fullMessage.length) return
    const t = setTimeout(() => {
      setTypedMessage((prev) => prev + fullMessage[index])
      setIndex((prev) => prev + 1)
    }, 40)
    return () => clearTimeout(t)
  }, [stage, index, fullMessage])

  useEffect(() => {
    if (stage !== "awake" || !musicSrc) return
    const audio = new Audio(musicSrc)
    audio.loop   = true
    audio.volume = 0.35
    audioRef.current = audio
    audio.play().catch(() => {})
    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [stage, musicSrc])

  const wake = () => {
    if (stage !== "sleep") return
    setStage("awake")
    track("card_opened", { animal: animalId ?? "unknown", hasPhoto: !!imageUrl, music: musicId })
  }

  const messageFinished = index >= fullMessage.length

  const saveMoment = async () => {
    if (!cardRef.current) return
    const dataUrl = await toPng(cardRef.current)
    const a = document.createElement("a")
    a.download = "lovia-card.png"
    a.href = dataUrl
    a.click()
    track("card_saved", { animal: animalId ?? "unknown" })
  }

  const bgClass = isNight
    ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-black"
    : "bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100"

  return (
    <main
      onClick={wake}
      className={`relative flex min-h-screen cursor-pointer items-center justify-center overflow-hidden p-4 ${bgClass}`}
    >
      <FloatingElements />

      {stage === "sleep" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
          <div className="mb-4 animate-bounce text-5xl">💌</div>
          <p className="text-xl font-bold text-white drop-shadow">A special gift for you…</p>
          <p className="mt-2 text-lg text-white/80">Tap anywhere to open it 💕</p>
          {musicSrc && (
            <p className="mt-2 text-sm text-white/50">{musicOpt?.emoji} Music will play</p>
          )}
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg">
        <div ref={cardRef} className="overflow-hidden rounded-[2rem] bg-white shadow-2xl">

          <div className={`flex items-center justify-center p-8 pb-16 bg-gradient-to-br ${gradient}`}>
            <div className="w-48 md:w-56">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Custom photo"
                  className={`w-full rounded-2xl object-cover shadow-xl transition-all duration-700
                    ${stage === "sleep" ? "opacity-60 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"}`}
                />
              ) : animal ? (
                <img
                  src={animal.image}
                  alt={animal.name}
                  className={`w-full transition-all duration-700
                    ${stage === "sleep" ? "opacity-50 scale-110 blur-sm" : "opacity-100 scale-100 blur-0 animate-bounce-soft"}`}
                />
              ) : (
                <div className="text-center text-8xl">💖</div>
              )}
            </div>
          </div>

          {stage === "awake" && (
            <div className="-mt-8 rounded-t-[2rem] bg-white px-6 py-8">
              <h2 className="text-center text-3xl font-extrabold text-foreground">
                {to} 🫶
              </h2>

              <div className="my-5 min-h-[100px] rounded-2xl bg-muted p-5">
                <p className="whitespace-pre-wrap text-center text-base leading-relaxed text-foreground">
                  {typedMessage}
                  {!messageFinished && <span className="animate-pulse">▍</span>}
                </p>
              </div>

              <h3 className="text-center text-xl font-bold text-foreground">
                — {from} 💖
              </h3>

              {props?.openedAt && messageFinished && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Opened at {new Date(props.openedAt).toLocaleTimeString()} 💕
                </p>
              )}

              {musicSrc && messageFinished && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {musicOpt?.emoji} Playing {musicOpt?.label}
                </p>
              )}
            </div>
          )}
        </div>

        {stage === "awake" && messageFinished && (
          <div className="mt-5 flex flex-col gap-3">
            <Button
              onClick={saveMoment}
              variant="outline"
              className="w-full rounded-2xl border-2 border-white/60 bg-white/70 py-5 font-semibold backdrop-blur"
            >
              Save this moment 💾
            </Button>
            <Link href="/">
              <Button className="w-full rounded-2xl py-5 font-bold">
                Create your own card 💌
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
