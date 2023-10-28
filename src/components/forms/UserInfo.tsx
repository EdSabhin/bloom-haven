import React from "react";
import MenuButton from "../buttons/MenuButton";
import useStore from "@/src/store/store";
import Image from "next/image";

type Props = {
  setUpdateUser: (value: boolean) => void;
};

const UserInfo = ({ setUpdateUser }: Props) => {
  const { user } = useStore();

  return (
    <div className="w-full flex items-start justify-center gap-20">
      <div className="w-1/2 flex flex-col items-start justify-center gap-6 pb-6">
        <h1 className="w-max text-2xl font-medium border-b-2 rounded border-teal-300 px-3 pb-1 mb-6">
          Account Details
        </h1>
        <div className="flex">
          <h3 className="underline underline-offset-4">Name:</h3>
          <h3 className="pl-2">{user?.username}</h3>
        </div>
        <div className="flex">
          <h3 className="underline underline-offset-4">Email: </h3>
          <h3 className="pl-2"> {user?.email}</h3>
        </div>
        <div className="flex">
          <h3 className="underline underline-offset-4">Telephone: </h3>
          <h3 className="pl-2"> {user?.telephone}</h3>
        </div>
        <div className="flex">
          <h3 className="underline underline-offset-4">Address: </h3>
          <h3 className="pl-2"> {user?.address}</h3>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-14">
        {user && (
          <div className="w-36 h-36 flex">
            <Image
              src={user?.image}
              width={200}
              height={200}
              alt={user?.username}
              className="rounded-full object-fill aspect-square border-2 border-teal-300 shadow-lg shadow-pink-300"
            />
          </div>
        )}

        <MenuButton
          text="Edit Profile"
          action={() => {
            setUpdateUser(true);
          }}
          className="w-max md:w-[12rem] text-center rounded-md p-2 bg-gradient-to-br from-slate-400 to-slate-600 text-white font-medium hover:shadow-md hover:shadow-teal-100 ease-in-out duration-200"
        />
      </div>
    </div>
  );
};

export default UserInfo;
