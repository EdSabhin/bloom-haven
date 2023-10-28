"use client";
import { useState, useEffect } from "react";
import { Product } from "@/src/models/product.model";
import getProducts from "@/src/service/getFakeApiProducts";
import Hero from "../components/sections/Hero";
import useStore from "../store/store";

const Homepage = () => {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProductList);
  }, []);

  return (
    <>
      <Hero productList={productList} />
    </>
  );
};

export default Homepage;
