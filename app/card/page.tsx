import { Suspense } from "react"
import { CardContent } from "@/components/card-content"

function CardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">
      <div className="text-center">
        <span className="animate-bounce-soft inline-block text-6xl">✨</span>
        <p className="mt-4 text-xl font-semibold text-foreground">Loading magic...</p>
      </div>
    </div>
  )
}

export default function CardPage() {
  return (
    <Suspense fallback={<CardLoading />}>
      <CardContent />
    </Suspense>
  )
}
