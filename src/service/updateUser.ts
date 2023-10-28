import { supabase } from "./supabase";

type userData = {
  username?: string;
  email?: string;
  password?: string;
  address?: string;
  telephone?: string;
  image?: string | null;
}

const updateUser = async (userId: string | undefined, userData: userData) => {
  const { error } = await supabase
    .from("users")
    .update({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      address: userData.address,
      telephone: userData.telephone,
      image: userData.image,
    })
    .eq("id", userId);
  if (error) {
    console.error(error);
  }
};

export default updateUser; 