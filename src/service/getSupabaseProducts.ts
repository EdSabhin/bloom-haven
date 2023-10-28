import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { Product } from "../models/product.model";

export interface ProductsResponse {
  data: Product[] | null;
  error: PostgrestError | null;
}

const getSupabaseProducts = async (): Promise<ProductsResponse> => {
  const { data, error } = await supabase.from("products").select();

  return { data, error };
};

export default getSupabaseProducts;
