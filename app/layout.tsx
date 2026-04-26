import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import * as Sentry from "@sentry/nextjs"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL ?? "https://www.loviaforyou.com"
    ),
    title: "Create Magical Digital Love Cards 💖 | Lovia",
    description:
      "Create and share a beautiful digital love card with a short link. Add music, your own photo, and a cute companion. No signup required. 💖",
    icons: {
      icon: "/icon.png",
      apple: "/apple-icon.png",
    },
    keywords: [
      "digital love card",
      "love card online",
      "cute love card",
      "send love card free",
      "digital card for girlfriend",
      "digital card for boyfriend",
      "romantic digital card",
      "love card with music",
    ],
    openGraph: {
      title: "Create Magical Digital Love Cards 💖 | Lovia",
      description:
        "Create and share a beautiful digital love card. Add music, your own photo, and a cute companion. 💖",
      url: "https://www.loviaforyou.com",
      siteName: "Lovia",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Create Magical Digital Love Cards 💖 | Lovia",
      description:
        "Create and share a beautiful digital love card. Add music, your own photo, and a cute companion. 💖",
    },
    other: {
      ...Sentry.getTraceData(),
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  )
}
