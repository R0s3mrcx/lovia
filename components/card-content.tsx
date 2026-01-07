"use client"

import { useSearchParams } from "next/navigation"
import { getAnimalById } from "@/lib/animals"
import { FloatingElements } from "@/components/floating-elements"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

type CardData = {
  animal: string
  to: string
  from: string
  message: string
  openedAt?: string
}

export function CardContent(props?: Partial<CardData>) {
  const searchParams = useSearchParams()

  const animalId =
    props?.animal ??
    searchParams.get("animal") ??
    "bunny"

  const to =
    props?.to ??
    searchParams.get("to") ??
    "Someone Special"

  const from =
    props?.from ??
    searchParams.get("from") ??
    "A Friend"

  const fullMessage =
    props?.message ??
    searchParams.get("message") ??
    "You are amazing!"

  const animal = getAnimalById(animalId) || getAnimalById("bunny")!

  // 💤 sleep / awake
  const [stage, setStage] = useState<"sleep" | "awake">("sleep")

  // ✍️ typing effect
  const [typedMessage, setTypedMessage] = useState("")
  const [index, setIndex] = useState(0)

  // 🌙 night mode
  const isNight = new Date().getHours() >= 20

  // ✨ typing animation
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

  return (
    <main
      onClick={() => stage === "sleep" && setStage("awake")}
      className={`relative flex min-h-screen items-center justify-center overflow-hidden p-4 transition-all duration-700
        ${
          isNight
            ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-black"
            : "bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100"
        }`}
    >
      <FloatingElements />

      {/* 🌸 Intro */}
      {stage === "sleep" && (
        <div className="absolute z-20 text-center animate-fade-in">
          <p className="text-xl text-white/90">
            Someone sent you something special…
          </p>
          <p className="mt-2 text-sm text-white/70">
            Tap to wake it up 💕
          </p>
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg">
        {/* Card */}
        <div className="overflow-hidden rounded-[2rem] border-4 border-primary/30 bg-card shadow-2xl">
          {/* Animal */}
          <div className={`bg-gradient-to-br ${animal.color} relative p-8 pb-16`}>
            <div className="mx-auto w-48 md:w-64">
              <img
                src={animal.image || "/placeholder.svg"}
                alt={animal.name}
                className={`h-full w-full object-contain drop-shadow-2xl transition-all duration-700
                  ${
                    stage === "sleep"
                      ? "opacity-70 scale-95 animate-pulse"
                      : "opacity-100 scale-100 animate-bounce-soft"
                  }`}
              />
            </div>

            <span className="absolute top-4 left-4 text-3xl">✨</span>
            <span className="absolute top-8 right-6 text-2xl">💖</span>
            <span className="absolute bottom-8 left-8 text-2xl">⭐</span>
            <span className="absolute bottom-4 right-4 text-3xl">✨</span>
          </div>

          {/* Message */}
          {stage === "awake" && (
            <div className="relative -mt-8 rounded-t-[2rem] bg-card px-6 py-8 md:px-10 animate-fade-in">
              <div className="mb-6 text-center">
                <p className="text-lg text-muted-foreground">To</p>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  {to} 💖
                </h2>
              </div>

              <div className="mb-6 rounded-2xl border-2 border-border bg-muted p-6 min-h-[120px]">
                <p className="text-center text-lg leading-relaxed text-foreground md:text-xl whitespace-pre-wrap">
                  {typedMessage}
                  {!messageFinished && (
                    <span className="animate-pulse">▍</span>
                  )}
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg text-muted-foreground">From</p>
                <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                  {from} ✨
                </h3>
              </div>

              {/* 💀 OPENED AT — SOLO AL FINAL */}
              {props?.openedAt && messageFinished && (
                <p className="mt-4 text-center text-sm text-muted-foreground animate-fade-in">
                  Opened for the first time at{" "}
                  {new Date(props.openedAt).toLocaleTimeString()} 💕
                </p>
              )}
            </div>
          )}
        </div>

        {stage === "awake" && (
          <div className="mt-8 text-center animate-fade-in">
            <Link href="/">
              <Button
                size="lg"
                className="rounded-2xl bg-primary px-8 py-6 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-105"
              >
                Create your own card ✨
              </Button>
            </Link>
          </div>
        )}

        {stage === "awake" && (
          <footer className="mt-8 text-center animate-fade-in">
            <p className="text-muted-foreground">
              Made with 💚 to spread love around the world
            </p>
          </footer>
        )}
      </div>
    </main>
  )
}

