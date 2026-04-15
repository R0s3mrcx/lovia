import { supabase } from "@/lib/supabase"
import { getAnimalById } from "@/lib/animals"
import type { Metadata } from "next"
import Link from "next/link"

type Props = { params: { id: string } }

export const metadata: Metadata = {
  title: "Card status | Lovia 💖",
  description: "Check if your love card was opened",
}

function timeAgo(date: string): string {
  const diff  = Date.now() - new Date(date).getTime()
  const mins  = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days  = Math.floor(diff / 86_400_000)
  if (mins < 1)   return "just now"
  if (mins < 60)  return `${mins} minute${mins === 1 ? "" : "s"} ago`
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`
  return `${days} day${days === 1 ? "" : "s"} ago`
}

export default async function StatusPage({ params }: Props) {
  const { data } = await supabase
    .from("cards")
    .select("id, to, from, animal, message, opened_at, created_at")
    .eq("id", params.id)
    .single()

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 p-4">
        <div className="rounded-3xl bg-white/80 p-10 text-center shadow-xl backdrop-blur">
          <p className="text-4xl">🔍</p>
          <h1 className="mt-4 text-2xl font-bold">Card not found</h1>
          <Link href="/" className="mt-6 inline-block text-primary underline">Create a new card</Link>
        </div>
      </main>
    )
  }

  const animal = getAnimalById(data.animal)
  const opened = !!data.opened_at

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 p-4">

      <div className="pointer-events-none fixed inset-0 select-none overflow-hidden">
        {["💖", "✨", "⭐", "💕", "🌟"].map((el, i) => (
          <span
            key={i}
            className="animate-float absolute text-2xl opacity-40"
            style={{ left: `${(i * 22) % 95}%`, top: `${(i * 18 + 10) % 80}%`, animationDelay: `${i * 1.2}s` }}
          >
            {el}
          </span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">

        <div className="mb-6 text-center">
          <Link href="/" className="text-3xl font-extrabold text-primary">Lovia💖</Link>
        </div>

        <div className="rounded-3xl border border-white/40 bg-white/80 p-7 shadow-2xl backdrop-blur-lg">

          {animal && (
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 p-2">
              <img src={animal.image} alt={animal.name} className="h-full w-full object-contain" />
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            From <strong>{data.from}</strong> → <strong>{data.to}</strong>
          </p>

          <div className={`mx-auto mt-5 w-fit rounded-full px-6 py-3 text-center text-base font-bold shadow-md
            ${opened
              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700"
              : "bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-700"
            }`}
          >
            {opened ? "💌 Opened!" : "⏳ Not opened yet"}
          </div>

          <div className="mt-5 space-y-2.5 rounded-2xl bg-muted/50 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Sent</span>
              <span className="font-semibold">{timeAgo(data.created_at)}</span>
            </div>
            {opened && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Opened</span>
                <span className="font-semibold text-emerald-600">{timeAgo(data.opened_at)} 💕</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Preview</span>
              <span className="max-w-[180px] truncate text-right font-semibold">
                &ldquo;{data.message.slice(0, 30)}…&rdquo;
              </span>
            </div>
          </div>

          {!opened && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Refresh this page to check again 🔄
            </p>
          )}

          {opened && (
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-4 text-center">
              <p className="font-medium text-foreground">
                {data.to} opened your card {animal?.emoji ?? "💖"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">They felt the magic 🌟</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          <a
            href={`/card/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary/30 bg-white/80 py-4 text-base font-bold text-primary shadow backdrop-blur transition-all hover:bg-white"
          >
            👁️ Preview the card
          </a>
          <Link
            href="/"
            className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-base font-bold text-white shadow transition-all hover:opacity-90"
          >
            ✨ Create another card
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Made with 💚 · loviaforyou.com
        </p>
      </div>
    </main>
  )
}
