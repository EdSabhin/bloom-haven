import { Product } from "../models/product.model";
import { supabase } from "./supabase";

const getProductId = async (productId: number | null): Promise<Product[] | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId);
  if (error) {
    console.error(error);
  }
  return data;
};

export default getProductId;
