import React from "react";

type Props = {
  label: string;
  placeholder: string;
  setState: (value: string) => void;
  type?: string;
  value: string | undefined | number;
  className?: string;
};

const Input = ({
  label,
  placeholder,
  setState,
  type,
  value,
  className,
}: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="w-max underline underline-offset-4">{label}</label>
      <input
        value={value}
        type={type ?? "text"}
        placeholder={placeholder}
        onChange={handleInputChange}
        className={
          className ??
          "border-2 border-pink-300 focus:border-teal-200 p-4 rounded focus:outline-none bg-slate-600 text-white"
        }
      />
    </div>
  );
};

export default Input;
