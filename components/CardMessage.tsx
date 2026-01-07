"use client"

import { useEffect, useState } from "react"

export function CardMessage({
  text,
  typing = true,
  onDone
}: {
  text: string
  typing?: boolean
  onDone?: () => void
}) {
  const [shown, setShown] = useState("")

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setShown(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(interval)
        onDone?.()
      }
    }, typing ? 45 : 0)

    return () => clearInterval(interval)
  }, [])

  return <p className="typing">{shown}</p>
}
