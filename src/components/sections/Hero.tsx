import React, { useEffect, useState, KeyboardEvent } from "react";
import SearchBar from "../inputs/SearchBar";
import ProductGrid from "../products/ProductGrid";
import fetchData from "@/src/service/fetchData";
import { Product } from "@/src/models/product.model";
import MenuPop from "../modals/MenuPop";
import { BsArrowUpRightSquare } from "react-icons/bs";
import useStore from "@/src/store/store";
import limitWords from "@/src/service/limitWords";
import ModalOne from "../modals/ModalOne";
import getCategories from "@/src/service/getCategories";
import { Categories } from "@/src/models/categories.model";

const Hero = () => {
  const { products, user } = useStore();
  const [pop, setPop] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<Categories[] | null>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [currentSearch, setCurrentSearch] = useState<Product[] | null>([]);
  const [showResults, setShowResults] = useState<boolean>(true);
  const [prevSearchRef, setPrevSearchRef] = useState("");
  const [productId, setProductId] = useState<number | null>(null);

  // useEffect(() => {
  //   fetchData("https://fakestoreapi.com/products/categories").then(
  //     setCategories
  //   );
  // }, []);

  // const fetchCategoryData = (category: string) => {
  //   fetchData(`https://fakestoreapi.com/products/category/${category}`).then(
  //     setCurrentSearch
  //   );
  // };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // const handleSearchClick = async () => {
  //   setCurrentSearch(searchResult);
  //   setShowResults(false);
  // };

  // const handleKeyEnter = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     setCurrentSearch(searchResult);
  //     setShowResults(false);
  //   }
  // };

  useEffect(() => {
    if (search === "") {
      setCurrentSearch(products);
    } else {
      setCurrentSearch(
        products.filter((product: Product) => {
          return product.title.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
    console.log(search);
  }, [search, products]);

  useEffect(() => {
    if (currentCategory !== "") {
      setCurrentSearch(
        products.filter((product: Product) => {
          return product.category
            .toLowerCase()
            .includes(currentCategory.toLowerCase());
        })
      );
    } else {
      setCurrentSearch(products);
    }
  }, [currentCategory]);

  return (
    <div className="w-full flex flex-col justify-center items-center md:items-start pt-12 pb-32 lg:px-14 gap-14 hero-bg">
      <div className="w-full px-4 md:w-1/2 flex items-start gap-12">
        <div className="w-[36%] z-10">
          <div className="w-full flex">
            <MenuPop
              pop={pop}
              setPop={setPop}
              categories={categories}
              setCurrentCategory={setCurrentCategory}
              currentCategory={currentCategory}
              setSearch={setSearch}
            />
            {currentCategory && (
              <div className="w-full hidden md:flex justify-center md:justify-start"></div>
            )}
          </div>
        </div>
        {currentCategory && (
          <div className="w-full flex md:hidden justify-center md:justify-start">
            <h2 className="w-full text-center font-medium rounded-md p-4 text-white capitalize cursor-pointer">
              {currentCategory}
            </h2>
          </div>
        )}
        <div className="w-full flex flex-col">
          <SearchBar setSearch={setSearch} search={search} />
          {search !== "" && showResults && (
            <div className="w-5/6 py-2 px-4 rounded-md bg-white">
              {!!searchResult.length ? (
                <>
                  {searchResult.slice(0, 5).map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full flex justify-between items-center cursor-pointer"
                      >
                        <li className="w-full py-1 pl-3 hover:bg-rose-100 hover:rounded-md hover-trigger text-slate-950 list-none">
                          {limitWords(item.title, 6)}
                        </li>
                        <BsArrowUpRightSquare className="bg-rose-100 change-on-hover ml-4" />
                      </div>
                    );
                  })}
                </>
              ) : (
                <span
                  className=" w-full
                  py-1
                  px-3
                  rounded-md 
                  bg-slate-100
                  text-slate-950
                  list-none
                  "
                >
                  No results found.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {currentCategory && (
        <div className="w-full flex justify-center items-center">
          <h2 className="w-max justify-center text-center capitalize text-lg text-zinc-800 font-medium underline underline-offset-4 border-2 border-amber-100 py-3 px-12 modal-gradient rounded-lg rounded-tr-3xl rounded-bl-3xl cursor-pointer">
            {currentCategory}
          </h2>
        </div>
      )}

      <ProductGrid
        productList={currentSearch}
        setShowModal={setShowModal}
        setProductId={setProductId}
      />

      {showModal && (
        <ModalOne
          productId={productId}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Hero;
