import { supabase } from "@/lib/supabase"

export async function uploadCustomImage(file: File) {
  const fileExt = file.name.split(".").pop()
  const fileName = `${crypto.randomUUID()}.${fileExt}`

  const { error } = await supabase.storage
    .from("card-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    })

  if (error) throw error

  const { data } = supabase.storage
    .from("card-images")
    .getPublicUrl(fileName)

  return data.publicUrl
}
