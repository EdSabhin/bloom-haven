import { useEffect, useRef } from "react";
import MenuButton from "../buttons/MenuButton";
import { Categories } from "@/src/models/categories.model";

type MenuPop = {
  pop: boolean;
  setPop: (value: boolean) => void;
  categories: Categories[] | null;
  setCurrentCategory: (value: string) => void;
  currentCategory: string;
  setSearch: (value: string) => void;
};

const MenuPop = ({
  pop,
  setPop,
  categories,
  setCurrentCategory,
  currentCategory,
  setSearch,
}: MenuPop) => {
  const popUpRef = useRef<HTMLDivElement>(null);

  /*Otherwise use onBlur*/
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popUpRef.current &&
        !popUpRef.current.contains(event.target as Node)
      ) {
        setPop(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [pop]);

  return (
    <div className="w-full relative ">
      <MenuButton
        text={currentCategory !== "" ? "View all" : "Catalog"}
        action={() => {
          setPop(!pop);
          setSearch("")
          if (currentCategory !== "") {
            setCurrentCategory("");
          }
        }}
        className="w-full block border-2 border-pink-100 rounded-md p-2 bg-gradient-to-br from-indigo-300 to-rose-600  text-white font-medium hover:scale-110 ease-in-out duration-200"
      />

      {pop && (
        <div
          ref={popUpRef}
          className="w-full absolute left-0 top-15 border-2 border-pink-200 rounded-md p-8 bg-gradient-to-br from-rose-600 to-cyan-300 text-white capitalize"
        >
          {categories?.map((category, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  setPop(false);
                  setCurrentCategory(category.category);
                }}
                className="w-full cursor-pointer hover:scale-105 hover:text-teal-300 text-sm font-medium py-1 pl-2"
              >
                {category.category}
              </li>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuPop;
