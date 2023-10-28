import React, { useEffect, useState } from "react";
import Input from "../inputs/Input";
import MenuButton from "../buttons/MenuButton";
import ImageInput from "../inputs/ImageInput";
import uploadImage from "@/src/service/uploadImage";
import Image from "next/image";
import useStore from "@/src/store/store";
import updateUser from "@/src/service/updateUser";

type Props = {
  setUpdateUser: (value: boolean) => void;
};

const UserUpdate = ({ setUpdateUser }: Props) => {
  const { user, setRealTime } = useStore();

  const [username, setUsername] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const [telephone, setTelephone] = useState<string | undefined>("");
  const [selectedImage, setSelectedImage] = useState<string | null | undefined>(
    ""
  );
  const [imageUrl, setImageUrl] = useState<string | null | undefined>("");

  const handleImageSelect = async (file: File) => {
    const imageUrl = await uploadImage(file, "profile-images");
    console.log(imageUrl);
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
    setPassword(user?.password);
    setAddress(user?.address);
    setTelephone(user?.telephone);
    setSelectedImage(user?.image);
    setImageUrl(user?.image);
  }, [user]);

  const updateInfo = async (e: React.FormEvent) => {
    e.preventDefault;
    const userData = {
      username: username,
      email: email,
      password: password,
      address: address,
      telephone: telephone,
      image: selectedImage,
    };
    await updateUser(user?.id, userData);
    setRealTime(true);
  };

  return (
    <div>
      <form className="w-full flex flex-col gap-8">
        <h1 className="w-max text-2xl font-medium border-b-2 border-teal-300 rounded px-3 pb-1 mb-4">
          Edit Account
        </h1>
        <Input
          label="Username"
          placeholder="Username"
          setState={setUsername}
          value={username}
        />
        <Input
          label="Email"
          placeholder="Email"
          setState={setEmail}
          value={email}
        />
        <Input
          label="Password"
          placeholder="Password"
          setState={setPassword}
          value={password}
        />
        <Input
          label="Address"
          placeholder="Address"
          setState={setAddress}
          value={address}
        />
        <Input
          label="Telephone"
          placeholder="Telephone"
          setState={setTelephone}
          value={telephone}
        />
        <div className="w-full flex justify-start items-center gap-20 py-8">
          <ImageInput
            onImageSelect={handleImageSelect}
            setSelectedImage={setSelectedImage}
            setImageUrl={setImageUrl}
          />
          {imageUrl && (
            <div className="w-36 h-36 flex">
              <Image
                src={imageUrl}
                width={200}
                height={200}
                alt={"Profile image"}
                className="rounded-full object-fill aspect-square"
              />
            </div>
          )}
        </div>

        <div className="w-full flex justify-center gap-12 pb-6">
          <MenuButton
            text="Cancel"
            action={() => {
              setUpdateUser(false);
            }}
            className="w-max md:w-[12rem] text-center rounded-md p-2 bg-gradient-to-br from-slate-600 to-rose-600 text-white font-medium hover:shadow-md hover:shadow-orange-100 ease-in-out duration-200"
          />
          <MenuButton
            text="Save Profile"
            action={(e: React.FormEvent) => {
              updateInfo(e);
              setUpdateUser(false);
            }}
            className="w-max md:w-[12rem] text-center rounded-md p-2 bg-gradient-to-br from-slate-600 to-cyan-300 text-white font-medium hover:shadow-md hover:shadow-cyan-100 ease-in-out duration-200"
          />
        </div>
      </form>
    </div>
  );
};

export default UserUpdate;
