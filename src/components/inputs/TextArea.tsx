import React from "react";

type Props = {
  label: string;
  placeholder: string;
  setState: (value: string) => void;

  value: string | undefined;
  className?: string;
};

const TextArea = ({
  label,
  placeholder,
  setState,
  value,
  className,
}: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(event.target.value);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="w-max underline underline-offset-4">{label}</label>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        className={
          className ??
          "border-2 border-teal-300 rounded-md p-4 bg-slate-600 text-white"
        }
      />
    </div>
  );
};

export default TextArea;
