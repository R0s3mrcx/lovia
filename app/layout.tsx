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
    "anniversary card online",
    "birthday love card",
  ],

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
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Create Magical Digital Love Cards 💖 | Lovia",
    description:
      "Create and share a beautiful digital love card with a short link. No signup required.",
    images: ["/og.png"],
  },

  alternates: {
    canonical: "https://www.loviaforyou.com",
  },
}

export const viewport: Viewport = {
  themeColor: "#fce7f3",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        {/* Global structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Lovia",
              url: "https://www.loviaforyou.com",
              description:
                "Create and share magical digital love cards with cute animals, music, and personalized messages.",
              applicationCategory: "EntertainmentApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
