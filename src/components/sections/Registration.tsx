"use client";
import React, { useState } from "react";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";
import { User } from "@/src/models/user.model";
import createUser from "@/src/service/createUser";
import Image from "next/image";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  async function registerUser(e: React.FormEvent): Promise<User | null> {
    e.preventDefault();
    try {
      const response = await createUser(email, password);

      setSuccessMessage("Registro Exitoso");
      router.push("/");
      return response ?? null;
    } catch (error) {
      console.error("Error en la creación de usuario", error);
      setErrorMessage("Error en el Registro");
      return null;
    }
  }

  return (
    <div className="flex justify-center items-center pt-16 pb-32 hero-bg">
      <form
        onSubmit={registerUser}
        className="text-white flex flex-col justify-center items-center gap-8 pt-14 pb-12 px-20 shadow-md border border-pink-200 rounded-tr-3xl rounded-bl-3xl py-4 form-bg rounded-md"
      >
        <h1 className="text-lg text-white font-medium underline underline-offset-4 border-2 border-teal-200 py-3 px-4 bg-slate-400 rounded-lg">
          Seller Registration
        </h1>
        <div className="flex p-4">
          <p>
            You may provide the rest of your account details
            <br></br> once you are{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-teal-300 hover:text-teal-200 cursor-pointer  hover:scale-105 hover:underline hover:underline-offset-4"
            >
              signed in
            </span>
            .
          </p>
        </div>
        <div className="flex flex-col gap-6 pb-6">
          <Input
            value={email}
            label="Email"
            placeholder="Enter Email"
            setState={setEmail}
            type="email"
          />
          <Input
            type="password"
            value={password}
            label="Password"
            placeholder="Enter Password"
            setState={setPassword}
          />
        </div>

        {successMessage && errorMessage === "" && (
          <p className="text-teal-300">{successMessage}</p>
        )}
        {errorMessage && successMessage === "" && (
          <p className=" text-rose-800">{errorMessage}</p>
        )}
        <Button
          text={"Register"}
          className="px-6 py-2 shadow-sm bg-teal-300 rounded-md text-slate-600 font-semibold hover:shadow-md hover:shadow-pink-200 active:scale-110"
        />
        <div className="w-full flex justify-center items-center gap-2 pt-4 pb-6 ">
          <h3 className="text-sm">
            Already signed up?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-teal-200 hover:text-teal-100 cursor-pointer hover:underline hover:underline-offset-4"
            >
              Login here
            </span>
            .
          </h3>
        </div>
      </form>
    </div>
  );
};

export default Registration;
