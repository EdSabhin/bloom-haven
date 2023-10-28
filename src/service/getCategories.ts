import { Categories } from "../models/categories.model";
import { supabase } from "./supabase";

 const getCategories = async (): Promise<Categories[] | null> => {
   const { data, error } = await supabase.from("categories").select("*");
   if (error) {
     console.error(error);
   }
   return data;
 };

export default getCategories;
