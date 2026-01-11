import type React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Create Magical Digital Love Cards 💖 | Lovia",
  description:
    "Create and share a beautiful digital love card with a short link. No signup required. Cute 3D animals included 💖",

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Create Magical Digital Love Cards 💖 | Lovia",
    description:
      "Create and share a beautiful digital love card with a short link. No signup required.",
    url: "https://www.loviaforyou.com",
    siteName: "Lovia",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Lovia – Create Magical Digital Love Cards",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Create Magical Digital Love Cards 💖 | Lovia",
    description:
      "Create and share a beautiful digital love card with a short link. No signup required.",
    images: ["/og.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#fce7f3",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}

