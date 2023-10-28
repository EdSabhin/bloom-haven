import { supabase } from "./supabase";

const uploadImage = async (file: File, storage: string): Promise<string | null> => {
  const { data, error } = await supabase.storage
    .from(storage)
    .upload(file.name, file);
  if (error) {
    console.error(error);
  }
  const publicUrl = `https://wxnrsymkujzanksnrsdc.supabase.co/storage/v1/object/public/${storage}/${file.name}`;
  return publicUrl;
};

export default uploadImage;
