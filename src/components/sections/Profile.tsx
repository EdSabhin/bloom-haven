import React, { useEffect, useState } from "react";
import UserUpdate from "../forms/UserUpdate";
import UserInfo from "../forms/UserInfo";
import { Product } from "@/src/models/product.model";
import ProductList from "../products/card/ProductList";
import { BsPlusCircle } from "react-icons/bs";
import AddProduct from "../modals/AddProduct";
import getSupabaseProducts from "@/src/service/getSupabaseProducts";
import { PostgrestError } from "@supabase/supabase-js";
import useStore from "@/src/store/store";
import MenuButton from "../buttons/MenuButton";

interface ProductsResponse {
  data: Product[] | null;
  error: PostgrestError | null;
}

const Profile = () => {
  const { realTime } = useStore();
  const [productList, setProductList] = useState<Product[]>([]);
  const [viewAddProduct, setViewAddProduct] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const response: ProductsResponse = await getSupabaseProducts();
      if (response.data) {
        setProductList(response.data);
      }
    };

    fetchProduct();
  }, [realTime]);

  const productListSlice = productList.slice(0, 5);

  return (
    <div className="w-full flex justify-start text-white bgGradient gap-20 pt-12 pb-20 px-20">
      <div className="w-1/2 h-max flex justify-center shadow-md border border-pink-200 rounded rounded-tr-3xl rounded-bl-3xl py-4 form-bg">
        <div className="w-full py-6 px-14">
          {updateUser ? (
            <UserUpdate setUpdateUser={setUpdateUser} />
          ) : (
            <UserInfo setUpdateUser={setUpdateUser} />
          )}
        </div>
      </div>
      <div className="w-full h-max flex justify-center gap-28 form-bg border border-pink-200 rounded-tr-3xl rounded-bl-3xl shadow-md rounded py-10 px-12">
        <div className="w-10/12 flex flex-col gap-8">
          <div className="w-full flex justify-start items-center gap-10">
            <h1 className="w-max text-2xl font-medium border-b-2 border-teal-300 rounded px-3 pb-1 mb-4">
              Registered Products
            </h1>
          </div>
          <div className="w-full flex flex-col">
            {(viewMore ? productList : productListSlice).map(
              (product, index) => {
                return <ProductList key={index} product={product} />;
              }
            )}
            <p
              onClick={() => {
                setViewMore(!viewMore);
              }}
              className="w-full flex justify-end text-teal-200 hover:text-teal-100 hover:underline hover:underline-offset-4 cursor-pointer mt-16 mb-8"
            >
              {">"} View more products.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-start">
          <div
            onClick={() => setViewAddProduct(!viewAddProduct)}
            className="w-max flex justify-end gap-3 cursor-pointer"
          >
            <BsPlusCircle
              size={30}
              className="text-teal-200 hover:text-teal-100 mt-1"
            />
            <MenuButton
              text="Add a new product"
              className="w-max md:w-[12rem] text-center rounded-md p-2 bg-gradient-to-br from-slate-400 to-slate-600 text-white font-medium hover:shadow-md hover:shadow-teal-100 ease-in-out duration-100"
            />
          </div>
          {viewAddProduct && (
            <AddProduct setViewAddProduct={setViewAddProduct} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
