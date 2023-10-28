import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/img/flower-c.png";
import MenuButton from "../buttons/MenuButton";
import { useRouter } from "next/navigation";
import { BiSolidUserDetail } from "react-icons/bi";
import useStore from "@/src/store/store";
import logout from "@/src/service/logout";
import getUserId from "@/src/service/getUserId";
import { SupabaseUser } from "@/src/models/user.model";
import getSupabaseProducts from "@/src/service/getSupabaseProducts";
import { Product } from "@/src/models/product.model";
import { PostgrestError } from "@supabase/supabase-js";

export interface ProductResponse {
  data: Product[] | null;
  error: PostgrestError | null;
}

const Navbar = () => {
  const router = useRouter();
  const {
    session,
    setSession,
    setUser,
    realTime,
    setRealTime,
    setProducts,
  } = useStore();

  useEffect(() => {
    const getUser = async () => {
      const data: SupabaseUser[] | null = await getUserId(session?.user.id);
      data && setUser(data[0]);
    };
    getUser();
    setRealTime(false);
  }, [session, realTime]);

  useEffect(() => {
    const getProductsData = async () => {
      const data: ProductResponse | null = await getSupabaseProducts();
      data && setProducts(data.data);
    };
    getProductsData();
    setRealTime(false);
  }, [realTime]);

  const signOut = async () => {
    try {
      await logout();
      await setSession(null);
      await setUser(null);
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  console.log(session);

  return (
    <div className="w-full flex items-center justify-between text-white bg-gradient-to-b from-rose-500 to-rose-400 px-10 pt-6 pb-10 gap-8 border-b border-pink-20">
      <Link
        href={"/"}
        className="w-1/2 flex items-center pl-10 py-4 gap-4 hover:shadow-md hover:shadow-pink-200 rounded rounded-tr-3xl rounded-bl-3xl"
      >
        <Image src={Logo} width={77} height={77} alt="Bloom Haven Logo" />
        <h1 className="w-max justify-start text-3xl">Bloom Haven</h1>
      </Link>

      <ul className="w-full flex justify-center gap-6">
        <Link href={""} className="hover:text-orange-200">
          Daily Offers
        </Link>
        <Link href={""} className="hover:text-orange-200">
          About
        </Link>
        <Link href={""} className="hover:text-orange-200">
          Contact
        </Link>
      </ul>

      <div className="w-full flex justify-center items-center gap-24 pr-24 ">
        <div
          onClick={() => router.push("/registration")}
          className="w-full items-center  cursor-pointer hover:underline underline-offset-4"
        >
          {!session && (
            <h4 className="w-full text-md">
              New seller? Sign up
              <span className="text-teal-300 font-semibold"> here</span>.
            </h4>
          )}
        </div>

        <div className="w-full flex justify-center items-center gap-6">
          {session && (
            <BiSolidUserDetail
              onClick={() => router.push("/profile")}
              size={65}
              className="cursor-pointer text-teal-200 hover:text-teal-100"
            />
          )}

          <MenuButton
            text={session ? "Logout" : "Login"}
            action={session ? () => signOut() : () => router.push("/login")}
            className="w-full text-center rounded-md p-2 m-3 hover:shadow-md hover:shadow-pink-200 bg-gradient-to-br from-indigo-300 to-pink-400 text-white font-medium"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
