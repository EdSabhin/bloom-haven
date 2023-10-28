import React from "react";

type Button = {
  text: string;
  action?: any
  className?: string;
};

const MenuButton = ({ text, action, className }: Button) => {
  return (
    <button
      onClick={action}
      className={
        className ??
        "w-max md:w-[12rem] text-center rounded-md p-2 bg-gradient-to-br from-slate-400 to-slate-600 text-white font-medium hover:shadow-md hover:shadow-teal-100 ease-in-out duration-200"
      }
    >
      {text}
    </button>
  );
};

export default MenuButton;
