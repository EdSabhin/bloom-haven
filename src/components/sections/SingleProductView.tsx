"use client";
import { Product } from "@/src/models/product.model";
import fetchSingleData from "@/src/service/fetchSingleData";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import MenuButton from "../buttons/MenuButton";
import RatingStars from "../products/card/RatingStars";
import Price from "../products/card/Price";
import getProductId from "@/src/service/getProductId";
import useStore from "@/src/store/store";
import { useRouter } from "next/navigation";

const SingleProductView = ({ id }: { id: number | null }) => {
  const [singleProduct, setSingleProduct] = useState<Product | null>();
  const { session } = useStore();
  const router = useRouter();

  // useEffect(() => {
  //   fetchSingleData(`https://fakestoreapi.com/products/${id}`).then(
  //     setSingleProduct
  //   );
  // }, [id]);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const data: Product[] | null = await getProductId(id);
      data && setSingleProduct(data[0]);
    };
    fetchSingleProduct();
  }, []);

  console.log(singleProduct);
  return (
    <div className="w-full flex flex-col text-slate-800 gap-6 pt-10 pb-6 px-8 items-end">
      <div className="w-full flex justify-center items-center gap-8 pt-6 pb-4">
        <Image
          src={singleProduct?.image ?? ""}
          width={300}
          height={300}
          alt={singleProduct?.description ?? ""}
          className="w-full h-full"
        />
        <div className="w-full flex flex-col border border-t-indigo-300 border-b-indigo-300 pt-4 pb-8 gap-1">
          <h3>Spring Vale{singleProduct?.title}</h3>
          <Price price={singleProduct?.price ?? 100} />
          <RatingStars rating={singleProduct?.rating ?? 5} />
        </div>
      </div>
      <h3 className="text-justify">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime at
        facere aut hic cum. Suscipit, aliquam molestias reprehenderit quisquam
        quo hic, eos, illo fugiat quos nostrum inventore pariatur vel? Vero.
        {singleProduct?.description}
      </h3>

      <MenuButton
        text={!session ? "Sign in to edit" : "Edit Product"}
        action={() => {
          !session ? router.push("/login") : router.push("/profile");
        }}
        className="border border-indigo-300 text-center rounded-md text-white py-3 px-4 mt-3 bg-gradient-to-br from-slate-700 to-rose-400 
        hover:from-rose-700 hover:to-slate-400 hover:scale-110 ease-in-out duration-200 
        "
      />
    </div>
  );
};

export default SingleProductView;
