import Image from "next/image";
import MenuButton from "../buttons/MenuButton";
import ImageInput from "../inputs/ImageInput";
import Input from "../inputs/Input";
import SelectInput from "../inputs/SelectInput";
import TextArea from "../inputs/TextArea";
import { supabase } from "@/src/service/supabase";
import { useEffect, useState } from "react";
import uploadImage from "@/src/service/uploadImage";
import updateProduct from "@/src/service/updateProduct";
import getProductId from "@/src/service/getProductId";
import { Product } from "@/src/models/product.model";

type Props = {
  closeModal: () => void;
  productId: number | null;
};

const EditProduct = ({ closeModal, productId }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string | number>("");
  const [selectedImage, setSelectedImage] = useState<string | null>("");

  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const data: Product[] | null = await getProductId(productId);
      if (data) {
        setTitle(data[0].title);
        setSelectedCategory(data[0].category);
        setDescription(data[0].description);
        setPrice(data[0].price);
        setSelectedImage(data[0].image);
        setImageUrl(data[0].image);
      }
    };
    fetchProductData();
  }, [productId]);

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error(error);
    }
    return data;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  console.log(categories);

  const productData = {
    id: productId,
    title: title,
    category: selectedCategory,
    description: description,
    price: price,
    image: selectedImage,
    rating: 0,
  };

  const saveProductData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateProduct(productId, productData);
    setTitle("");
    setSelectedCategory("");
    setDescription("");
    setPrice("");
    setSelectedImage("");
  };

  const handleImageSelect = async (file: File) => {
    const imageUrl = await uploadImage(file, "product-images");
    setSelectedImage(imageUrl);
  };

  return (
    <div className="w-full h-full flex justify-center items-center z-50 fixed inset-0 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="w-1/4 flex flex-col justify-start items-center border-b-2 border-r-2 border-indigo-200 rounded-md rounded-tr-3xl p-4 modal-gradient relative overscroll-none">
        <MenuButton
          text="X"
          action={closeModal}
          className="absolute top-0 right-0 border border-white rounded px-1"
        />
        <form className="w-full flex flex-col gap-8 pt-8">
          <Input
            label="Product"
            placeholder="Add Product Name"
            setState={setTitle}
            value={title}
          />
          <SelectInput
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <TextArea
            label="Description"
            placeholder="Brief Product Description"
            setState={setDescription}
            value={description}
            className="w-full h-[15rem] border-2 border-rose-300 rounded-md bg-slate-600 text-white focus:border-rose-500 p-4 focus:outline-none
      "
          />
          <Input
            label="Price (USD)"
            placeholder="Your Product's Price"
            setState={setPrice}
            value={price}
          />
          <div className="w-full flex justify-start items-center gap-20">
            <ImageInput
              onImageSelect={handleImageSelect}
              setSelectedImage={setSelectedImage}
              setImageUrl={setImageUrl}
            />
            {imageUrl && (
              <div className="w-36 h-36 flex">
                <Image
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt={"Product image"}
                  className="object-fill aspect-square"
                />
              </div>
            )}
          </div>
          <div className="w-full flex justify-start gap-10">
            <MenuButton text="Cancel" action={closeModal} />
            <MenuButton text="Save Product" action={saveProductData} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
