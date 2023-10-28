import { Product } from "../models/product.model";

const getFakeApiProducts = async (): Promise<Product[]> => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      signal,
    });
    if (!response.ok) {
      throw new Error("Products fetch failed.");
    }
    const data: Product[] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`${error.message}.`);
  } finally {
    controller.abort();
  }
};

export default getFakeApiProducts;
