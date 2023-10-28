import { supabase } from "./supabase";

const getUserId = async (userId:string | undefined) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);
  if (error) {
    console.error(error);
  }
  return data;
};

export default getUserId;