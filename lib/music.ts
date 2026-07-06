export interface MusicOption {
  id: string
  label: string
  emoji: string
  src?: string
}

export const musicOptions: MusicOption[] = [
  { id: "none",     label: "No music", emoji: "🔇" },
  { id: "romantic", label: "Romantic", emoji: "💕", src: "/music/romantic.mp3" },
  { id: "dreamy",   label: "Dreamy",   emoji: "✨", src: "/music/dreamy.mp3" },
  { id: "happy",    label: "Happy",    emoji: "🌟", src: "/music/happy.mp3" },
]

export function getMusicById(id: string): MusicOption | undefined {
  return musicOptions.find((m) => m.id === id)
}
