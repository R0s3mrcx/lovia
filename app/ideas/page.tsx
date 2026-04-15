import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Love Card Ideas & Messages 💌 | Lovia",
  description:
    "Struggling to find the right words? Discover 30+ heartfelt message ideas for anniversaries, birthdays, long distance, and more. Create your digital love card for free.",
  openGraph: {
    title: "Love Card Ideas & Sweet Messages 💌 | Lovia",
    description: "30+ message ideas to inspire your perfect love card. Free & no signup.",
    url: "https://www.loviaforyou.com/ideas",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
}

const categories = [
  {
    title: "💑 For your partner",
    anchor: "partner",
    ideas: [
      "Every day with you feels like a dream I never want to wake up from.",
      "You make ordinary moments feel like the greatest adventures.",
      "I didn't know what love was until I found you.",
      "Thank you for choosing me, every single day.",
      "Being with you is my favourite place in the world.",
    ],
  },
  {
    title: "💌 Long distance",
    anchor: "long-distance",
    ideas: [
      "The miles between us can't dim how brightly you shine in my heart.",
      "Every time I miss you, I count the days until I can hold you again.",
      "Distance means so little when someone means so much.",
      "I carry you with me everywhere I go.",
      "Counting down to the moment I can finally hug you.",
    ],
  },
  {
    title: "🥂 Anniversary",
    anchor: "anniversary",
    ideas: [
      "Another year around the sun with you, and I'd choose it every time.",
      "Here's to us — the best decision I ever made.",
      "You've made every year better than the last.",
      "I love you more today than I did yesterday, and less than I will tomorrow.",
      "Thank you for a year full of memories I'll treasure forever.",
    ],
  },
  {
    title: "🎂 Birthday love",
    anchor: "birthday",
    ideas: [
      "Happy birthday to the person who makes my world so much brighter.",
      "Today the world got a little luckier — because it gets another year with you.",
      "Wishing the most incredible year to the most incredible person I know.",
      "I'm so glad you were born. The world is better with you in it.",
      "May this year bring you everything you've always wanted.",
    ],
  },
  {
    title: "👯 Friendship",
    anchor: "friendship",
    ideas: [
      "I don't know what I'd do without you — and I never want to find out.",
      "You're not just my best friend, you're my chosen family.",
      "Thank you for being the person I can call at 3am.",
      "Our friendship is the kind that doesn't need explanation.",
      "Life is better when we're laughing together.",
    ],
  },
  {
    title: "🙏 Saying sorry",
    anchor: "apology",
    ideas: [
      "I'm sorry. You deserve better from me, and I mean to do better.",
      "I hate that I hurt you. You matter too much to me for me to let this go.",
      "Words feel small right now, but I need you to know — I'm truly sorry.",
      "I was wrong. I'm sorry, and I love you.",
      "Please give me the chance to show you how much you mean to me.",
    ],
  },
  {
    title: "🌙 Good night messages",
    anchor: "goodnight",
    ideas: [
      "Sweet dreams, my love. I'll be thinking of you until morning.",
      "Close your eyes knowing that someone loves you more than words can say.",
      "Goodnight — may your dreams be as wonderful as you are.",
      "The last thing I think about every night is you.",
      "Sleep tight. Tomorrow I get to love you all over again.",
    ],
  },
]

export default function IdeasPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100">

      {/* Nav */}
      <div className="sticky top-0 z-10 border-b border-white/30 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-extrabold text-primary">Lovia💖</Link>
          <Link
            href="/"
            className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow hover:opacity-90"
          >
            Create a card ✨
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12">

        {/* Hero */}
        <header className="mb-14 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Love Card Message Ideas 💌
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Not sure what to write? Find the perfect words for any occasion — then create a free digital card in seconds.
          </p>

          {/* Category quick links */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <a
                key={cat.anchor}
                href={`#${cat.anchor}`}
                className="rounded-full border border-primary/30 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition-all hover:bg-primary/10"
              >
                {cat.title.split(" ")[0]} {cat.title.split(" ").slice(1).join(" ")}
              </a>
            ))}
          </div>
        </header>

        {/* SEO intro paragraph — keyword-rich, human-written */}
        <section className="mb-12 rounded-3xl bg-white/70 p-6 shadow-md backdrop-blur md:p-8">
          <h2 className="text-xl font-bold text-foreground">Why a digital love card hits different 💖</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Texts disappear in a scroll, and emails feel formal. A Lovia card arrives as a unique link — your
            special someone taps it and a cute animal appears, sleeping, waiting. The moment they tap again,
            it wakes up and your message types itself out, one letter at a time. You can even add music. That
            tiny moment of magic is what makes people screenshot it, share it, and remember it.
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Below you&apos;ll find message ideas sorted by occasion. Copy one, tweak it to sound like you, and
            paste it into Lovia. No signup, no payment — just a card your person will actually feel.
          </p>
        </section>

        {/* Message categories */}
        {categories.map((cat) => (
          <section key={cat.anchor} id={cat.anchor} className="mb-10 scroll-mt-20">
            <h2 className="mb-5 text-2xl font-bold text-foreground">{cat.title}</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {cat.ideas.map((idea, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-white/50 bg-white/70 p-5 shadow backdrop-blur transition-all hover:shadow-lg hover:bg-white/90"
                >
                  <p className="text-foreground leading-relaxed">&ldquo;{idea}&rdquo;</p>
                  <Link
                    href={`/?prefill=${encodeURIComponent(idea)}`}
                    className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary opacity-0 transition-all group-hover:opacity-100 hover:bg-primary/20"
                  >
                    Use this ✨
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* FAQ — great for SEO long-tail */}
        <section className="mb-12 rounded-3xl bg-white/70 p-6 shadow-md backdrop-blur md:p-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Frequently asked questions</h2>
          <div className="space-y-5">
            {[
              {
                q: "Are Lovia cards free to create?",
                a: "Yes — 100% free. No account needed. Just pick your companion, write your message, and share the link.",
              },
              {
                q: "Can I add my own photo to the card?",
                a: "Absolutely! You can upload your own photo and it will appear instead of the animal. Perfect for couple photos or anything personal.",
              },
              {
                q: "Will I know when my card is opened?",
                a: "Yes! After creating a card you get a private status link. Visit it any time to see if the recipient has opened their card and when.",
              },
              {
                q: "Can I send a card to someone far away?",
                a: "Yes — Lovia cards are just links. Send them over WhatsApp, Instagram DMs, iMessage, or any other app. Long distance, no problem.",
              },
              {
                q: "What occasions are Lovia cards for?",
                a: "Love cards, birthday messages, friendship cards, apologies, good night messages, anniversaries, and seasonal occasions like Christmas and Halloween.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-5 last:border-0 last:pb-0">
                <h3 className="font-bold text-foreground">{q}</h3>
                <p className="mt-2 text-muted-foreground">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-pink-200 via-purple-100 to-cyan-100 p-8 text-center shadow-lg">
          <p className="text-3xl font-extrabold text-foreground">Ready to send something magical? 💖</p>
          <p className="mt-2 text-muted-foreground">It takes less than a minute. No signup required.</p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.03] hover:opacity-90"
          >
            Create a free card ✨
          </Link>
        </div>
      </div>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        Made with 💚 to spread love around the world · <Link href="/" className="underline">loviaforyou.com</Link>
      </footer>
    </main>
  )
}
