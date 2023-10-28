import React, { KeyboardEvent } from "react";
import Image from "next/image";
import MagGlass from "../../assets/img/magnifying-glass.png";

type Props = {
  setSearch: (search: string) => void;
  search: string;
  handleSearchClick?: () => void;
  handleKeyEnter?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

const SearchBar = ({
  setSearch,
  search,
  handleSearchClick,
  handleKeyEnter,
}: Props) => {
  return (
    <div className="w-5/6 flex justify-center items-center rounded-md relative">
      <input
        type="text"
        value={search}
        placeholder="Search Products"
        onChange={(e) => setSearch(e.target.value.trim())}
        className="w-full py-2 px-6 rounded-md italic border-2 border-pink-200 focus:border-pink-200 focus:outline-none bg-slate-100 text-slate-900"
        onKeyDown={handleKeyEnter}
      />
      <span
        onClick={handleSearchClick}
        className="w-[4rem] h-full flex justify-center items-center absolute top-0 right-0 border border-pink-200 bg-gradient-to-r hover:bg-gradient-to-r from-teal-100 to-pink-200 rounded-md"
      >
        <Image width={22} height={22} src={MagGlass} alt="Search Icon" />
      </span>
    </div>
  );
};

export default SearchBar;
