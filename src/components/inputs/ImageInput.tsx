import React, { ChangeEvent } from "react";

type Props = {
  onImageSelect: (file: File) => void;
  setSelectedImage: any;
  setImageUrl: any;
};

const ImageInput: React.FC<Props> = ({ onImageSelect, setImageUrl }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageSelect(file);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="w-max text-center rounded-md p-3 bg-gradient-to-br from-slate-400 to-slate-600 text-white font-medium hover:shadow-md hover:shadow-teal-100 ease-in-out duration-200">
      Upload New Image
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </label>
  );
};

export default ImageInput;
