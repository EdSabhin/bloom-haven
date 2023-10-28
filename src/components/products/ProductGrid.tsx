import React from "react";
import ProductCard from "./card/ProductCard";
import { Product } from "@/src/models/product.model";

type Props = {
  productList: Product[] | null;
  setShowModal: (value: boolean) => void;
  setProductId: (value: number | null) => void;
};

const ProductGrid = ({ productList, setShowModal, setProductId }: Props) => {
  console.log("Productlist", productList);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24 place-content-center m-4">
      {productList?.map((product: Product) => {
        return (
          <ProductCard
            key={product?.id}
            id={product?.id}
            image={product?.image}
            title={product?.title}
            description={product?.description}
            price={product?.price}
            rating={product?.rating}
            setShowModal={setShowModal}
            setProductId={setProductId}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;
