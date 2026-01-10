"use client"

import { useSearchParams } from "next/navigation"
import { getAnimalById } from "@/lib/animals"
import { FloatingElements } from "@/components/floating-elements"
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
}

export function CardContent(props?: Partial<CardData>) {
  const searchParams = useSearchParams()
  const cardRef = useRef<HTMLDivElement>(null)

  const animalId =
    props?.animal ?? searchParams.get("animal") ?? undefined

  const imageUrl =
    props?.imageUrl ?? searchParams.get("image")

  const to =
    props?.to ?? searchParams.get("to") ?? "Someone Special"

  const from =
    props?.from ?? searchParams.get("from") ?? "A Friend"

  const fullMessage =
    props?.message ?? searchParams.get("message") ?? "You are amazing!"

  const animal = animalId
    ? getAnimalById(animalId)
    : null

  const [stage, setStage] = useState<"sleep" | "awake">("sleep")
  const [typedMessage, setTypedMessage] = useState("")
  const [index, setIndex] = useState(0)

  const isNight = new Date().getHours() >= 20

  useEffect(() => {
    if (stage !== "awake") return
    if (index >= fullMessage.length) return

    const timeout = setTimeout(() => {
      setTypedMessage((prev) => prev + fullMessage[index])
      setIndex((prev) => prev + 1)
    }, 40)

    return () => clearTimeout(timeout)
  }, [stage, index, fullMessage])

  const messageFinished = index >= fullMessage.length

  const saveMoment = async () => {
    if (!cardRef.current) return
    const dataUrl = await toPng(cardRef.current)
    const link = document.createElement("a")
    link.download = "lovia-card.png"
    link.href = dataUrl
    link.click()
  }

  return (
    <main
      onClick={() => stage === "sleep" && setStage("awake")}
      className={`relative flex min-h-screen items-center justify-center overflow-hidden p-4
        ${
          isNight
            ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-black"
            : "bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100"
        }`}
    >
      <FloatingElements />

      {stage === "sleep" && (
        <div className="absolute z-20 text-center animate-fade-in">
          <p className="text-xl text-white/90">
            A special gift for you..
          </p>
          <p className="mt-2 text-xl text-white/90">
            Tap to wake it up 💕
          </p>
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg">
        <div
          ref={cardRef}
          className="overflow-hidden rounded-[2rem] border-0 border-primary/30 bg-card shadow-2xl"
        >
          {/* IMAGE / ANIMAL */}
          <div className="p-8 pb-16 bg-gradient-to-br from-pink-300 via-purple-300 to-cyan-300">
            <div className="mx-auto w-48 md:w-64">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Custom"
                  className={`rounded-2xl object-cover shadow-xl transition-all duration-700
                    ${
                      stage === "sleep"
                        ? "opacity-70 scale-95 animate-pulse"
                        : "opacity-100 scale-100"
                    }`}
                />
              ) : animal ? (
                <img
                  src={animal.image}
                  alt={animal.name}
                  className={`transition-all duration-700
                    ${
                      stage === "sleep"
                        ? "opacity-70 scale-110 animate-pulse"
                        : "opacity-100 scale-100 animate-bounce-soft"
                    }`}
                />
              ) : null}
            </div>
          </div>

          {stage === "awake" && (
            <div className="-mt-8 rounded-t-[2rem] bg-card px-6 py-8">
              <h2 className="text-center text-3xl font-bold">
                {to} 💖
              </h2>

              <div className="my-6 rounded-2xl  bg-muted p-6 min-h-[120px]">
                <p className="text-center whitespace-pre-wrap">
                  {typedMessage}
                  {!messageFinished && (
                    <span className="animate-pulse">▍</span>
                  )}
                </p>
              </div>

              <h3 className="text-center text-2xl font-bold">
                {from} ✨
              </h3>

              {props?.openedAt && messageFinished && (
                <p className="mt-4 text-center text-sm opacity-70">
                  Opened for the first time at{" "}
                  {new Date(props.openedAt).toLocaleTimeString()} 💕
                </p>
              )}
            </div>
          )}
        </div>

        {stage === "awake" && (
          <div className="mt-6 flex flex-col gap-4 text-center">
            <Button onClick={saveMoment} variant="outline">
              Save this moment 💾
            </Button>

            <Link href="/">
              <Button>Create your own card ✨</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}