import { supabase } from "@/lib/supabase"
import { CardContent } from "@/components/card-content"
import { Metadata } from "next"

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { data } = await supabase
    .from("cards")
    .select("to, from, animal, message")
    .eq("id", params.id)
    .single()

  if (!data) {
    return {
      title: "A love card 💌",
      description: "Someone sent you something special"
    }
  }

  const title = `💌 A card for ${data.to}`
  const description = data.message.slice(0, 80) + "…"

  const ogImage = `https://www.loviaforyou.com/api/og?animal=${data.animal}&to=${encodeURIComponent(
    data.to
  )}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    }
  }
}

export default async function CardPage({ params }: Props) {
  let { data } = await supabase
    .from("cards")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!data) return null

  if (!data.opened_at) {
    const now = new Date().toISOString()
    await supabase
      .from("cards")
      .update({ opened_at: now })
      .eq("id", params.id)

    data.opened_at = now
  }

  return (
    <CardContent
      animal={data.animal}
      to={data.to}
      from={data.from}
      message={data.message}
      openedAt={data.opened_at} 
    />
  )
}

