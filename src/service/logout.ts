import { supabase } from "./supabase";

const logout = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error("Could not sign out.");
  }
};

export default logout;
