import { Categories } from "@/src/models/categories.model";
import React from "react";

type Props = {
  categories: Categories[] | null;
  setSelectedCategory: (value: string) => void;
  selectedCategory: string;
};

const SelectInput = ({ categories, setSelectedCategory , selectedCategory }: Props) => {
  const handleSelectedCategory = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="font-medium underline underline-offset-4">Category</label>
      <select onChange={handleSelectedCategory} value={selectedCategory} className="text-white bg-slate-600 border-2 border-pink-300 focus:border-teal-200 p-4 rounded focus:outline-none">
        <option value="">Select Category</option>
        {categories?.map((category) => {
          return (
            <option key={category.id} value={category.category}>
              {category.category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectInput;
