import { createClient } from "@/lib/supabase/server";

// export async function saveFiles(files: File[]) {
//   const supabase = createClient();
//   const fileNames = files.map((file) => file.name);
//   const { data, error } = await supabase.storage.from("file_storage").upload(`cvs/${fileName}`, file);
//   if (error) {
//     throw new Error(`Error uploading file ${fileName}: ${error.message}`);
//   }
// }
