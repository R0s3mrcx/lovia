"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  delay: number
  type: "heart" | "sparkle" | "star"
}

export function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = []
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        type: ["heart", "sparkle", "star"][Math.floor(Math.random() * 3)] as FloatingElement["type"],
      })
    }
    setElements(newElements)
  }, [])

  const getIcon = (type: FloatingElement["type"]) => {
    switch (type) {
      case "heart":
        return "💖"
      case "sparkle":
        return "✨"
      case "star":
        return "⭐"
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {elements.map((el) => (
        <span
          key={el.id}
          className="animate-float absolute"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            animationDelay: `${el.delay}s`,
            opacity: 0.6,
          }}
        >
          {getIcon(el.type)}
        </span>
      ))}
    </div>
  )
}
