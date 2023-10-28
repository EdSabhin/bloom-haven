import { supabase } from "./supabase";

export const googleLogin = async (): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log("data:", data);

    if (error) {
      console.log(error);
      throw new Error("Failed to sign in.");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign in with Google.");
  }
};

export const githubLogin = async (): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    console.log("data:", data);

    if (error) {
      console.log(error);
      throw new Error("Failed to sign in.");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign in with Google.");
  }
};
