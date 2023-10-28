import Image from "next/image";
import React from "react";
import RatingStars from "./RatingStars";
import Price from "./Price";
import MenuButton from "../../buttons/MenuButton";
import flowerBadge from "src/assets/img/dahlia.png";

type Products = {
  id: number | null;
  image: string | null | any
  title: string;
  description: string;
  rating: number | string;
  price: number | string;
  setShowModal: (value: boolean) => void;
  setProductId: (value: number | null) => void;
};

const ProductCard = ({
  image,
  id,
  title,
  rating,
  price,
  setShowModal,
  setProductId,
}: Products) => {
  return (
    <div
      onClick={() => {
        setProductId(id);
        setShowModal(true);
      }}
      className="w-full card-bg flex flex-col gap-2 rounded-md border-b-2 border-r-2  border-indigo-200 py-6 px-4 justify-between items-center relative cursor-pointer"
    >
      <div>
        <Image
          src={flowerBadge}
          width={65}
          height={65}
          alt="Flower Badge"
          className="absolute -top-6 -right-7"
        />
        <Image
          src={image}
          width={220}
          height={220}
          alt={title}
          className="w-[120px] h-[120px] m-8"
        />
      </div>
      <div className="w-full h-full flex justify-center items-start">
        <h3 className="text-center">{title}</h3>
      </div>

      <MenuButton
        text="View Details"
        action={() => {
          setProductId(id);
          setShowModal(true);
        }}
        className="text-md text-center rounded-md py-2 px-4 m-3 bg-gradient-to-br from-pink-500 to-indigo-400 hover:from-rose-700 hover:to-slate-400  text-white font-medium border-2 border-rose-100 hover:border-indigo-100 hover:scale-110 ease-in-out duration-200"
      />
      <RatingStars rating={rating ?? 5} />
      <Price price={price} />
    </div>
  );
};

export default ProductCard;
