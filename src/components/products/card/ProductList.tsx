import { Product } from "@/src/models/product.model";
import deleteProduct from "@/src/service/deleteProduct";
import limitWords from "@/src/service/limitWords";
import useStore from "@/src/store/store";
import React, { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import EditProduct from "../../modals/EditProduct";

type Props = {
  product: Product;
};

const ProductList = ({ product }: Props) => {
  const { setRealTime } = useStore()
  
  const [openEdit, setOpenEdit] = useState(false)

  const handleDeleteProduct = async (id:number | null) => {
    await deleteProduct(id);
    setRealTime(true)
  };

  console.log(product)

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-teal-200 p-6 ">
      <p className="w-full">{limitWords(product.title, 4)}</p>
      <div className="w-max flex justify-end gap-4">
        <BsPencilSquare
          size={20}
          className="text-teal-300 mt-1 cursor-pointer hover:scale-125 hover:text-teal-200"
          onClick={()=> setOpenEdit(true)}
        />
        <BsTrash
          size={20}
          className="text-slate-200 mt-1 cursor-pointer hover:scale-125 hover:text-rose-500"
          onClick={() => handleDeleteProduct(product.id)}
        />
      </div>
      {openEdit && <EditProduct closeModal={()=> setOpenEdit(false)} productId={product.id} />}
    </div>
  );
};

export default ProductList;
