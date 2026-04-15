"use client"

import { useState } from "react"
import { Check, Copy, Share2, Eye } from "lucide-react"
import Link from "next/link"

interface ShareModalProps {
  link: string
  cardId: string
  onClose: () => void
}

const giftIdeas = [
  { label: "Spotify Premium 🎵", url: "https://www.spotify.com/premium/" },
  { label: "Netflix 🎬",          url: "https://www.netflix.com/gift-cards" },
  { label: "Amazon 🛍️",           url: "https://www.amazon.com/gift-cards" },
  { label: "Uber Eats 🍕",        url: "https://www.ubereats.com/gift-cards" },
]

export function ShareModal({ link, cardId, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [showGifts, setShowGifts] = useState(false)

  const copyLink = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border-2 border-primary/20 bg-white p-7 shadow-2xl">

        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
            ✨
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">Magic card created! 🎉</h2>
          <p className="mt-1 text-sm text-muted-foreground">Share this link with someone special</p>
        </div>

        <div className="mb-5 rounded-2xl bg-muted px-4 py-3">
          <p className="break-all text-xs text-muted-foreground">{link}</p>
        </div>

        <div className="flex flex-col gap-2.5">

          <button
            onClick={copyLink}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-white shadow transition-all hover:opacity-90"
          >
            {copied
              ? <><Check className="h-4 w-4" /> Copied!</>
              : <><Copy className="h-4 w-4" /> Copy link</>
            }
          </button>

          {typeof navigator !== "undefined" && navigator.share && (
            <button
              onClick={() => navigator.share({ url: link, title: "I made you a magic card 💖" })}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-border bg-white py-4 text-base font-bold text-foreground transition-all hover:bg-muted"
            >
              <Share2 className="h-4 w-4" /> Share
            </button>
          )}

          <Link
            href={`/status/${cardId}`}
            target="_blank"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 py-4 text-base font-bold text-primary transition-all hover:bg-primary/10"
          >
            <Eye className="h-4 w-4" />
            See if they opened it 👀
          </Link>

          <button
            type="button"
            onClick={() => setShowGifts((v) => !v)}
            className="w-full rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 py-3.5 text-sm font-bold text-amber-700 transition-all hover:bg-amber-100"
          >
            🎁 Add a little gift too?
          </button>

          {showGifts && (
            <div className="grid grid-cols-2 gap-2">
              {giftIdeas.map((gift) => (
                <a
                  key={gift.label}
                  href={gift.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-xl border border-border bg-white px-3 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:bg-primary/5"
                >
                  {gift.label}
                </a>
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-2xl border-2 border-border bg-white py-4 text-base font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            Create another card 💖
          </button>
        </div>
      </div>
    </div>
  )
}
