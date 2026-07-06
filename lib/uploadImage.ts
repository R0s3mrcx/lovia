import { supabase } from "@/lib/supabase"

export async function uploadCustomImage(file: File): Promise<string> {
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image must be under 5 MB")
  }

  const ext = file.name.split(".").pop() ?? "jpg"
  const fileName = `${crypto.randomUUID()}.${ext}`

  const uploadPromise = supabase.storage
    .from("card-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false })

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Upload timed out")), 15_000)
  )

  const { error } = await Promise.race([uploadPromise, timeout])
  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from("card-images").getPublicUrl(fileName)
  return data.publicUrl
}
