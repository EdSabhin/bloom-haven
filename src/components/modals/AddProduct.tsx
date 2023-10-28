import React, { useEffect, useState } from "react";
import Input from "../inputs/Input";
import ImageInput from "../inputs/ImageInput";
import Image from "next/image";
import SelectInput from "../inputs/SelectInput";
import { supabase } from "@/src/service/supabase";
import MenuButton from "../buttons/MenuButton";
import uploadImage from "@/src/service/uploadImage";
import TextArea from "../inputs/TextArea";
import getCategories from "@/src/service/getCategories";
import { Categories } from "@/src/models/categories.model";

type Props = {
  setViewAddProduct: (value: boolean) => void;
};

const AddProduct = ({ setViewAddProduct }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>("");

  const [imageUrl, setImageUrl] = useState<string | null | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<Categories[] | null>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  console.log(categories);

  const productData = {
    title: title,
    category: selectedCategory,
    description: description,
    price: price,
    image: selectedImage,
    rating: 0,
  };

  const saveProductData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from("products")
      .insert(productData)
      .select();
    if (error) {
      console.error(error);
    }
    setTitle("");
    setSelectedCategory("");
    setDescription("");
    setPrice("");
    setSelectedImage("");
    return data;
  };

  const handleImageSelect = async (file: File) => {
    const imageUrl = await uploadImage(file, "product-images");
    setSelectedImage(imageUrl);
  };

  console.log(selectedImage);
  console.log("imageUrl", imageUrl);

  return (
    <form className="w-full flex flex-col gap-8 pt-8">
      <Input
        label="Product"
        placeholder="Add your product's name."
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
        placeholder="Add a brief product description."
        setState={setDescription}
        value={description}
        className="w-full h-[15rem] border-2 border-pink-300 rounded-md bg-slate-600 text-white focus:border-teal-200 p-4 focus:outline-none
      "
      />
      <Input
        label="Price (USD)"
        placeholder="Add your product's price."
        setState={setPrice}
        value={price}
      />
      <div className="w-full flex flex-col justify-center items-center gap-12">
        <div className="w-full flex justify-start items-center pt-8 pb-8 gap-20">
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
                className="p-2 border-2 object-fill aspect-square"
              />
            </div>
          )}
        </div>
        <div className="w-full flex justify-start gap-10">
          <MenuButton
            text="Cancel"
            action={() => setViewAddProduct(false)}
            className="w-max md:w-[12rem] text-center rounded-md p-2 bg-gradient-to-br from-slate-600 to-rose-600 text-white font-medium hover:shadow-md hover:shadow-orange-100 ease-in-out duration-200"
          />
          <MenuButton
            text="Save Product"
            action={saveProductData}
            className="w-max md:w-[12rem] text-center rounded-md p-2 bg-gradient-to-br from-slate-600 to-cyan-300 text-white font-medium hover:shadow-md hover:shadow-cyan-100 ease-in-out duration-200"
          />
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
