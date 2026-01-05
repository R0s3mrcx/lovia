"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Share2 } from "lucide-react"

interface ShareModalProps {
  link: string
  onClose: () => void
}

export function ShareModal({ link, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const copyLink = async () => {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-sm">
      <div className="animate-bounce-soft w-full max-w-md rounded-3xl border-4 border-primary/30 bg-card p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-4xl">
            ✨
          </div>
          <h2 className="text-2xl font-bold text-foreground">Magic card created! 🎉</h2>
          <p className="mt-2 text-muted-foreground">Share this link with someone special</p>
        </div>

        <div className="mb-6 rounded-2xl border-2 border-border bg-muted p-4">
          <p className="break-all text-sm text-muted-foreground">{link}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={copyLink}
            className="w-full rounded-2xl bg-primary py-6 text-lg font-bold text-primary-foreground"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-5 w-5" /> Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-5 w-5" /> Copy link
              </>
            )}
          </Button>

          {typeof navigator !== "undefined" && navigator.share && (
            <Button
              onClick={() => navigator.share({ url: link, title: "Magic Card" })}
              variant="outline"
              className="w-full rounded-2xl border-2 py-6 text-lg font-bold"
            >
              <Share2 className="mr-2 h-5 w-5" /> Share
            </Button>
          )}

          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full rounded-2xl py-6 text-lg font-semibold text-muted-foreground"
          >
            Create another card 💖
          </Button>
        </div>
      </div>
    </div>
  )
}
