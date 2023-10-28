import { Product } from "../models/product.model";
import { supabase } from "./supabase";



const updateProduct = async (productId: number | null, productData: Product) => {
  const { error } = await supabase
    .from("products")
    .update({
      title: productData.title,
      description: productData.description,
      price: productData.price,
      category: productData.category,
      image: productData.image,
      rating: productData.rating,
    })
    .eq("id", productId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export default updateProduct;
