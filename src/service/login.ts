import { supabase } from "./supabase";

const login = async (email: string, password: string): Promise<any> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.log(error);
    throw new Error("Failed to sign in.");
  }

  return data;
};

export default login;
