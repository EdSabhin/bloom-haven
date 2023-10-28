import React from "react";

type Props = {
  action?: () => void;
  text: string;
  className?: string;
};

const Button = ({ text, action, className,}: Props) => {
  return (
    <button
      onClick={action}
      className={`flex justify-center items-center ${
        className ??
        "px-6 py-2 shadow-sm bg-teal-300 rounded-md text-slate-800 font-semibold "
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
