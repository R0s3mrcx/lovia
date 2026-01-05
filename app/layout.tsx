import type React from "react"
import type { Metadata, Viewport } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Magic Cards ✨ | Create Adorable Love Cards",
  description: "Create magical kawaii cards with cute 3D animals and share love with the world 💖",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#fce7f3",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>{children}</body>
    </html>
  )
}
