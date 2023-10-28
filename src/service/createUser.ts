import { supabase } from "./supabase";

const addUsertoDb = async (user: any | null, password: string) => {
  const { data, error } = await supabase.from("users").insert({
    id: user.id,
    username: "",
    email: user.email,
    password: password,
    address: "",
    telephone: "",
    image: "",
  });
};

const createUser = async (
  email: string,
  password: string
): Promise<any | null> => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    throw new Error("Unable to create user.");
  }

  console.log("data Register", data);
  await addUsertoDb(data.user, password);
  return data;
};

export default createUser;
